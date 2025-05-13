import {
  dealSmartsheetTableCommonFilters,
  getDealSmartsheetOverItemId,
  getDealSmartsheetOverItemPhase,
} from "@/acquisitions/pages/Deals/components/DealSmartsheet/utils";
import {
  deleteDealCompstackLandCompUnlink,
  deleteDealCompstackLeaseCompUnlink,
  deleteDealCompstackSaleCompUnlink,
  deleteDealPhoto,
  deleteDealRiskAndMitigant,
  deleteDealRoomItem,
  deleteDealTenantInformation,
  patchBulkDealsInformation,
  patchDealCommonAttributes,
  patchDealFinancialScenario,
  patchDealOrdering,
  patchDealPipelinePhase,
  patchDealRiskAndMitigant,
  patchDealTenantInformation,
  patchExtendedDealInformation,
  patchScreeningDealInformation,
  postAssignCompsToDeal,
  postAssignCompstackLandCompToDeal,
  postAssignCompstackLeaseCompToDeal,
  postAssignCompstackSaleCompToDeal,
  postBulkDealPhotos,
  postBulkDealRoomItems,
  postDealInformation,
  postDealPhoto,
  postDealRiskAndMitigant,
  postDealRoomItem,
  postDealTenantInformation,
  postDealTimeline,
  postDealUnderwritingModel,
  postDealWireInstruction,
  putDealInformation,
  putDealRoomItem,
  putDealTimeline,
  putExtendedDealInformation,
  unlistComp,
} from "@/acquisitions/services/api/deals";
import { queries } from "@/acquisitions/services/keys";
import { Deal, DealPipelineSummary } from "@/acquisitions/typings/deals";
import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { GenericFilterPayload, IPaginatedResponse } from "@/commons/typings";
import { getGenericValueOrString, notificationMessages } from "@/commons/utils";
import { parseError } from "@/commons/model-in/formatters/utils/errors";
import {
  invalidateDealInformation,
  invalidateDealsQueries,
} from "@/modules/acquisitions/utils/query-invalidations";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useAtom } from "jotai";

const {
  subjectErrorCRUD,
  messageUnableToCreate,
  messageUnableToDelete,
  messageUnableToUpdate,
} = notificationMessages;

