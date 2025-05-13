import { required } from "@/commons/utils/input-validations";
import { LocalDealRoomItem } from "@/acquisitions/typings/deals";
import { Button, Input, InputProps, Modal } from "in-ui-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { LocalDealRoomFormProps } from "../types";
import "../styles.css";

export const DeleteLocalFileForm: FC<LocalDealRoomFormProps> = ({
  actionText,
  cancelText,
  item,
  onAction,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LocalDealRoomItem>({
    defaultValues: { ...item },
  });

  const onSubmit = async (data: LocalDealRoomItem) => {
    onAction(data);
  };

  type Inputs = {
    Component: typeof Input;
    props: InputProps & { name: keyof LocalDealRoomItem };
  };

  const inputs: Array<Inputs> = [
    {
      Component: Input,
      props: {
        label: "File",
        name: "file",
        type: "hidden",
        className: "hidden",
        ...register("file", {
          required: required("A file"),
        }),
      },
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal.Body>
        {inputs.map((input) => {
          const { Component, props } = input;
          return (
            <Component
              key={props.name}
              {...props}
              error={errors?.[props.name]?.message as string}
            />
          );
        })}
        <strong className="inline-block mb-4 ">
          Are you sure you want to delete this file?
        </strong>
      </Modal.Body>
      <footer className="acq-create-local-file__form-footer">
        <Button className="w-full" block kind="ghost" onClick={onCancel}>
          {cancelText}
        </Button>
        <Button className="w-full" block type="submit" disabled color="error">
          {actionText}
        </Button>
      </footer>
    </form>
  );
};
