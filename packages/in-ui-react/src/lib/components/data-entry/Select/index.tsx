import { FC, forwardRef, PropsWithChildren, Ref, useId, useMemo } from "react";
import { default as RSelect, GroupBase } from "react-select";
import { Label } from "../Label";
import { Icon } from "../../general/Icon";
import { HelperText } from "../HelperText";
import { IconProps } from "../../general/Icon/props";
import { SelectProps } from "./props";
import { LoadingLine } from "../../feedback/LoadingLine";
import { default as ISelect } from "react-select/dist/declarations/src/Select";
import Creatable from "react-select/creatable";
import "./styles.css";

const SelectComponent = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  {
    label,
    className,
    error,
    tooltip,
    name,
    id,
    placeholder = "Select an option.",
    hint,
    icon,
    iconTitle,
    isDisabled,
    disabled,
    loading,
    color = "default",
    required,
    isCreatable,
    ...props
  }: SelectProps<Option, IsMulti, Group>,
  ref: Ref<ISelect<Option, IsMulti, Group>>
) => {
  const prefix = "in-ui-select";
  const getClasses = (): string => {
    const classes: string[] = [`${prefix}`];
    error && classes.push(`${prefix}--error`);
    (disabled || isDisabled) && classes.push(`${prefix}--disabled`);
    color !== "default" && classes.push(`${prefix}--${color}`);
    className && classes.push(className);
    return classes.join(" ");
  };

  const uniqueId = useId();
  const getId = () => {
    if (id) {
      return id;
    }
    if (!id && name) {
      return name;
    }
    return uniqueId;
  };

  const InputLabel = () => {
    return (
      <>
        {label && (
          <Label required={required} tooltip={tooltip} htmlFor={getId()}>
            {label}
          </Label>
        )}
      </>
    );
  };
  const MemoInputLabel = useMemo(() => InputLabel, [label, tooltip]);

  const InputIcon = ({
    svg,
    className,
  }: {
    svg: IconProps["svg"];
    className: string;
  }) => {
    return (
      <Icon
        svg={svg}
        color={error ? "error" : undefined}
        className={`${className} ${prefix}-icon`}
        hoverTransition
      />
    );
  };
  const LeftIcon = () => {
    return (
      <>{icon && <InputIcon className={`${prefix}__left-icon`} svg={icon} />}</>
    );
  };
  const MemoIcon = useMemo(() => LeftIcon, [icon, iconTitle]);

  const InputError = () => {
    return (
      <>
        {error && (
          <HelperText className={`${prefix}__error-helper`} color="error">
            {error}
          </HelperText>
        )}
      </>
    );
  };
  const InputHint = () => {
    return (
      <>
        {hint && (
          <HelperText className={`${prefix}__helper`}>{hint}</HelperText>
        )}
      </>
    );
  };

  const HintContainer: FC<PropsWithChildren> = ({ children }) => {
    return (
      <>
        {hint || error ? (
          <div className={`${prefix}__hint__container`}>{children}</div>
        ) : null}
      </>
    );
  };

  const Loader = () => {
    return loading ? <LoadingLine /> : null;
  };

  const MemoLoading = useMemo(() => Loader, [loading]);

  const MemoSelect = useMemo(() => {
    if (isCreatable) {
      return Creatable;
    }
    return RSelect;
  }, [isCreatable]);

  return (
    <div className={getClasses()}>
      <MemoInputLabel />
      <div>
        <MemoLoading />
        <div className={`${prefix}__container`}>
          <MemoIcon />
          <MemoSelect
            id={getId()}
            name={name}
            ref={ref}
            isDisabled={isDisabled || disabled}
            placeholder={placeholder}
            classNamePrefix={`${prefix}-element`}
            {...props}
          />
        </div>
      </div>
      <HintContainer>
        <InputHint />
        <InputError />
      </HintContainer>
    </div>
  );
};

export const Select = forwardRef(SelectComponent) as typeof SelectComponent;
