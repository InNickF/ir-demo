import {
  CardWithHeader,
  CardWithHeaderProps,
} from "@/commons/components/general/CardWithHeader";
import { useProperty } from "@/modules/assets/services/queries/properties";
import { ChartPieIcon } from "@heroicons/react/24/outline";
import { FC } from "react";
import { PropertyMetricsByLatestMarks } from "./components/PropertyMetricsByLatestMarks";

interface PropertyMetricsProps
  extends Omit<CardWithHeaderProps, "title" | "icon"> {
  propertyId: string;
}

export const PropertyMetrics: FC<PropertyMetricsProps> = ({
  propertyId,
  ...props
}) => {
  const { data, isLoading, isRefetching } = useProperty({
    propertyId: propertyId as string,
  });

  return (
    <CardWithHeader
      icon={<ChartPieIcon />}
      skeletonHeight={400}
      title="Property Metrics"
      isLoading={isLoading}
      isRefetching={isRefetching}
      bodyPadding={false}
      {...props}
    >
      <PropertyMetricsByLatestMarks property={data} />
    </CardWithHeader>
  );
};
