import { TableCard } from "@/commons/components/general/TableCard";
import { IsLoadingProp, IsRefetchingProp } from "@/commons/typings";
import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import {
  Button,
  CardProps,
  LoadingLine,
  Skeleton,
  TitleWithIcon,
  TitleWithIconProps,
} from "in-ui-react";
import { FC } from "react";
import "./styles.css";

interface CompsCardProps extends CardProps, IsLoadingProp, IsRefetchingProp {
  onAction?: () => void;
  actionText: string;
  title: string;
  icon: TitleWithIconProps["icon"];
}

export const CompsCard: FC<CompsCardProps> = ({
  title,
  isLoading,
  isRefetching,
  onAction,
  actionText,
  icon,
  children,
  ...props
}) => {
  const chartSkeletonClasses = "h-80 w-full";
  return (
    <TableCard padding={false} {...props}>
      <LoadingLine isActive={isRefetching} persist />
      <section className="acq-market-analytics-comp-card">
        <header className="acq-market-analytics-comp-card__header">
          <TitleWithIcon icon={icon}>{convertToTitleCase(title)}</TitleWithIcon>
          {onAction ? (
            <Button
              onClick={() => {
                onAction();
              }}
              kind="outline"
            >
              {actionText}
            </Button>
          ) : null}
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
