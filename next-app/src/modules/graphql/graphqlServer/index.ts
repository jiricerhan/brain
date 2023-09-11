import { readFileSync } from "fs";
import { resolve } from "path";
import { createYoga, createSchema } from "graphql-yoga";

import DynamoDb from "@modules/db";

import resolvers from "./resolvers";
import type { GraphqlServerContext } from "./types/GraphqlServerContext";
import { createBarChartSvg } from "@modules/chart";

const schema = createSchema<GraphqlServerContext>({
  typeDefs: readFileSync(
    resolve(process.cwd(), "./src/modules/graphql/schema.graphql"),
    "utf-8"
  ),
  resolvers,
});

const yogaServer = createYoga<GraphqlServerContext>({
  schema,
  graphqlEndpoint: "/api/graphql",
  context: (request) => ({
    ...request,
    dbClient: DynamoDb,
    createBarChartSvg: createBarChartSvg,
  }),
});

export default yogaServer;
