import { useButtonGroupFilters } from "@/commons/hooks/useButtonGroupFilters";
import { ButtonGroup, Card } from "in-ui-react";
import { FC } from "react";
import { ListValidationForm } from "./components/ListValidationForm";
import { SinglePropertyValidationForm } from "./components/SinglePropertyValidationForm";
import "./styles.css";

interface ValidationFormProps {
  className?: string;
}

export const validationFormCSSPrefix = "plv-validation-form";
const validationForms = [
  {
    key: "list-of-properties",
    form: ListValidationForm,
  },
  {
    key: "single-property",
    form: SinglePropertyValidationForm,
  },
] as const;

export const ValidationForm: FC<ValidationFormProps> = ({ className }) => {
  const getContainerClasses = (): string => {
    const classes = [`${validationFormCSSPrefix}-container`];
    className && classes.push(className);
    return classes.join(" ");
  };

  const { currentActiveFilter, isHidden, items } = useButtonGroupFilters({
    filters: validationForms.map((view) => view.key),
  });

  return (
    <section className={getContainerClasses()}>
      <Card className={validationFormCSSPrefix} padding={false}>
        <header className={`${validationFormCSSPrefix}__header`}>
          <ButtonGroup
            className={`${validationFormCSSPrefix}__button-group`}
            active={currentActiveFilter}
            items={items}
            flex
          />
        </header>
        {validationForms.map((view) => {
          const Form = view.form;
          return <Form key={view.key} className={isHidden(view.key)} />;
        })}
      </Card>
    </section>
  );
};
