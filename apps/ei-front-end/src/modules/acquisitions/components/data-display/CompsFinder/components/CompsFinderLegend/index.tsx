import { Card, CardProps } from "in-ui-react";
import { FC, PropsWithChildren } from "react";
import "./styles.css";

const prefix = "acq-comps-finder-legend";

export const CompsFinderLegend: FC<Omit<CardProps, "children">> = ({
  className,
  ...props
}) => {
  const getClasses = (): string => {
    const classes = [`${prefix}-card`];
    className && classes.push(className);
    return classes.join(" ");
  };
  return (
    <Card className={getClasses()} {...props}>
      <ul>
        <CompsFinderLegendItem color="primary">Deal</CompsFinderLegendItem>
        <CompsFinderLegendItem color="success">
          Linked comp
        </CompsFinderLegendItem>
        <CompsFinderLegendItem color="warning">
          Non-linked comp
        </CompsFinderLegendItem>
      </ul>
    </Card>
  );
};

interface CompsFinderLegendItemProps extends PropsWithChildren {
  color: "primary" | "warning" | "success";
}

const CompsFinderLegendItem: FC<CompsFinderLegendItemProps> = ({
  children,
  color,
}) => {
  return (
    <li className={`${prefix}-item ${prefix}-item--${color}`}>{children}</li>
  );
};
