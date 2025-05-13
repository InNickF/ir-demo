import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { GenericFilterPayload } from "@/commons/typings";
import { useLegacyGetAllPropertiesByGavFilter } from "@/modules/assets/services/queries/properties";
import { MapIcon } from "@heroicons/react/24/outline";
import { FC } from "react";
import { PropertyGeographyMap } from "./components/Map";
import "./styles.css";

interface PropertyGeographyProps {
  filters?: GenericFilterPayload;
  className?: string;
}

export const PropertyGeography: FC<PropertyGeographyProps> = ({
  filters,
  ...props
}) => {
  const { data, isLoading, isRefetching } =
    useLegacyGetAllPropertiesByGavFilter(filters);

  return (
    <CardWithHeader
      {...props}
      padding={false}
      icon={<MapIcon />}
      title="Properties Geography"
      isRefetching={isRefetching}
      isLoading={isLoading}
      skeletonHeight={300}
    >
      <PropertyGeographyMap
        data={data}
        isLoading={isLoading}
        filters={filters}
      />
    </CardWithHeader>
  );
};
