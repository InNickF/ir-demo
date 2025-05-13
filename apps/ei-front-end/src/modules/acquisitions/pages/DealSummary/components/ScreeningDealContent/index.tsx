import { DealRisksAndMitigantsCard } from "@/acquisitions/components/data-entry/DealRisksAndMitigants";
import { DealTenantInformationCard } from "@/acquisitions/components/data-entry/DealTenantInformation";
import {
  DealSummary,
  ScreeningDealInformation,
} from "@/acquisitions/typings/deals";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { FC } from "react";
import { DeadDealInformation } from "../DeadDealInformation";
import { DealBackOfTheNapkinSummary } from "../DealBackOfTheNapkinSummary";
import { DealSpecsAndNotes } from "../DealComments";
import { DealMapAndImages } from "../DealMapAndImage";
import { DealRoomSummary } from "../DealRoomSummary";
import { DealSpecsTable } from "../DealSpecsTable";
import { DealStrategy } from "../DealStrategy";
import { GenericDealMetricTable } from "../GenericDealMetricTable";
import { DealBasics } from "../DealBasics";
import { DealTimeline } from "../DealTimeline";

interface ScreeningDealContentProps {
  deal: ScreeningDealInformation;
  map: DealSummary["map"];
  pictures: DealSummary["pictures"];
  comments: DealSummary["comments"];
  dealRoom: DealSummary["deal_room"];
  strategy: DealSummary["strategy"];
  timeline: DealSummary["deal_timeline"];
}

export const ScreeningDealContent: FC<ScreeningDealContentProps> = ({
  deal,
  map,
  pictures,
  comments,
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
      <DealBackOfTheNapkinSummary deal={deal} />
      <DealMapAndImages
        latitude={map.latitude}
        longitude={map.longitude}
        images={pictures}
        goToGoogleMaps
      />
      <DealSpecsTable>
        <GenericDealMetricTable
          fields={{
            year_built: deal.year_built,
            number_of_buildings: deal.number_of_buildings,
            number_of_units: deal.number_of_units,
            "site_area_(Acres)": deal.site_area,
            site_coverage: deal.site_coverage,
            clear_heights: deal.clear_heights,
            dock_high_doors: deal.dock_high_doors,
          }}
        />
      </DealSpecsTable>
      <DealSpecsAndNotes comments={genericGetValue(comments, true)} />
      <DealTimeline timeline={timeline} />
      <DealTenantInformationCard dealId={deal?.id} readOnly />
      <DealRisksAndMitigantsCard dealId={deal?.id} readOnly />
      <DealRoomSummary files={dealRoom} />
    </>
  );
};
