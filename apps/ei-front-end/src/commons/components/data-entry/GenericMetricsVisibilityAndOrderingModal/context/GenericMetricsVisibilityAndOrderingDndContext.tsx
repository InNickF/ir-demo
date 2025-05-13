import { GenericDnDContext } from "@/commons/components/contexts/GenericDnDContext";
import { DndContext, pointerWithin } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import {
  ComponentProps,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { GenericMetricsVisibilityAndOrderingSharedStateContext } from "./GenericMetricsVisibilityAndOrderingSharedState";

export const GenericMetricsVisibilityAndOrderingDndContext: FC<
  PropsWithChildren
> = ({ children }) => {
  const { dndId, onChangeOrder, orderState } = useContext(
    GenericMetricsVisibilityAndOrderingSharedStateContext
  );

  const id = useMemo(
    () => `generic-metrics-visibility-and-ordering-dnd-${dndId}`,
    [dndId]
  );

  const onDragEnd: ComponentProps<typeof DndContext>["onDragEnd"] = useCallback(
    (event) => {
      const { active, over } = event;

      if (active?.id !== over?.id && active?.id && over?.id) {
        onChangeOrder(
          arrayMove(
            orderState,
            orderState?.indexOf(active?.id as string),
            orderState?.indexOf(over?.id as string)
          )
        );
      }
    },
    [onChangeOrder, orderState]
  );

  return (
    <GenericDnDContext
      id={id}
      onDragEnd={onDragEnd}
      collisionDetection={pointerWithin}
    >
      {children}
    </GenericDnDContext>
  );
};
