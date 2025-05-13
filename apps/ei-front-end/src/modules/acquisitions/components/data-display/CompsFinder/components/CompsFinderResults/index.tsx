import { IsLoadingProp } from "@/commons/typings";
import { CompstackCompType } from "@/acquisitions/typings/market-analytics";
import { compsIcons } from "@/acquisitions/utils/compsIcons";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { Card, CardProps, Skeleton } from "in-ui-react";
import { FC } from "react";
import "./styles.css";

interface CompsFinderResultsCardProps
  extends IsLoadingProp,
    Omit<CardProps, "children"> {
  leaseCount?: number;
  saleCount?: number;
  landCount?: number;
  dealsCount?: number;
}

const prefix = "acq-comps-finder-results";

export const CompsFinderResults: FC<CompsFinderResultsCardProps> = ({
  className,
  isLoading,
  landCount,
  leaseCount,
  saleCount,
  dealsCount,
  ...props
}) => {
  const getClasses = (): string => {
    const classes = [`${prefix}-card`];
    className && classes.push(className);
    return classes.join(" ");
  };

  return (
    <Card className={getClasses()} {...props}>
      {isLoading ? (
        <CompsFinderResultsSkeleton />
      ) : (
        <>
          <CompsFinderResultsItem type="deals" count={dealsCount} />
          <CompsFinderResultsItem type="lease" count={leaseCount} />
          <CompsFinderResultsItem type="sale" count={saleCount} />
          <CompsFinderResultsItem type="land" count={landCount} />
        </>
      )}
    </Card>
  );
};

interface CompsFinderResultsItemProps {
  type: CompstackCompType | "deals";
  count: number;
}

const CompsFinderResultsItem: FC<CompsFinderResultsItemProps> = ({
  type,
  count,
}) => {
  const Icon = type === "deals" ? MapPinIcon : compsIcons[type];

  const title = {
    lease: "Lease",
    stabilized_property: "Sale",
    transitional_property: "Sale",
    sale: "Sale",
    land: "Land",
    deals: "Deals",
  }[type];

  return count || count === 0 ? (
    <div className={`${prefix}-item`}>
      <Icon className="w-6 h-6" />
      <p>
        {title}: {count}
      </p>
    </div>
  ) : null;
};

const CompsFinderResultsSkeleton: FC = () => {
  return (
    <Skeleton className="w-64 h-6">
      <Skeleton.Text className="w-64 h-6" />
    </Skeleton>
  );
};
