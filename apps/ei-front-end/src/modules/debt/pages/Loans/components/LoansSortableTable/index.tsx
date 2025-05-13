import { TableCard } from "@/commons/components/general/TableCard";
import { GenericFilterPayload } from "@/commons/typings";
import { defaultPaginatedData } from "@/commons/utils";
import { sortItems } from "@/commons/model-in/formatters/sorters";
import { useDebtLoans } from "@/modules/debt/services/queries/loans";
import { LoadingLine, Table } from "in-ui-react";
import { FC, useMemo, useState } from "react";
import { LoansTableBodySection } from "./components/LoansTableBodySection";
import { LoansTableEmptyRow } from "./components/LoansTableEmptyRow";
import { LoansTableHead } from "./components/LoansTableHead";
import { LoansSortableTableDndContext } from "./contexts/LoansSortableTableDndContext";
import { LoansSortableTableDndSortableContext } from "./contexts/LoansSortableTableDndSortableContext";
import {
  sortableCellId,
  useLoansTableWithSortable,
} from "./hooks/useLoansTableWithSortable";
import { useLoanTableHeight } from "./hooks/useLoanTableHeight";
import "./styles.css";
import {
  debtLoansTableCommonFilters,
  flatLoansIds,
  sortableDebtLoansContextId,
} from "./utils";
import { loanSorter } from "./utils/loansColumnsTable";

interface LoansSortableTableProps {
  filters?: GenericFilterPayload;
  className?: string;
}
export const LoansSortableTable: FC<LoansSortableTableProps> = ({
  filters,
  className,
}) => {
  const getClasses = () => {
    const classes = [];
    className && classes.push(className);
    return classes.join(" ");
  };

  const [ordering, setOrdering] = useState("sorting");

  const allFilters = {
    ...filters,
    ...debtLoansTableCommonFilters,
  };

  const {
    data = defaultPaginatedData,
    isLoading,
    isRefetching,
  } = useDebtLoans(allFilters);

  const sortedLoans = useMemo(() => {
    return sortItems({
      items: data?.results,
      sortBy: ordering || "sorting",
      sorter: loanSorter,
    });
  }, [data, ordering]);

  const flattedIds = useMemo(() => {
    return flatLoansIds(sortedLoans);
  }, [sortedLoans]);

  const table = useLoansTableWithSortable({ data: [] });

  const tableHasFiltersApplied = Object.keys(filters).length > 0;

  const dynamicTableHeight = useLoanTableHeight();

  return (
    <section className={getClasses()}>
      <LoansSortableTableDndContext filters={allFilters}>
        <LoansSortableTableDndSortableContext
          id={sortableDebtLoansContextId}
          items={flattedIds}
        >
          <TableCard
            className="relative h-full"
            style={{ height: dynamicTableHeight }}
          >
            <LoadingLine isActive={isLoading || isRefetching} />
            <TableCard.Body className="relative h-full">
              <Table className="relative debt-loans-table">
                <LoansTableHead
                  table={table}
                  ordering={ordering}
                  onChangeOrdering={(ordering) => {
                    if (ordering !== undefined && ordering !== null) {
                      // setOrdering(ordering || "sorting");
                    }
                  }}
                  extraKeysToIgnoreOrdering={[sortableCellId]}
                />
                {sortedLoans?.length > 0 ? (
                  <LoansTableBodySection
                    data={sortedLoans}
                    isSortingDisabled={
                      ordering !== "sorting" || tableHasFiltersApplied
                    }
                  />
                ) : (
                  <LoansTableEmptyRow />
                )}
              </Table>
            </TableCard.Body>
          </TableCard>
        </LoansSortableTableDndSortableContext>
      </LoansSortableTableDndContext>
    </section>
  );
};
