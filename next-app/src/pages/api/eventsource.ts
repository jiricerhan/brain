import type { NextApiRequest, NextApiResponse } from "next";
import { ChartEventEmitter } from "@modules/chart/createBarChartSvg";

type ResponseData = {
  message: string;
};

function handler(_req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  res.writeHead(200, {
    Connection: "keep-alive",
    "Content-Encoding": "none",
    "Cache-Control": "no-cache, no-transform",
    "Content-Type": "text/event-stream",
  });

  ChartEventEmitter.on("chartUpdated", (chartPath: string) => {
    res.write(`data: ${JSON.stringify(chartPath)}\n\n`);
  });

  res.on("close", () => {
    res.end();
  });

  res.socket?.on("close", () => {
    res.end();
  });
}

export default handler;