export const useMutateDealPipelinePhase = () => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: patchDealPipelinePhase,
    onMutate: async ({ deal, newPhase, filters }) => {
      // Cancel the query for the previous phase of the deal
      await queryClient.cancelQueries({
        queryKey: queries.deals.dealsPipeline._def,
      });

      type InfinityDealsPipeline = InfiniteData<
        IPaginatedResponse<DealPipelineSummary>
      >;

      const dealPhase = getGenericValueOrString(deal?.phase);

      // Get the previous phase of the deal from the query client
      const previousDealPhaseList =
        queryClient.getQueryData<InfinityDealsPipeline>(
          queries.deals.dealsPipeline({ ...filters, phase: dealPhase }).queryKey
        );

      // Get the next phase of the deal from the query client
      const nextDealPhaseList = queryClient.getQueryData<InfinityDealsPipeline>(
        queries.deals.dealsPipeline({ ...filters, phase: newPhase }).queryKey
      );

      /**
       * Returns a new array of pages, where the deals in the results have been filtered
       * to exclude the deal that has just been moved to a new stage.
       */
      const newPreviousStagePagesArray =
        previousDealPhaseList?.pages.map((page) => ({
          ...page,
          results: page.results.filter(
            (dealInPage) => dealInPage.id !== deal.id
          ),
        })) ?? ([] as IPaginatedResponse<DealPipelineSummary>[]);

      /**
       * Add the new deal to the beginning of the first page of the next stage.
       * If there are no pages, then initialize the array to be an empty array.
       * */
      const newNextStagePagesArray =
        nextDealPhaseList?.pages.map((page, i) => {
          if (i === 0) {
            return {
              ...page,
              results: [{ phase: newPhase, ...deal }, ...page.results],
            };
          }
          return page;
        }) ?? ([] as IPaginatedResponse<DealPipelineSummary>[]);

      /**
       * This code gets the previous stage pages array and updates the query data of the deals pipeline query for the previous stage.
       * */
      queryClient.setQueryData<InfinityDealsPipeline>(
        queries.deals.dealsPipeline({ ...filters, phase: dealPhase }).queryKey,
        (data) => ({
          pages: newPreviousStagePagesArray,
          pageParams: data?.pageParams,
        })
      );

      /**
       * This code gets the next stage pages array and updates the query data of the deals pipeline query for the next stage.
       * */
      queryClient.setQueryData<InfinityDealsPipeline>(
        queries.deals.dealsPipeline({ ...filters, phase: newPhase }).queryKey,
        (data) =>
          ({
            pages: newNextStagePagesArray,
            pageParams: data?.pageParams,
          } as InfinityDealsPipeline)
      );

      return {
        previousDealPhaseList,
        nextDealPhaseList,
        deal,
        newPhase,
        filters,
        dealPhase,
      };
    },
    onError: (error, variables, context) => {
      type InfinityDealsPipeline = InfiniteData<
        IPaginatedResponse<DealPipelineSummary>
      >;
      queryClient.setQueryData<InfinityDealsPipeline>(
        queries.deals.dealsPipeline({
          ...context.filters,
          phase: context.dealPhase,
        }).queryKey,
        context.previousDealPhaseList
      );

      queryClient.setQueryData<InfinityDealsPipeline>(
        queries.deals.dealsPipeline({
          ...context.filters,
          phase: context.newPhase,
        }).queryKey,
        context.nextDealPhaseList
      );
      createNotification({
        subject: `Error moving deal.`,
        message: parseError(
          error,
          `Unable to move deal "${context.deal.name}" to ${context.newPhase}`
        ),
        kind: "error",
      });
    },
    onSettled(data, error, variables, context) {
      invalidateDealsQueries({ queryClient, dealId: context.deal.id });
    },
  });
};

export const useMutateUnlistComp = () => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: unlistComp,
    onMutate: async ({ dealId }) => {
      return { dealId };
    },
    onError: (error, variables) => {
      createNotification({
        subject: `Error unlisting comp.`,
        message: parseError(
          error,
          `Unable to unlist comp "${variables?.compId}" from deal "${variables?.dealId}"`
        ),
        kind: "error",
      });
    },
    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({
        queryKey: queries.deals.dealComps._def,
      });
      queryClient.invalidateQueries({
        queryKey: queries.deals.dealCompsByType({ dealId: context.dealId })
          .queryKey,
      });
    },
  });
};

export const useMutateNewDeal = () => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: postDealInformation,
    onError: (error, variables) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "POST", resource: "deal" }),
        message: parseError(
          error,
          messageUnableToCreate(`deal "${variables?.name}"`)
        ),
        kind: "error",
      });
    },
    onSuccess() {
      invalidateDealsQueries({ queryClient });
    },
  });
};

export const useMutateDealRoomItem = () => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: postDealRoomItem,
    onMutate: async ({ deal }) => {
      return { deal };
    },
    onError: (error, variables) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "POST" }),
        message: parseError(
          error,
          messageUnableToCreate(`document for deal "${variables?.deal}"`)
        ),
        kind: "error",
      });
    },
    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({
        queryKey: queries.deals.dealRoomItems({ deal: context.deal }).queryKey,
      });
    },
  });
};

export const useMutateDealPhoto = () => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: postDealPhoto,
    onMutate: async ({ deal }) => {
      return { deal };
    },
    onError: (error, variables) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "POST" }),
        message: parseError(
          error,
          messageUnableToCreate(`photo for deal "${variables?.deal}"`)
        ),
        kind: "error",
      });
    },
    onSettled(data, error, variables, context) {
      invalidateDealInformation({ queryClient, dealId: context.deal });
      queryClient.invalidateQueries({
        queryKey: queries.deals.dealPhotos(context.deal).queryKey,
      });
    },
  });
};

