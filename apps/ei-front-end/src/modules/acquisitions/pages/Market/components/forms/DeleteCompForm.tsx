import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { required } from "@/commons/utils/input-validations";
import { Comp } from "@/acquisitions/typings/market-analytics";
import { Button, Input, InputProps, Modal } from "in-ui-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { CompFormProps } from "../../types";
import "./styles.css";

export const DeleteCompForm: FC<CompFormProps> = ({
  actionText,
  cancelText,
  comp,
  onAction,
  onCancel,
  useMutation,
}) => {
  type Payload = { id: string };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Payload>({
    defaultValues: { id: comp?.id },
  });

  const [isLoading, setIsLoading] = useState(false);
  const mutation = useMutation<Comp>();

  const onSubmit = async (data: Payload) => {
    setIsLoading(true);
    mutation.mutate(data as Comp, {
      onSettled: () => {
        setIsLoading(false);
        onAction();
      },
    });
  };

  type Inputs = {
    Component: typeof Input;
    props: InputProps & { name: keyof Comp };
  };

  const inputs: Array<Inputs> = [
    {
      Component: Input,
      props: {
        label: "Id",
        name: "id",
        type: "hidden",
        className: "hidden",
        ...register("id", {
          required: required("Id"),
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
              error={errors?.[props.name]?.message}
            />
          );
        })}
        <strong className="inline-block mb-4 ">
          Are you sure you want to delete this comp?
        </strong>
        <ul className="acq-delete-comp-detail">
          <li>
            <strong>Address:</strong> {genericGetValue(comp?.address)}
          </li>
          <li>
            <strong>Type:</strong> {genericGetValue(comp?.type)}
          </li>
          <li>
            <strong>Submarket:</strong> {genericGetValue(comp?.submarket)}
          </li>
          <li>
            <strong>Date:</strong> {genericGetValue(comp?.date)}
          </li>
          <li>
            <strong>Notes:</strong> {genericGetValue(comp?.notes)}
          </li>
        </ul>
      </Modal.Body>
      <footer className="acq-comps-form-footer">
        <Button
          className="w-full"
          block
          kind="ghost"
          onClick={onCancel}
          disabled={isLoading}
        >
          {cancelText}
        </Button>
        <Button
          className="w-full"
          block
          loading={isLoading}
          type="submit"
          color="error"
          disabled
        >
          {actionText}
        </Button>
      </footer>
    </form>
  );
};
