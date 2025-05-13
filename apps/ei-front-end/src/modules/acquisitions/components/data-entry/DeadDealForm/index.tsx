import { useMutatePatchExtendedDealInformation } from "@/acquisitions/services/mutations/deals";
import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import {
  Deal,
  ExtendedDealInformation,
  ExtendedDealInformationPayload,
} from "@/modules/acquisitions/typings/deals";
import { transformDealToPayload } from "@/modules/acquisitions/utils/data-transformations";
import { Button } from "in-ui-react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { useForm } from "react-hook-form";
import { getDealBasicInformationInputs } from "../DealInformationFormInputs";
import "./styles.css";

export interface DeadDealFormProps {
  dealId: Deal["id"];
  dealAddress?: Deal["address"];
  defaultValues?: Deal;
  redirectToDeal?: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
}
export const DeadDealForm: FC<DeadDealFormProps> = ({
  dealId,
  dealAddress,
  defaultValues,
  redirectToDeal = false,
  onSuccess,
  onCancel,
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  const router = useRouter();
  const mutation = useMutatePatchExtendedDealInformation({
    onSuccess() {
      onSuccess?.();
      createNotification({
        subject: "Deal sent to dead.",
        message: dealAddress
          ? `The deal "${dealAddress}" was sent to dead.`
          : null,
        kind: "success",
      });
      if (redirectToDeal) {
        router.push(`/acquisitions/deals/deal-summary/?dealId=${dealId}`);
      }
    },
  });
  const {
    register,
    control,
    getValues,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ExtendedDealInformation>({
    defaultValues,
  });

  const sendDealToDead = (data: ExtendedDealInformation) => {
    const formattedDealInformation = transformDealToPayload(
      data
    ) as ExtendedDealInformationPayload;

    mutation.mutate({
      dealId,
      dealInformation: {
        ...formattedDealInformation,
        phase: "DEAD",
      },
    });
  };

  const inputs = useMemo(
    () => {
      const inputs = getDealBasicInformationInputs({
        control,
        getValues,
        register,
        setValue,
        areFilesRequired: false,
      })
        .filter((input) => {
          return (
            input.key === "dead_reason" || input.key === "dead_reason_type"
          );
        })
        .map((input) => {
          if (input.key === "dead_reason") {
            const { Component, props, key } = input;
            return {
              Component: Component,
              key,
              props: {
                ...props,
                rows: 8,
              },
            };
          }
          return input;
        }) as ReturnType<typeof getDealBasicInformationInputs>;
      reset();
      return inputs;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const prefix = "dead-deal-form";
  return (
    <form className={prefix} onSubmit={handleSubmit(sendDealToDead)}>
      {inputs.map((input) => {
        const { Component, props, key } = input;
        return (
          <Component
            key={key}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...(props as any)}
            error={errors?.[key]?.message}
          />
        );
      })}
      <footer className={`${prefix}__actions`}>
        <Button loading={mutation.isLoading} type="submit" disabled>
          Send deal to dead
        </Button>
        <Button
          kind="ghost"
          type="button"
          disabled={mutation.isLoading}
          onClick={() => {
            onCancel?.();
          }}
        >
          Cancel
        </Button>
      </footer>
    </form>
  );
};
