import { useEffect, useState } from "react";

import Chart from "./Chart";

type Props = {
  chartPath: string;
};

const ChartContainer = ({ chartPath: initialChartPath }: Props) => {
  const [chartPath, setId] = useState(initialChartPath);
  useEffect(() => {
    const eventSource = new EventSource(`/api/eventsource`, {
      withCredentials: true,
    });

    eventSource.onmessage = (e) => {
      setId(JSON.parse(e.data));
    };
    eventSource.onerror = (e) => {
      console.error(e);
    };

    return () => {
      eventSource.close();
    };
  }, []);
  return <Chart chartPath={chartPath} />;
};

export default ChartContainer;
