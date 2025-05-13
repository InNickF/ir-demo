import { useButtonGroupFilters } from "@/commons/hooks/useButtonGroupFilters";
import { ButtonGroup } from "in-ui-react";
import { FC, useState } from "react";
import { LoanModalFormProps } from "../../types";
import { EditLoanContractForm } from "./EditLoanContractForm";
import { EditLoanForm } from "./EditLoanForm";
import { EditLoanStatusForm } from "./EditLoanStatusForm";
import { EditLoanCapForm } from "./EditLoanCapForm";

const formViews = [
  {
    label: "Loan Status",
    value: "status",
    form: EditLoanStatusForm,
  },
  {
    label: "Loan Cap",
    value: "chatham-cap",
    form: EditLoanCapForm,
  },
  {
    label: "Loan information",
    value: "abstract-file",
    form: EditLoanForm,
  },
  {
    label: "Loan Contract",
    value: "contract-file",
    form: EditLoanContractForm,
  },
] as const;

export const EditLoanAndLoanContractForm: FC<LoanModalFormProps> = ({
  onAction,
  className,
  ...props
}) => {
  const [showButtonGroup, setShowButtonGroup] = useState(true);

  const { currentActiveFilter, isHidden, items } = useButtonGroupFilters({
    filters: formViews.map((view) => view.value),
  });

  const getButtonGroupSectionClasses = (): string => {
    const classes = ["debt-loan-modal-form__button-group"];
    !showButtonGroup && classes.push("hidden");
    return classes.join(" ");
  };

  const preOnAction: typeof onAction = (form) => {
    setShowButtonGroup(false);
    currentActiveFilter === "contract-file" && onAction(form);
  };

  const getClasses = (value: typeof formViews[number]["value"]) => {
    return [className, isHidden(value)].filter(Boolean).join(" ");
  };

  return (
    <section>
      <div className={getButtonGroupSectionClasses()}>
        <ButtonGroup flex active={currentActiveFilter} items={items} />
      </div>
      {formViews.map((view) => {
        const Form = view.form;
        return (
          <Form
            key={view.value}
            {...props}
            onAction={preOnAction}
            className={getClasses(view.value)}
          />
        );
      })}
    </section>
  );
};
