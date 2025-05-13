import { ellipseText } from "@/commons/model-in/formatters/utils";
import { Heading, Size, Tooltip } from "in-ui-react";
import React, { FC, useState } from "react";

interface ElementProps {
  title: string;
  value: string;
  size?: Size;
  showLongContent?: boolean;
}
export const Element: FC<ElementProps> = ({
  title,
  value,
  size = "normal",
  showLongContent = false,
}) => {
  const [showCompleteValue, setShowCompleteValue] = useState(false);
  const mustShowRawValue = showCompleteValue || showLongContent;

  const { formattedValue, isLongTextValue, original } = ellipseText({
    value,
    mustShowRawValue,
  });

  const hideTooltip =
    (isLongTextValue && showCompleteValue) || !isLongTextValue;

  const getClasses = (): string => {
    const classes = [
      "flex",
      "justify-between",
      "items-center",
      "gap-4",
      "px-4",
      "border-0.5",
      "border-[var(--table-border-color)]",
      "transition",
      "ease-in-out",
      "hover:bg-[var(--table-row-color-hover)]",
    ];
    const sizeClasses: Record<Size, string> = {
      big: "py-4",
      normal: "py-2",
      small: "py-1",
    };
    classes.push(sizeClasses[size || "normal"]);
    return classes.join(" ");
  };

  const getParagraphClasses = (): string => {
    const classes = ["text-right"];
    isLongTextValue && classes.push("cursor-pointer");
    return classes.join(" ");
  };

  const toggleText = () => {
    isLongTextValue && setShowCompleteValue((prev) => !prev);
  };

  return (
    <li className={getClasses()}>
      <Heading kind="subtitle-1">{title}</Heading>
      <Tooltip content={original} hidden={hideTooltip}>
        <p className={getParagraphClasses()} onClick={toggleText}>
          {formattedValue}
        </p>
      </Tooltip>
    </li>
  );
};
