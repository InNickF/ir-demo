import { FundTimeline } from "@/modules/assets/typings/funds";
import { Button, Modal, TextArea } from "in-ui-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import "../styles.css";
import { FundCriticalDatesFormProps } from "../types";
import { InputDatePicker } from "@/commons/components/data-entry/InputDatePicker";
import { transformInputDateToMMDDYYYY } from "@/commons/utils/dates";
import { required } from "@/commons/utils/input-validations";
import { useIdFromQueryParams } from "@/commons/hooks/useIdFromQueryParams";
import { getFundsURL } from "@/modules/assets/utils/redirects/funds-redirects";

export const CreateFundCriticalDatesForm: FC<FundCriticalDatesFormProps> = ({
  useMutation,
  onAction,
  onCancel,
}) => {
  const fundId = useIdFromQueryParams({
    model: "Fund",
    redirectOnNotFound: true,
    redirectURL: getFundsURL({
      id: null,
    }).rootURL,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FundTimeline>();

  const mutation = useMutation<FundTimeline>();

  const createFundCriticalDates = async (item: FundTimeline) => {
    const finalItem = {
      ...item,
      fund_name: fundId,
    };
    mutation.mutate(finalItem, {
      onSettled: () => {
        onAction(finalItem);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(createFundCriticalDates)}>
      <Modal.Body>
        <div className="flex flex-col gap-5">
          <div className="flex gap-3">
            <InputDatePicker
              label="Notable Date"
              required
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
          disabled={mutation?.isLoading}
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
