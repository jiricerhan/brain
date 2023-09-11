import React from "react";
import styles from "./Chart.module.css";

type Props = {
  chartPath: string;
};

const Chart = ({ chartPath }: Props) => {
  return (
    <>
      <p>Aggregated spends from last weak:</p>
      <img className={styles.chart} src={chartPath} alt="chart" />
    </>
  );
};

export default React.memo(Chart);
