const getChartDataFromDailySpends = (dailySpendsByPlatform: {
  [date: string]: { [platform: string]: number };
}) => {
  const maxTotal = Math.max(
    ...Object.entries(dailySpendsByPlatform).map(([_date, daySpends]) => {
      const total = Object.values(daySpends).reduce(
        (total, spend) => total + spend,
        0
      );
      return total;
    })
  );

  const aggregatedSpends = Object.entries(dailySpendsByPlatform).map(
    ([date, daySpends]) => {
      return {
        date,
        data: Object.entries(daySpends)
          .map(([platform, spend]) => ({
            color: platform === "google" ? "#34a853" : "#2374e1",
            relativeValue: spend / maxTotal,
          }))
          .sort((a, b) => {
            if (a.color > b.color) {
              return 1;
            }
            if (a.color < b.color) {
              return -1;
            }
            return 0;
          }),
      };
    }
  );
  return aggregatedSpends.sort((a, b) => {
    if (a.date > b.date) {
      return 1;
    }
    if (a.date < b.date) {
      return -1;
    }
    return 0;
  });
};

export default getChartDataFromDailySpends;
