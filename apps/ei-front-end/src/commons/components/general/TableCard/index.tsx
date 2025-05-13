import { FC, HTMLAttributes } from "react";
import { Card, CardProps } from "in-ui-react";
import "./styles.css";

const TCard: FC<CardProps> = ({ children, padding = false, ...props }) => {
  return (
    <Card padding={padding} {...props}>
      {children}
    </Card>
  );
};

type TableCardGroupType = typeof TCard & {
  Body: typeof TableBody;
};

const TableBody: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  const getClasses = (): string => {
    const classes = ["table-wrapper"];
    if (className) classes.push(className);
    return classes.join(" ");
  };
  return (
    <div className={getClasses()} {...props}>
      {children}
    </div>
  );
};
export const TableCard = TCard as TableCardGroupType;
TableCard.Body = TableBody;
