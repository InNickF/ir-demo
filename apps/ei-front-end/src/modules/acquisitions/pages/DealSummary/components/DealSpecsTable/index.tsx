import { TableCard } from "@/commons/components/general/TableCard";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { TitleWithIcon } from "in-ui-react";
import { FC, PropsWithChildren } from "react";

export const DealSpecsTable: FC<PropsWithChildren> = ({
  children,
  ...props
}) => {
  return (
    <TableCard {...props}>
      <TitleWithIcon icon={<DocumentTextIcon />} className="px-3 py-3">
        Deal Specs
      </TitleWithIcon>
      <TableCard.Body>{children}</TableCard.Body>
    </TableCard>
  );
};
