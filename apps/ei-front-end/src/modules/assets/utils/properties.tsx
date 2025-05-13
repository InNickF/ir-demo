import {
  AssetTotalDistributionsByTypeSchema,
  AssetTotalDistributionsByTypeTotalsSchema,
  ValuationsByAssetSchema,
  ValuationsByAssetTotalsSchema,
} from "@/assets/schemas/properties";
import {
  AssetRentRoll,
  AssetTotalDistributionsByType,
  AssetTotalDistributionsByTypeTotals,
  Property,
  ValuationsByAsset,
  ValuationsByAssetTotals,
} from "@/assets/typings/properties";
import { GenericTableCellWithFormatter } from "@/commons/components/data-display/GenericTableCellWithFormatter";
import {
  getTableOrderInitialState,
  getTableVisibilityInitialState,
  TableVisibilityState,
} from "@/commons/model-in/db/utils";
import { SorterMap } from "@/commons/model-in/formatters/sorters";
import {
  convertToTitleCase,
  genericNoDataText,
  humanizeSnakeCase,
} from "@/commons/model-in/formatters/utils";
import { numberToDollar } from "@/commons/model-in/formatters/utils/amount-conversions";
import { createColumnHelper } from "@tanstack/react-table";
import { PropertyTableCell } from "../components/data-display/property-table-cells/PropertyTableCell";
import { propertyFormatter } from "../entities/asset/formatters";
import { PropertySchema } from "../entities/asset/schema";
import {
  assetTotalDistributionsByTypeFormatter,
  assetTotalDistributionsByTypeTotalsFormatter,
  valuationsByAssetFormatter,
} from "./formatters/properties";
import { getPropertyURL } from "./redirects/properties-redirects";

export const propertiesTableInitialOrderAndVisibility: Array<keyof Property> = [
  "name",
  "fund_name",
  "rentable_building_area",
  "noi_over_last_12_months_noidm",
  "noi_leased_noidm",
  "dscr_over_last_12_months_noidm",
  "dscr_leased_noidm",
  "accounts_receivable_balance_with_pre_payments_active_tenant",
  "accounts_receivable_balance_with_pre_payments_all_tenant",
  "accounts_receivable_balance_without_pre_payments_active_tenant",
  "accounts_receivable_balance_without_pre_payments_all_tenant",
  "current_cash_on_cash_over_last_12_months",
  "occupancy_rate",
  "account_payable_balance",
];

export const propertiesTableKeysToIgnore: Array<keyof Property> = [
  "submarket_name",
  "market_name",
  "latitude",
  "longitude",
];

export const allPropertyKeys = Object.keys(PropertySchema.shape) as Array<
  keyof Property
>;

export const getPropertiesTableInitialOrder = (): Array<keyof Property> => {
  return getTableOrderInitialState({
    schema: PropertySchema,
    initialOrder: propertiesTableInitialOrderAndVisibility,
    keysToIgnore: propertiesTableKeysToIgnore,
  });
};

export type PropertiesTableVisibilityState = TableVisibilityState<
  typeof PropertySchema
>;

export const getPropertiesTableInitialVisibility =
  (): PropertiesTableVisibilityState => {
    return getTableVisibilityInitialState({
      schema: PropertySchema,
      initialVisibility: propertiesTableInitialOrderAndVisibility,
      keysToIgnore: propertiesTableKeysToIgnore,
    });
  };

export const propertiesMetricsVisibilityAndOrderingUIHiddenKeys: Array<
  keyof Property
> = ["name"];

const propertiesTableColumnsHelper = createColumnHelper<Property>();
export const propertiesTableColumns = allPropertyKeys
  .filter((key) => !propertiesTableKeysToIgnore.includes(key))
  .map((key: keyof Property) =>
    propertiesTableColumnsHelper.accessor(key, {
      header: propertyFormatter.header?.format({ key }).value,
      cell: (info) => (
        <PropertyTableCell
          redirectToAsset={key === "name"}
          propertyKey={key}
          info={info}
        />
      ),
    })
  );

