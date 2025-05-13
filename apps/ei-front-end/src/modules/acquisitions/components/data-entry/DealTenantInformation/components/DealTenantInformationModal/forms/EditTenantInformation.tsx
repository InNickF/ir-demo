import { DealTenantInformation } from "@/acquisitions/typings/deals";
import { required } from "@/commons/utils/input-validations";
import { Button, Input, Modal } from "in-ui-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { TenantInformationMemoizedEditor } from "../components/TenantInformationMemoizedEditor";
import "../styles.css";
import { DealTenantInformationFormProps } from "../types";

export const EditTenantInformationForm: FC<DealTenantInformationFormProps> = ({
  item,
  useMutation,
  onAction,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DealTenantInformation>({
    defaultValues: { ...item },
  });

  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation<DealTenantInformation>();

  const onSubmit = async (item: DealTenantInformation) => {
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
            memoDependency={item.description}
          />
        </div>
      </Modal.Body>
      <footer className="acq-deal-tenant-information-form__footer">
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
