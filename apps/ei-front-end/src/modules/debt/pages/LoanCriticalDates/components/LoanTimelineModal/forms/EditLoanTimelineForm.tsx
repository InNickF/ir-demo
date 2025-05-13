import { DebtLoanTimeline } from "@/modules/debt/typings/loans";
import { Button, Input, Modal, TextArea } from "in-ui-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import "../styles.css";
import { LoanTimelineFormProps } from "../types";
import { inputRegisterWithRequiredAttribute } from "@/commons/utils/input-register-with-required-attribute";
import { required } from "@/commons/utils/input-validations";
import { LoanTimelineTypeSelect } from "../components/LoanTimelineTypeSelect";

export const EditLoanTimelineForm: FC<LoanTimelineFormProps> = ({
  item,
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
  } = useForm<DebtLoanTimeline>({
    defaultValues: { ...item },
  });

  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation<DebtLoanTimeline>();

  const onSubmit = async (item: DebtLoanTimeline) => {
    setIsLoading(true);
    mutation.mutate(item, {
      onSettled: () => {
        setIsLoading(false);
        onAction(item);
      },
    });
  };

  return (
    <form
      className="acq-add-new-file__modal-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Modal.Body>
        <div className="flex flex-col gap-5">
          <div className="flex gap-2">
            <LoanTimelineTypeSelect
              label="Timeline Type"
              identifier="type"
              control={control}
              error={errors.type?.message}
              rules={{ required: required("Timeline Type") }}
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
          onClick={() => {
            onCancel();
          }}
        >
          Close
        </Button>
        <Button block type="submit" disabled loading={isLoading}>
          Save
        </Button>
      </footer>
    </form>
  );
};