export const generatePriceWithPSFString = ({
  amount,
  sf,
}: {
  amount?: number | string;
  sf?: number;
}): string => {
  if (!amount) {
    return genericNoDataText;
  }

  if (typeof amount === "string") {
    amount = parseFloat(amount);
  }

  const formattedPrice = numberToDollar({
    value: amount,
    options: {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
  });

  const formattedPSF = numberToDollar({
    value: amount / sf,
    options: {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
  });

  if (amount && !sf) {
    return formattedPrice;
  }

  return `${formattedPrice} (${formattedPSF} PSF)`;
};

export const totalDistributionsByTypeSorter: SorterMap<AssetTotalDistributionsByType> =
  {
    property: "string",
    yardi_property_code: "string",
    actual_contributions: "number",
    actual_operations_distributions: "number",
    actual_refi_distributions: "number",
    actual_sales_distributions: "number",
    budget_contributions: "number",
    budget_total_distributions: "number",
    distributions: "number",
    variance_contributions: "number",
    variance_distributions: "number",
  };

const totalDistributionsByTypeTableColumnsHelper =
  createColumnHelper<AssetTotalDistributionsByType>();

export const totalDistributionsByTypeTableColumns = Object.keys(
  AssetTotalDistributionsByTypeSchema.shape
)
  .filter((key) => {
    const keysToIgnore: Array<keyof AssetTotalDistributionsByType> = [
      "yardi_property_code",
    ];
    return !keysToIgnore.includes(key as keyof AssetTotalDistributionsByType);
  })
  .map((key: keyof AssetTotalDistributionsByType) =>
    totalDistributionsByTypeTableColumnsHelper.accessor(key, {
      header: convertToTitleCase(humanizeSnakeCase(key)),
      cell: (info) => (
        <GenericTableCellWithFormatter<AssetTotalDistributionsByType>
          formatter={assetTotalDistributionsByTypeFormatter}
          identifier={key}
          info={info}
          redirectToURL={
            key === "property"
              ? getPropertyURL({
                  section: "details",
                  propertyId: info.row.original.yardi_property_code,
                })
              : null
          }
        />
      ),
    })
  );

const totalDistributionsByTypeTotalsTableColumnsHelper =
  createColumnHelper<AssetTotalDistributionsByTypeTotals>();

export const totalDistributionsByTypeTotalsTableColumns = Object.keys(
  AssetTotalDistributionsByTypeTotalsSchema.shape
).map((key: keyof AssetTotalDistributionsByTypeTotals) => {
  return totalDistributionsByTypeTotalsTableColumnsHelper.accessor(key, {
    header: convertToTitleCase(humanizeSnakeCase(key)),
    cell: (info) => (
      <GenericTableCellWithFormatter<AssetTotalDistributionsByTypeTotals>
        formatter={assetTotalDistributionsByTypeTotalsFormatter}
        identifier={key}
        info={info}
        cellProps={{
          size: "big",
        }}
      />
    ),
  });
});

export const valuationsByAssetSorter: SorterMap<ValuationsByAsset> = {
  current_irr: "number",
  current_moc: "number",
  projected_irr: "number",
  projected_moc: "number",
  property: "string",
  yardi_property_code: "string",
  total_gav: "number",
  total_nav: "number",
};

export const valuationsByAssetTableColumnsHelper =
  createColumnHelper<ValuationsByAsset>();

export const valuationsByAssetTableColumns = Object.keys(
  ValuationsByAssetSchema.shape
)
  .filter((key) => {
    const keysToIgnore: Array<keyof ValuationsByAsset> = [
      "yardi_property_code",
    ];
    return !keysToIgnore.includes(key as keyof ValuationsByAsset);
  })
  .map((key: keyof ValuationsByAsset) =>
    valuationsByAssetTableColumnsHelper.accessor(key, {
      header: convertToTitleCase(humanizeSnakeCase(key)),
      cell: (info) => (
        <GenericTableCellWithFormatter<ValuationsByAsset>
          formatter={valuationsByAssetFormatter}
          identifier={key}
          info={info}
          redirectToURL={
            key === "property"
              ? getPropertyURL({
                  section: "details",
                  propertyId: info.row.original.yardi_property_code,
                })
              : null
          }
        />
      ),
    })
  );

export const valuationsByAssetTotalsTableColumnsHelper =
  createColumnHelper<ValuationsByAssetTotals>();

export const valuationsByAssetTotalsTableColumns = Object.keys(
  ValuationsByAssetTotalsSchema.shape
).map((key: keyof ValuationsByAssetTotals) =>
  valuationsByAssetTotalsTableColumnsHelper.accessor(key, {
    header: convertToTitleCase(humanizeSnakeCase(key)),
    cell: (info) => (
      <GenericTableCellWithFormatter<ValuationsByAssetTotals>
        formatter={valuationsByAssetFormatter}
        identifier={key}
        info={info}
        cellProps={{
          size: "big",
        }}
      />
    ),
  })
);

export const assetRentRollSorter: SorterMap<AssetRentRoll> = {
  gross_net: "number",
  lxd: "date",
  remaining_term: "number",
  annual_rent_psf: "number",
  market_percentage: "number",
  market_rent: "number",
  sf: "number",
  tenant: "string",
  tenant_code: "string",
  unit_codes: "string",
};

export const assetSorter: SorterMap<Property> = {
  account_payable_balance: "number",
  accounts_receivable_balance_with_pre_payments_active_tenant: "number",
  accounts_receivable_balance_with_pre_payments_all_tenant: "number",
  accounts_receivable_balance_without_pre_payments_active_tenant: "number",
  accounts_receivable_balance_without_pre_payments_all_tenant: "number",
  current_cash_on_cash_over_last_12_months: "number",
  acquisition_date: "date",
  address: "string",
  capital_invested: "number",
  cash_available_per_bank: "number",
  city: "string",
  dscr_over_last_12_months_noidm: "number",
  current_gav: "number",
  current_gross_moc: "number",
  current_accrued_interest_loan_balance: "number",
  current_amortization_loan_balance: "number",
  debt_yield_over_last_12_months_noidm: "number",
  current_gross_irr: "number",
  current_nav: "number",
  current_ltv: "number",
  current_outstanding_loan_balance: "number",
  current_profit: "number",
  current_total_basis: "number",
  yield_on_cost_over_last_12_months_noidm: "number",
  current_walt: "number",
  execution_strategy: "string",
  fund_name: "string",
  latitude: "number",
  longitude: "number",
  market_name: "string",
  name: "string",
  interest_rate: "number",
  is_asset_exited: "boolean",
  loan_amount_max_commitment: "number",
  noi_over_last_12_months_noidm: "number",
  debt_yield_leased_noidm: "number",
  dscr_leased_noidm: "number",
  noi_leased_noidm: "number",
  yield_on_cost_leased_noidm: "number",
  occupancy_rate: "number",
  price_at_acquisition: "number",
  price_at_exit: "number",
  projected_buyers_3rd_year_yoc: "number",
  projected_exit_gross_moc: "number",
  projected_exit_cap_rate: "number",
  projected_exit_gross_irr: "number",
  projected_exit_imputed_cap_rate: "number",
  projected_exit_invested_capital: "number",
  projected_exit_noi: "number",
  projected_exit_profit: "number",
  projected_exit_occupancy_rate: "number",
  projected_exit_total_basis: "number",
  projected_net_proceeds_after_sale: "number",
  projected_sale_price: "number",
  property_id: "number",
  region: "string",
  rentable_building_area: "number",
  state: "string",
  submarket_name: "string",
  type: "string",
  vacancy_rate: "number",
  yardi_property_code: "string",
  year_built: "string",
  year_renovated: "string",
  zip_code: "string",
};
