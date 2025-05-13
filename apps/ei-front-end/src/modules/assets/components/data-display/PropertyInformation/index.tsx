import { generatePriceWithPSFString } from "@/assets/utils/properties";
import { SimpleLabelValueGrid } from "@/commons/components/data-display/SimpleLabelValueGrid";
import {
  CardWithHeader,
  CardWithHeaderProps,
} from "@/commons/components/general/CardWithHeader";
import { useProperty } from "@/modules/assets/services/queries/properties";
import { propertyFormatter } from "@/modules/assets/entities/asset/formatters";
import { BuildingOfficeIcon } from "@heroicons/react/24/outline";
import { FC } from "react";
import "./styles.css";

interface PropertyInformationProps
  extends Omit<CardWithHeaderProps, "title" | "icon"> {
  propertyId: string | string[];
  twoColumn?: boolean;
}

export const PropertyInformation: FC<PropertyInformationProps> = ({
  propertyId,
  ...props
}) => {
  const {
    data: propertyInformation,
    isLoading,
    isRefetching,
  } = useProperty({
    propertyId: propertyId as string,
  });

  const tableElements = [
    {
      label: "Name",
      value: propertyFormatter.value.format({
        key: "name",
        value: propertyInformation?.name,
      }).value,
    },
    {
      label: "Address",
      value: `${propertyInformation?.address}, ${propertyInformation?.city}, ${propertyInformation?.state}`,
    },
    {
      label: "Region",
      value: propertyFormatter.value.format({
        key: "region",
        value: propertyInformation?.region,
      }).value,
    },
    {
      label: "Property Type",
      value: propertyFormatter.value.format({
        key: "type",
        value: propertyInformation?.type,
      }).value,
    },
    {
      label: "SF",
      value: propertyFormatter.value.format({
        key: "rentable_building_area",
        value: propertyInformation?.rentable_building_area,
      }).value,
    },
    {
      label: "Year Built",
      value: propertyFormatter.value.format({
        key: "year_built",
        value: propertyInformation?.year_built,
      }).value,
    },
    {
      label: "Acquisition Date",
      value: propertyFormatter.value.format({
        key: "acquisition_date",
        value: propertyInformation?.acquisition_date,
      }).value,
    },
    {
      label: "Purchase Price",
      value: generatePriceWithPSFString({
        amount: propertyInformation?.price_at_acquisition,
        sf: propertyInformation?.rentable_building_area,
      }),
    },
    {
      label: "Execution Strategy",
      value: propertyFormatter.value.format({
        key: "execution_strategy",
        value: propertyInformation?.execution_strategy,
      }).value,
    },
  ];

  return (
    <CardWithHeader
      title="Property Information"
      icon={<BuildingOfficeIcon />}
      isLoading={isLoading}
      isRefetching={isRefetching}
      bodyPadding={false}
      loaderKind="chart"
      {...props}
    >
      <SimpleLabelValueGrid items={tableElements} />
    </CardWithHeader>
  );
};
