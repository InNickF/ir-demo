import { usePropertyIdFromQueryParams } from "@/modules/assets/hooks/usePropertyIdFromQueryParams";
import { PropertyTimeline } from "@/modules/assets/typings/property";
import { Button, Modal, TextArea } from "in-ui-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import "../styles.css";
import { PropertyTimelineFormProps } from "../types";
import { InputDatePicker } from "@/commons/components/data-entry/InputDatePicker";
import { required } from "@/commons/utils/input-validations";
import { transformInputDateToMMDDYYYY } from "@/commons/utils/dates";
import { PropertyTimelineTypeSelect } from "../components/PropertyTimelineTypeSelect";

export const CreatePropertyTimelineForm: FC<PropertyTimelineFormProps> = ({
  useMutation,
  onAction,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<PropertyTimeline>();

  const propertyId = usePropertyIdFromQueryParams();

  const mutation = useMutation<PropertyTimeline>();

  const createPropertyTimeline = async (item: PropertyTimeline) => {
    const finalItem = {
      ...item,
      property_under_management_code: propertyId,
    };
    mutation.mutate(finalItem, {
      onSettled: () => {
        onAction(finalItem);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(createPropertyTimeline)}>
      <Modal.Body>
        <div className="flex flex-col gap-5">
          <div className="flex gap-3">
            <PropertyTimelineTypeSelect
              control={control}
              label="Type"
              identifier="type"
              error={errors.type?.message as string}
              rules={{ required: required("Type") }}
              onChange={({ value }) => {
                setValue("type", value);
              }}
            />
            <InputDatePicker
              label="Notable Date"
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
