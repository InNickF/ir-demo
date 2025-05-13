import { DebouncedSearchInput } from "@/commons/components/data-entry/DebouncedSearchInput";
import { TableCard } from "@/commons/components/general/TableCard";
import {
  useLocalPagination,
  useLocalSearch,
} from "@/commons/hooks/useLocalPagination";
import {
  legacyCreateSorterMap,
  sortItems,
} from "@/commons/model-in/formatters/sorters";
import { usePropertyAccountReceivable } from "@/modules/tools/services/queries/property-level-validations";
import { PropertyAccountReceivable } from "@/modules/tools/typings/property-level-validations";
import { LoadingLine, Table } from "in-ui-react";
import router from "next/router";
import { FC, useMemo, useState } from "react";
import { FinancialOverviewExportButton } from "../FinancialOverviewExportButton";
import { PropertyAccountReceivableTable } from "./components/PropertyAccountReceivableTable";

export const PropertyAccountReceivables: FC = () => {
  const [search, setSearch] = useState<string>("");

  const [ordering, setOrdering] =
    useState<keyof PropertyAccountReceivable>("transaction_date");

  const { property } = router.query;

  const {
    data: accountReceivable,
    isLoading,
    isRefetching,
  } = usePropertyAccountReceivable({
    filters: {
      property_code: property as string,
      month: "3",
      year: "2024",
    },
  });

  const searchedAccountReceivable = useLocalSearch({
    items: accountReceivable?.results || [],
    search: search || "",
  });

  const sortedAccountReceivable = useMemo(() => {
    return sortItems({
      items: searchedAccountReceivable,
      sortBy: ordering,
      sorter: legacyCreateSorterMap({
        data: accountReceivable?.results,
      }),
    });
  }, [accountReceivable?.results, ordering, searchedAccountReceivable]);

  const { count, currentPage, paginatedItems, setPage, totalPages } =
    useLocalPagination({ items: sortedAccountReceivable, itemsPerPage: 20 });

  return (
    <>
      <div className="flex justify-end gap-2 mt-3 mb-2">
        <DebouncedSearchInput onSearch={setSearch} />
        <FinancialOverviewExportButton
          data={accountReceivable?.results}
          fileName="account_receivables"
        />
      </div>
      <TableCard.Body>
        <LoadingLine persist isActive={isLoading || isRefetching} />
        <PropertyAccountReceivableTable
          data={paginatedItems}
          isLoading={isLoading}
          ordering={ordering}
          onChangeOrdering={setOrdering}
        />
      </TableCard.Body>
      {count && accountReceivable?.results?.length ? (
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
