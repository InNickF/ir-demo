import { DealRoomItem } from "@/acquisitions/typings/deals";
import { GenericLabelValueObject } from "@/commons/typings";
import { required } from "@/commons/utils/input-validations";
import { Button, Modal, TextArea, TextAreaProps } from "in-ui-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { DealRoomFormProps } from "../types";
import "../styles.css";
import {
  GenericControlledSelect,
  GenericControlledSelectProps,
} from "@/commons/components/data-entry/GenericControlledSelect";

export const EditFileForm: FC<DealRoomFormProps> = ({
  item,
  labels,
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
  } = useForm<DealRoomItem>({
    defaultValues: { ...item },
  });

  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation<DealRoomItem>();

  const onSubmit = async (item: DealRoomItem) => {
    setIsLoading(true);
    mutation.mutate(item, {
      onSettled: () => {
        setIsLoading(false);
        onAction(item);
      },
    });
  };

  type Selects = {
    Component: typeof GenericControlledSelect;
    key: string;
    props: GenericControlledSelectProps<
      GenericLabelValueObject,
      true,
      DealRoomItem
    >;
  };

  type TextAreas = {
    Component: typeof TextArea;
    key: string;
    props: TextAreaProps & { name: string };
  };

  const inputs: Array<Selects | TextAreas> = [
    {
      Component: GenericControlledSelect,
      key: "labels",
      props: {
        identifier: "labels",
        label: "Labels",
        options: labels[0]?.options,
        control,
        rules: { required: required("Labels") },
        isMulti: true,
        onChange: (options: GenericLabelValueObject[]) => {
          setValue("labels", options);
        },
      },
    },
    {
      Component: TextArea,
      key: "notes",
      props: {
        name: "notes",
        label: "Notes",
        ...register("notes"),
      },
    },
  ];
  return (
    <form
      className="acq-add-new-file__modal-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Modal.Body>
        <div className="flex flex-col gap-5">
          {inputs.map((input) => {
            const { Component, key, props } = input;
            return (
              <Component
                key={key}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                {...(props as any)}
                error={errors?.[key]?.message}
              />
            );
          })}
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
