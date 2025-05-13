import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { defaultPaginatedData } from "@/commons/utils";
import { useGetPropertyTimeline } from "@/modules/assets/services/queries/properties";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";
import { AssetPropertyTimelineTable } from "./components/AssetPropertyTimelineTable";
import { usePagination } from "@/commons/hooks/usePagination";
import "./styles.css";
interface AssetPropertyTimelineProps {
  propertyId: string;
  className?: string;
}

export const AssetPropertyTimeline: FC<AssetPropertyTimelineProps> = ({
  propertyId,
  className,
}) => {
  const { page, setPage } = usePagination();
  const [ordering, setOrdering] = useState("notable_date");

  const prefix = "asset-property-strategy";

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  const {
    data = defaultPaginatedData,
    isLoading,
    isRefetching,
  } = useGetPropertyTimeline({
    property_under_management_code: propertyId,
    ordering: ordering,
    page: String(page),
  });

  return (
    <CardWithHeader
      icon={<CalendarIcon />}
      skeletonHeight={400}
      title="Property Critical Dates"
      isLoading={isLoading}
      isRefetching={isRefetching}
      className={getClasses()}
      bodyPadding={false}
      loaderKind="chart"
    >
      <AssetPropertyTimelineTable
        data={data.results}
        totalPages={data.total_pages}
        page={page}
        count={data.count}
        isLoading={isLoading}
        setPage={setPage}
        ordering={ordering}
        setOrdering={setOrdering}
      />
    </CardWithHeader>
  );
};
