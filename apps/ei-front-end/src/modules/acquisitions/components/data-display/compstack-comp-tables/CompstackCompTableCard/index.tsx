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

interface CompstackCompTableCardProps
  extends CardProps,
    IsLoadingProp,
    IsRefetchingProp {
  title: string;
  icon: TitleWithIconProps["icon"];
  headerActions?: React.ReactNode;
}

export const CompstackCompTableCard: FC<CompstackCompTableCardProps> = ({
  title,
  isLoading,
  isRefetching,
  icon,
  children,
  headerActions,
  ...props
}) => {
  const chartSkeletonClasses = "h-80 w-full";
  return (
    <TableCard padding={false} {...props}>
      <LoadingLine isActive={isRefetching} persist />
      <section className="acq-market-analytics-compstack-comp-table-card">
        <header className="acq-market-analytics-compstack-comp-table-card__header">
          <TitleWithIcon icon={icon}>{convertToTitleCase(title)}</TitleWithIcon>
          <div>{headerActions ? headerActions : null}</div>
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
