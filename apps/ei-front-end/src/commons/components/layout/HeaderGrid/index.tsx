import { FC, HTMLAttributes } from "react";
import "./styles.css";

const HeaderGridContainer: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
}) => {
  const getClasses = () => {
    const classes = ["acq-header-grid"];
    className && classes.push(className);
    return classes.join(" ");
  };
  return <div className={getClasses()}>{children}</div>;
};

const KPIsContainer: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  const getClasses = () => {
    const classes = [
      "acq-header-grid__kpis-container",
      "generic-entrance-animation",
    ];
    className && classes.push(className);
    return classes.join(" ");
  };
  return (
    <div className={getClasses()} {...props}>
      {children}
    </div>
  );
};

type HeaderGridGroupType = typeof HeaderGridContainer & {
  KPIsContainer: typeof KPIsContainer;
};

export const HeaderGrid = HeaderGridContainer as HeaderGridGroupType;
HeaderGrid.KPIsContainer = KPIsContainer;
