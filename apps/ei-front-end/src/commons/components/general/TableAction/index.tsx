import { Button, ButtonProps, Tooltip, TooltipProps } from "in-ui-react";
import { FC } from "react";

export const TableAction: FC<
  ButtonProps<"button"> & {
    icon: ButtonProps<"button">["icon"];
    onClick: ButtonProps<"button">["onClick"];
    tooltip: TooltipProps["content"];
    tooltipOptions?: TooltipProps["options"];
  }
> = ({ tooltip, icon, tooltipOptions, className, ...props }) => {
  const getClasses = () => {
    const classNames = ["p-3"];
    className && classNames.push(className);
    return classNames.join(" ");
  };
  return (
    <Tooltip content={tooltip} options={tooltipOptions}>
      <Button
        size="small"
        onlyIcon
        icon={icon}
        kind="ghost"
        className={getClasses()}
        {...props}
      />
    </Tooltip>
  );
};
