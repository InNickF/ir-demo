import { DealRisksAndMitigantsPayload } from "@/acquisitions/typings/deals";
import { required } from "@/commons/utils/input-validations";
import { Button, Modal, TextArea } from "in-ui-react";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import "../styles.css";
import { DealRisksAndMitigantsFormProps } from "../types";

export const CreateRiskAndMitigantForm: FC<DealRisksAndMitigantsFormProps> = ({
  useMutation,
  onAction,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DealRisksAndMitigantsPayload>({
    mode: "all",
  });

  const router = useRouter();
  const { dealId } = router.query;

  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation<DealRisksAndMitigantsPayload>();

  const onSubmit = async (item: DealRisksAndMitigantsPayload) => {
    setIsLoading(true);
    const tenantInformationWithDeal = {
      ...item,
      deal: dealId as string,
    };
    mutation.mutate(tenantInformationWithDeal, {
      onSettled: () => {
        setIsLoading(false);
        onAction(tenantInformationWithDeal);
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
            rows={5}
            {...register("risk", {
              required: required("risk"),
            })}
            error={errors?.risk?.message}
          />
          <TextArea
            label="Mitigant"
            rows={5}
            {...register("mitigant", {
              required: required("mitigant"),
            })}
            error={errors?.mitigant?.message}
          />
        </div>
      </Modal.Body>
      <footer className="acq-deal-risks-and-mitigants-form__footer">
        <Button
          block
          kind="ghost"
          disabled={isLoading}
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
