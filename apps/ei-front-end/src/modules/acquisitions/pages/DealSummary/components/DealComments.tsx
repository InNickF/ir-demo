import { FC } from "react";
import { Card, CardProps, TitleWithIcon } from "in-ui-react";
import { Deal } from "@/acquisitions/typings/deals";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

export const DealSpecsAndNotes: FC<
  CardProps & { comments: Deal["comments"] }
> = ({ comments, className, ...props }) => {
  const getClasses = () => {
    const classes = ["acq-deal-summary-grid--grid-cards"];
    className && classes.push(className);
    return classes.join(" ");
  };

  return (
    <Card {...props} className={getClasses()}>
      <TitleWithIcon icon={<ChatBubbleBottomCenterTextIcon />}>
        Specs and Notes <small>(Comments)</small>
      </TitleWithIcon>
      <p>{genericGetValue(comments)}</p>
    </Card>
  );
};
