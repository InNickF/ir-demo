import { GenericDnDContext } from "@/commons/components/contexts/GenericDnDContext";
import { GenericFilterPayload } from "@/commons/typings";
import { DndContext, pointerWithin } from "@dnd-kit/core";
import { ComponentProps, FC, PropsWithChildren, useCallback } from "react";
import { dndDebtLoansContextId } from "../utils";
import { DebtLoan } from "@/modules/debt/typings/loans";
import { useMutationPatchLoanOrdering } from "@/modules/debt/services/mutations/loans";

export const LoansSortableTableDndContext: FC<
  PropsWithChildren<{
    filters: GenericFilterPayload;
  }>
> = ({ children, filters }) => {
  const loanOrderingMutation = useMutationPatchLoanOrdering();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const onDragEnd: ComponentProps<typeof DndContext>["onDragEnd"] = useCallback(
    (event) => {
      const activeItem = event?.active?.data?.current?.loan as DebtLoan;
      const overItem = event?.over?.data?.current?.loan as DebtLoan;

      if (!activeItem || !overItem) return;

      if (activeItem?.id === overItem.id) return;

      const activeIsComingFromAbove = event?.delta?.y > 0;

      const getIsBelowOverItem = () => {
        if (!event?.over?.rect) return false;

        const activeRect =
          event?.active?.data?.current?.ref?.getBoundingClientRect();
        const activeBottom = activeRect?.bottom;

        const overBottom =
          event?.over?.rect?.bottom + event?.over?.rect?.height / 2;

        return activeIsComingFromAbove
          ? activeBottom < overBottom
          : activeBottom > overBottom;
      };

      loanOrderingMutation.mutate({
        activeItem,
        overItem,
        filters,
        isBelowOverItem: getIsBelowOverItem(),
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <GenericDnDContext
      id={dndDebtLoansContextId}
      onDragEnd={onDragEnd}
      collisionDetection={pointerWithin}
    >
      {children}
    </GenericDnDContext>
  );
};
