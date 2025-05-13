import {
  CardWithHeader,
  CardWithHeaderProps,
} from "@/commons/components/general/CardWithHeader";
import { useProperty } from "@/modules/assets/services/queries/properties";
import { BuildingOfficeIcon } from "@heroicons/react/24/outline";
import { FC, useEffect, useState } from "react";
import "./styles.css";
import { TwoColumnsTable } from "@/modules/assets/components/data-display/TwoColumnsTable";

interface PropertyInformationProps
  extends Omit<CardWithHeaderProps, "title" | "icon"> {
  propertyId: string | string[];
  twoColumn?: boolean;
}

export const PropertyInformation: FC<PropertyInformationProps> = ({
  propertyId,
  twoColumn = false,
  ...props
}) => {
  const {
    data: propertyInformation,
    isLoading,
    isRefetching,
  } = useProperty({
    propertyId: propertyId as string,
  });

  const leftColumnRows = [
    {
      label: "Name",
      value: propertyInformation?.name,
    },
    {
      label: "Address",
      value: `${propertyInformation?.address}, ${propertyInformation?.city}, ${propertyInformation?.state}`,
    },
  ];

  const rightColumnRows = [
    {
      label: "Region",
      value: propertyInformation?.region,
    },
    {
      label: "Property Type",
      value: propertyInformation?.type,
    },
    {
      label: "SF",
      value:
        propertyInformation?.rentable_building_area?.toLocaleString("en-EN"),
    },
    {
      label: "Year Built",
      value: propertyInformation?.year_built,
    },
  ];

  const [twoColumns, setTwoColumns] = useState(twoColumn);

  useEffect(() => {
    const handleViewportChange = () => {
      const viewportWidth = window.innerWidth;
      if (viewportWidth <= 480) {
        setTwoColumns(false);
      } else {
        setTwoColumns(true);
      }
    };

    // Evaluate handleViewportChange on initial render
    handleViewportChange();

    // Add event listener to handle viewport changes
    window.addEventListener("resize", handleViewportChange);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleViewportChange);
    };
  }, []);

  return (
    <CardWithHeader
      title="Property Information"
      icon={<BuildingOfficeIcon />}
      skeletonHeight={230}
      isLoading={isLoading}
      isRefetching={isRefetching}
      loaderKind="chart"
      {...props}
    >
      <TwoColumnsTable
        leftColumnRows={leftColumnRows}
        rightColumnRows={rightColumnRows}
        forceOneColumn={twoColumns}
      />
    </CardWithHeader>
  );
};
