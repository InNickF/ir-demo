import {
  Trigger as RTrigger,
  Link as RLink,
} from "@radix-ui/react-navigation-menu";
import { FC, forwardRef } from "react";
import { Icon } from "../../../../general/Icon";
import { AsElement, PolymorphicRef } from "../../../../utils/types";
import { ButtonIconProps, LabelProps } from "../../props";
import "./styles.css";
/**
 * In UI Label Component
 * @see {@link https://todo.com/} for official documentation.
 * @param as
 * Default: null |
 * Specifies render element, can be a html type or component type
 * @param icon
 * Set the inUI icon name.
 * @param active
 * Default: false |
 * Set the component state to active
 * @param label
 * Specifies the text to show as content header
 * @param isTrigger
 * Default: false |
 * To show the viewport tooltip body
 * @returns
 * A inUI Label react component
 */

type LabelComponent = <C extends AsElement>(
  props: LabelProps<C>
) => React.ReactElement | null;

const prefix = "in-ui-dock-item__label";

const ButtonIcon: FC<ButtonIconProps> = ({ icon }) => {
  return (
    <div className={`${prefix}--icon`}>
      <Icon svg={icon} />
    </div>
  );
};

export const DockLabel: LabelComponent = forwardRef(function Label<
  C extends AsElement
>(
  {
    as,
    icon,
    label,
    active = false,
    isTrigger = false,
    ...props
  }: LabelProps<C>,
  ref?: PolymorphicRef<C>
) {
  const getClasses = (): string => {
    const classes: string[] = [`${prefix}`];
    active && classes.push(`${prefix}--active`);
    return classes.join(" ");
  };

  const RenderElement = as || "button";

  return isTrigger ? (
    <RTrigger asChild className={getClasses()}>
      <RenderElement ref={ref} {...props}>
        <ButtonIcon icon={icon} />
        <p>{label}</p>
      </RenderElement>
    </RTrigger>
  ) : (
    <RLink asChild className={getClasses()}>
      <RenderElement ref={ref} {...props}>
        <ButtonIcon icon={icon} />
        <p>{label}</p>
      </RenderElement>
    </RLink>
  );
});
