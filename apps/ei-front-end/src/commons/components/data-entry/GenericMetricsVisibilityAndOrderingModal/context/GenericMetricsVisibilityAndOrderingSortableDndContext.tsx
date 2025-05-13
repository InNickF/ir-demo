import { GenericSortableContext } from "@/commons/components/contexts/GenericSortableContext";
import { FC, PropsWithChildren, useContext, useMemo } from "react";
import { GenericMetricsVisibilityAndOrderingSharedStateContext } from "./GenericMetricsVisibilityAndOrderingSharedState";

export const GenericMetricsVisibilityAndOrderingSortableDndContext: FC<
  PropsWithChildren
> = ({ children }) => {
  const { dndId, orderState } = useContext(
    GenericMetricsVisibilityAndOrderingSharedStateContext
  );

  const id = useMemo(
    () => `generic-metrics-visibility-and-ordering-sortable-dnd-${dndId}`,
    [dndId]
  );
  return (
    <GenericSortableContext id={id} items={orderState as string[]}>
      {children}
    </GenericSortableContext>
  );
};
