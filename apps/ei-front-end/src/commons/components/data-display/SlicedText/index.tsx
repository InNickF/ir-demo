import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { Tooltip } from "in-ui-react";
import { FC } from "react";

interface NotesTextProps {
  text: string;
  maxLength?: number;
}
export const SlicedText: FC<NotesTextProps> = ({ text, maxLength = 80 }) => {
  const textLength = text?.length;
  const isLongText = textLength > maxLength;
  const slicedText = (text: string): string => {
    return text.slice(0, maxLength)?.concat("...");
  };

  return (
    <Tooltip content={text} hidden={!isLongText}>
      <p>{isLongText ? slicedText(text) : genericGetValue(text, true)}</p>
    </Tooltip>
  );
};
