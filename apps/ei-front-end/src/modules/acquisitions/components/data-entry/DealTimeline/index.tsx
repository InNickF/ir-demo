import { CalendarIcon } from "@heroicons/react/24/outline";
import { FC, PropsWithChildren } from "react";
import { DealTimelineCard } from "./components/DealTimelineCard";

export const DealTimeline: FC<PropsWithChildren> = ({ children }) => {
  const title = "Deal Timeline";
  const icon = <CalendarIcon />;

  return (
    <DealTimelineCard title={title} icon={icon}>
      {children}
    </DealTimelineCard>
  );
};
