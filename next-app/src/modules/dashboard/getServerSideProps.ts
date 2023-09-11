import { createBarChartSvg } from "@modules/chart";
import getLatestChart from "@modules/chart/utils/getLatestChart";
import { GetServerSideProps } from "next";
import { Props } from "./components/DashboardContainer";

const getServerSideProps: GetServerSideProps<Props> = async () => {
  let chartPath = getLatestChart();
  // If no chart was returned attempt to create a new one
  if (chartPath === null) {
    chartPath = await createBarChartSvg();
  }
  return { props: { chartPath } };
};

export default getServerSideProps;
