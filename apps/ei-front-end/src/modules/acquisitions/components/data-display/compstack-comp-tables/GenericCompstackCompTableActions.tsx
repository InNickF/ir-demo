import { TableAction } from "@/commons/components/general/TableAction";
import {
  EyeIcon,
  MinusIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { FC } from "react";

interface TableActionsProps {
  isLinked?: boolean;
  onShow?: () => void;
  onUnlink?: () => void;
  isOnUnlinkLoading?: boolean;
  onLink?: () => void;
  isOnLinkLoading?: boolean;
}

export const GenericCompstackCompTableActions: FC<TableActionsProps> = ({
  onShow,
  onUnlink,
  isLinked,
  onLink,
  isOnUnlinkLoading,
  isOnLinkLoading,
}) => {
  return (
    <div className="flex">
      {onShow ? (
        <TableAction
          tooltip="Show comp information"
          icon={<EyeIcon />}
          onClick={() => onShow()}
        />
      ) : null}

      {isLinked ? (
        <TableAction
          tooltip="Unlink comp"
          loading={isOnUnlinkLoading}
          icon={<MinusIcon />}
          disabled
          onClick={() => onUnlink()}
        />
      ) : null}

      {!isLinked ? (
        <TableAction
          tooltip="Link comp"
          loading={isOnLinkLoading}
          icon={<PlusCircleIcon />}
          disabled
          onClick={() => onLink()}
        />
      ) : null}
    </div>
  );
};
