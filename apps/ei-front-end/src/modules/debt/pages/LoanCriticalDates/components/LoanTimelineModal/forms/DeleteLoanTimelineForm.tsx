import { DebtLoanTimeline } from "@/modules/debt/typings/loans";
import { Button, Modal } from "in-ui-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import "../styles.css";
import { LoanTimelineFormProps } from "../types";

export const DeleteLoanTimelineForm: FC<LoanTimelineFormProps> = ({
  actionText,
  cancelText,
  item,
  onAction,
  useMutation,
  onCancel,
}) => {
  const { handleSubmit } = useForm<DebtLoanTimeline>({
    defaultValues: { ...item },
  });
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation<DebtLoanTimeline>();

  const onSubmit = async (item: DebtLoanTimeline) => {
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
      className="acq-add-new-file__modal-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Modal.Body>
        <strong className="inline-block mb-4 ">
          Are you sure you want to delete this critical date?
        </strong>
      </Modal.Body>
      <footer className="acq-deal-room-form-footer">
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
