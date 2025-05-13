import { SimpleLabelValueGrid } from "@/commons/components/data-display/SimpleLabelValueGrid";
import {
  CardWithHeader,
  CardWithHeaderProps,
} from "@/commons/components/general/CardWithHeader";
import {
  convertToTitleCase,
  humanizeSnakeCase,
} from "@/commons/model-in/formatters/utils";
import { useProperty } from "@/modules/assets/services/queries/properties";
import { Property } from "@/modules/assets/typings/properties";
import { propertyFormatter } from "@/modules/assets/entities/asset/formatters";
import { generatePriceWithPSFString } from "@/modules/assets/utils/properties";
import { TableCellsIcon } from "@heroicons/react/24/outline";
import { ButtonGroup } from "in-ui-react";
import { FC } from "react";
import { usePropertyMetricsKeys } from "./hooks/usePropertyKeys";
import { usePropertyKpiFilter } from "./hooks/usePropertyKpiFilter";

interface PropertyMetricsProps
  extends Omit<CardWithHeaderProps, "title" | "icon"> {
  propertyId: string;
}

export const PropertyMetrics: FC<PropertyMetricsProps> = ({
  propertyId,
  ...props
}) => {
  const { propertyKpiFilter, propertyKpiItems } = usePropertyKpiFilter();
  const filteredKeys = usePropertyMetricsKeys({ filter: propertyKpiFilter });

  const {
    data: property,
    isLoading,
    isRefetching,
  } = useProperty({
    propertyId: propertyId as string,
  });

  const wordsToExclude = ["current", "projected", "liquidation", "exit"];
  const formattedGridItems = filteredKeys.keys
    ?.map((key) => {
      const label = convertToTitleCase(
        humanizeSnakeCase(key)
          .split(" ")
          .filter((word) => !wordsToExclude.includes(word.toLowerCase()))
          .join(" ")
      ).replace(/Capital Invested/g, "Invested Capital");

      const value = filteredKeys.withPSFKeys.includes(key)
        ? generatePriceWithPSFString({
            amount: property?.[key] as string | number,
            sf: property?.rentable_building_area,
          })
        : propertyFormatter.value.format({
            key: key as keyof Property,
            value: property?.[key],
          }).value;

      return {
        label,
        value,
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label));

  return (
    <CardWithHeader
      icon={<TableCellsIcon />}
      skeletonHeight={400}
      title="Property Metrics"
      headerActions={
        <ButtonGroup active={propertyKpiFilter} items={propertyKpiItems} />
      }
      isLoading={isLoading}
      isRefetching={isRefetching}
      bodyPadding={false}
      {...props}
    >
      <SimpleLabelValueGrid items={formattedGridItems || []} noGrow={true} />
    </CardWithHeader>
  );
};
