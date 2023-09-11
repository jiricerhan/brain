import { GraphqlServerContext } from "../types/GraphqlServerContext";

async function addSpend(
  _parent: unknown,
  args: { amount: number; date: string; platform: string },
  context: GraphqlServerContext
) {
  const { amount, date, platform } = args;
  const spend = await context.dbClient.addSpend(amount, date, platform);

  context.createBarChartSvg();

  return spend;
}

export default addSpend;
