import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { Heading } from "in-ui-react";
import { ReactNode } from "react";
import "./styles.css";

interface LabelValueProps<T extends ReactNode> {
  label: string;
  value: T;
  className?: string;
}

export const LabelValue = <T extends ReactNode>({
  label,
  value,
  className,
}: LabelValueProps<T>) => {
  const getClasses = (): string => {
    const classes = ["label-value-component"];
    className && classes.push(className);
    return classes.join(" ");
  };

  return (
    <div className={getClasses()}>
      <Heading kind="subtitle-2" sans className="label-value-component__label">
        {convertToTitleCase(label)}
      </Heading>
      {typeof value === "string" || typeof value === "number" ? (
        <p className="label-value-component__value">{value}</p>
      ) : (
        value
      )}
    </div>
  );
};
