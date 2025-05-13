import { TableCard } from "@/commons/components/general/TableCard";
import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { CardProps, TitleWithIcon, TitleWithIconProps } from "in-ui-react";
import { FC } from "react";
import "../styles.css";

interface DealTimelineCardProps extends CardProps {
  title: string;
  icon: TitleWithIconProps["icon"];
}

export const DealTimelineCard: FC<DealTimelineCardProps> = ({
  title,
  icon,
  children,
  ...props
}) => {
  return (
    <TableCard padding={false} {...props}>
      <section className="acq-deal-timeline-card">
        <header className="acq-deal-timeline-card__header">
          <TitleWithIcon icon={icon}>{convertToTitleCase(title)}</TitleWithIcon>
        </header>
        <TableCard.Body>{children}</TableCard.Body>
      </section>
    </TableCard>
  );
};
