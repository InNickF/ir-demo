import { Skeleton, Tooltip } from "in-ui-react";
import { FC } from "react";
import {
  numberAbbreviation,
  numberToDollar,
} from "@/commons/model-in/formatters/utils/amount-conversions";

interface DealTableBodyHeaderDetailProps {
  label: string;
  value: number;
  isLoading?: boolean;
  withTooltip?: boolean;
  isCurrency?: boolean;
}

export const DealTableBodyHeaderDetail: FC<DealTableBodyHeaderDetailProps> = ({
  label,
  value,
  isLoading = false,
  withTooltip = false,
  isCurrency = false,
}) => {
  const transformedValue = isCurrency
    ? numberToDollar({
        value,
        options: {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        },
      })
    : value;

  const abbreviatedValue = isCurrency
    ? numberAbbreviation({
        value: value,
        isCurrency: true,
      })
    : value;

  const ValueSkeleton = () => {
    return (
      <Skeleton className="acq-deal-table-body-header-detail__skeleton">
        <Skeleton.Avatar
          shape="squared"
          className="acq-deal-table-body-header-detail__skeleton"
        />
      </Skeleton>
    );
  };

  return (
    <>
      {!withTooltip ? (
        <small className="flex gap-0.5 item-center">
          <span className="mr-1">{label}:</span>
          {!isLoading ? transformedValue : <ValueSkeleton />}
        </small>
      ) : (
        <Tooltip content={`${label}: ${transformedValue}`}>
          <small className="flex gap-0.5 item-center">
            <span className="mr-1">{label}:</span>
            {!isLoading ? abbreviatedValue : <ValueSkeleton />}
          </small>
        </Tooltip>
      )}
    </>
  );
};
