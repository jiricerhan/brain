import type { DBClient } from "@modules/db";

import { createBarChartSvg } from "@modules/chart";

export interface GraphqlServerContext {
  request: Request;
  dbClient: DBClient;
  createBarChartSvg: typeof createBarChartSvg;
}
