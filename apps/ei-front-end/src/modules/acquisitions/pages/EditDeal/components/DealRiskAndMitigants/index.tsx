import { DealRisksAndMitigantsCard } from "@/modules/acquisitions/components/data-entry/DealRisksAndMitigants";
import { Deal } from "@/modules/acquisitions/typings/deals";
import { FC } from "react";

interface DealRiskAndMitigantsProps {
  dealId: Deal["id"];
  className?: string;
}

export const DealRiskAndMitigants: FC<DealRiskAndMitigantsProps> = ({
  dealId,
  className,
}) => {
  return (
    <section className={className}>
      <DealRisksAndMitigantsCard dealId={dealId} />
    </section>
  );
};
