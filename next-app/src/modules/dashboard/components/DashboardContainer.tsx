import ChartContainer from "./ChartContainer";
import Dashboard from "./Dashboard";
import LayoutContainer from "@components/LayoutContainer";

export type Props = {
  chartPath: string | null;
};

const DashboardContainer = ({ chartPath }: Props) => {
  const chart = <ChartContainer chartPath={chartPath} />;
  return (
    <LayoutContainer title="Dashboard">
      <Dashboard chart={chart} />
    </LayoutContainer>
  );
};

export default DashboardContainer;
