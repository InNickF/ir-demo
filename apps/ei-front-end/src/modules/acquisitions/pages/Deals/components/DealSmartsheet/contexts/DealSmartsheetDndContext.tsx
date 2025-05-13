import { GenericDnDContext } from "@/commons/components/contexts/GenericDnDContext";
import { GenericFilterPayload, IPaginatedResponse } from "@/commons/typings";
import { DeadDealFormModal } from "@/modules/acquisitions/components/data-entry/DeadDealFormModal";
import { useDeadDealFormState } from "@/modules/acquisitions/components/data-entry/DeadDealFormModal/hooks/useDeadDealFormState";
import { queries } from "@/modules/acquisitions/services/keys";
import { useMutationPatchDealOrdering } from "@/modules/acquisitions/services/mutations/deals";
import { Deal, DealPhase } from "@/modules/acquisitions/typings/deals";
import { getDealSmartsheetNewSortingPayload } from "@/modules/acquisitions/utils";
import { DndContext, pointerWithin } from "@dnd-kit/core";
import { useQueryClient } from "@tanstack/react-query";
import { ComponentProps, FC, PropsWithChildren, useCallback } from "react";
import { dndDealsContextId } from "../../../utils";
import { ActiveDealData, OverItem } from "../types";
import {
  dealSmartsheetTableCommonFilters,
  getDealSmartsheetOverItemId,
  getDealSmartsheetOverItemPhase,
  getPreviousDealSmartsheetSection,
} from "../utils";

export const DealSmartsheetDndContext: FC<
  PropsWithChildren<{
    getFilters: () => GenericFilterPayload;
  }>
> = ({ children, getFilters }) => {
  const dealOrderingMutation = useMutationPatchDealOrdering();
  const queryClient = useQueryClient();
  const {
    showDeadModal,
    deadModalFormProps,
    showDeadDealFormModal,
    hideDeadDealFormModal,
  } = useDeadDealFormState();

  const cleanDeadFormState = () => {
    hideDeadDealFormModal();
  };

  const onDragEnd: ComponentProps<typeof DndContext>["onDragEnd"] = useCallback(
    (event) => {
      const activeDeal = event?.active?.data?.current as ActiveDealData;
      const overItem = event?.over?.data?.current as OverItem;
      if (!activeDeal || !overItem) return;

      const overItemId = getDealSmartsheetOverItemId(overItem);

      if (activeDeal?.deal?.id === overItemId) return;

      const activeIsComingFromAbove = event?.delta?.y > 0;
      const mustBeMovedToTheBottom =
        !activeIsComingFromAbove && "isHeader" in overItem;

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

      const getOverItem = (): OverItem => {
        const firstRow: DealPhase = "SCREENING";

        if (mustBeMovedToTheBottom) {
          if (overItem?.phase === firstRow) {
            return overItem;
          }

          const preSectionList = queryClient.getQueryData<
            IPaginatedResponse<Deal>
          >(
            queries.deals.all({
              ...getFilters(),
              ...dealSmartsheetTableCommonFilters,
              phase: getPreviousDealSmartsheetSection(overItem?.phase),
            }).queryKey
          );

          const lastListItem = preSectionList?.results?.slice(-1)[0];

          return {
            ref: null,
            deal: lastListItem,
          };
        }

        return overItem;
      };

      const overItemPhase = getDealSmartsheetOverItemPhase(overItem);
      if (overItemPhase === "DEAD") {
        showDeadDealFormModal({
          dealId: activeDeal?.deal?.id,
          dealAddress: activeDeal?.deal?.address,
          defaultValues: {
            sorting:
              getDealSmartsheetNewSortingPayload({
                activeDeal: activeDeal?.deal,
                overItem: getOverItem(),
                isBelowOverItem: mustBeMovedToTheBottom || getIsBelowOverItem(),
              })?.sorting || 0,
          },
        });
        return;
      }

      dealOrderingMutation.mutate({
        activeDeal: activeDeal?.deal,
        overItem: getOverItem(),
        filters: getFilters(),
        isBelowOverItem: mustBeMovedToTheBottom || getIsBelowOverItem(),
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <GenericDnDContext
      id={dndDealsContextId}
      onDragEnd={onDragEnd}
      collisionDetection={pointerWithin}
    >
      <DeadDealFormModal
        show={showDeadModal}
        formProps={deadModalFormProps}
        onSuccess={() => {
          cleanDeadFormState();
        }}
        onCancel={() => {
          cleanDeadFormState();
        }}
      />
      {children}
    </GenericDnDContext>
  );
};
