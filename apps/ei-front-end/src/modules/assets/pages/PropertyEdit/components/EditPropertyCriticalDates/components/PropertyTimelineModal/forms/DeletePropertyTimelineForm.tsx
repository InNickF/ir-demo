import { PropertyTimeline } from "@/modules/assets/typings/property";
import { Button, Modal } from "in-ui-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import "../styles.css";
import { PropertyTimelineFormProps } from "../types";

export const DeletePropertyTimelineForm: FC<PropertyTimelineFormProps> = ({
  actionText,
  cancelText,
  item,
  onAction,
  useMutation,
  onCancel,
}) => {
  const { handleSubmit } = useForm<PropertyTimeline>({
    defaultValues: { ...item },
  });

  const mutation = useMutation<PropertyTimeline>();

  const onSubmit = async (item: PropertyTimeline) => {
    mutation.mutate(item, {
      onSettled: () => {
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
        <Button
          block
          type="submit"
          color="error"
          disabled
          loading={mutation?.isLoading}
        >
          {actionText}
        </Button>
      </footer>
    </form>
  );
};
