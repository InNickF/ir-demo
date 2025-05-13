import { XMarkIcon } from "@heroicons/react/24/outline";
import { forwardRef } from "react";
import { Tooltip } from "../../feedback/Tooltip";
import { Button } from "../../general/Button";
import { ButtonProps } from "../../general/Button/props";
import { TagProps } from "./props";

import "./styles.css";

/**
 * In UI Tag Component
 * @see {@link https://todo.com/} for official documentation.
 * @param color
 * Default: 'primary' |
 * Specifies tag color.
 * @param className
 * Default: null |
 * You can use this prop to send a string with your custom css classes.
 * @param size
 * Default: 'normal' |
 * Specifies the tag size with a string.
 * @param icon
 * Default: "x-mark" |
 * Send the inUI icon name, this button will manage it.
 * @param iconPosition
 * Default: 'left' |
 * Specifies the icon position in the tag, it could be 'right' or 'left'.
 * @param action
 * Default: null |
 * You can use this prop to send a function event to the tag.
 * @param id
 * This props is the identifier for the tag
 * @param text
 * Specifies the tag content.
 * @param textSliceLength
 * Specifies the tag content slice length.
 * @param circle
 * Turn tag into a circle
 * @interface TagProps
 * Specifies the slice condition length.
 * @returns
 * A inUI Tag react component
 */
export const Tag = forwardRef<HTMLElement, TagProps>(
  (
    {
      id,
      color = "primary",
      className,
      action,
      icon = <XMarkIcon />,
      iconPosition = "right",
      size = "normal",
      text,
      textSliceLength = 12,
      circle,
      ...props
    },
    ref
  ) => {
    const prefix = "in-ui-tag";

    const getClasses = (): string => {
      const classes: string[] = [
        `${prefix}`,
        `${prefix}--${color}`,
        `${prefix}--${size}-size`,
      ];

      classes.push(`${prefix}--${iconPosition}-icon`);
      circle && classes.push(`${prefix}--circle`);
      action && classes.push("in-ui-tag--action");
      className && classes.push(className);
      return classes.join(" ");
    };

    const textLength = text?.length;
    const isLongText = textLength > textSliceLength;
    const sliceText = (text: string): string => {
      return isLongText ? text?.slice(0, textSliceLength)?.concat("...") : text;
    };

    return (
      <Tooltip
        className={`${!isLongText && "in-ui-tag__tooltip--hidden"}`}
        content={text}
      >
        <span id={id} className={getClasses()} ref={ref} {...props}>
          <p className={`${prefix}-text`}>{sliceText(text)}</p>
          <TagButton
            action={action}
            icon={icon}
            prefix={prefix}
            id={id}
            kind={color === "primary" ? "ghost" : "solid"}
            size={size}
            color={color}
          />
        </span>
      </Tooltip>
    );
  }
);

type TagButtonProps = Pick<
  TagProps,
  "action" | "icon" | "id" | "size" | "color"
> & {
  prefix: string;
} & Pick<ButtonProps<"button">, "kind">;
const TagButton = ({
  action,
  icon,
  prefix,
  color,
  size,
  kind,
  id,
}: TagButtonProps) => {
  return action ? (
    <Button
      className={`${prefix}-icon`}
      onClick={() => action(id)}
      icon={icon}
      onlyIcon
      kind={kind}
      size={size}
      color={color}
    />
  ) : null;
};

Tag.displayName = "Tag";
