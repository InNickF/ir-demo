import { ExtendedDealInformation } from "@/modules/acquisitions/typings/deals";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "in-ui-react";
import { FC, useRef } from "react";
import { useDynamicTableLeaveSecondSlotEvent } from "../../../../events/onDynamicTableLeaveSecondSlotEvent";
import { useQuickDealEditForm } from "../../hooks/useQuickDealEditForm";
import { QuickDealsFormProps } from "../props";
import "./styles.css";

export const QuickDealsForm: FC<QuickDealsFormProps> = ({
  dealId,
  defaultValues,
  children,
  onCancel,
  onSuccess,
  onError,
  onSettled,
  deal,
}) => {
  const prefix = "acq-deals-quick-form";
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { form, onSubmit, mutation } = useQuickDealEditForm({
    defaultValues,
    deal,
  });

  const handleQuickSubmit = (data: Partial<ExtendedDealInformation>) => {
    onSubmit({ dealId, data, onSuccess, onError, onSettled });
  };

  useDynamicTableLeaveSecondSlotEvent({
    onEvent: () => {
      buttonRef.current?.click();
    },
  });

  return (
    <form className={prefix} onSubmit={form.handleSubmit(handleQuickSubmit)}>
      {children({ form, mutation, onSubmit })}
      <Button
        ref={buttonRef}
        onlyIcon
        icon={<CheckIcon />}
        loading={mutation.isLoading}
        className="flex-shrink-0 w-9 h-9"
        type="submit"
      />
      <Button
        onlyIcon
        icon={<XMarkIcon />}
        kind="ghost"
        disabled={mutation.isLoading}
        onClick={() => {
          form.reset();
          onCancel?.();
        }}
        className="flex-shrink-0 w-9 h-9"
      />
    </form>
  );
};
