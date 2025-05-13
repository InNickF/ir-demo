import {
  numberToDollar,
  numberToPercent,
} from "@/commons/model-in/formatters/utils/amount-conversions";
import { Heading } from "in-ui-react";
import { FC } from "react";
import "./styles.css";

const prefix = "acq-utility-score-card";
interface UtilityValueCardProps {
  title: string;
  value?: number;
  percentage?: number;
  className?: string;
  neutralColors?: boolean;
}
export const UtilityScoreValueCard: FC<UtilityValueCardProps> = ({
  title,
  value,
  className,
  percentage,
  neutralColors,
}) => {
  const getClasses = (): string => {
    const classes = [`${prefix}`];
    className && classes.push(className);
    return classes.join(" ");
  };

  const getValueClasses = (): string => {
    const classes = [`${prefix}__value`, `${prefix}__text`];
    if (value && !neutralColors) {
      value > 0 && classes.push(`${prefix}__value--with-positive-percentage`);
      value < 0 && classes.push(`${prefix}__value--with-negative-percentage`);
    }
    return classes.join(" ");
  };

  return (
    <article className={getClasses()}>
      <div>
        <p className={getValueClasses()}>
          {numberToDollar({
            value,
          })}{" "}
          {percentage !== undefined && percentage !== null
            ? `(${numberToPercent(percentage, true, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })})`
            : null}
        </p>
      </div>
      <Heading kind="subtitle-2" className={`${prefix}__text ${prefix}__title`}>
        {title}
      </Heading>
    </article>
  );
};
