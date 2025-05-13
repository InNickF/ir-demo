import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { GetAssetLocationTenantsByPropertyFilters } from "@/modules/assets/services/api/asset-growth";
import { useAssetLocationTenants } from "@/modules/assets/services/queries/asset-growth";
import { MapIcon } from "@heroicons/react/24/outline";
import { FC } from "react";
import { AssetGrowthMap } from "./components/AssetGrowthMap";
import "./styles.css";

interface AssetLocationProps {
  className?: string;
  filters: GetAssetLocationTenantsByPropertyFilters;
  labels: string[];
}

export const AssetLocation: FC<AssetLocationProps> = ({
  className,
  filters,
  labels,
}) => {
  const { data, isLoading, isRefetching } = useAssetLocationTenants(filters);
  return (
    <CardWithHeader
      title="Asset Location"
      icon={<MapIcon />}
      className={className}
      isLoading={isLoading}
      isRefetching={isRefetching}
    >
      <AssetGrowthMap data={data} filters={filters} labels={labels} />
    </CardWithHeader>
  );
};
