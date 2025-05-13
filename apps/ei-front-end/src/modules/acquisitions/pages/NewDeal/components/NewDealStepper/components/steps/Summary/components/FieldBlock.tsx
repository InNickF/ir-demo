import { GenericLabelValueObject } from "@/commons/typings";
import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";
import { Heading } from "in-ui-react";
import { FC } from "react";
import { FieldValues } from "./FieldValues";

interface FieldBlockProps {
  label: string;
  value: string | number | GenericLabelValueObject;
}

export const FieldBlock: FC<FieldBlockProps> = ({ label, value }) => {
  const extendedFields = ["Deal Summary", "Specs and Notes"];
  return (
    <div
      key={label}
      className={
        extendedFields.includes(label)
          ? "acq-default-form-grid__item--span-full"
          : undefined
      }
    >
      <Heading kind="h5">
        {convertToTitleCase(humanizeSnakeCase(label))}
      </Heading>
      <FieldValues label={label} value={value} />
    </div>
  );
};
