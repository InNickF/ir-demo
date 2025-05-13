import { Deal } from "@/modules/acquisitions/typings/deals";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import { Row, flexRender } from "@tanstack/react-table";
import { Button, Table, Tooltip } from "in-ui-react";
import { CSSProperties, FC, Fragment, useRef, useMemo } from "react";
import {
  sortableCellId,
  useDealsTableWithSortable,
} from "../../../../hooks/useDealsTableWithSortable";
import "./styles.css";

interface DealsTableBodyItemsProps {
  data: Deal[];
  extraZIndexGap?: number;
  isSortingDisabled?: boolean;
}
export const DealsTableBodyItems: FC<DealsTableBodyItemsProps> = ({
  data,
  extraZIndexGap,
  isSortingDisabled,
}) => {
  const table = useDealsTableWithSortable({ data });

  return (
    <>
      {table.getRowModel().rows.map((row, index) => {
        return (
          <DealsTableBodyItem
            key={row.id}
            row={row}
            extraZIndexGap={index + extraZIndexGap}
            isSortingDisabled={isSortingDisabled}
          />
        );
      })}
    </>
  );
};

interface DealsTableBodyItemProps {
  row: Row<Deal>;
  extraZIndexGap?: number;
  isSortingDisabled?: boolean;
}
const DealsTableBodyItem: FC<DealsTableBodyItemProps> = ({
  row,
  extraZIndexGap,
  isSortingDisabled = false,
}) => {
  const rowRef = useRef<HTMLTableRowElement>(null);
  const {
    setNodeRef,
    isDragging,
    transition,
    transform,
    listeners,
    attributes,
  } = useSortable({
    id: row.original.id,
    disabled: isSortingDisabled,
    data: {
      deal: row.original,
      ref: rowRef.current,
    },
  });

  const getClasses = (): string => {
    const classes: string[] = ["acq-deal__draggable-row"];
    isDragging && classes.push("acq-deal__draggable-row--dragging");
    return classes.join(" ");
  };

  const finalStyles: CSSProperties = {
    zIndex: isDragging ? 1 : -extraZIndexGap,
    transform: CSS.Translate.toString(transform),
    transition: transition,
  };

  const cellBody = useMemo(() => {
    return row.getVisibleCells().map((cell) => {
      if (cell.id.includes(sortableCellId)) {
        return;
      }
      return (
        <Fragment key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </Fragment>
      );
    });
  }, [row]);

  return (
    <Table.Row
      ref={(e) => {
        setNodeRef(e);
        rowRef.current = e;
      }}
      className={getClasses()}
      style={finalStyles}
    >
      {cellBody}
    </Table.Row>
  );
};