export const useMutateBulkDealRoomItems = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: postBulkDealRoomItems,
    onError: (error, variables) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "POST" }),
        message: parseError(
          error,
          messageUnableToCreate(`documents for deal "${variables[0]?.deal}"`)
        ),
        kind: "error",
      });
    },
  });
};

export const useMutateBulkDealPhotos = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: postBulkDealPhotos,
    onError: (error, variables) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "POST" }),
        message: parseError(
          error,
          messageUnableToCreate(`photos for deal "${variables[0]?.deal}"`)
        ),
        kind: "error",
      });
    },
  });
};

export const useMutateEditDealInformation = () => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: putDealInformation,
    onMutate: async ({ dealId }) => {
      return { dealId };
    },
    onError: (error, variables) => {
      createNotification({
        subject: `Error editing deal.`,
        message: parseError(
          error,
          `Unable to update deal "${variables?.dealId}"`
        ),
        kind: "error",
      });
    },
    onSettled(data, error, variables, context) {
      invalidateDealsQueries({ queryClient });
      invalidateDealInformation({ queryClient, dealId: context.dealId });
    },
  });
};

export const useMutateEditExtendedDealInformation = () => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: putExtendedDealInformation,
    onMutate: async ({ dealId }) => {
      return { dealId };
    },
    onError: (error, variables) => {
      createNotification({
        subject: `Error editing deal.`,
        message: parseError(
          error,
          messageUnableToUpdate(`deal "${variables?.dealId}"`)
        ),
        kind: "error",
      });
    },
    onSettled(data, error, variables, context) {
      invalidateDealsQueries({ queryClient });
      invalidateDealInformation({ queryClient, dealId: context.dealId });
    },
  });
};

export const useMutateDeleteDealRoomItem = () => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: deleteDealRoomItem,
    onMutate: async ({ deal, name }) => {
      return { deal, name };
    },
    onError: (error, variables) => {
      createNotification({
        subject: `Error delete deal room item.`,
        message: parseError(
          error,
          messageUnableToDelete(`deal room item "${variables?.name}"`)
        ),
        kind: "error",
      });
    },
    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({
        queryKey: queries.deals.dealRoomItems({ deal: context.deal }).queryKey,
      });
      invalidateDealInformation({ queryClient, dealId: context.deal });
    },
  });
};

export const useMutateDealUnderwritingModel = () => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: postDealUnderwritingModel,
    onError: (error, variables) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "POST" }),
        message: parseError(
          error,
          messageUnableToCreate(
            `underwriting model for deal "${variables?.deal}"`
          )
        ),
        kind: "error",
      });
    },
    onSettled(data, error, variables) {
      invalidateDealsQueries({ queryClient, dealId: variables.deal });
    },
  });
};

export const useMutateDealWireInstruction = () => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: postDealWireInstruction,
    onError: (error, variables) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "POST" }),
        message: parseError(
          error,
          messageUnableToCreate(
            `wire instruction for deal "${variables?.deal}"`
          )
        ),
        kind: "error",
      });
    },
    onSettled(data, error, variables) {
      invalidateDealsQueries({ queryClient, dealId: variables.deal });
    },
  });
};

export const useMutateDeleteDealPhoto = () => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: deleteDealPhoto,
    onMutate: async ({ deal, name }) => {
      return { deal, name };
    },
    onError: (error, variables) => {
      createNotification({
        subject: `Error delete deal photo.`,
        message: parseError(
          error,
          messageUnableToDelete(`deal photo "${variables?.name}"`)
        ),
        kind: "error",
      });
    },
    onSettled(data, error, variables, context) {
      invalidateDealInformation({ queryClient, dealId: context.deal });
      queryClient.invalidateQueries({
        queryKey: queries.deals.dealPhotos(context.deal).queryKey,
      });
    },
  });
};

