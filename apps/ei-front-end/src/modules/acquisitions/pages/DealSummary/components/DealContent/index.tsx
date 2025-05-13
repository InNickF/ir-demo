import { DealRisksAndMitigantsCard } from "@/acquisitions/components/data-entry/DealRisksAndMitigants";
import { DealTenantInformationCard } from "@/acquisitions/components/data-entry/DealTenantInformation";
import { Deal, DealSummary } from "@/acquisitions/typings/deals";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { FC } from "react";
import { DeadDealInformation } from "../DeadDealInformation";
import { DealLoanAssumptionsTable } from "../DealLoanAssumptionsTable";
import { DealMapAndImages } from "../DealMapAndImage";
import { DealPropertyInformationTable } from "../DealPropertyInformationTable";
import { DealRoomSummary } from "../DealRoomSummary";
import { DealStrategy } from "../DealStrategy";
import { DealTimeline } from "../DealTimeline";
import { DealUnderwritingAssumptionsTable } from "../DealUnderwritingAssumptionsTable";
import { DealMetrics } from "./components/DealMetrics";
import { DealSensitivityAnalysis } from "../DealSensitivityAnalysis";
import { DealBasics } from "../DealBasics";

interface DealContentProps {
  deal: Deal;
  metrics: DealSummary["deal_metrics"];
  map: DealSummary["map"];
  pictures: DealSummary["pictures"];
  dealRoom: DealSummary["deal_room"];
  strategy: DealSummary["strategy"];
  timeline: DealSummary["deal_timeline"];
}

export const DealContent: FC<DealContentProps> = ({
  deal,
  metrics,
  map,
  pictures,
  dealRoom,
  strategy,
  timeline,
}) => {
  return (
    <>
      <DealBasics deal={deal} className="col-span-1 lg:col-span-2" />
      <DealStrategy
        strategy={genericGetValue(strategy, true)}
        className="col-span-1 lg:col-span-2"
      />
      <DeadDealInformation
        dealPhase={deal?.phase}
        deadReasonType={deal?.dead_reason_type}
        deadReason={deal?.dead_reason}
        className="col-span-1 lg:col-span-2"
      />
      <DealMetrics metrics={metrics} />
      <DealMapAndImages
        images={pictures}
        longitude={map?.longitude}
        latitude={map?.latitude}
        goToGoogleMaps
      />
      {deal?.has_uw_model ? (
        <DealSensitivityAnalysis className="col-span-1 lg:col-span-2" />
      ) : null}
      <div className="acq-deal-content-subgrid-wrapper">
        <DealPropertyInformationTable deal={deal} />
        <DealLoanAssumptionsTable deal={deal} />
      </div>
      <DealUnderwritingAssumptionsTable deal={deal} />
      <DealTimeline timeline={timeline} />
      <DealTenantInformationCard dealId={deal?.id} readOnly />
      <DealRisksAndMitigantsCard dealId={deal?.id} readOnly />
      <DealRoomSummary files={dealRoom} />
    </>
  );
};
