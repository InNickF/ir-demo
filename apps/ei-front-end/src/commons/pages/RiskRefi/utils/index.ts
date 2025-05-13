import { FundLenderByLtv } from "@/modules/debt/typings/fund";
interface SortLendersBy {
  lenders: FundLenderByLtv[];
  sortBy: keyof Pick<
    FundLenderByLtv,
    | "loan_name"
    | "calculated_interest_rate"
    | "debt_yield_over_last_12_months_noidm"
  >;
}

export const sortLendersBy = ({ lenders = [], sortBy }: SortLendersBy) => {
  const sortLenders = (a: FundLenderByLtv, b: FundLenderByLtv) => {
    if (sortBy === "loan_name") {
      return a.loan_name.localeCompare(b.loan_name);
    }
    if (sortBy === "calculated_interest_rate") {
      return b.calculated_interest_rate - a.calculated_interest_rate;
    }
    if (sortBy === "debt_yield_over_last_12_months_noidm") {
      return (
        a.debt_yield_over_last_12_months_noidm -
        b.debt_yield_over_last_12_months_noidm
      );
    }
    return 0;
  };
  return lenders?.sort(sortLenders).slice(0, 10);
};

export const maturityColors = (isDarkTheme: boolean) => {
  const lightColors = ["#c54936", "#bd8541", "#caa142", "#46864f"];
  const darkColors = ["#E95B44", "#D19347", "#F6C652", "#46864f"];

  return isDarkTheme ? darkColors : lightColors;
};

export const lenderColorBasedOnMaturity = (
  maturity: string,
  isDarkTheme: boolean
) => {
  const colors = maturityColors(isDarkTheme);

  const maturityDate = new Date(maturity);
  const today = new Date();
  const monthsToMaturity =
    (maturityDate.getFullYear() - today.getFullYear()) * 12 +
    (maturityDate.getMonth() - today.getMonth());

  if (monthsToMaturity <= 6) {
    return colors[0];
  }
  if (monthsToMaturity <= 12) {
    return colors[1];
  }
  if (monthsToMaturity <= 24) {
    return colors[2];
  }

  return colors[3];
};
