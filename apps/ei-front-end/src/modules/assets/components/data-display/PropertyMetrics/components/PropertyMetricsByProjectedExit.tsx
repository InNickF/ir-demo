import { generatePriceWithPSFString } from "@/assets/utils/properties";
import { SimpleLabelValueGrid } from "@/commons/components/data-display/SimpleLabelValueGrid";
import { Property } from "@/modules/assets/typings/properties";
import { propertyFormatter } from "@/modules/assets/entities/asset/formatters";
import { Empty } from "in-ui-react";
import { FC } from "react";

export const PropertyMetricsByProjectedExit: FC<{
  data: Property;
}> = ({ data }) => {
  const kpis = [
    {
      label: "Adjusted NOI at Exit*",
      value: generatePriceWithPSFString({
        amount: data?.projected_exit_noi,
        sf: data?.rentable_building_area,
      }),
    },
    {
      label: "Exit Occupancy",
      value: propertyFormatter.value.format({
        key: "projected_exit_occupancy_rate",
        value: data?.projected_exit_occupancy_rate,
      }).value,
    },
    {
      label: "Gross IRR",
      value: propertyFormatter.value.format({
        key: "projected_exit_gross_irr",
        value: data?.projected_exit_gross_irr,
      }).value,
    },
    {
      label: "Gross MoC",
      value: propertyFormatter.value.format({
        key: "projected_exit_gross_moc",
        value: data?.projected_exit_gross_moc,
      }).value,
    },
    {
      label: "Profit",
      value: generatePriceWithPSFString({
        amount: data?.projected_exit_profit,
        sf: data?.rentable_building_area,
      }),
    },
    {
      label: "Invested Capital at Exit",
      value: generatePriceWithPSFString({
        amount: data?.projected_exit_invested_capital,
        sf: data?.rentable_building_area,
      }),
    },
    {
      label: "Total Basis at Exit",
      value: generatePriceWithPSFString({
        amount: data?.projected_exit_total_basis,
        sf: data?.rentable_building_area,
      }),
    },
    {
      label: "Sale Price",
      value: generatePriceWithPSFString({
        amount: data?.projected_sale_price,
        sf: data?.rentable_building_area,
      }),
    },
    {
      label: "Net Proceeds After Sale",
      value: generatePriceWithPSFString({
        amount: data?.projected_net_proceeds_after_sale,
        sf: data?.rentable_building_area,
      }),
    },
    {
      label: "Exit Cap Rate",
      value: propertyFormatter.value.format({
        key: "projected_exit_cap_rate",
        value: data?.projected_exit_cap_rate,
      }).value,
    },
    {
      label: "Exit Imputed Cap Rate",
      value: propertyFormatter.value.format({
        key: "projected_exit_imputed_cap_rate",
        value: data?.projected_exit_imputed_cap_rate,
      }).value,
    },
    {
      label: "Buyer's Year 3 YOC",
      value: propertyFormatter.value.format({
        key: "projected_buyers_3rd_year_yoc",
        value: data?.projected_buyers_3rd_year_yoc,
      }).value,
    },
  ];

  return (
    <>
      {data ? (
        <SimpleLabelValueGrid items={kpis} noGrow />
      ) : (
        <Empty className="mx-auto" />
      )}

      <p className="py-2 text-xs text-center text-silver">
        *NOI gross of vacancy and free rent. This would be the NOI typically
        underwritten by buyers to apply a cap rate
      </p>
    </>
  );
};
