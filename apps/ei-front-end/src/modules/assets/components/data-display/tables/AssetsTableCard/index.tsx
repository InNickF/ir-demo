import { TableCard } from "@/commons/components/general/TableCard";
import {
  useLocalPagination,
  useLocalSearch,
} from "@/commons/hooks/useLocalPagination";
import { sortItems } from "@/commons/model-in/formatters/sorters";
import { GetAllPropertiesFilters } from "@/modules/assets/services/api/properties";
import { useAllProperties } from "@/modules/assets/services/queries/properties";
import { Property } from "@/modules/assets/typings/properties";
import { assetSorter } from "@/modules/assets/utils/properties";
import { LoadingLine, Table } from "in-ui-react";
import { FC, useMemo, useState } from "react";
import { AssetsTable } from "./components/AssetsTable";

interface AssetsTableCardProps {
  filters?: GetAllPropertiesFilters;
  defaultPageSize?: string;
}
export const AssetsTableCard: FC<AssetsTableCardProps> = ({
  filters,
  defaultPageSize = "-1",
}) => {
  const [ordering, setOrdering] = useState("name");

  const { data, isLoading, isRefetching } = useAllProperties({
    ...filters,
    page_size: "-1",
    search: "",
  });

  const searchedAssets = useLocalSearch({
    items: data?.results || [],
    search: filters?.search?.toString() || "",
  });

  const sortedAssets = useMemo(() => {
    return sortItems({
      items: searchedAssets,
      sortBy: (ordering as keyof Property) || "name",
      sorter: assetSorter,
    });
  }, [searchedAssets, ordering]);

  const { currentPage, paginatedItems, setPage, totalPages } =
    useLocalPagination({
      items: sortedAssets,
      itemsPerPage: defaultPageSize,
    });

  return (
    <>
      <TableCard.Body>
        <LoadingLine persist isActive={isLoading || isRefetching} />
        <AssetsTable
          data={paginatedItems}
          isLoading={isLoading}
          ordering={ordering}
          // onChangeOrdering={setOrdering}
        />
      </TableCard.Body>
      {data?.count && data?.results?.length ? (
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
