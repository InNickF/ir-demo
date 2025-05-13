import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { FundsMetricsVisibilityAndOrderingModal } from "@/modules/assets/components/data-display/FundsMetricsVisibilityAndOrderingModal";
import { FundsTableCard } from "@/modules/assets/components/data-display/tables/FundsTableCard";
import { GetFundsFilters } from "@/modules/assets/services/api/funds";
import { TableCellsIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

interface PortfolioFundsTableProps {
  className?: string;
  filters?: GetFundsFilters;
}

export const PortfolioFundsTable: FC<PortfolioFundsTableProps> = ({
  className,
  filters,
}) => {
  return (
    <CardWithHeader
      title="Funds"
      icon={<TableCellsIcon />}
      className={className}
      bodyPadding={false}
      headerActions={<FundsMetricsVisibilityAndOrderingModal />}
      disableOverflow
      loaderKind="chart"
    >
      <FundsTableCard filters={filters} />
    </CardWithHeader>
  );
};
