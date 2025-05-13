import {
  AssetLeaseExpirationPortrait,
  AssetRentRoll,
  AssetTotalDistributionsByType,
  AssetTotalDistributionsByTypeTotals,
  PropertyDebtMetrics,
  ValuationsByAsset,
  ValuationsByAssetTotals,
} from "@/assets/typings/properties";
import {
  createFormatter,
  genericFormatterParseFn,
} from "@/commons/model-in/formatters";
import { ValueFormatter } from "@/commons/model-in/formatters/types";
import {
  commonTwoFractionOptions,
  convertToTitleCase,
  genericGetValue,
  genericNoDataText,
  humanizeSnakeCase,
} from "@/commons/model-in/formatters/utils";
import {
  commonNumberToDollarFn,
  commonNumberToScaledPercent,
  numberToDollar,
  numberToPercentX,
  numberToScaledPercent,
  readableNumber,
  readableNumberWithOptions,
} from "@/commons/model-in/formatters/utils/amount-conversions";
import {
  AssetRentRollSchema,
  AssetTotalDistributionsByTypeTotalsSchema,
  ValuationsByAssetSchema,
} from "../../schemas/properties";

export const assetTotalDistributionsByTypeValueFormatter: ValueFormatter<AssetTotalDistributionsByType> =
  {
    map: {
      distributions: ({ value }) => ({
        value: commonNumberToDollarFn({ value }),
        className: "font-mono text-right",
      }),
      actual_contributions: ({ value }) => ({
        value: commonNumberToDollarFn({ value }),
        className: "font-mono text-right",
      }),
      actual_operations_distributions: ({ value }) => ({
        value: commonNumberToDollarFn({ value }),
        className: "font-mono text-right",
      }),
      actual_refi_distributions: ({ value }) => ({
        value: commonNumberToDollarFn({ value }),
        className: "font-mono text-right",
      }),
      actual_sales_distributions: ({ value }) => ({
        value: commonNumberToDollarFn({ value }),
        className: "font-mono text-right",
      }),
      budget_contributions: ({ value }) => ({
        value: commonNumberToDollarFn({ value }),
        className: "font-mono text-right",
      }),
      budget_total_distributions: ({ value }) => ({
        value: commonNumberToDollarFn({ value }),
        className: "font-mono text-right",
      }),
      property: ({ value }) => ({ value: genericGetValue(value) }),
      variance_contributions: ({ value }) => ({
        value: commonNumberToDollarFn({ value }),
        className: "font-mono text-right",
      }),
      variance_distributions: ({ value }) => ({
        value: commonNumberToDollarFn({ value }),
        className: "font-mono text-right",
      }),
      yardi_property_code: ({ value }) => ({ value: genericGetValue(value) }),
    },
    format(params) {
      return genericFormatterParseFn({ ...params, map: this.map });
    },
  };

export const assetTotalDistributionsByTypeFormatter = createFormatter({
  schema: AssetTotalDistributionsByTypeTotalsSchema,
  valueMap: assetTotalDistributionsByTypeValueFormatter.map,
});

export const assetTotalDistributionsByTypeTotalsValueFormatter: ValueFormatter<AssetTotalDistributionsByTypeTotals> =
  {
    map: assetTotalDistributionsByTypeValueFormatter.map,
    format: assetTotalDistributionsByTypeValueFormatter.format,
  };

export const assetTotalDistributionsByTypeTotalsFormatter = createFormatter({
  schema: AssetTotalDistributionsByTypeTotalsSchema,
  valueMap: assetTotalDistributionsByTypeTotalsValueFormatter.map,
});

export const valuationsByAssetValueFormatter: ValueFormatter<ValuationsByAsset> =
  {
    map: {
      property: ({ value }) => ({ value: genericGetValue(value) }),
      yardi_property_code: ({ value }) => ({ value: genericGetValue(value) }),
      current_irr: ({ value }) => ({
        value: commonNumberToScaledPercent({ value }),
      }),
      current_moc: ({ value }) => ({ value: numberToPercentX({ value }) }),
      projected_irr: ({ value }) => ({
        value: commonNumberToScaledPercent({ value }),
      }),
      projected_moc: ({ value }) => ({ value: numberToPercentX({ value }) }),
      total_gav: ({ value }) => ({
        value: commonNumberToDollarFn({ value }),
        className: "font-mono text-right",
      }),
      total_nav: ({ value }) => ({
        value: commonNumberToDollarFn({ value }),
        className: "font-mono text-right",
      }),
    },
    format(params) {
      return genericFormatterParseFn({ ...params, map: this.map });
    },
  };

export const valuationsByAssetFormatter = createFormatter({
  schema: ValuationsByAssetSchema,
  valueMap: valuationsByAssetValueFormatter.map,
});

export const valuationsByAssetTotalsValueFormatter: ValueFormatter<ValuationsByAssetTotals> =
  {
    map: valuationsByAssetValueFormatter.map,
    format: valuationsByAssetValueFormatter.format,
  };

