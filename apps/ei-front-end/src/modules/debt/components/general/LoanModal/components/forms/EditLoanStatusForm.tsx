import { useMutationPatchLoanStatus } from "@/modules/debt/services/mutations/loans";
import { DebtLoanStatusPayload } from "@/modules/debt/typings/loans";
import { Button, Heading, Modal } from "in-ui-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import "../../styles.css";
import { LoanModalFormProps } from "../../types";
import { LoanStatusSelect } from "../LoanStatusSelect";

export const EditLoanStatusForm: FC<LoanModalFormProps> = ({
  item,
  onAction,
  onCancel,
  actionText,
  cancelText,
  className,
}) => {
  const prefix = "debt-loan-modal-form";

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DebtLoanStatusPayload>({
    defaultValues: {
      loan_name: item?.loan_name,
      is_loan_active: item?.is_loan_active,
    },
  });

  const mutation = useMutationPatchLoanStatus();

  const onSubmit = async (data: DebtLoanStatusPayload) => {
    const mutationItem = {
      ...data,
      loan_abstract_id: item?.loan_abstract_id,
    };
    mutation.mutate(mutationItem, {
      onSettled: () => {
        onAction(item);
      },
    });
  };

  const getClasses = () => {
    return `${prefix} ${className}`;
  };

  return mutation.isSuccess ? (
    <Modal.Body className={getClasses()}>
      <Heading kind="h4">Loan Status updated successfully.</Heading>
      <p>We&apos;ll notify you once the loan status has been processed.</p>
    </Modal.Body>
  ) : (
    <form className={getClasses()} onSubmit={handleSubmit(onSubmit)}>
      <div className={`${prefix}__content`}>
        <LoanStatusSelect
          label="Loan Status"
          className="w-full pb-4"
          control={control}
          identifier="is_loan_active"
          value={watch("is_loan_active")}
          error={errors.loan_name?.message as string}
          onChange={(event: { value: boolean }) => {
            setValue("is_loan_active", event.value);
          }}
        />
      </div>
      <footer className={`${prefix}__footer`}>
        <Button
          block
          kind="ghost"
          onClick={() => {
            onCancel();
          }}
        >
          {cancelText}
        </Button>
        <Button block type="submit" disabled loading={mutation?.isLoading}>
          {actionText}
        </Button>
      </footer>
    </form>
  );
};
