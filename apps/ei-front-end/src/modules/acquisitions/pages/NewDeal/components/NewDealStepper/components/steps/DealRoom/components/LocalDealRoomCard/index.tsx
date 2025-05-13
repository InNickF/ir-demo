import { FC } from "react";
import {
  CardProps,
  LoadingLine,
  Skeleton,
  TitleWithIcon,
  TitleWithIconProps,
} from "in-ui-react";
import { IsLoadingProp, IsRefetchingProp } from "@/commons/typings";
import { TableCard } from "@/commons/components/general/TableCard";
import "./styles.css";

interface LocalDealRoomCardProps
  extends CardProps,
    IsLoadingProp,
    IsRefetchingProp {
  title: string;
  icon: TitleWithIconProps["icon"];
}

export const LocalDealRoomCard: FC<LocalDealRoomCardProps> = ({
  title,
  isLoading = false,
  isRefetching = false,
  icon,
  children,
  ...props
}) => {
  const chartSkeletonClasses = "h-80 w-full";
  return (
    <TableCard padding={false} {...props}>
      <LoadingLine isActive={isRefetching} persist />
      <section className="acq-local-deal-room-card">
        <header className="acq-local-deal-room-card__header">
          <TitleWithIcon icon={icon}>{title}</TitleWithIcon>
        </header>
        {isLoading ? (
          <Skeleton className={chartSkeletonClasses}>
            <Skeleton.Avatar shape="squared" className={chartSkeletonClasses} />
          </Skeleton>
        ) : (
          <TableCard.Body>{children}</TableCard.Body>
        )}
      </section>
    </TableCard>
  );
};
