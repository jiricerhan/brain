import { nanoid } from "nanoid";
import { Spend } from "./model";
import { DynamoDB } from "@aws-sdk/client-dynamodb";

export interface DBClient {
  addSpend(
    amount: Spend["amount"],
    date: Spend["date"],
    platform: Spend["platform"]
  ): Promise<Spend>;
  getPastWeakSpends(): Promise<Spend[]>;
}

class DynamoDbClient implements DBClient {
  private client: DynamoDB;
  constructor() {
    this.client = new DynamoDB({
      endpoint:  process.env.DYNAMO_DB_ENDPOINT,
      region: process.env.DYNAMO_DB_REGION,
    });
  }

  public async addSpend(
    amount: Spend["amount"],
    date: Spend["date"],
    platform: Spend["platform"]
  ): Promise<Spend> {
    const id = nanoid();
    try {
      await this.client.putItem({
        TableName: "spends",
        Item: {
          id: { S: id },
          amount: { N: String(amount) },
          spendDate: { S: date },
          platform: { S: platform },
          timestamp: { S: String(new Date().toISOString()) },
        },
      });
    } catch (error) {
      if (typeof error === "object" && error !== null && "message" in error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
    return {
      id,
      amount,
      date,
      platform,
    };
  }

  public async getPastWeakSpends() {
    try {
      const pastWeakDates: string[] = Array.from(
        { length: 7 },
        (_, i) => i
      ).map((i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().slice(0, 10);
      });

      return pastWeakDates.reduce(
        async (spendsPromise: Promise<Spend[]>, date) => {
          let spends = await spendsPromise;
          const result = await this.client.query({
            TableName: "spends",
            IndexName: "spendDateIndex",
            ScanIndexForward: false,
            KeyConditionExpression: "spendDate = :d",
            ExpressionAttributeValues: {
              ":d": { S: date },
            },
          });
          spends = [
            ...spends,
            ...(result.Items?.reduce((items: Spend[], item) => {
              // Type guard
              if (
                !item.id ||
                !item.id.S ||
                !item.amount ||
                !item.amount.N ||
                !item.spendDate ||
                !item.spendDate.S ||
                !item.platform ||
                !item.platform.S
              ) {
                return items;
              }
              items.push({
                id: item.id.S,
                amount: Number(item.amount.N),
                date: item.spendDate.S,
                platform: item.platform.S,
              });
              return items;
            }, []) || []),
          ];
          return spends;
        },
        Promise.resolve([])
      );
    } catch (error) {
      console.error("eadasd");
      if (typeof error === "object" && error !== null && "message" in error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
    return [];
  }
}

const dbClient = new DynamoDbClient();

export default dbClient;
