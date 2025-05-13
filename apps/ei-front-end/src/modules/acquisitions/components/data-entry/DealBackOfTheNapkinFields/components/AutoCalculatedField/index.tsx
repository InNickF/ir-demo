import { genericNoDataText } from "@/commons/model-in/formatters/utils";
import { Heading } from "in-ui-react";
import { FC } from "react";
import "./styles.css";

interface AutoCalculatedFieldProps {
  value?: string;
  label: string;
}

export const AutoCalculatedField: FC<AutoCalculatedFieldProps> = ({
  value,
  label,
}) => {
  const getClasses = () => {
    const classes = ["acq-botn-readonly-value"];
    value === genericNoDataText &&
      classes.push("acq-botn-readonly-value--empty");
    return classes.join(" ");
  };

  return (
    <div className={getClasses()}>
      <Heading kind="subtitle-2" className="opacity-80">
        {label}
      </Heading>
      <p className="text-2xl 2xl:text-3xl">{value}</p>
    </div>
  );
};