export const useMutateUpdateDealRoomItem = () => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: putDealRoomItem,
    onMutate: async ({ deal, name }) => {
      return { deal, name };
    },
    onError: (error, variables) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "POST" }),
        message: parseError(
          error,
          messageUnableToCreate(`deal room item "${variables?.name}"`)
        ),
        kind: "error",
      });
    },
    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({
        queryKey: queries.deals.dealRoomItems({ deal: context.deal }).queryKey,
      });
      invalidateDealInformation({ queryClient, dealId: context.deal });
    },
  });
};

export const useMutateDealTimeline = () => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: postDealTimeline,
    onMutate: async ({ dealId }) => {
      return { dealId };
    },
    onError: (error, variables) => {
      createNotification({
        subject: `Error uploading deal timeline`,
        message: parseError(
          error,
          `Unable to update deal timeline for "${variables?.dealId}"`
        ),
        kind: "error",
      });
    },
    onSettled(data, error, variables, context) {
      invalidateDealInformation({ queryClient, dealId: context.dealId });
    },
  });
};

export const useMutatePatchExtendedDealInformation = (
  {
    onSuccess,
  }: {
    onSuccess?: () => void;
  } = {
    onSuccess: () => null,
  }
) => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: patchExtendedDealInformation,
    onMutate: async ({ dealId }) => {
      return { dealId };
    },
    onError: (error, variables) => {
      createNotification({
        subject: `Error editing deal.`,
        message: parseError(
          error,
          messageUnableToUpdate(`deal "${variables?.dealId}"`)
        ),
        kind: "error",
      });
    },
    onSuccess() {
      onSuccess?.();
    },
    onSettled(data, error, variables, context) {
      invalidateDealsQueries({ queryClient });
      invalidateDealInformation({ queryClient, dealId: context.dealId });
    },
  });
};

export const useMutateEditDealTimeline = () => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: putDealTimeline,
    onMutate: async ({ dealId }) => {
      return { dealId };
    },
    onError: (error, variables) => {
      createNotification({
        subject: `Error updating deal timeline`,
        message: parseError(
          error,
          `Unable to update deal timeline for "${variables?.dealId}"`
        ),
        kind: "error",
      });
    },
    onSettled(data, error, variables, context) {
      invalidateDealInformation({ queryClient, dealId: context.dealId });
    },
  });
};

export const useMutateEditDealCommonAttributes = () => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: patchDealCommonAttributes,
    onMutate: async ({ dealId }) => {
      return { dealId };
    },
    onError: (error, variables) => {
      createNotification({
        subject: `Error editing deal.`,
        message: parseError(
          error,
          messageUnableToUpdate(`deal "${variables?.dealId}"`)
        ),
        kind: "error",
      });
    },
    onSettled(data, error, variables, context) {
      invalidateDealsQueries({ queryClient });
      invalidateDealInformation({ queryClient, dealId: context.dealId });
    },
  });
};

export const useMutatePatchScreeningDealInformation = () => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: patchScreeningDealInformation,
    onMutate: async ({ dealId }) => {
      return { dealId };
    },
    onError: (error, variables) => {
      createNotification({
        subject: `Error editing deal.`,
        message: parseError(
          error,
          `Unable to update deal "${variables?.dealId}"`
        ),
        kind: "error",
      });
    },
    onSettled(data, error, variables, context) {
      invalidateDealInformation({ queryClient, dealId: context.dealId });
    },
  });
};

export const useMutatePostAssignCompsToDeal = () => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: postAssignCompsToDeal,
    onMutate: async ({ dealId }) => {
      return { dealId };
    },
    onError: (error, variables) => {
      createNotification({
        subject: `Error linking comps to deal.`,
        message: parseError(
          error,
          `Unable to link comps to deal "${variables?.dealId}"`
        ),
        kind: "error",
      });
    },
    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({
        queryKey: queries.deals.dealComps._def,
      });
      queryClient.invalidateQueries({
        queryKey: queries.deals.dealCompTotalsByType._def,
      });
      queryClient.invalidateQueries({
        queryKey: queries.deals.dealCompTotals._def,
      });
      queryClient.invalidateQueries({
        queryKey: queries.deals.dealCompsByType({ dealId: context.dealId })
          .queryKey,
      });
    },
  });
};

