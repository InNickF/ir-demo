import { GenericLabelValueObject } from "@/commons/typings";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { Card } from "in-ui-react";
import { FC } from "react";
import sanitizeHtml from "sanitize-html";

interface FieldValuesProps {
  label: string;
  value: string | number | GenericLabelValueObject;
}

export const FieldValues: FC<FieldValuesProps> = ({ label, value }) => {
  if (label === "Deal Summary" && typeof value === "string") {
    return (
      <Card
        className="mt-2"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(value),
        }}
      ></Card>
    );
  }

  if (typeof value === "string") {
    return <p className="font-bold">{genericGetValue(value, true)}</p>;
  }

  if (typeof value === "number") {
    return <p className="font-bold">{genericGetValue(value?.toString())}</p>;
  }

  return <p className="font-bold">{genericGetValue(value?.label)}</p>;
};
