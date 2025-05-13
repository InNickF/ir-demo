import { DealCustomerAccess } from "@/acquisitions/typings/market-analytics";
import { MapFormatter } from "@/commons/model-in/formatters/types";
import {
  numberToDollar,
  readableNumber,
} from "@/commons/model-in/formatters/utils/amount-conversions";

export const dealCustomerAccessFormatter: MapFormatter<DealCustomerAccess> = {
  median_age: ({ value }) => ({ value: readableNumber(value) }),
  median_disposable_income: ({ value }) => ({
    value: numberToDollar({
      value,
      options: { minimumFractionDigits: 0, maximumFractionDigits: 0 },
    }),
    className: "font-mono text-right",
  }),
  median_household_income: ({ value }) => ({
    value: numberToDollar({
      value,
      options: { minimumFractionDigits: 0, maximumFractionDigits: 0 },
    }),
    className: "font-mono text-right",
  }),
  median_net_worth: ({ value }) => ({
    value: numberToDollar({
      value,
      options: { minimumFractionDigits: 0, maximumFractionDigits: 0 },
    }),
  }),
  population_density: ({ value }) => ({
    value: readableNumber(value),
    className: "font-mono text-right",
  }),
  retail_sales: ({ value }) => ({
    value: numberToDollar({
      value,
      options: { minimumFractionDigits: 0, maximumFractionDigits: 0 },
    }),
    className: "font-mono text-right",
  }),
  total_population: ({ value }) => ({
    value: readableNumber(value),
    className: "font-mono text-right",
  }),
  to_break: ({ value }) => ({ value: readableNumber(value) }),
  total_businesses: ({ value }) => ({
    value: readableNumber(value),
    className: "font-mono text-right",
  }),
};
