import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { usePagination } from "@/commons/hooks/usePagination";
import { defaultPaginatedData } from "@/commons/utils";
import { useOverviewTimeline } from "@/modules/debt/services/queries/overview";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";
import { DebtLoanTimelinesTable } from "./components/DebtLoanTimelinesTable";
import { GetOverviewTimelineFilters } from "@/modules/debt/services/api/overview";

interface OverviewTimelineProps {
  className?: string;
  filters?: GetOverviewTimelineFilters;
}

export const DebtLoansTimeline: FC<OverviewTimelineProps> = ({
  className,
  filters,
}) => {
  const [ordering, setOrdering] = useState("");
  const { page, setPage } = usePagination();

  const {
    data = defaultPaginatedData,
    isLoading,
    isRefetching,
  } = useOverviewTimeline({
    fund: filters?.fund,
    page: page?.toString(),
    ordering,
    page_size: "5",
  });

  return (
    <CardWithHeader
      className={className}
      icon={<CalendarIcon />}
      title="Loans Critical Dates"
      isLoading={isLoading}
      isRefetching={isRefetching}
      bodyPadding={false}
      skeletonHeight={254}
      disableOverflow
      loaderKind="chart"
    >
      <DebtLoanTimelinesTable
        isLoading={isLoading}
        data={data?.results}
        ordering={ordering}
        setOrdering={setOrdering}
        count={data?.count}
        totalPages={data?.total_pages}
        page={page}
        setPage={setPage}
      />
    </CardWithHeader>
  );
};
