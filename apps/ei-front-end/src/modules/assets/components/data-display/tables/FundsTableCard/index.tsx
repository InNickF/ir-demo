import { GetFundsFilters } from "@/assets/services/api/funds";
import { TableCard } from "@/commons/components/general/TableCard";
import { useGetFunds } from "@/modules/assets/services/queries/funds";
import { LoadingLine, Table } from "in-ui-react";
import { FC, useMemo, useState } from "react";
import { FundsTable } from "./components/FundsTable";
import { sortItems } from "@/commons/model-in/formatters/sorters";
import { PortfolioFundsSorter } from "@/modules/assets/utils/funds";
import { useLocalPagination } from "@/commons/hooks/useLocalPagination";

interface FundsTableCardProps {
  filters?: GetFundsFilters;
}
export const FundsTableCard: FC<FundsTableCardProps> = ({ filters }) => {
  const [ordering, setOrdering] = useState(null);
  const {
    data: funds = [],
    isLoading,
    isRefetching,
  } = useGetFunds({
    filters: {
      ...filters,
    },
  });

  const sortedFunds = useMemo(() => {
    return sortItems({
      items: funds,
      sortBy: ordering || "funds_name",
      sorter: PortfolioFundsSorter,
    });
  }, [funds, ordering]);

  const { count, currentPage, paginatedItems, setPage, totalPages } =
    useLocalPagination({ items: sortedFunds, itemsPerPage: 20 });

  return (
    <>
      <TableCard.Body>
        <LoadingLine persist isActive={isLoading || isRefetching} />
        <FundsTable
          data={paginatedItems}
          isLoading={isLoading}
          ordering={ordering}
          // onChangeOrdering={setOrdering}
        />
      </TableCard.Body>
      {count || sortedFunds?.length ? (
        <Table.Pagination
          total={totalPages}
          current={currentPage}
          onChangePage={(pageNumber) => {
            setPage(pageNumber);
          }}
        />
      ) : null}
    </>
  );
};
