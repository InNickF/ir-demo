import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties, forwardRef, useMemo } from "react";
import { setComponentRefs } from "../../../../utils/refs";
import { TableDraggableRowProps } from "../../props";
import { TableRow } from "../Row";
import "./styles.css";

/**
 * In UI Table Draggable Row Component
 * @see {@link https://todo.com/} for official documentation.
 * @returns
 * A inUI Table Draggable Row react component
 */
export const TableDraggableRow = forwardRef<
  HTMLTableRowElement,
  TableDraggableRowProps
>(
  (
    {
      // Sortable Props
      id,
      data,
      disabled,
      attributes,
      resizeObserverConfig,
      animateLayoutChanges,
      getNewIndex,
      strategy,
      transition = {
        duration: 150,
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
      // Custom Sortable Props
      disableRowListeners = false,
      // Row Props
      className,
      style,
      children,
      htmlId,
      ...rest
    },
    forwardRef
  ) => {
    const prefix = "in-ui-table__draggable-row";

    const sortableState = useSortable({
      id,
      data,
      disabled,
      attributes,
      resizeObserverConfig,
      animateLayoutChanges,
      getNewIndex,
      strategy,
      transition,
    });

    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      className && classes.push(className);
      !disabled && classes.push(`${prefix}--enabled`);
      sortableState.isDragging && classes.push(`${prefix}--dragging`);
      return classes.join(" ");
    };

    const finalStyles: CSSProperties = {
      transform: CSS.Translate.toString(sortableState.transform),
      transition: sortableState.transition,
      ...style,
    };

    const rowListeners = useMemo(
      () => (disableRowListeners ? {} : sortableState.listeners),
      [disableRowListeners, sortableState.listeners]
    );

    return (
      <TableRow
        {...rest}
        {...rowListeners}
        {...sortableState.attributes}
        id={htmlId}
        style={finalStyles}
        ref={setComponentRefs<HTMLTableRowElement>(
          sortableState.setNodeRef,
          forwardRef
        )}
        className={getClasses()}
      >
        {children(sortableState)}
      </TableRow>
    );
  }
);

TableDraggableRow.displayName = "TableDraggableRow";
