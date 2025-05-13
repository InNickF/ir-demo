import { InputDatePicker } from "@/commons/components/data-entry/InputDatePicker";
import { transformDateToDatePicker } from "@/commons/components/data-entry/InputDatePicker/utils";
import { transformInputDateToMMDDYYYY } from "@/commons/utils/dates";
import { required } from "@/commons/utils/input-validations";
import { FundTimeline } from "@/modules/assets/typings/funds";
import { Button, Modal, TextArea } from "in-ui-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import "../styles.css";
import { FundCriticalDatesFormProps } from "../types";

export const EditFundCriticalDatesForm: FC<FundCriticalDatesFormProps> = ({
  item,
  useMutation,
  onAction,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FundTimeline>({
    defaultValues: { ...item },
  });

  const mutation = useMutation<FundTimeline>();

  const onSubmit = async (item: FundTimeline) => {
    mutation.mutate(item, {
      onSettled: () => {
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
          <div className="flex gap-3">
            <InputDatePicker
              label="Notable Date"
              required
              defaultValue={transformDateToDatePicker({
                value: getValues("notable_date"),
              })}
              error={errors["notable_date"]?.message as string}
              {...register("notable_date", {
                required: required("Notable Date"),
                onChange: (event) => {
                  if (event?.target?.value) {
                    setValue(
                      "notable_date",
                      transformInputDateToMMDDYYYY(event.target.value)
                    );
                  }
                },
              })}
            />
          </div>
          <TextArea
            name="comment"
            label="Comment"
            required
            error={errors["comment"]?.message as string}
            {...register("comment", {
              required: required("Comment"),
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
        <Button block type="submit" disabled loading={mutation?.isLoading}>
          Save
        </Button>
      </footer>
    </form>
  );
};
