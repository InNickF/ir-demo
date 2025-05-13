import { DealTenantInformationCard } from "@/modules/acquisitions/components/data-entry/DealTenantInformation";
import { Deal } from "@/modules/acquisitions/typings/deals";
import { FC } from "react";

interface DealTenantsInformationProps {
  dealId: Deal["id"];
  className?: string;
}

export const DealTenantsInformation: FC<DealTenantsInformationProps> = ({
  dealId,
  className,
}) => {
  return (
    <section className={className}>
      <DealTenantInformationCard dealId={dealId} />
    </section>
  );
};
