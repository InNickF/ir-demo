import { FC } from "react";
import { CardProps } from "in-ui-react";
import { DealRoomItem } from "@/acquisitions/typings/deals";
import { TableCard } from "@/commons/components/general/TableCard";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { DealRoomTable } from "./components/DealRoomSummaryTable";
import { IsLoadingProp, IsRefetchingProp } from "@/commons/typings";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";

interface DealRoomSummaryProps
  extends CardProps,
    IsLoadingProp,
    IsRefetchingProp {
  files: DealRoomItem[];
}

export const DealRoomSummary: FC<DealRoomSummaryProps> = ({
  files = [],
  isLoading,
  isRefetching,
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
      title="Deal Room (Last five files)"
      icon={<DocumentDuplicateIcon />}
      isLoading={isLoading}
      isRefetching={isRefetching}
      className={getClasses()}
      bodyPadding={false}
      {...props}
    >
      <TableCard.Body>
        <DealRoomTable files={files} isLoading={isLoading} />
      </TableCard.Body>
    </CardWithHeader>
  );
};
