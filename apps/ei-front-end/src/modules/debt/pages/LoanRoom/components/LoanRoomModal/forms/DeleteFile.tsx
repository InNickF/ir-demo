import { DebtLoanRoomItem } from "@/modules/debt/typings/loans";
import { Button, Modal } from "in-ui-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import "../styles.css";
import { LoanRoomFormProps } from "../types";

export const DeleteFileForm: FC<LoanRoomFormProps> = ({
  actionText,
  cancelText,
  item,
  onAction,
  useMutation,
  onCancel,
}) => {
  const { handleSubmit } = useForm<DebtLoanRoomItem>({
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
        <strong className="inline-block mb-4 ">
          Are you sure you want to delete this file?
        </strong>
      </Modal.Body>
      <footer className="debt-loan-room-form-footer">
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
