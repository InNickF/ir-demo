import { TableCard } from "@/commons/components/general/TableCard";
import {
  useLocalPagination,
  useLocalSearch,
} from "@/commons/hooks/useLocalPagination";
import { usePropertyBalanceSheets } from "@/modules/tools/services/queries/property-level-validations";
import { LoadingLine, Table } from "in-ui-react";
import router from "next/router";
import { FC, useMemo, useState } from "react";

import { DebouncedSearchInput } from "@/commons/components/data-entry/DebouncedSearchInput";
import { PropertyBalanceSheet } from "@/modules/tools/typings/property-level-validations";
import { FinancialOverviewExportButton } from "../FinancialOverviewExportButton";
import { PropertyBalanceSheetsTable } from "./components/PropertyBalanceSheetsTable";
import {
  legacyCreateSorterMap,
  sortItems,
} from "@/commons/model-in/formatters/sorters";

export const PropertyBalanceSheets: FC = () => {
  const [search, setSearch] = useState<string>("");

  const [ordering, setOrdering] =
    useState<keyof PropertyBalanceSheet>("account_code");

  const { property } = router.query;

  const {
    data: balanceSheets,
    isLoading,
    isRefetching,
  } = usePropertyBalanceSheets({
    filters: {
      property_code: property as string,
      month: "3",
      year: "2024",
    },
  });

  const searchedBalanceSheets = useLocalSearch({
    items: balanceSheets?.results || [],
    search: search || "",
  });

  const sortedBalanceSheets = useMemo(() => {
    return sortItems({
      items: searchedBalanceSheets,
      sortBy: ordering,
      sorter: legacyCreateSorterMap({
        data: balanceSheets?.results,
      }),
    });
  }, [balanceSheets?.results, ordering, searchedBalanceSheets]);

  const { count, currentPage, paginatedItems, setPage, totalPages } =
    useLocalPagination({ items: sortedBalanceSheets, itemsPerPage: 20 });

  return (
    <>
      <div className="flex justify-end gap-2 mt-3 mb-2">
        <DebouncedSearchInput onSearch={setSearch} />
        <FinancialOverviewExportButton
          data={balanceSheets?.results}
          fileName="balance_sheet_ep_bs_lender"
        />
      </div>
      <TableCard.Body>
        <LoadingLine persist isActive={isLoading || isRefetching} />
        <PropertyBalanceSheetsTable
          data={paginatedItems}
          isLoading={isLoading}
          ordering={ordering}
          onChangeOrdering={setOrdering}
        />
      </TableCard.Body>
      {count && balanceSheets?.results?.length ? (
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
