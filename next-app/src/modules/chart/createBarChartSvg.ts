import { EventEmitter } from "events";
import { writeFileSync } from "fs";
import { resolve } from "path";

import dbClient from "@modules/db";

import getChartDataFromDailySpends from "./utils/getChartDataFromDailySpends";
import getDailySpendsByPlatform from "./utils/getDailySpendsByPlatform";
import { CHARTS_PATH } from ".";

export const ChartEventEmitter = new EventEmitter();

// NOTE: make it work with any number of columns
// NOTE: add axis and labels to the chart
const createBarChartSvg = async () => {
  const spends = await dbClient.getPastWeakSpends();
  if (spends.length === 0) {
    return null;
  }

  const spendsByPlatform = getDailySpendsByPlatform(spends);
  const chartData = getChartDataFromDailySpends(spendsByPlatform);

  const svg = `
    <svg viewBox="0 0 1300 1000" xmlns="http://www.w3.org/2000/svg">
      <g>
        ${chartData
          .map((aggregatedSpend, index) => {
            let y = 1000;
            return aggregatedSpend.data
              .map((spend) => {
                const x = index * 200;
                const width = 100;
                const height = spend.relativeValue * 1000;
                y -= height;
                const bar = `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${spend.color}"></rect>`;

                return bar;
              })
              .join("\n");
          })
          .join("\n")}
      </g>
    </svg>
  `;
  const chartName = new Date().toISOString();
  const chartPath = `${CHARTS_PATH}${chartName}.svg`
  writeFileSync(
    resolve(process.cwd(), './public/', chartPath),
    svg
  );

  ChartEventEmitter.emit("chartUpdated", chartPath);

  return chartPath;
};

export default createBarChartSvg;
