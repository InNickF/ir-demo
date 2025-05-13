import { TableCard } from "@/commons/components/general/TableCard";
import {
  useLocalPagination,
  useLocalSearch,
} from "@/commons/hooks/useLocalPagination";
import {
  legacyCreateSorterMap,
  sortItems,
} from "@/commons/model-in/formatters/sorters";
import { usePropertyJournalEntries } from "@/modules/tools/services/queries/property-level-validations";
import { LoadingLine, Table } from "in-ui-react";
import router from "next/router";
import { FC, useMemo, useState } from "react";
import { PropertyJournalEntriesTable } from "./components/PropertyJournalEntriesTable";
import { PropertyJournalEntry } from "@/modules/tools/typings/property-level-validations";
import { DebouncedSearchInput } from "@/commons/components/data-entry/DebouncedSearchInput";
import { FinancialOverviewExportButton } from "../FinancialOverviewExportButton";

export const PropertyJournalEntries: FC = () => {
  const [search, setSearch] = useState<string>("");

  const [ordering, setOrdering] = useState<keyof PropertyJournalEntry>(
    "transaction_control_code"
  );

  const { property } = router.query;

  const {
    data: journalEntries,
    isLoading,
    isRefetching,
  } = usePropertyJournalEntries({
    filters: {
      property_code: property as string,
      month: "3",
      year: "2024",
    },
  });

  const searchedJournalEntries = useLocalSearch({
    items: journalEntries?.results || [],
    search: search || "",
  });

  const sortedJournalEntries = useMemo(() => {
    return sortItems({
      items: searchedJournalEntries,
      sortBy: ordering,
      sorter: legacyCreateSorterMap({
        data: journalEntries?.results,
        excludeKeys: ["is_asset_currently_under_management"],
      }),
    });
  }, [journalEntries?.results, ordering, searchedJournalEntries]);

  const { count, currentPage, paginatedItems, setPage, totalPages } =
    useLocalPagination({ items: sortedJournalEntries, itemsPerPage: 20 });

  return (
    <>
      <div className="flex justify-end gap-2 mt-3 mb-2">
        <DebouncedSearchInput onSearch={setSearch} />
        <FinancialOverviewExportButton
          data={journalEntries?.results}
          fileName="journal_entries"
        />
      </div>
      <TableCard.Body>
        <LoadingLine persist isActive={isLoading || isRefetching} />
        <PropertyJournalEntriesTable
          data={paginatedItems}
          isLoading={isLoading}
          ordering={ordering}
          onChangeOrdering={setOrdering}
        />
      </TableCard.Body>
      {count && journalEntries?.results?.length ? (
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
