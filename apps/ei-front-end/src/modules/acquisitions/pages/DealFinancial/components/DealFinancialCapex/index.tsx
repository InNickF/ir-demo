import { useDealIdFromQueryParams } from "@/acquisitions/hooks/useDealIdFromQueryParams";
import { FC } from "react";
import { DealCAPEX } from "./components/DealCAPEX";

export const DealFinancialCapex: FC = () => {
  const dealId = useDealIdFromQueryParams();

  return (
    <section className="acq-deal-financial-tables-grid">
      <DealCAPEX
        className="acq-deal-financial-tables-grid__item-full-width"
        dealId={dealId}
      />
    </section>
  );
};
