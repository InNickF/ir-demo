import { GenericLabelValueObject } from "@/commons/typings";
import { required } from "@/commons/utils/input-validations";
import { DebtLoanRoomItem } from "@/modules/debt/typings/loans";
import { Button, Modal } from "in-ui-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { LoanRoomAttachmentTypesSelect } from "../components/LoanRoomAttachmentTypesSelect";
import "../styles.css";
import { LoanRoomFormProps } from "../types";

export const EditFileForm: FC<LoanRoomFormProps> = ({
  item,
  useMutation,
  onAction,
  onCancel,
}) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<DebtLoanRoomItem>({
    defaultValues: { ...item },
  });

  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation<DebtLoanRoomItem>();

  const onSubmit = async (item: DebtLoanRoomItem) => {
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
      className="debt-add-new-file__modal-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Modal.Body>
        <div className="flex flex-col gap-5">
          <LoanRoomAttachmentTypesSelect
            identifier="type"
            label="Attachment Type"
            control={control}
            rules={{ required: required("Types") }}
            onChange={(options: GenericLabelValueObject) => {
              setValue("type", options);
            }}
            error={errors?.type?.message}
          />
        </div>
      </Modal.Body>
      <footer className="debt-loan-room-form-footer">
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
