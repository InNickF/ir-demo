import { GenericControlledDropzone } from "@/commons/components/data-entry/GenericControlledDropzone";
import { required } from "@/commons/utils/input-validations";
import { useMutatePostDebtLoanContract } from "@/modules/debt/services/mutations/loans";
import { DebtLoanContractPayload } from "@/modules/debt/typings/loans";
import { Button, Label } from "in-ui-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import "../../styles.css";
import { LoanModalFormProps } from "../../types";

export const EditLoanContractForm: FC<LoanModalFormProps> = ({
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
    formState: { errors },
  } = useForm<DebtLoanContractPayload>({
    defaultValues: { ...item },
  });

  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutatePostDebtLoanContract();

  const onSubmit = async (item: DebtLoanContractPayload) => {
    setIsLoading(true);
    mutation.mutate(item, {
      onSettled: () => {
        setIsLoading(false);
        onAction(item);
      },
    });
  };

  const getClasses = () => {
    return `${prefix} ${className}`;
  };

  return (
    <form className={getClasses()} onSubmit={handleSubmit(onSubmit)}>
      <div className={`${prefix}__content`}>
        <div>
          <Label className="mb-2">Loan contract</Label>
          <GenericControlledDropzone
            control={control}
            identifier="contract_file"
            onRemove={() => setValue("contract_file", null)}
            showTags
            options={{
              accept: {
                "application/pdf": [".pdf"],
              },
            }}
            error={errors.contract_file?.message as string}
            rules={{ required: required("Contract File") }}
            onChange={(file: File[]) => {
              setValue("contract_file", file[0]);
            }}
          />
        </div>
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
        <Button block type="submit" disabled loading={isLoading}>
          {actionText}
        </Button>
      </footer>
    </form>
  );
};
