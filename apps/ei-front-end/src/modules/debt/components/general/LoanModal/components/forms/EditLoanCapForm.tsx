import {
  useMutatePatchDebtLoanCap,
  useMutatePostDebtLoanCap,
} from "@/modules/debt/services/mutations/loans";
import { DebtLoanCap } from "@/modules/debt/typings/loans";
import { Button, Heading, Modal } from "in-ui-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import "../../styles.css";
import { LoanModalFormProps } from "../../types";
import { useDebtLoanCapMappings } from "@/modules/debt/services/queries/loans";
import { LoanChathamCapSelect } from "../LoanChathamCapSelect";

export const EditLoanCapForm: FC<LoanModalFormProps> = ({
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
  } = useForm<DebtLoanCap>({
    defaultValues: {
      loan_name: item?.loan_name,
    },
  });

  const { data } = useDebtLoanCapMappings(
    {
      loan_name: item?.loan_name,
    },
    {
      onSuccess: ({ results }) => {
        setValue("chatham_loan_name", results[0]?.chatham_loan_name || "");
      },
    }
  );

  const loanCapExists = data?.results[0]?.chatham_loan_name;

  const postMutation = useMutatePostDebtLoanCap();
  const patchMutation = useMutatePatchDebtLoanCap();

  const selectedMutation = data?.results[0]?.chatham_loan_name
    ? patchMutation
    : postMutation;

  const onSubmit = async (data: DebtLoanCap) => {
    selectedMutation.mutate(data, {
      onSettled: () => {
        onAction(item);
      },
    });
  };

  const getClasses = () => {
    return `${prefix} ${className}`;
  };

  return selectedMutation.isSuccess ? (
    <Modal.Body className={getClasses()}>
      <Heading kind="h4">
        {`The loan cap has been ${
          loanCapExists ? "updated" : "created"
        } successfully.`}
      </Heading>
      <p>We&apos;ll notify you once the loan status has been processed.</p>
    </Modal.Body>
  ) : (
    <form className={getClasses()} onSubmit={handleSubmit(onSubmit)}>
      <div className={`${prefix}__content`}>
        <LoanChathamCapSelect
          label="Loan Cap"
          className="w-full pb-4"
          control={control}
          identifier="chatham_loan_name"
          value={watch("chatham_loan_name")}
          error={errors.chatham_loan_name?.message as string}
          onChange={(event: { value: string }) => {
            setValue("chatham_loan_name", event.value);
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
        <Button
          block
          type="submit"
          disabled
          loading={selectedMutation?.isLoading}
        >
          {actionText}
        </Button>
      </footer>
    </form>
  );
};
