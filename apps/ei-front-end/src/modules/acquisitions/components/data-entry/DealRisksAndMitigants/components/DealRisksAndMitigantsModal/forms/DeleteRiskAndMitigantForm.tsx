import { required } from "@/commons/utils/input-validations";
import { DealRisksAndMitigants } from "@/acquisitions/typings/deals";
import { Button, Input, InputProps, Modal } from "in-ui-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { DealRisksAndMitigantsFormProps } from "../types";
import "../styles.css";

export const DeleteRiskAndMitigantForm: FC<DealRisksAndMitigantsFormProps> = ({
  actionText,
  cancelText,
  item,
  onAction,
  useMutation,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DealRisksAndMitigants>({
    defaultValues: { ...item },
  });
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation<DealRisksAndMitigants>();

  const onSubmit = async (item: DealRisksAndMitigants) => {
    setIsLoading(true);
    mutation.mutate(item, {
      onSettled: () => {
        setIsLoading(false);
        onAction(item);
      },
    });
  };

  type Inputs = {
    Component: typeof Input;
    props: InputProps & { name: keyof DealRisksAndMitigants };
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
    <form
      className="acq-deal-risks-and-mitigants-form__modal"
      onSubmit={handleSubmit(onSubmit)}
    >
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
          Are you sure you want to delete this risk and mitigant?
        </strong>
      </Modal.Body>
      <footer className="acq-deal-risks-and-mitigants-form__footer">
        <Button block kind="ghost" onClick={onCancel}>
          {cancelText}
        </Button>
        <Button block type="submit" color="error" disabled loading={isLoading}>
          {actionText}
        </Button>
      </footer>
    </form>
  );
};
