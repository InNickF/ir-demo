import { TableAction } from "@/commons/components/general/TableAction";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FC } from "react";
interface DealRoomTableActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const DealRoomTableActions: FC<DealRoomTableActionsProps> = ({
  onEdit,
  onDelete,
}) => {
  return (
    <>
      <TableAction tooltip="Edit" icon={<PencilIcon />} onClick={onEdit} />
      <TableAction tooltip="Delete" icon={<XMarkIcon />} onClick={onDelete} />
    </>
  );
};
