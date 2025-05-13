import { TableCard } from "@/commons/components/general/TableCard";
import { IsLoadingProp, IsRefetchingProp } from "@/commons/typings";
import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import {
  CardProps,
  LoadingLine,
  Skeleton,
  TitleWithIcon,
  TitleWithIconProps,
} from "in-ui-react";
import { FC } from "react";
import "./styles.css";

interface LoanRoomCardProps extends CardProps, IsLoadingProp, IsRefetchingProp {
  title: string;
  icon: TitleWithIconProps["icon"];
}

export const LoanRoomCard: FC<LoanRoomCardProps> = ({
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
      <section className="debt-loan-room-card">
        <header className="debt-loan-room-card__header">
          <TitleWithIcon icon={icon}>{convertToTitleCase(title)}</TitleWithIcon>
        </header>
        {isLoading ? (
          <Skeleton className={chartSkeletonClasses}>
            <Skeleton.Avatar shape="squared" className={chartSkeletonClasses} />
          </Skeleton>
        ) : (
          children
        )}
      </section>
    </TableCard>
  );
};
