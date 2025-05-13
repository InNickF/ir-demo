import { Property } from "@/assets/typings/properties";
import { generatePriceWithPSFString } from "@/assets/utils/properties";
import { SimpleLabelValueGrid } from "@/commons/components/data-display/SimpleLabelValueGrid";
import { GenericLabelValueObject } from "@/commons/typings";
import { propertyFormatter } from "@/modules/assets/entities/asset/formatters";
import { Empty } from "in-ui-react";
import { FC, useMemo } from "react";

export const PropertyMetricsByLatestMarks: FC<{
  property: Property;
}> = ({ property }) => {
  const kpis: GenericLabelValueObject[] = useMemo(
    () => [
      {
        label: "NOI T12",
        value: generatePriceWithPSFString({
          amount: property?.noi_over_last_12_months_noidm,
          sf: property?.rentable_building_area,
        }),
      },
      {
        label: "Occupancy",
        value: propertyFormatter.value.format({
          key: "occupancy_rate",
          value: property?.occupancy_rate,
        }).value,
      },
      {
        label: "WALT",
        value: propertyFormatter.value.format({
          key: "current_walt",
          value: property?.current_walt,
        }).value,
      },
      {
        label: "Gross IRR",
        value: propertyFormatter.value.format({
          key: "current_gross_irr",
          value: property?.current_gross_irr,
        }).value,
      },
      {
        label: "Gross MoC",
        value: propertyFormatter.value.format({
          key: "current_gross_moc",
          value: property?.current_gross_moc,
        }).value,
      },
      {
        label: "Profit",
        value: generatePriceWithPSFString({
          amount: property?.current_profit,
          sf: property?.rentable_building_area,
        }),
      },
      {
        label: "Invested Capital",
        value: generatePriceWithPSFString({
          amount: property?.capital_invested,
          sf: property?.rentable_building_area,
        }),
      },
      {
        label: "NAV",
        value: generatePriceWithPSFString({
          amount: property?.current_nav,
          sf: property?.rentable_building_area,
        }),
      },
      {
        label: "Total Basis",
        value: generatePriceWithPSFString({
          amount: property?.current_total_basis,
          sf: property?.rentable_building_area,
        }),
      },
      {
        label: "GAV",
        value: generatePriceWithPSFString({
          amount: property?.current_gav,
          sf: property?.rentable_building_area,
        }),
      },
      {
        label: "Cash on Cash T12",
        value: propertyFormatter.value.format({
          key: "current_cash_on_cash_over_last_12_months",
          value: property?.current_cash_on_cash_over_last_12_months,
        }).value,
      },
      {
        label: "Yield on Cost T12",
        value: propertyFormatter.value.format({
          key: "yield_on_cost_over_last_12_months_noidm",
          value: property?.yield_on_cost_over_last_12_months_noidm,
        }).value,
      },
    ],
    [property]
  );

  return (
    <>
      {property ? (
        <SimpleLabelValueGrid items={kpis} noGrow />
      ) : (
        <Empty className="mx-auto" />
      )}
    </>
  );
};
