import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { GetARPropertyTableFilters } from "@/modules/assets/services/api/properties";
import { useARPropertyTable } from "@/modules/assets/services/queries/properties";
import { FC } from "react";
import { ARPropertyTableDetails } from "./components/ARPropertyTableDetails";
import { TableCellsIcon } from "@heroicons/react/24/outline";
import { ButtonGroup, CardProps } from "in-ui-react";
import { AR_TENANT_TYPES } from "@/modules/assets/utils";
import { useButtonGroupFilters } from "@/commons/hooks/useButtonGroupFilters";

interface ARPropertyTableProps extends CardProps {
  filters?: GetARPropertyTableFilters;
}
export const ARPropertyTable: FC<ARPropertyTableProps> = ({
  filters,
  ...props
}) => {
  const { currentActiveFilter, items } = useButtonGroupFilters({
    filters: [...AR_TENANT_TYPES],
  });
  const { data, isLoading, isRefetching } = useARPropertyTable({
    ...filters,
    tenant_type: currentActiveFilter,
  });
  return (
    <CardWithHeader
      icon={<TableCellsIcon />}
      title="Tenant Receivables"
      isLoading={isLoading}
      isRefetching={isRefetching}
      bodyPadding={false}
      loaderKind="chart"
      headerActions={
        <ButtonGroup active={currentActiveFilter} items={items} size="small" />
      }
      {...props}
    >
      <ARPropertyTableDetails data={data} isLoading={isLoading} />
    </CardWithHeader>
  );
};
