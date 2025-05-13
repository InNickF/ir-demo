import { GenericControlledDropzone } from "@/commons/components/data-entry/GenericControlledDropzone";
import { GenericLabelValueObject } from "@/commons/typings";
import { required } from "@/commons/utils/input-validations";
import { useMutatePostDebtLoan } from "@/modules/debt/services/mutations/loans";
import { DebtLoanPayload } from "@/modules/debt/typings/loans";
import { Button, Heading, Label } from "in-ui-react";
import { FC, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "../../styles.css";
import { LoanModalFormProps } from "../../types";
import { LoanFundAndPropertiesSelects } from "../LoanFundAndPropertiesSelects";
import { LoanNameSelect } from "../LoanNameSelect";

export const CreateLoanForm: FC<LoanModalFormProps> = ({
  onAction,
  onCancel,
  actionText,
  cancelText,
}) => {
  const prefix = "debt-loan-modal-form";
  const [propertiesError, setPropertiesError] = useState<string>(null);

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<DebtLoanPayload>();
  const selectedProperties = useRef<GenericLabelValueObject[]>([]);
  const mutation = useMutatePostDebtLoan();

  const onSubmit = async (payload: DebtLoanPayload) => {
    if (selectedProperties.current?.length === 0) {
      setPropertiesError("Please select at least one property");
      return;
    } else {
      setPropertiesError(null);
    }

    const formattedPayload = {
      ...payload,
      properties: selectedProperties.current,
    };

    mutation.mutate(formattedPayload, {
      onSuccess: () => {
        onAction(formattedPayload);
      },
    });
  };

  return (
    <form className={prefix} onSubmit={handleSubmit(onSubmit)}>
      <div className={`${prefix}__content`}>
        {mutation.isSuccess ? (
          <div className="pb-3">
            <Heading kind="h4">
              The abstract file has been uploaded successfully.
            </Heading>
            <p>
              We&apos;ll notify you once the abstract file has been processed
              and the loan ready to be used.
            </p>
          </div>
        ) : (
          <>
            <LoanFundAndPropertiesSelects
              className="w-full pb-4"
              error={propertiesError}
              onChange={(value: GenericLabelValueObject[]) => {
                selectedProperties.current = value;
                const firstProperty = value[0] || null;
                if (firstProperty && !getValues("loan_name")) {
                  setValue("loan_name", firstProperty);
                }
              }}
            />
            <LoanNameSelect
              label="Loan Name"
              className="w-full pb-4"
              control={control}
              identifier="loan_name"
              value={watch("loan_name")}
              rules={{ required: required("Loan Name") }}
              error={errors.loan_name?.message as string}
              onChange={(value: GenericLabelValueObject) => {
                setValue("loan_name", value);
              }}
            />
            <div>
              <div className="w-full">
                <Label
                  className="mb-2"
                  required
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
                  onChange={(file: File[]) => {
                    setValue("abstract_file", file[0]);
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <footer className={`${prefix}__footer`}>
        <Button
          block
          kind={mutation.isSuccess ? "solid" : "ghost"}
          onClick={() => {
            onCancel();
          }}
        >
          {mutation.isSuccess ? "Close" : cancelText}
        </Button>
        <Button
          block
          type="submit"
          className={mutation.isSuccess ? "hidden" : undefined}
          loading={mutation.isLoading}
        >
          {actionText}
        </Button>
      </footer>
    </form>
  );
};
