import { FC } from "react";
import "./styles.css";

export interface CurrentPercentageHeaderProps {
  value: string;
  title?: string;
  className?: string;
}

export const CurrentValueHeader: FC<CurrentPercentageHeaderProps> = ({
  title = "Current",
  value,
  className,
}) => {
  const prefix = "current-percentage-header";

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };
  return (
    <div className={getClasses()}>
      {value ? (
        <>
          <p className={`${prefix}__title`}>{title}:</p>
          <p className={`${prefix}__value`}>{value}</p>
        </>
      ) : null}
    </div>
  );
};