export const useMutationPostAssignCompstackLeaseCompToDeal = () => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);
  return useMutation({
    mutationFn: postAssignCompstackLeaseCompToDeal,
    onMutate: async ({ dealId }) => {
      return { dealId };
    },
    onError: (error, variables) => {
      createNotification({
        subject: `Error linking comps to deal.`,
        message: parseError(
          error,
          `Unable to link lease comps to deal "${variables?.dealId}"`
        ),
        kind: "error",
      });
    },
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: queries.deals.allDealCompstackComps._def,
      });
      queryClient.invalidateQueries({
        queryKey: queries.deals.dealCompstackLeaseComps._def,
      });
      queryClient.invalidateQueries({
        queryKey: queries.marketAnalytics.compstackLeaseCompTotals._def,
      });
    },
  });
};

export const useMutationPostAssignCompstackSaleCompToDeal = () => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);
  return useMutation({
    mutationFn: postAssignCompstackSaleCompToDeal,
    onMutate: async ({ dealId }) => {
      return { dealId };
    },
    onError: (error, variables) => {
      createNotification({
        subject: `Error linking comps to deal.`,
        message: parseError(
          error,
          `Unable to link sale comps to deal "${variables?.dealId}"`
        ),
        kind: "error",
      });
    },
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: queries.deals.allDealCompstackComps._def,
      });
      queryClient.invalidateQueries({
        queryKey: queries.deals.dealCompstackSaleComps._def,
      });
    },
  });
};

export const useMutationPostAssignCompstackLandCompToDeal = () => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);
  return useMutation({
    mutationFn: postAssignCompstackLandCompToDeal,
    onMutate: async ({ dealId }) => {
      return { dealId };
    },
    onError: (error, variables) => {
      createNotification({
        subject: `Error linking comps to deal.`,
        message: parseError(
          error,
          `Unable to link sale comps to deal "${variables?.dealId}"`
        ),
        kind: "error",
      });
    },
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: queries.deals.allDealCompstackComps._def,
      });
      queryClient.invalidateQueries({
        queryKey: queries.deals.dealCompstackLandComps._def,
      });
    },
  });
};

export const useMutationDeleteDealCompstackLeaseCompUnlink = () => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);
  return useMutation({
    mutationFn: deleteDealCompstackLeaseCompUnlink,
    onMutate: async ({ dealId }) => {
      return { dealId };
    },
    onError: (error, variables) => {
      createNotification({
        subject: `Error unlinking comps of deal.`,
        message: parseError(
          error,
          `Unable to unlinking lease comp of deal "${variables?.dealId}"`
        ),
        kind: "error",
      });
    },
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: queries.deals.allDealCompstackComps._def,
      });
      queryClient.invalidateQueries({
        queryKey: queries.deals.dealCompstackLeaseComps._def,
      });
      queryClient.invalidateQueries({
        queryKey: queries.marketAnalytics.compstackLeaseCompTotals._def,
      });
    },
  });
};

export const useMutationDeleteDealCompstackSaleCompUnlink = () => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);
  return useMutation({
    mutationFn: deleteDealCompstackSaleCompUnlink,
    onMutate: async ({ dealId }) => {
      return { dealId };
    },
    onError: (error, variables) => {
      createNotification({
        subject: `Error unlinking comps of deal.`,
        message: parseError(
          error,
          `Unable to unlinking sale comp of deal "${variables?.dealId}"`
        ),
        kind: "error",
      });
    },
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: queries.deals.allDealCompstackComps._def,
      });
      queryClient.invalidateQueries({
        queryKey: queries.deals.dealCompstackSaleComps._def,
      });
    },
  });
};

