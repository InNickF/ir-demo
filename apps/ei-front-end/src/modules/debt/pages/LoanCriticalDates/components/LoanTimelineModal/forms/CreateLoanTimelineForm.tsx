import { DebtLoanTimeline } from "@/modules/debt/typings/loans";
import { Button, Input, Modal, TextArea } from "in-ui-react";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import "../styles.css";
import { LoanTimelineFormProps } from "../types";
import { required } from "@/commons/utils/input-validations";
import { LoanTimelineTypeSelect } from "../components/LoanTimelineTypeSelect";
import { inputRegisterWithRequiredAttribute } from "@/commons/utils/input-register-with-required-attribute";

export const CreateLoanTimelineForm: FC<LoanTimelineFormProps> = ({
  useMutation,
  onAction,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<DebtLoanTimeline>();

  const router = useRouter();
  const { loanId } = router.query;

  const [isLoadingFile, setIsLoadingFile] = useState(false);

  const mutation = useMutation<DebtLoanTimeline>();

  const createLoanTimeline = async (item: DebtLoanTimeline) => {
    const finalItem = {
      ...item,
      loan_abstract_id: loanId as string,
    };

    setIsLoadingFile(true);
    mutation.mutate(finalItem, {
      onSettled: () => {
        setIsLoadingFile(false);
        onAction(finalItem);
      },
    });
  };

  return (
    <form
      className="acq-add-new-file__modal-form"
      onSubmit={handleSubmit(createLoanTimeline)}
    >
      <Modal.Body>
        <div className="flex flex-col gap-5">
          <div className="flex gap-2">
            <LoanTimelineTypeSelect
              label="Date Type"
              identifier="type"
              control={control}
              error={errors.type?.message}
              rules={{ required: required("Date Type") }}
              onChange={({ value }) => {
                setValue("type", value);
              }}
            />
            <Input
              label="Notable Date"
              type="date"
              error={errors.notable_date?.message}
              {...inputRegisterWithRequiredAttribute({
                ...register("notable_date", {
                  required: required("Notable Date"),
                }),
              })}
            />
          </div>
          <TextArea
            label="Comment"
            error={errors.comment?.message}
            {...inputRegisterWithRequiredAttribute({
              ...register("comment", {
                required: required("Comment"),
              }),
            })}
          />
        </div>
      </Modal.Body>
      <footer className="acq-deal-room-form-footer">
        <Button
          block
          kind="ghost"
          disabled={isLoadingFile}
          onClick={() => {
            onCancel();
          }}
        >
          Close
        </Button>
        <Button block type="submit" disabled loading={isLoadingFile}>
          Save
        </Button>
      </footer>
    </form>
  );
};
