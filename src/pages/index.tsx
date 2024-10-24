import type { Liff } from "@line/liff";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

type UserProps = {
  userId: string;
  point: number;
};

export const getServerSideProps: GetServerSideProps<{
  user: UserProps;
}> = async () => {
  const user = await fetchUser();
  return { props: { user } };
};

async function fetchUser(): Promise<UserProps> {
  const response = await fetch(
    `http://${
      process.env.NEXT_PUBLIC_ENDPOINT ?? "localhost:3000"
    }/api/notion?userId=tomoki`
  );
  const data = await response.json();
  return data;
}

const Home: NextPage<{
  liff: Liff | null;
  liffError: string | null;
  user: UserProps;
}> = ({ liff, liffError, user }) => {
  return (
    <div>
      <Head>
        <title>My Point</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="h-screen flex items-center justify-center p-2">
          <div className="h-10">
            <span className="text-4xl text-green-500">{user.point}</span>
            <span className="pl-2 align-bottom">Pt</span>
          </div>
        </div>
        <div className="absolute bottom-1 p-4">
          {liff && <p>LIFF init succeeded.</p>}
          {liffError && (
            <>
              <p>LIFF init failed.</p>
              <p>
                <code>{liffError}</code>
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
