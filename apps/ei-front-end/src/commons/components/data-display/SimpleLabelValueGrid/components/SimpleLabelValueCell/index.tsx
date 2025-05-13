import { slicedTextWithEllipsis } from "@/commons/model-in/formatters/utils";
import { GenericLabelValueObject } from "@/commons/typings";
import { Tooltip } from "in-ui-react";
import { FC, useState } from "react";
import { SimpleLabelValueGridKind } from "../../types";
import "./styles.css";
import { getFormattedValue } from "./utils";

interface SimpleLabelValueCellProps
  extends GenericLabelValueObject,
    SimpleLabelValueGridKind {
  className?: string;
  isSearching: boolean;
}
const prefix = "commons-simple-label-value-grid__cell";

export const SimpleLabelValueCell: FC<SimpleLabelValueCellProps> = ({
  label,
  value,
  className,
  isSearching,
  kind = "small",
}) => {
  const [showCompleteValue, setShowCompleteValue] = useState(false);

  const mustShowRawValue = showCompleteValue || isSearching;

  const { formattedValue, isLongTextValue } = getFormattedValue({
    value,
    mustShowRawValue,
  });

  const getClasses = () => {
    const classes = [`${prefix}`, `${prefix}--${kind}`];

    mustShowRawValue && classes.push(`${prefix}-long`);
    className && classes.push(className);
    return classes.join(" ");
  };

  const getParagraphClasses = () => {
    const classes = [];
    isLongTextValue
      ? classes.push(`${prefix}-value-long`)
      : classes.push(`${prefix}-value-short`);
    return classes.join(" ");
  };

  const hideTooltip =
    (isLongTextValue && showCompleteValue) || !isLongTextValue;

  const tooltipContent = slicedTextWithEllipsis({
    text: value,
    maxLength: 130,
  });

  const toggleText = () => {
    isLongTextValue && setShowCompleteValue((prev) => !prev);
  };

  return (
    <li className={getClasses()}>
      <p className={`${prefix}-label`}>{label}</p>

      <Tooltip content={tooltipContent} hidden={hideTooltip}>
        <p className={getParagraphClasses()} onClick={toggleText}>
          {formattedValue}
        </p>
      </Tooltip>
    </li>
  );
};
