import {
  useDealsPipeline,
  useDealsPipelineTotals,
} from "@/acquisitions/services/queries/deals";
import { DealPhase, DealPipelineSummary } from "@/acquisitions/typings/deals";
import { TableLoaderAndNoData } from "@/commons/components/general/TableLoaderAndNoData";
import {
  GenericFilterPayload,
  IsLoadingProp,
  IsRefetchingProp,
} from "@/commons/typings";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import {
  numberAbbreviation,
  numberToDollar,
} from "@/commons/model-in/formatters/utils/amount-conversions";
import { useDroppable } from "@dnd-kit/core";
import { FetchNextPageOptions } from "@tanstack/react-query";
import { Button, Heading, LoadingLine, Skeleton, Tooltip } from "in-ui-react";
import { FC, memo, useMemo } from "react";
import { PipelineDealCard } from "../PipelineDealCard";
import "./styles.css";

interface PipelineColumnProps {
  name: string;
  id: DealPhase;
  filters?: GenericFilterPayload;
}
export type ColumnFilters = GenericFilterPayload & {
  phase: DealPhase;
};

export const PipelineColumn: FC<PipelineColumnProps> = ({
  name,
  id,
  filters,
}) => {
  const currentQuery: ColumnFilters = {
    ...filters,
    phase: id,
    ordering: "sorting",
  };

  const {
    data,
    isLoading,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useDealsPipeline(currentQuery);

  const deals = useMemo(
    () =>
      data
        ? data.pages.reduce((prev, page) => prev.concat(page.results), [])
        : [],
    [data]
  );

  return (
    <>
      <section className="acq-pipeline-column">
        <PipelineColumnHeader
          id={id}
          name={name}
          isRefetching={isRefetching}
          filters={filters}
        />
        <PipelineColumnBody
          id={id}
          deals={deals}
          isLoading={isLoading}
          filters={currentQuery}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </section>
    </>
  );
};

interface PipelineColumnBodyProps extends IsLoadingProp {
  id: PipelineColumnProps["id"];
  deals: DealPipelineSummary[];
  filters: ColumnFilters;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: (options?: FetchNextPageOptions) => void;
}

const PipelineColumnBody = memo(
  ({
    id,
    deals,
    isLoading,
    filters,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  }: PipelineColumnBodyProps) => {
    const { setNodeRef, isOver } = useDroppable({
      id,
    });

    const getClasses = () => {
      const classes = ["acq-pipeline-column__body"];
      isOver && classes.push("acq-pipeline-column__body--over-active");
      return classes.join(" ");
    };

    return (
      <div ref={setNodeRef} className={getClasses()} data-stage={id}>
        <TableLoaderAndNoData isLoading={isLoading} data={deals} />
        {deals.map((deal) => (
          <PipelineDealCard key={deal.id} deal={deal} filters={filters} />
        ))}
        {hasNextPage ? (
          <Button
            block
            kind="outline"
            loading={isFetchingNextPage}
            onClick={() => {
              fetchNextPage();
            }}
          >
            Load more deals
          </Button>
        ) : null}
      </div>
    );
  }
);

PipelineColumnBody.displayName = "PipelineColumnBody";

type PipelineColumnHeaderProps = PipelineColumnProps & IsRefetchingProp;
const PipelineColumnHeader: FC<PipelineColumnHeaderProps> = ({
  name,
  isRefetching: isDealsRefetching,
  id,
  filters,
}) => {
  const {
    data = [],
    isLoading,
    isRefetching,
  } = useDealsPipelineTotals(filters);

  const phase = data.length
    ? data.find((phase) => phase?.phase?.value === id)
    : {
        phase: name,
        deals: 0,
        equity: 0,
        total_cost: 0,
      };

  if (data.length && !phase) return null;

  const someRefetching = isDealsRefetching || isRefetching;

  const PhaseValueSkeleton = () => {
    return (
      <>
        {isLoading ? (
          <Skeleton className="relative inline-block w-10 h-3">
            <Skeleton.Avatar
              shape="squared"
              className="inline-block h-3 w-10 mb-0 relative top-0.5"
            />
          </Skeleton>
        ) : null}
      </>
    );
  };

  return (
    <header className="acq-pipeline-column__header">
      <LoadingLine isActive={someRefetching} persist />
      <div className="acq-pipeline-column__header-wrapper">
        <div className="acq-pipeline-column__header__title">
          <Heading
            kind="h6"
            className="acq-pipeline-column__header__title__heading"
          >
            <strong>{name}</strong>
          </Heading>
          <p>
            Deals: <PhaseValueSkeleton />
            {!isLoading ? genericGetValue(phase.deals) : null}
          </p>
        </div>
        <div className="acq-pipeline-column__header__details">
          <Tooltip
            content={`Equity: ${numberToDollar({ value: phase.equity })}`}
          >
            <small>
              Equity: <PhaseValueSkeleton />
              {!isLoading
                ? numberAbbreviation({ value: phase.equity, isCurrency: true })
                : null}
            </small>
          </Tooltip>
          <Tooltip
            content={`Total Cost: ${numberToDollar({
              value: phase.total_cost,
            })}`}
          >
            <small>
              T. Cost: <PhaseValueSkeleton />
              {!isLoading
                ? numberAbbreviation({
                    value: phase.total_cost,
                    isCurrency: true,
                  })
                : null}
            </small>
          </Tooltip>
        </div>
      </div>
    </header>
  );
};
