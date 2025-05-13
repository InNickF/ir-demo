import {
  DndContext,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { forwardRef, useMemo } from "react";
import { TableDroppableBodyProps } from "../../props";
import { TableBody } from "../Body";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import "./styles.css";

/**
 * In UI Table Droppable Body Component
 * @see {@link https://todo.com/} for official documentation.
 * @returns
 * A inUI Table Droppable Body react component
 */
export const TableDroppableBody = forwardRef<
  HTMLTableSectionElement,
  TableDroppableBodyProps
>(
  (
    {
      // Sortable Props
      items,
      strategy = verticalListSortingStrategy,
      disabled,
      // DnD Context Props
      accessibility,
      autoScroll,
      cancelDrop,
      collisionDetection = closestCenter,
      measuring,
      modifiers = [restrictToVerticalAxis],
      sensors,
      onDragStart,
      onDragMove,
      onDragOver,
      onDragEnd,
      onDragCancel,
      // Custom Droppable Props
      sensorDelay = 250,
      // Table Body Props
      id,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const cssPrefix = "in-ui-table__droppable-body";

    const dndPrefixId = "in-ui-table__droppable-body";
    const dndId = id ? `${dndPrefixId}-${id}` : dndPrefixId;

    const sortablePrefixId = "in-ui-table__sortable-body";
    const sortableId = id ? `${sortablePrefixId}-${id}` : sortablePrefixId;

    const getClasses: () => string = () => {
      const classes: string[] = [`${cssPrefix}`];
      className && classes.push(className);
      return classes.join(" ");
    };

    const mouseSensor = useSensor(MouseSensor, {
      activationConstraint: {
        delay: sensorDelay,
        tolerance: 40,
      },
    });
    const touchSensor = useSensor(TouchSensor, {
      activationConstraint: {
        delay: sensorDelay,
        tolerance: 40,
      },
    });

    const defaultSensors = useSensors(mouseSensor, touchSensor);

    const finalSensors = useMemo(() => {
      return sensors || defaultSensors;
    }, [sensors]);

    return (
      <DndContext
        id={dndId}
        accessibility={accessibility}
        autoScroll={autoScroll}
        cancelDrop={cancelDrop}
        collisionDetection={collisionDetection}
        measuring={measuring}
        modifiers={modifiers}
        sensors={finalSensors}
        onDragStart={onDragStart}
        onDragMove={onDragMove}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        onDragCancel={onDragCancel}
      >
        <SortableContext
          id={sortableId}
          items={items}
          strategy={strategy}
          disabled={disabled}
        >
          <TableBody {...rest} className={getClasses()} ref={ref} id={id}>
            {children}
          </TableBody>
        </SortableContext>
      </DndContext>
    );
  }
);

TableDroppableBody.displayName = "TableDroppableBody";
