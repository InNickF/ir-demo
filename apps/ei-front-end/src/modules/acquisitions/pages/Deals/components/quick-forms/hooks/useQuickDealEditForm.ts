import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { subjectErrorCRUD } from "@/commons/utils/notification-messages";
import { useMutateOptimisticPatchExtendedDealInformation } from "@/modules/acquisitions/services/mutations/deals";
import {
  Deal,
  ExtendedDealInformation,
  ExtendedDealInformationPayload,
} from "@/modules/acquisitions/typings/deals";
import { transformDealToPayload } from "@/modules/acquisitions/utils/data-transformations";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";

interface OnSubmitQuickDealEditFormParams {
  data: Partial<ExtendedDealInformation>;
  dealId: Deal["id"];
  onError?: () => void;
  onSuccess?: () => void;
  onSettled?: () => void;
}
interface UseQuickDealEditFormParams {
  defaultValues?: Partial<ExtendedDealInformation>;
  deal?: Deal;
}
export const useQuickDealEditForm = (
  params: UseQuickDealEditFormParams = null
) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  const form = useForm<Partial<ExtendedDealInformation>>({
    defaultValues: params?.defaultValues ?? null,
  });

  const mutation = useMutateOptimisticPatchExtendedDealInformation({
    deal: params?.deal,
  });

  const onSubmit = ({
    data,
    dealId,
    onError,
    onSuccess,
    onSettled,
  }: OnSubmitQuickDealEditFormParams) => {
    const formattedDealInformation = transformDealToPayload(
      data
    ) as ExtendedDealInformationPayload;

    mutation.mutate(
      {
        dealId: dealId,
        dealInformation: formattedDealInformation,
      },
      {
        onError: () => {
          createNotification({
            kind: "error",
            subject: subjectErrorCRUD({
              verb: "PUT",
              resource: "Deal information",
            }),
            message: `Error updating information for ${dealId}.`,
          });
          onError?.();
        },
        onSettled: () => {
          onSettled?.();
        },
      }
    );
    onSuccess?.();
  };

  return {
    form,
    mutation,
    onSubmit,
  };
};
