import { CompstackLandCompsTableCard } from "@/acquisitions/components/data-display/compstack-comp-tables/land-comps/CompstackLandCompsTableCard";
import { CompstackLeaseCompsTableCard } from "@/acquisitions/components/data-display/compstack-comp-tables/lease-comps/CompstackLeaseCompsTableCard";
import { CompstackSaleCompsTableCard } from "@/acquisitions/components/data-display/compstack-comp-tables/sale-comps/CompstackSaleCompsTableCard";
import { CompstackCompTableActionsType } from "@/acquisitions/components/data-display/compstack-comp-tables/types";
import { FiltersBySubMarket } from "@/acquisitions/typings/market-analytics";
import { GenericFilterPayload } from "@/commons/typings";
import { FC } from "react";
import "./styles.css";

interface CompsFinderTablesPropsBase {
  extraFilters?: GenericFilterPayload;
  tableActions?: CompstackCompTableActionsType;
}

interface CompsFinderTablesPropsByMarket extends CompsFinderTablesPropsBase {
  market: string;
}

interface CompsFinderTablesPropsBySubmarket
  extends CompsFinderTablesPropsBase,
    FiltersBySubMarket {}

type CompsFinderTablesProps =
  | CompsFinderTablesPropsByMarket
  | CompsFinderTablesPropsBySubmarket;

export const CompsFinderTables: FC<CompsFinderTablesProps> = ({
  extraFilters,
  tableActions,
  ...props
}) => {
  return (
    <div className="acq-comps-finder-tables">
      <CompstackLeaseCompsTableCard
        {...props}
        extraFilters={extraFilters}
        tableActions={tableActions}
      />
      <CompstackSaleCompsTableCard
        {...props}
        extraFilters={extraFilters}
        tableActions={tableActions}
      />
      <CompstackLandCompsTableCard
        {...props}
        extraFilters={extraFilters}
        tableActions={tableActions}
      />
    </div>
  );
};
