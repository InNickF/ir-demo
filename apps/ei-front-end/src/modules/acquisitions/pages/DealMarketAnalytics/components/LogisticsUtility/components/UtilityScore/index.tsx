import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { useDealIdFromQueryParams } from "@/modules/acquisitions/hooks/useDealIdFromQueryParams";
import { useDealUtilityScore } from "@/modules/acquisitions/services/queries/deals";
import { StarIcon } from "@heroicons/react/24/outline";
import { FC, useMemo } from "react";
import { UtilityScoreDescriptionModal } from "./components/UtilityScoreDescriptionModal";
import { UtilityScoreStakedChartWrapper } from "./components/UtilityScoreStakedChart";
import { UtilityScoreValueCard } from "./components/UtilityScoreValueCard";
import "./styles.css";

const prefix = "acq-utility-score";
interface UtilityScoreProps {
  className?: string;
}
export const UtilityScore: FC<UtilityScoreProps> = ({ className }) => {
  const dealId = useDealIdFromQueryParams({ redirectOnNotFound: true });
  const { data, isLoading, isRefetching } = useDealUtilityScore({ dealId });

  const utilityScore = useMemo(() => {
    return data?.results?.[0] || null;
  }, [data]);

  return (
    <CardWithHeader
      title="Utility Score"
      icon={<StarIcon />}
      className={className}
      isLoading={isLoading}
      isRefetching={isRefetching}
      headerActions={<UtilityScoreDescriptionModal />}
    >
      <section className={`${prefix}__grid`}>
        <div className={`${prefix}__grid__first-col`}>
          {/* 
            TODO: TEMPORALLY HIDDEN FOR ROADSHOW DEMOS
            <UtilityGaugeOverallScoreWrapper
              data={utilityScore?.logistics_utility_score_scaled}
              id={`${prefix}-gauge-overall-score`}
            /> */}
          <div className={`${prefix}__grid__first-col__value-cards`}>
            <UtilityScoreValueCard
              title="Base"
              value={utilityScore?.base_value}
              neutralColors
            />
            <UtilityScoreValueCard
              title="Location"
              value={utilityScore?.location_score}
              percentage={utilityScore?.location_score_scaled}
            />
            <UtilityScoreValueCard
              title="Building"
              value={utilityScore?.property_score}
              percentage={utilityScore?.property_score_scaled}
            />
            <UtilityScoreValueCard
              title="Transaction"
              value={utilityScore?.transaction_score}
              neutralColors
            />
            <UtilityScoreValueCard
              title="Estimated Rent"
              value={utilityScore?.estimated_annual_rent_psf}
              className="col-span-2"
              neutralColors
            />
          </div>
        </div>
        <div className={`${prefix}__grid__second-col`}>
          <UtilityScoreStakedChartWrapper
            data={utilityScore?.features}
            id={`${prefix}-staked-chart`}
          />
        </div>
      </section>
    </CardWithHeader>
  );
};
