import { FC } from "react";
import { CardProps } from "in-ui-react";
import { HTMLRenderer } from "@/commons/components/data-display/HTMLRenderer";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import { Deal } from "@/acquisitions/typings/deals";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";

export const DealStrategy: FC<CardProps & { strategy: Deal["strategy"] }> = ({
  strategy,
  className,
  ...props
}) => {
  const getClasses = () => {
    const classes = ["acq-deal-summary-grid--grid-cards"];
    className && classes.push(className);
    return classes.join(" ");
  };
  return (
    <CardWithHeader
      title="Deal Summary"
      icon={<LightBulbIcon />}
      className={getClasses()}
      {...props}
    >
      <HTMLRenderer html={genericGetValue(strategy)} />
    </CardWithHeader>
  );
};
