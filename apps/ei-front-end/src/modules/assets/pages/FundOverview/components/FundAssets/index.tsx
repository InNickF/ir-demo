import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { GenericFilterPayload } from "@/commons/typings";
import { PropertiesMetricsVisibilityAndOrderingModal } from "@/modules/assets/components/data-display/PropertiesMetricsVisibilityAndOrderingModal";
import { AssetsTableCard } from "@/modules/assets/components/data-display/tables/AssetsTableCard";
import { TableCellsIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

interface FundAssetsProps {
  className?: string;
  filters: GenericFilterPayload;
}

export const FundAssets: FC<FundAssetsProps> = ({ className, filters }) => {
  return (
    <CardWithHeader
      title="Assets"
      icon={<TableCellsIcon />}
      className={className}
      skeletonHeight={350}
      bodyPadding={false}
      headerActions={<PropertiesMetricsVisibilityAndOrderingModal />}
      disableOverflow
    >
      <AssetsTableCard filters={filters} defaultPageSize="10" />
    </CardWithHeader>
  );
};
