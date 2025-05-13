import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { useLocalPagination } from "@/commons/hooks/useLocalPagination";
import { sortItems } from "@/commons/model-in/formatters/sorters";
import { GetAssetRentRollFilters } from "@/modules/assets/services/api/properties";
import { useGetAssetRentRoll } from "@/modules/assets/services/queries/properties";
import { QueueListIcon } from "@heroicons/react/24/outline";
import { FC, useMemo, useState } from "react";
import { TenantsTable } from "./components/TenantTable";
import "./styles.css";
import { assetRentRollSorter } from "@/modules/assets/utils/properties";

interface RentRollProps {
  filters: GetAssetRentRollFilters;
  className?: string;
}

export const RentRoll: FC<RentRollProps> = ({ filters, className }) => {
  const [ordering, setOrdering] = useState(null);

  const { data, isLoading, isRefetching } = useGetAssetRentRoll({
    filters,
  });

  const sortedAssetsRentRolls = useMemo(() => {
    return sortItems({
      items: data,
      sortBy: ordering || "name",
      sorter: assetRentRollSorter,
    });
  }, [data, ordering]);

  const { count, currentPage, paginatedItems, setPage, totalPages } =
    useLocalPagination({ items: sortedAssetsRentRolls, itemsPerPage: 20 });

  const prefix = "asset-portfolio-page__rent-roll";
  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  return (
    <CardWithHeader
      title="Rent Roll"
      className={getClasses()}
      icon={<QueueListIcon />}
      isLoading={isLoading}
      isRefetching={isRefetching}
      skeletonHeight={500}
      bodyPadding={false}
      loaderKind="chart"
    >
      <TenantsTable
        isLoading={false}
        count={count}
        totalPages={totalPages}
        data={paginatedItems}
        page={currentPage}
        setPage={setPage}
        ordering={ordering}
        setOrdering={setOrdering}
      />
    </CardWithHeader>
  );
};
