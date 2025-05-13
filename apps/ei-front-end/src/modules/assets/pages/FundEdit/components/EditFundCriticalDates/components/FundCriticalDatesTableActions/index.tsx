import { TableAction } from "@/commons/components/general/TableAction";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

interface FundCriticalDatesTableActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const FundCriticalDatesTableActions: FC<
  FundCriticalDatesTableActionsProps
> = ({ onEdit, onDelete }) => {
  return (
    <>
      <TableAction tooltip="Edit" icon={<PencilIcon />} onClick={onEdit} />
      <TableAction tooltip="Delete" icon={<XMarkIcon />} onClick={onDelete} />
    </>
  );
};
