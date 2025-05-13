import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import { Row, flexRender } from "@tanstack/react-table";
import { Button, Table, Tooltip } from "in-ui-react";
import { CSSProperties, FC, Fragment, useRef, useMemo } from "react";
import { DebtLoan } from "@/modules/debt/typings/loans";
import {
  sortableCellId,
  useLoansTableWithSortable,
} from "../../../../hooks/useLoansTableWithSortable";
import "./styles.css";

interface LoansTableBodyItemsProps {
  data: DebtLoan[];
  isSortingDisabled?: boolean;
}
export const LoansTableBodyItems: FC<LoansTableBodyItemsProps> = ({
  data,
  isSortingDisabled,
}) => {
  const table = useLoansTableWithSortable({ data: data });

  return (
    <>
      {table.getRowModel().rows.map((row) => {
        return (
          <LoansTableBodyItem
            key={row.id}
            row={row}
            isSortingDisabled={isSortingDisabled}
          />
        );
      })}
    </>
  );
};

interface LoansTableBodyItemProps {
  row: Row<DebtLoan>;
  isSortingDisabled?: boolean;
}
const LoansTableBodyItem: FC<LoansTableBodyItemProps> = ({
  row,
  isSortingDisabled,
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
    data: {
      loan: row.original,
      ref: rowRef.current,
    },
    disabled: true,
  });

  const getClasses = (): string => {
    const classes: string[] = ["debt-loans__draggable-row"];
    isDragging && classes.push("debt-loans__draggable-row--dragging");
    return classes.join(" ");
  };

  const finalStyles: CSSProperties = {
    zIndex: isDragging ? 1 : 0,
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
      <Table.Data className="p-0 text-center">
        <Tooltip content={<p>Drag and drop to change loan order.</p>}>
          <div>
            <Button
              onlyIcon
              icon={<ArrowsUpDownIcon />}
              kind="ghost"
              size="small"
              disabled
              {...listeners}
              {...attributes}
            />
          </div>
        </Tooltip>
      </Table.Data>
      {cellBody}
    </Table.Row>
  );
};
