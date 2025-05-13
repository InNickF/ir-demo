import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { Tooltip } from "in-ui-react";
import { FC } from "react";

export const TableCommentsColumn: FC<{ text: string }> = ({ text }) => {
  const textSliceLength = 40;
  const textLength = text?.length;
  const isLongText = textLength > textSliceLength;
  const slicedText = (text: string): string => {
    return text.slice(0, textSliceLength)?.concat("...");
  };
  const TextWithTooltip = () => (
    <Tooltip content={text}>
      <p>{slicedText(text)}</p>
    </Tooltip>
  );

  return isLongText ? <TextWithTooltip /> : <p>{genericGetValue(text)}</p>;
};
