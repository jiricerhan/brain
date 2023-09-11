import DynamoDb from "@modules/db";
import { GetServerSideProps } from "next";
import { Props } from "./components/AdminContainer";

const getServerSideProps: GetServerSideProps<Props> = async () => {
  const dbClient = DynamoDb;
  const spends = await dbClient.getPastWeakSpends();
  return { props: { spends } };
};

export default getServerSideProps;
