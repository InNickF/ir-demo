import { ExtendedDealInformation } from "@/modules/acquisitions/typings/deals";
import { Input } from "in-ui-react";
import { FC, useEffect, useRef } from "react";
import { RegisterOptions } from "react-hook-form";
import { QuickDealsForm } from "../QuickDealsForm";
import { QuickDealsFormProps } from "../props";
import "./styles.css";

interface GenericQuickDealsFormProps
  extends Omit<QuickDealsFormProps, "children"> {
  name: keyof ExtendedDealInformation;
  placeholder?: string;
  type?: JSX.IntrinsicElements["input"]["type"];
  className?: string;
  registerOptions?: RegisterOptions;
}
export const GenericQuickDealsForm: FC<GenericQuickDealsFormProps> = ({
  name,
  placeholder,
  type,
  className,
  registerOptions,
  ...props
}) => {
  const prefix = "acq-deals-generic-quick-form";
  const getClasses = () => {
    const classes = [`${prefix}__input`];
    className && classes.push(className);
    return classes.join(" ");
  };

  const input = useRef<HTMLInputElement>(null);

  useEffect(function focusOnlyOnMount() {
    input.current?.focus();
  }, []);

  return (
    <QuickDealsForm {...props}>
      {({ form }) => {
        const { ref, ...rest } = form.register(name, registerOptions);
        return (
          <>
            <Input
              ref={(e) => {
                ref(e);
                input.current = e;
              }}
              {...rest}
              placeholder={placeholder}
              type={type}
              className={getClasses()}
              error={form.formState.errors[name]?.message}
            />
          </>
        );
      }}
    </QuickDealsForm>
  );
};
