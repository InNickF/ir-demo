import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Tooltip } from "in-ui-react";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";
import "./styles.css";

interface ChatBarItemProps extends PropsWithChildren {
  href: string;
  isActive?: boolean;
  onDelete?: () => void;
  tooltip?: string;
}
const prefix = "insight-chat-bar__item";
export const ChatBarItem: FC<ChatBarItemProps> = ({
  href,
  onDelete,
  children,
  isActive,
  tooltip,
}) => {
  const getClasses = (): string => {
    const classes = [prefix];
    isActive && classes.push(`${prefix}--active`);
    onDelete && classes.push(`${prefix}--deletable`);
    return classes.join(" ");
  };

  return (
    <div className={getClasses()}>
      <Link href={href}>
        <a title={tooltip}>{children}</a>
      </Link>
      {onDelete ? (
        <Tooltip content="Remove Conversation">
          <Button
            className={`${prefix}__delete-button`}
            kind="ghost"
            onlyIcon
            size="small"
            icon={<XMarkIcon />}
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          />
        </Tooltip>
      ) : null}
    </div>
  );
};