export const useMutationDeleteDealCompstackLandCompUnlink = () => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);
  return useMutation({
    mutationFn: deleteDealCompstackLandCompUnlink,
    onMutate: async ({ dealId }) => {
      return { dealId };
    },
    onError: (error, variables) => {
      createNotification({
        subject: `Error unlinking comps of deal.`,
        message: parseError(
          error,
          `Unable to unlinking land comp of deal "${variables?.dealId}"`
        ),
        kind: "error",
      });
    },
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: queries.deals.allDealCompstackComps._def,
      });
      queryClient.invalidateQueries({
        queryKey: queries.deals.dealCompstackLandComps._def,
      });
    },
  });
};

interface IUseMutationPatchDealFinancialScenario {
  onSuccess?: () => void;
}
export const useMutationPatchDealFinancialScenario = (
  options?: IUseMutationPatchDealFinancialScenario
) => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);
  return useMutation({
    mutationFn: patchDealFinancialScenario,
    onError: (error, variables) => {
      createNotification({
        subject: `Error editing scenario.`,
        message: parseError(
          error,
          `Unable to editing scenario: "${variables?.scenario?.name}"`
        ),
        kind: "error",
      });
    },
    onSuccess() {
      options?.onSuccess?.();
    },
    onSettled(data, error, variables) {
      queryClient.invalidateQueries({
        queryKey: queries.deals.allDealFinancialScenarios({
          dealId: variables?.dealId,
        }).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: queries.deals.dealFinancialScenario({
          dealId: variables?.dealId,
          scenarioId: variables?.scenarioId,
        }).queryKey,
      });
    },
  });
};

export const useMutationPatchDealOrdering = () => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: patchDealOrdering,
    onMutate: async ({ activeDeal, overItem, filters, isBelowOverItem }) => {
      await queryClient.cancelQueries({
        queryKey: queries.deals.all._def,
      });

      const commonFilters = {
        ...filters,
        ...dealSmartsheetTableCommonFilters,
      };

      const overItemPhase = getDealSmartsheetOverItemPhase(overItem);
      const overItemId = getDealSmartsheetOverItemId(overItem);

      const previousDealPhaseList = queryClient.getQueryData<
        IPaginatedResponse<Deal>
      >(
        queries.deals.all({
          ...commonFilters,
          phase: activeDeal?.phase?.value,
        }).queryKey
      );

      const nextDealPhaseList = queryClient.getQueryData<
        IPaginatedResponse<Deal>
      >(
        queries.deals.all({
          ...commonFilters,
          phase: overItemPhase,
        }).queryKey
      );

      const newPreviousDealPhaseList =
        previousDealPhaseList?.results.filter(
          (deal) => deal.id !== activeDeal?.id
        ) ?? ([] as Deal[]);

      const getNewNextDealPhaseList = () => {
        const isHeader = "isHeader" in overItem;
        if (isHeader) {
          return [
            activeDeal,
            ...(nextDealPhaseList?.results?.filter(
              (deal) => deal.id !== activeDeal?.id
            ) || []),
          ];
        }

        const overItemIndex = nextDealPhaseList?.results.findIndex(
          (deal) => deal.id === overItemId
        );

        const modifier = isBelowOverItem ? 1 : 0;
        const sliceEnd = overItemIndex + modifier;

        const nextPreviousItems = nextDealPhaseList?.results
          .slice(0, sliceEnd)
          .filter((deal) => deal.id !== activeDeal?.id);

        const lastPreviousItem =
          nextPreviousItems[nextPreviousItems?.length - 1] || null;

        const newActiveDeal: Deal = {
          ...activeDeal,
          sorting: lastPreviousItem ? lastPreviousItem.sorting + 1 : 0,
        };

        const list =
          nextPreviousItems
            .concat(newActiveDeal)
            .concat(
              nextDealPhaseList?.results
                .slice(sliceEnd)
                .filter((deal) => deal.id !== activeDeal?.id)
            ) || [];

        return list;
      };

      const newNextDealPhaseList = getNewNextDealPhaseList();

      if (activeDeal?.phase?.value !== overItemPhase) {
        queryClient.setQueryData<IPaginatedResponse<Deal>>(
          queries.deals.all({
            ...commonFilters,
            phase: activeDeal?.phase?.value,
          }).queryKey,
          (data) => ({
            ...data,
            results: newPreviousDealPhaseList,
          })
        );
      }

      queryClient.setQueryData<IPaginatedResponse<Deal>>(
        queries.deals.all({
          ...commonFilters,
          phase: overItemPhase,
        }).queryKey,
        (data) => ({
          ...data,
          results: newNextDealPhaseList,
        })
      );
      return {
        previousDealPhaseList,
        nextDealPhaseList,
        activeDeal,
        overItem,
        filters,
        overItemPhase,
        commonFilters,
      };
    },
    onSuccess: (data, variables) => {
      createNotification({
        subject: `Deal order changed.`,
        message: `Deal order changed for "${variables?.activeDeal?.address}"`,
        kind: "success",
      });
    },
    onError: (error, variables) => {
      createNotification({
        subject: `Error changing deal order.`,
        message: parseError(
          error,
          `Unable to change deal order for "${variables?.activeDeal?.address}"`
        ),
        kind: "error",
      });
    },
  });
};

