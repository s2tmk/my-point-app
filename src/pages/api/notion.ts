// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { notionClient } from "@/lib/notionClient";

type Data = {
  userId: string;
  point: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const targetUserId = req.query.userId as string;
  const response = await notionClient.databases.query({
    database_id: process.env.NEXT_PUBLIC_NOTION_DB_ID!,
    filter: {
      property: "userId",
      rich_text: {
        equals: targetUserId,
      },
    },
  });

  const properties = JSON.parse(JSON.stringify(response.results[0])).properties;
  const userId = properties.userId.rich_text[0].plain_text;
  const point = properties.point.number;

  res.status(200).json({ userId, point });
}
