import type { Resolvers } from "../types/generated-types";
import addSpend from "./addSpendMutation";
import healthCheck from "./healthCheckQuery";

const resolvers: Resolvers = {
  Query: {
    healthCheck: healthCheck,
  },
  Mutation: {
    addSpend: addSpend,
  },
};

export default resolvers;