export type AssetRentRollHeadersTableFormatter = {
  [Key in keyof AssetRentRoll]: () => string;
};
export const assetRentRollHeadersTableObjectFormatter: AssetRentRollHeadersTableFormatter =
  {
    gross_net: () => "Gross / Net",
    market_percentage: () => "Market %",
    annual_rent_psf: () => "Annual Rent PSF",
  };

export const assetRentRollHeadersTableFormatter = ({
  key,
}: {
  key: keyof AssetRentRoll;
}) => {
  const formatter = assetRentRollHeadersTableObjectFormatter?.[key];
  return formatter ? formatter() : convertToTitleCase(humanizeSnakeCase(key));
};

export const assetRentRollFormatter = createFormatter({
  schema: AssetRentRollSchema,
  valueMap: {
    tenant: ({ value }) => ({ value: genericGetValue(value) }),
    remaining_term: ({ value }) => ({
      value: value ? genericGetValue(value) + " M" : genericNoDataText,
    }),
    lxd: ({ value }) => ({ value: genericGetValue(value) }),
    annual_rent_psf: ({ value }) => ({
      value: numberToDollar({
        value: value,
        options: {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        },
      }),
      className: "font-mono text-right",
    }),
    market_percentage: ({ value }) => ({
      value: numberToScaledPercent({ value }),
    }),
    sf: ({ value }) => ({
      value: readableNumberWithOptions({ value }),
      className: "font-mono text-right",
    }),
    gross_net: ({ value }) => ({ value: genericGetValue(value) }),
    market_rent: ({ value }) => ({
      value: numberToDollar({
        value: value,
        options: {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        },
      }),
      className: "font-mono text-right",
    }),
    tenant_code: ({ value }) => ({ value: genericGetValue(value) }),
    unit_codes: ({ value }) => ({
      value: genericGetValue(value)?.replace(/;/g, ", "),
    }),
  },
});

export const assetDebtMetricsFormatter: ValueFormatter<PropertyDebtMetrics> = {
  map: {
    amortization_type: ({ value }) => ({ value: genericGetValue(value) }),
    calculated_interest_rate: ({ value }) => ({
      value: numberToScaledPercent({
        value,
        options: commonTwoFractionOptions,
      }),
    }),
    contract_file: ({ value }) => ({ value: genericGetValue(value) }),
    current_ltv: ({ value }) => ({
      value: numberToScaledPercent({
        value,
        options: commonTwoFractionOptions,
      }),
    }),
    current_outstanding_loan_balance: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    cap_strike: ({ value }) => ({ value: numberToScaledPercent({ value }) }),
    yield_on_cost_over_last_12_months_noidm: ({ value }) => ({
      value: numberToScaledPercent({
        value,
        options: commonTwoFractionOptions,
      }),
    }),
    expiration_date: ({ value }) => ({ value: genericGetValue(value) }),
    id: ({ value }) => ({ value: genericGetValue(value) }),
    index_name: ({ value }) => ({ value: genericGetValue(value) }),
    index_rate: ({ value }) => ({
      value: numberToScaledPercent({
        value,
        options: commonTwoFractionOptions,
      }),
    }),
    initial_maturity_date: ({ value }) => ({ value: genericGetValue(value) }),
    lender_name: ({ value }) => ({ value: genericGetValue(value) }),
    loan_amount_max_commitment: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    rate_cap_vs_swap: ({ value }) => ({ value: genericGetValue(value) }),
    sorting: ({ value }) => ({
      value: readableNumber(value),
      className: "font-mono text-right",
    }),
    spread: ({ value }) => ({
      value: numberToScaledPercent({
        value,
        options: commonTwoFractionOptions,
      }),
    }),
    strike_price: ({ value }) => ({
      value: readableNumber(value),
      className: "font-mono text-right",
    }),
    yield_on_cost_leased_noidm: ({ value }) => ({
      value: numberToScaledPercent({
        value,
        options: commonTwoFractionOptions,
      }),
    }),
    noi_leased_noidm: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    dscr_leased_noidm: ({ value }) => ({
      value: readableNumberWithOptions({
        value,
        options: {
          maximumFractionDigits: 2,
        },
      }),
      className: "font-mono text-right",
    }),
    debt_yield_leased_noidm: ({ value }) => ({
      value: commonNumberToScaledPercent({ value }),
    }),
  },
  format(params) {
    return genericFormatterParseFn({ ...params, map: this.map });
  },
};

export const leaseExpirationPortraitFormatter: ValueFormatter<
  AssetLeaseExpirationPortrait["value"][number]["metadata"]
> = {
  map: {
    gross_net: ({ value }) => ({ value: genericGetValue(value) }),
    lcd: ({ value }) => ({ value: genericGetValue(value) }),
    lxd: ({ value }) => ({ value: genericGetValue(value) }),
    monthly_rent: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    remaining_term: ({ value }) => ({ value: readableNumber(value) }),
    tenant_code: ({ value }) => ({ value: genericGetValue(value) }),
  },
  format(params) {
    return genericFormatterParseFn({ ...params, map: this.map });
  },
};
