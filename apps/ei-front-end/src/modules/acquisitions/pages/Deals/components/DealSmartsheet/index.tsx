import { TableCard } from "@/commons/components/general/TableCard";
import { GenericFilterPayload } from "@/commons/typings";
import { Deal } from "@/modules/acquisitions/typings/deals";
import { Table } from "in-ui-react";
import { FC, useCallback, useState } from "react";
import { sortableDealsContextId } from "../../utils";
import { DealsTableHead } from "../DealsTableHead";
import { DealsTableBodySection } from "./components/DealsTableBodySection";
import { DealSmartsheetDndContext } from "./contexts/DealSmartsheetDndContext";
import { DealSmartsheetDndSortableContext } from "./contexts/DealSmartsheetDndSortableContext";
import { useDealsQueriesByPhase } from "./hooks/useDealsQueriesByPhase";
import {
  sortableCellId,
  useDealsTableWithSortable,
} from "./hooks/useDealsTableWithSortable";
import { useSmartsheetTableHeight } from "./hooks/useSmartsheetTableHeight";
import "./styles.css";

interface DealSmartsheetProps {
  filters?: GenericFilterPayload;
  className?: string;
}
export const DealSmartsheet: FC<DealSmartsheetProps> = ({
  filters,
  className,
}) => {
  const [ordering, setOrdering] = useState<string & keyof Deal>("sorting");
  const getFilters = useCallback(() => {
    return {
      ...filters,
    };
  }, [filters]);

  const { phasesSectionData, flattedIds, isLoading } = useDealsQueriesByPhase({
    filters,
    ordering,
  });

  const table = useDealsTableWithSortable({ data: [] });

  const tableHeight = useSmartsheetTableHeight();

  return (
    <section className={className}>
      <DealSmartsheetDndContext
        getFilters={() => {
          return getFilters();
        }}
      >
        <DealSmartsheetDndSortableContext
          id={sortableDealsContextId}
          items={flattedIds}
        >
          <TableCard className="relative">
            <TableCard.Body
              className="relative"
              style={{ height: tableHeight }}
            >
              <Table className="acq-deals-smartsheet-table relative">
                <DealsTableHead
                  table={table}
                  ordering={ordering}
                  onChangeOrdering={(ordering: string & keyof Deal) => {
                    // setOrdering(ordering || "sorting");
                  }}
                  extraKeysToIgnoreOrdering={[sortableCellId]}
                />
                {phasesSectionData.map((section) => (
                  <DealsTableBodySection
                    key={section.id}
                    id={section.id}
                    isLoading={isLoading}
                    isRefetching={section.isRefetching}
                    label={section.label}
                    data={section.data}
                    isSortingDisabled={ordering !== "sorting"}
                    ordering={ordering}
                  />
                ))}
              </Table>
            </TableCard.Body>
          </TableCard>
        </DealSmartsheetDndSortableContext>
      </DealSmartsheetDndContext>
    </section>
  );
};
