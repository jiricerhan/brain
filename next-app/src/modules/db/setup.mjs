import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { nanoid } from "nanoid";


const client = new DynamoDB({
  endpoint: process.env.DYNAMO_DB_ENDPOINT,
  region: process.env.DYNAMO_DB_REGION,
});

async function setupDb() {
  await deleteTable();
  await createTable();
  await fillDummyData();
  await fillDummyData();
  await fillDummyData();
  await fillDummyData();
  // await listTables();
  // await scanTable();
}

async function listTables() {
  console.log("listing tables");
  try {
    const { TableNames } = await client.listTables({});
    console.log(TableNames);
  } catch (error) {
    console.error(error.message);
  }
}

async function scanTable() {
  console.log("scanning table");
  try {
    const { Items } = await client.scan({
      TableName: "spends",
    });
    console.log(Items);
  } catch (error) {
    console.error(error.message);
  }
}

async function deleteTable() {
  console.log("deleting table");
  try {
    await client.deleteTable({
      TableName: "spends",
    });
  } catch (error) {
    console.error(error.message);
  }
}

async function createTable() {
  console.log("creating table");
  try {
    await client.createTable({
      AttributeDefinitions: [
        {
          AttributeName: "id",
          AttributeType: "S"
        },
        {
          AttributeName: "timestamp",
          AttributeType: "S"
        },
        {
          AttributeName: "spendDate",
          AttributeType: "S"
        },
      ],
      TableName: "spends",
      KeySchema: [
        {
          AttributeName: "id",
          KeyType: "HASH"
        },
        {
          AttributeName: "timestamp",
          KeyType: "RANGE"
        }
      ],
      TableStatus: "ACTIVE",

      ProvisionedThroughput: {


        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
      },

      GlobalSecondaryIndexes: [
        {
          IndexName: "spendDateIndex",
          KeySchema: [
            {
              AttributeName: "spendDate",
              KeyType: "HASH"
            },
            {
              AttributeName: "timestamp",
              KeyType: "RANGE"
            }
          ],
          Projection: {
            ProjectionType: "ALL"
          },
          IndexStatus: "ACTIVE",
          ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10
          },

        }
      ]
    });
  } catch (error) {
    console.error(error.message);
  }
}

async function fillDummyData() {
  console.log("filling dummy data");
  try {

    const items = generateDummyData().map((item) => ({
      id: { S: item.id },
      amount: { N: String(item.amount) },
      spendDate: { S: item.date },
      platform: { S: item.platform },
      timestamp: { S: String(item.timestamp) },
    }));

    await client.batchWriteItem({
      RequestItems: {
        spends: items.map((item) => ({
          PutRequest: {
            Item: item,
          },
        })),
      },
    });
  } catch (error) {
    console.error(error.message);
  }
}

const generateDummyData = () => {
  const spends = [];
  for (let i = 0; i < 20; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 7));

    spends.push({
      id: nanoid(),
      amount: Math.floor(Math.random() * 1000),
      date: date.toISOString().slice(0, 10),
      platform: Math.random() > 0.5 ? "facebook" : "google",
      timestamp: date.toISOString(),
    });
  }
  return spends;
};


setupDb();