export const useMutateDealTenantInformation = () => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: postDealTenantInformation,
    onMutate: async ({ name, deal }) => {
      return { name, deal };
    },
    onSuccess: (data, variables) => {
      createNotification({
        subject: `Tenant created successfully.`,
        message: `Information added for "${variables?.name}"`,
        kind: "success",
      });
    },
    onError: (error, variables) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "POST" }),
        message: parseError(
          error,
          messageUnableToCreate(`"${variables?.name}" tenant information`)
        ),
        kind: "error",
      });
    },
    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({
        queryKey: queries.deals.dealTenantInformation({
          deal: context.deal,
        }).queryKey,
      });
    },
  });
};

export const useMutatePatchDealTenantInformation = () => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);
  return useMutation({
    mutationFn: patchDealTenantInformation,
    onMutate: async ({ name, deal }) => {
      return { name, deal };
    },
    onSuccess: (data, variables) => {
      createNotification({
        subject: `Tenant updated successfully.`,
        message: `Information updated for "${variables?.name}"`,
        kind: "success",
      });
    },
    onError: (error, variables) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "PATCH" }),
        message: parseError(
          error,
          messageUnableToUpdate(`"${variables?.name}" tenant information`)
        ),
        kind: "error",
      });
    },
    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({
        queryKey: queries.deals.dealTenantInformation({
          deal: context.deal,
        }).queryKey,
      });
    },
  });
};

export const useMutateDeleteDealTenantInformation = () => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);
  return useMutation({
    mutationFn: deleteDealTenantInformation,
    onMutate: async ({ name, deal }) => {
      return { name, deal };
    },
    onSuccess: (data, variables) => {
      createNotification({
        subject: `Tenant deleted successfully.`,
        message: `Information deleted for "${variables?.name}"`,
        kind: "success",
      });
    },
    onError: (error, variables) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "DELETE" }),
        message: parseError(
          error,
          messageUnableToDelete(`"${variables?.name}" tenant information`)
        ),
        kind: "error",
      });
    },
    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({
        queryKey: queries.deals.dealTenantInformation({
          deal: context.deal,
        }).queryKey,
      });
    },
  });
};

export const useMutateDealRiskAndMitigant = () => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: postDealRiskAndMitigant,
    onMutate: async ({ deal }) => {
      return { deal };
    },
    onSuccess: (data, variables) => {
      createNotification({
        subject: `Risk and mitigant created successfully`,
        message: `Information added for deal "${variables?.deal}"`,
        kind: "success",
      });
    },
    onError: (error) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "POST" }),
        message: parseError(error, messageUnableToCreate("risk and mitigant")),
        kind: "error",
      });
    },
    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({
        queryKey: queries.deals.dealRisksAndMitigants({
          deal: context.deal,
        }).queryKey,
      });
    },
  });
};

