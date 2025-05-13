import { GenericLabelValueObject } from "@/commons/typings";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import {
  numberToDollar,
  numberToPercent,
  readableNumber,
} from "@/commons/model-in/formatters/utils/amount-conversions";
import { ScreeningDealInformation } from "../../typings/deals";

export interface IDefaultDealFieldsFormatter<T> {
  key: keyof T;
  formatter: (value: string | number | GenericLabelValueObject) => string;
}

export const defaultScreeningFieldsFormatters: Array<
  IDefaultDealFieldsFormatter<ScreeningDealInformation>
> = [
  {
    key: "purchase_price",
    formatter: (value: string) => numberToDollar({ value: Number(value) }),
  },
  {
    key: "psf",
    formatter: (value: string) => numberToDollar({ value: Number(value) }),
  },
  {
    key: "sf",
    formatter: (value: string) => readableNumber(Number(value)),
  },
  {
    key: "transaction_costs_percentage",
    formatter: (value: string) => numberToPercent(Number(value)),
  },
  {
    key: "transaction_costs",
    formatter: (value: string) => numberToDollar({ value: Number(value) }),
  },
  {
    key: "transaction_costs_psf",
    formatter: (value: string) => numberToDollar({ value: Number(value) }),
  },
  {
    key: "tenant_improvements_psf",
    formatter: (value: string) => numberToDollar({ value: Number(value) }),
  },
  {
    key: "tenant_improvements",
    formatter: (value: string) => numberToDollar({ value: Number(value) }),
  },
  {
    key: "leasing_commissions_psf",
    formatter: (value: string) => numberToDollar({ value: Number(value) }),
  },
  {
    key: "leasing_commissions",
    formatter: (value: string) => numberToDollar({ value: Number(value) }),
  },
  {
    key: "capital_expenditures_psf",
    formatter: (value: string) => numberToDollar({ value: Number(value) }),
  },
  {
    key: "capital_expenditures",
    formatter: (value: string) => numberToDollar({ value: Number(value) }),
  },
  {
    key: "total_uses",
    formatter: (value: string) => numberToDollar({ value: Number(value) }),
  },
  {
    key: "total_uses_psf",
    formatter: (value: string) => numberToDollar({ value: Number(value) }),
  },
  {
    key: "debt_percentage",
    formatter: (value: string) => numberToPercent(Number(value)),
  },
  {
    key: "debt",
    formatter: (value: string) => numberToDollar({ value: Number(value) }),
  },
  {
    key: "debt_psf",
    formatter: (value: string) => numberToDollar({ value: Number(value) }),
  },
  {
    key: "equity_percentage",
    formatter: (value: string) => numberToPercent(Number(value)),
  },
  {
    key: "equity_percentage",
    formatter: (value: string) => numberToPercent(Number(value)),
  },
  {
    key: "equity",
    formatter: (value: string) => numberToDollar({ value: Number(value) }),
  },
  {
    key: "equity_psf",
    formatter: (value: string) => numberToDollar({ value: Number(value) }),
  },
  {
    key: "total_sources",
    formatter: (value: string) => numberToDollar({ value: Number(value) }),
  },
  {
    key: "total_sources_psf",
    formatter: (value: string) => numberToDollar({ value: Number(value) }),
  },
  {
    key: "current_market_rent_sf",
    formatter: (value: string) => numberToDollar({ value: Number(value) }),
  },
  {
    key: "imputed_yield_on_cost_percentage",
    formatter: (value: string) => numberToPercent(Number(value)),
  },
  {
    key: "cap_rate",
    formatter: (value: string) => numberToPercent(Number(value)),
  },
  {
    key: "site_area",
    formatter: (value: string) => readableNumber(Number(value)),
  },
  {
    key: "site_coverage",
    formatter: (value: string) => numberToPercent(Number(value)),
  },
  {
    key: "occupancy_at_acquisitions",
    formatter: (value: number) => numberToPercent(value),
  },
  {
    key: "pricing_guidance",
    formatter: (value: string) => numberToDollar({ value: Number(value) }),
  },
  {
    key: "officer",
    formatter: (value: GenericLabelValueObject) =>
      genericGetValue(value?.label),
  },
  {
    key: "analyst",
    formatter: (value: GenericLabelValueObject) =>
      genericGetValue(value?.label),
  },
  {
    key: "officer_status",
    formatter: (value: GenericLabelValueObject) =>
      genericGetValue(value?.label),
  },
];
