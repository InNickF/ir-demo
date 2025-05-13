import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { useDealCAPEX } from "@/modules/acquisitions/services/queries/deals";
import { Deal } from "@/modules/acquisitions/typings/deals";
import { TableCellsIcon } from "@heroicons/react/24/outline";
import { Empty } from "in-ui-react";
import { FC } from "react";
import { FinancialDynamicTable } from "../../../../../../components/data-display/FinancialDynamicTable";

interface DealCAPEXProps {
  dealId: Deal["id"];
  className?: string;
}
export const DealCAPEX: FC<DealCAPEXProps> = ({ dealId, className }) => {
  const { data, isLoading, isRefetching } = useDealCAPEX({
    dealId,
  });
  return (
    <CardWithHeader
      title="CAPEX Budget"
      className={className}
      icon={<TableCellsIcon />}
      isLoading={isLoading}
      isRefetching={isRefetching}
      bodyPadding={false}
    >
      {data?.length ? (
        <FinancialDynamicTable data={data} />
      ) : (
        <Empty className="mx-auto" />
      )}
    </CardWithHeader>
  );
};
