import { Spend } from "@modules/db/model";

const getDailySpendsByPlatform = (spends: Spend[]) => {
  return spends.reduce(
    (
      dailySpendsByPlatform: {
        [date: string]: { [platform: string]: number };
      },
      spend
    ) => {
      let dailySpendForDate = dailySpendsByPlatform[spend.date];

      if (!dailySpendForDate) {
        dailySpendForDate = {};
      }

      if (dailySpendForDate) {
        if (!dailySpendForDate[spend.platform]) {
          dailySpendForDate[spend.platform] = 0;
        }
        dailySpendForDate[spend.platform] += spend.amount;
        dailySpendsByPlatform[spend.date] = dailySpendForDate;
      }
      return dailySpendsByPlatform;
    },
    {}
  );
};

export default getDailySpendsByPlatform;