import { FC, useState } from "react";
import { CardProps } from "in-ui-react";
import { GenericFilterPayload } from "@/commons/typings";
import { defaultPaginatedData } from "@/commons/utils";
import { useCriticalDates } from "@/acquisitions/services/queries/deals";
import { CriticalDatesTable } from "./components/CriticalDatesTable";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { usePagination } from "@/commons/hooks/usePagination";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";

interface CriticalDatesProps extends CardProps {
  filters: GenericFilterPayload;
}
export const CriticalDates: FC<CriticalDatesProps> = ({
  filters,
  ...props
}) => {
  const { page, setPage } = usePagination();
  const [ordering, setOrdering] = useState("");
  const {
    data = defaultPaginatedData,
    isLoading,
    isRefetching,
  } = useCriticalDates({
    page: page.toString(),
    ordering: ordering,
    ...filters,
  });
  return (
    <CardWithHeader
      title="Critical Dates"
      icon={<CalendarDaysIcon />}
      isLoading={isLoading}
      isRefetching={isRefetching}
      bodyPadding={false}
      {...props}
    >
      <CriticalDatesTable
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
