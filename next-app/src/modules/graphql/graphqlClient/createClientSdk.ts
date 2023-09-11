import { GraphQLClient } from "graphql-request";
import type { RequestConfig } from "graphql-request/build/esm/types";
import { getSdk } from "./types/generated-types";

const createClientSdk = (endpoint: string, config?: RequestConfig) => {
  const client = new GraphQLClient(endpoint, config);
  const sdk = getSdk(client);
  return sdk;
};

export default createClientSdk;
