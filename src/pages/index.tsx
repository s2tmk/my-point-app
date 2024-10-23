import type { Liff } from "@line/liff";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import styles from "@/styles/Home.module.css";

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

      <main className={styles.main}>
        {liff && <p>LIFF init succeeded.</p>}
        {liffError && (
          <>
            <p>LIFF init failed.</p>
            <p>
              <code>{liffError}</code>
            </p>
          </>
        )}
        <hr />
        <ul>
          <li>user - {user.userId}</li>
          <li>point - {user.point}</li>
        </ul>
      </main>
    </div>
  );
};

export default Home;
