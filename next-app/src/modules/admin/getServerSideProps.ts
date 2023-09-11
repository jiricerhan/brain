import DynamoDb from "@modules/db";

const getServerSideProps = async () => {
  const dbClient = DynamoDb;
  const spends = await dbClient.getPastWeakSpends();
  return { props: { spends } };
};

export default getServerSideProps;
