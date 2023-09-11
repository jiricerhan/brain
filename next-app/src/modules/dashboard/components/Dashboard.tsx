import React from "react";

type Props = {
  chart: React.ReactNode;
};

const Dashboard = ({ chart }: Props) => {
  return (
    <>
      <h1>Dashboard</h1>
      {chart}
    </>
  );
};

export default React.memo(Dashboard);
