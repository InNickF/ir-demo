import {
  CardWithHeader,
  CardWithHeaderProps,
} from "@/commons/components/general/CardWithHeader";
import { ChartBarSquareIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

export const DealMetricsCard: FC<
  Omit<CardWithHeaderProps, "title" | "icon">
> = ({ children, className, ...props }) => {
  const getClasses = () => {
    const classes = ["acq-deal-summary-grid--grid-cards"];
    className && classes.push(className);
    return classes.join(" ");
  };
  return (
    <CardWithHeader
      title="Deal Metrics"
      icon={<ChartBarSquareIcon />}
      className={getClasses()}
      bodyPadding={false}
      {...props}
    >
      {children}
    </CardWithHeader>
  );
};
