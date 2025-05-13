import { TableAction } from "@/commons/components/general/TableAction";
import { EyeIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

interface DealTenantInformationTableActionsProps {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  readOnly?: boolean;
}

export const DealTenantInformationTableActions: FC<
  DealTenantInformationTableActionsProps
> = ({ onView, onEdit, onDelete, readOnly }) => {
  return (
    <>
      <TableAction tooltip="View" icon={<EyeIcon />} onClick={onView} />
      {!readOnly ? (
        <>
          <TableAction tooltip="Edit" icon={<PencilIcon />} onClick={onEdit} />
          <TableAction
            tooltip="Delete"
            icon={<XMarkIcon />}
            onClick={onDelete}
          />
        </>
      ) : null}
    </>
  );
};
