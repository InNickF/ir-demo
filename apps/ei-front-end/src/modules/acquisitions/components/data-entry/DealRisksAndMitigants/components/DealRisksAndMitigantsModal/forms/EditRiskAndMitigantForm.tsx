import { DealRisksAndMitigants } from "@/acquisitions/typings/deals";
import { required } from "@/commons/utils/input-validations";
import { Button, Modal, TextArea } from "in-ui-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import "../styles.css";
import { DealRisksAndMitigantsFormProps } from "../types";

export const EditRiskAndMitigantForm: FC<DealRisksAndMitigantsFormProps> = ({
  item,
  useMutation,
  onAction,
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

  return (
    <form
      className="acq-deal-risks-and-mitigants-form__modal"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Modal.Body>
        <div className="flex flex-col gap-5">
          <TextArea
            label="Risk"
            {...register("risk", {
              required: required("risk"),
            })}
            rows={5}
            error={errors?.risk?.message}
          />
          <TextArea
            label="Mitigant"
            {...register("mitigant", {
              required: required("mitigant"),
            })}
            rows={5}
            error={errors?.mitigant?.message}
          />
        </div>
      </Modal.Body>
      <footer className="acq-deal-risks-and-mitigants-form__footer">
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
