import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { useIdFromQueryParams } from "@/commons/hooks/useIdFromQueryParams";
import { usePagination } from "@/commons/hooks/usePagination";
import { GenericFilterPayload } from "@/commons/typings";
import { defaultPaginatedData } from "@/commons/utils";
import { useGetFundTimeline } from "@/modules/assets/services/queries/funds";
import { getFundsURL } from "@/modules/assets/utils/redirects/funds-redirects";
import { TableCellsIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";
import { FundCriticalDatesTable } from "./components/FundCriticalDatesTable";
import "./styles.css";

interface FundCriticalDatesProps {
  className?: string;
  filters?: GenericFilterPayload;
}

export const FundCriticalDates: FC<FundCriticalDatesProps> = ({
  className,
}) => {
  const fundId = useIdFromQueryParams({
    model: "Fund",
    redirectOnNotFound: true,
    redirectURL: getFundsURL({
      id: null,
    }).rootURL,
  });

  const { page, setPage } = usePagination();
  const [ordering, setOrdering] = useState("notable_date");

  const prefix = "fund-critical-dates-table";

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  const {
    data = defaultPaginatedData,
    isLoading,
    isRefetching,
  } = useGetFundTimeline({
    filters: {
      fund_name: fundId,
      ordering: ordering,
      page: String(page),
    },
  });

  return (
    <CardWithHeader
      icon={<TableCellsIcon />}
      skeletonHeight={400}
      title="Critical Dates"
      isLoading={isLoading}
      isRefetching={isRefetching}
      className={getClasses()}
      bodyPadding={false}
      loaderKind="chart"
    >
      <FundCriticalDatesTable
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
