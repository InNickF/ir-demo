import { TableAction } from "@/commons/components/general/TableAction";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

interface LocalDealRoomTableActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const LocalDealRoomTableActions: FC<LocalDealRoomTableActionsProps> = ({
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex">
      <TableAction tooltip="Edit" icon={<PencilIcon />} onClick={onEdit} />
      <TableAction tooltip="Delete" icon={<XMarkIcon />} onClick={onDelete} />
    </div>
  );
};
