import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { defaultPaginatedData } from "@/commons/utils";
import { GetPropertiesGeographyFilters } from "@/modules/assets/services/api/properties";
import { useGetPropertiesGeography } from "@/modules/assets/services/queries/properties";
import { MapIcon } from "@heroicons/react/24/outline";
import { FC } from "react";
import { PropertyGeographyMap } from "./components/Map";
import "./styles.css";

interface PropertyGeographyProps {
  filters?: GetPropertiesGeographyFilters;
  className?: string;
}

export const PropertyGeography: FC<PropertyGeographyProps> = ({
  filters,
  ...props
}) => {
  const {
    data = defaultPaginatedData,
    isLoading,
    isRefetching,
  } = useGetPropertiesGeography({
    filters: {
      ...filters,
      page_size: "-1",
    },
  });

  return (
    <CardWithHeader
      {...props}
      padding={false}
      icon={<MapIcon />}
      title="Properties Geography"
      isRefetching={isRefetching}
      isLoading={isLoading}
      skeletonHeight={350}
      hasDataToShow={data?.results?.length > 0}
    >
      <PropertyGeographyMap data={data?.results} isLoading={isLoading} />
    </CardWithHeader>
  );
};
