import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { ARTenantDrillDownTable } from "@/modules/assets/typings/portfolio";
import { TableCellsIcon } from "@heroicons/react/24/outline";
import { CardProps } from "in-ui-react";
import { FC } from "react";
import { ARTenantDrillDownTableDetails } from "./components/TenantDrillDownTable";

interface TenantDrillDownDetailsProps extends CardProps {
  data: ARTenantDrillDownTable[];
  tenantName?: string;
}
export const TenantDrillDownDetails: FC<TenantDrillDownDetailsProps> = ({
  data,
  tenantName,
  ...props
}) => {
  const getCardTitle = (): string => {
    const title = "Receivable Details:";
    if (tenantName) {
      return `${title} ${tenantName}`;
    }
    return title;
  };
  return (
    <CardWithHeader
      icon={<TableCellsIcon />}
      title={getCardTitle()}
      titleKind="h6"
      bodyPadding={false}
      {...props}
    >
      <ARTenantDrillDownTableDetails data={data} />
    </CardWithHeader>
  );
};
