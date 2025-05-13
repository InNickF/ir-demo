import { useDealsPipelineTotals } from "@/acquisitions/services/queries/deals";
import { IsLoadingProp, IsRefetchingProp } from "@/commons/typings";
import { Deal, DealPhase } from "@/modules/acquisitions/typings/deals";
import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Empty, Heading, Loader, Table } from "in-ui-react";
import { CSSProperties, FC, PropsWithChildren, useMemo } from "react";
import { dealDroppableBodyIdPrefix } from "../../../../utils";
import { DealTableBodyHeaderDetail } from "./components/DealTableBodyHeaderDetail";
import { DealsTableBodyItems } from "./components/DealsTableBodyItems";
import "./styles.css";
import { BulkAddRemoveAllDealsByPhaseCheckbox } from "./components/BulkAddRemoveAllDealsByPhaseCheckbox";

const extraZIndexGap: Record<DealPhase, number> = {
  SCREENING: 0,
  LOI: 200,
  PSA: 400,
  DD: 600,
  CLOSING: 800,
  CLOSED: 1000,
  DEAD: 1200,
};
interface DealsTableBodySectionProps extends IsLoadingProp, IsRefetchingProp {
  id: DealPhase;
  label: string;
  data?: Deal[];
  isSortingDisabled?: boolean;
  ordering?: string & keyof Deal;
}

export const DealsTableBodySection: FC<DealsTableBodySectionProps> = ({
  id,
  label,
  data = [],
  isRefetching,
  isLoading,
  isSortingDisabled,
}) => {
  const { setNodeRef, active } = useDroppable({
    id: `${dealDroppableBodyIdPrefix}${id}`,
  });

  const dealsTableBodyItemsMemo = useMemo(() => {
    return (
      <DealsTableBodyItems
        data={data}
        extraZIndexGap={extraZIndexGap[id]}
        isSortingDisabled={isSortingDisabled}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, id]);

  const {
    data: totals = [],
    isLoading: isLoadingTotals,
    isRefetching: isRefetchingTotals,
    isFetched: isFetchedTotals,
  } = useDealsPipelineTotals();

  const phase = totals.length
    ? totals.find((phase) => phase?.phase?.value === id)
    : {
        phase: label,
        deals: 0,
        equity: 0,
        total_cost: 0,
      };

  const isFetchingTotals = isLoadingTotals || isRefetchingTotals;

  if (totals.length && isFetchedTotals && !phase) return null;

  return (
    <Table.Body ref={setNodeRef}>
      <HeaderSeparator
        id={id}
        className="py-3"
        isDraggingSomething={!!active}
        isEmpty={!data.length}
        isLoading={isLoading}
        isRefetching={isRefetching}
        style={{
          zIndex: -extraZIndexGap[id],
        }}
      >
        <Heading
          kind="subtitle-2"
          className="flex items-center gap-3 text-silver"
        >
          {label}
          <DealTableBodyHeaderDetail
            label="Deals"
            value={phase?.deals}
            isLoading={isFetchingTotals}
          />
          <DealTableBodyHeaderDetail
            label="Equity"
            value={phase?.equity}
            isLoading={isFetchingTotals}
            withTooltip
            isCurrency
          />
          <DealTableBodyHeaderDetail
            label="Total Cost"
            value={phase?.total_cost}
            isLoading={isFetchingTotals}
            withTooltip
            isCurrency
          />
        </Heading>
      </HeaderSeparator>
      {dealsTableBodyItemsMemo}
    </Table.Body>
  );
};

interface HeaderSeparatorProps
  extends PropsWithChildren,
    IsLoadingProp,
    IsRefetchingProp {
  id: DealPhase;
  className?: string;
  isDraggingSomething?: boolean;
  isEmpty?: boolean;
  style?: CSSProperties;
}
const HeaderSeparator: FC<HeaderSeparatorProps> = ({
  children,
  className,
  id,
  isDraggingSomething,
  isEmpty,
  isRefetching,
  isLoading,
  style,
}) => {
  const { setNodeRef, transition, transform } = useSortable({
    id: id,
    data: {
      id,
      phase: id,
      isHeader: true,
    },
  });
  const isFirstRow = id === "SCREENING";

  const gerClasses = () => {
    const classes = ["header-separator"];
    className && classes.push(className);
    return classes.join(" ");
  };

  const finalStyles: CSSProperties = {
    ...style,
    transform: !isFirstRow ? CSS.Translate.toString(transform) : undefined,
    transition: !isFirstRow ? transition : undefined,
  };
  return (
    <tr ref={setNodeRef} style={finalStyles} className="relative">
      {/* The next empty TD is in use to make a good table layout on sticky elements */}
      <td className="opacity-0"></td>
      <td colSpan={5} className={gerClasses()}>
        <div className="flex items-center gap-2 px-3">
          {children}
          {isLoading || isRefetching ? <Loader className="w-5 h-5" /> : null}
        </div>
        {isEmpty && !isLoading ? (
          <Empty className={isDraggingSomething ? "opacity-30" : null} />
        ) : null}
      </td>
    </tr>
  );
};
