import { GenericControlledDropzone } from "@/commons/components/data-entry/GenericControlledDropzone";
import { required } from "@/commons/utils/input-validations";
import { useLegacyMutatePostDebtLoan } from "@/modules/debt/services/mutations/loans";
import { LegacyDebtLoanPayload } from "@/modules/debt/typings/loans";
import { Button, Heading, Label, Modal } from "in-ui-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import "../../styles.css";
import { LoanModalFormProps } from "../../types";

export const EditLoanForm: FC<LoanModalFormProps> = ({
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
  } = useForm<LegacyDebtLoanPayload>({
    defaultValues: { ...item },
  });

  const [isLoading, setIsLoading] = useState(false);

  const mutation = useLegacyMutatePostDebtLoan();

  const onSubmit = async (item: LegacyDebtLoanPayload) => {
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

  return mutation.isSuccess ? (
    <Modal.Body className={getClasses()}>
      <Heading kind="h4">
        The abstract file has been uploaded successfully.
      </Heading>
      <p>
        We&apos;ll notify you once the abstract file has been processed and the
        loan ready to be used.
      </p>
    </Modal.Body>
  ) : (
    <form className={getClasses()} onSubmit={handleSubmit(onSubmit)}>
      <div className={`${prefix}__content`}>
        <div>
          <Label
            className="mb-2"
            tooltip="The abstract file is the document that contains the information of the loan"
          >
            Abstract
          </Label>
          <GenericControlledDropzone
            control={control}
            identifier="abstract_file"
            onRemove={() => setValue("abstract_file", null)}
            showTags
            options={{
              accept: {
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                  [".xlsx"],
              },
            }}
            error={errors.abstract_file?.message as string}
            rules={{ required: required("Abstract File") }}
            onChange={(file: File[]) => {
              setValue("abstract_file", file[0]);
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
