interface GetChartDateFromStringArgs<T, K extends keyof T> {
  chartData: T;
  dateKey: K;
}

export const getChartDateFromString = <T, K extends keyof T>({
  chartData,
  dateKey,
}: GetChartDateFromStringArgs<T, K>) => {
  const dateParts = String(chartData[dateKey]).split("/");
  const date = new Date(
    Number(dateParts[2]),
    Number(dateParts[0]) - 1,
    Number(dateParts[1])
  ).getTime();

  return {
    ...chartData,
    [dateKey]: date,
  } as T & Record<K, number>;
};

interface GetChartDateFromStringQuarterArgs<T, K extends keyof T> {
  chartData: T;
  dateKey: K;
}

export const getChartDateFromStringQuarter = <T, K extends keyof T>({
  chartData,
  dateKey,
}: GetChartDateFromStringQuarterArgs<T, K>) => {
  const dateParts = String(chartData[dateKey]).split(" ");
  const year = Number(dateParts[0]);
  const months = {
    Q1: 0, // January
    Q2: 3, // April
    Q3: 6, // July
    Q4: 9, // October
  };

  const date = new Date(year, months[dateParts[1]]).getTime();

  return {
    ...chartData,
    [dateKey]: date,
  } as Record<K, number> & T;
};