export const useMutatePatchDealRiskAndMitigant = () => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);
  return useMutation({
    mutationFn: patchDealRiskAndMitigant,
    onMutate: async ({ deal }) => {
      return { deal };
    },
    onSuccess: (data, variables) => {
      createNotification({
        subject: "Risk and mitigant updated successfully",
        message: `Information updated for deal "${variables?.deal}"`,
        kind: "success",
      });
    },
    onError: (error) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "PATCH" }),
        message: parseError(error, messageUnableToUpdate("risk and mitigant")),
        kind: "error",
      });
    },
    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({
        queryKey: queries.deals.dealRisksAndMitigants({
          deal: context.deal,
        }).queryKey,
      });
    },
  });
};

export const useMutateDeleteDealRiskAndMitigant = () => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);
  return useMutation({
    mutationFn: deleteDealRiskAndMitigant,
    onMutate: async ({ deal }) => {
      return { deal };
    },
    onSuccess: (data, variables) => {
      createNotification({
        subject: "Risk and mitigant deleted successfully.",
        message: `Information deleted for deal "${variables?.deal}"`,
        kind: "success",
      });
    },
    onError: (error) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "DELETE" }),
        message: parseError(error, messageUnableToDelete("risk and mitigant")),
        kind: "error",
      });
    },
    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({
        queryKey: queries.deals.dealRisksAndMitigants({
          deal: context.deal,
        }).queryKey,
      });
    },
  });
};

interface UseMutateOptimisticPatchExtendedDealInformationParams {
  deal: Deal;
}
export const useMutateOptimisticPatchExtendedDealInformation = ({
  deal,
}: UseMutateOptimisticPatchExtendedDealInformationParams) => {
  {
    const queryClient = useQueryClient();
    const [, createNotification] = useAtom(addNotificationAtom);

    return useMutation({
      mutationFn: patchExtendedDealInformation,
      onMutate: async ({ dealId, dealInformation }) => {
        // Cancel the query for the previous phase of the deal
        await queryClient.cancelQueries({
          queryKey: queries.deals.dealsPipeline._def,
        });

        const matchingQueries = queryClient.getQueryCache().findAll({
          predicate: (query) => {
            const queryKey = query.queryKey;
            return (
              queryKey.length > 2 &&
              queryKey[0] === "deals" &&
              queryKey[1] === "all"
            );
          },
        });

        // Update the deal information in the matching queries
        matchingQueries.forEach((query) => {
          const filters = query.queryKey[2] as GenericFilterPayload;
          if (filters?.phase === deal?.phase?.value) {
            queryClient.setQueryData(
              query.queryKey,
              (oldData: IPaginatedResponse<Deal>) => {
                if (!oldData) return;
                return {
                  ...oldData,
                  results: oldData.results.map((deal) =>
                    deal.id === dealId ? { ...deal, ...dealInformation } : deal
                  ) as Deal[],
                };
              }
            );
          }
        });
      },
      onError: (error) => {
        createNotification({
          subject: `Error editing deal.`,
          message: parseError(
            error,
            messageUnableToUpdate(`deal "${deal?.address}"`)
          ),
          kind: "error",
        });
        invalidateDealsQueries({ queryClient });
      },
      onSettled(data, error, variables) {
        invalidateDealInformation({ queryClient, dealId: variables?.dealId });
      },
    });
  }
};

interface UseMutateOptimisticPatchDealInformationParams {
  onSuccess?: () => void;
}
export const useMutatePatchBulkDealsInformation = ({
  onSuccess,
}: UseMutateOptimisticPatchDealInformationParams) => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: patchBulkDealsInformation,
    onError: (error) => {
      createNotification({
        subject: `Error editing deals.`,
        message: parseError(error, messageUnableToUpdate(`bulk deals"`)),
        kind: "error",
      });
    },
    onSuccess() {
      createNotification({
        subject: `Deals updated.`,
        message: `Bulk information updated successfully.`,
        kind: "success",
      });
      onSuccess?.();
    },
    onSettled() {
      invalidateDealsQueries({ queryClient });
    },
  });
};
