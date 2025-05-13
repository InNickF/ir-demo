import { DealTenantInformationPayload } from "@/acquisitions/typings/deals";
import { required } from "@/commons/utils/input-validations";
import { Button, Input, Modal } from "in-ui-react";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { TenantInformationMemoizedEditor } from "../components/TenantInformationMemoizedEditor";
import "../styles.css";
import { DealTenantInformationFormProps } from "../types";

export const CreateTenantInformationForm: FC<
  DealTenantInformationFormProps
> = ({ useMutation, onAction, onCancel }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DealTenantInformationPayload>({
    mode: "all",
  });

  const router = useRouter();
  const { dealId } = router.query;

  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation<DealTenantInformationPayload>();

  const onSubmit = async (item: DealTenantInformationPayload) => {
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
      className="acq-deal-tenant-information-form__modal"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Modal.Body>
        <div className="flex flex-col gap-5">
          <Input
            label="Tenant Name"
            {...register("name", {
              required: required("Name"),
            })}
            error={errors?.name?.message}
          />
          <TenantInformationMemoizedEditor
            fieldName="description"
            register={register}
            setValue={setValue}
            error={errors?.description?.message}
          />
        </div>
      </Modal.Body>
      <footer className="acq-deal-tenant-information-form__footer">
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
