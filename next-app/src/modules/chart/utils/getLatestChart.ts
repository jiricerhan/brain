import { readdirSync } from "fs";
import { resolve } from "path";
import { CHARTS_PATH } from "..";

const getLatestChart = () => {
  
  const charts = readdirSync(resolve(process.cwd(), './public/', CHARTS_PATH)).sort();
  return charts[charts.length - 1]
    ? `${CHARTS_PATH}${charts[charts.length - 1]}`
    : null;
};

export default getLatestChart;
