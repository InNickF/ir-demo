import {
  Macroeconomics,
  RealEstateFundamentals,
  SupplyDemandAndRisk,
} from "@/commons/components/data-display/MarketAnalyticSections";
import { AcqHead } from "@/acquisitions/components/general/AcqHead";
import { useDealIdFromQueryParams } from "@/acquisitions/hooks/useDealIdFromQueryParams";
import { useUnlinkCompstackComp } from "@/acquisitions/hooks/useUnlinkCompstackComp";
import { DealLayout } from "@/acquisitions/layouts/DealLayout";
import { InAcqPermissionsLayout } from "@/acquisitions/layouts/InAcqPermissionsLayout";
import {
  useAllDealCompstackComps,
  useDeal,
} from "@/acquisitions/services/queries/deals";
import { Deal } from "@/acquisitions/typings/deals";
import { CompstackComp } from "@/acquisitions/typings/market-analytics";
import { useMoveMapBoxMapOnLatLngChange } from "@/commons/hooks/useMoveMapBoxMapOnLatLngChange";
import { NextPageWithLayout } from "@/commons/typings";
import { GenericCompstackCompTableActions } from "@/modules/acquisitions/components/data-display/compstack-comp-tables/GenericCompstackCompTableActions";
import { FC, ReactElement, useRef, useState } from "react";
import { MapRef } from "react-map-gl";
import { DealMarketAnalyticsComps } from "./components/DealMarketAnalyticsComps";
import { LogisticsUtilitySection } from "./components/LogisticsUtility";
import { MarketAnalyticsCompsModal } from "./components/MarketAnalyticsCompsModal";
const DealMarketAnalytics: NextPageWithLayout = () => {
  const dealId = useDealIdFromQueryParams();

  const mapRef = useRef<MapRef>(null);

  const { data: deal, isLoading: isDealLoading } = useDeal({
    dealId: dealId,
  });
  const {
    data: dealComps,
    isLoading: isLoadingLeaseDealComps,
    isRefetching: isRefetchingLeaseDealComps,
  } = useAllDealCompstackComps({
    dealId: dealId,
    type: "all",
  });

  useMoveMapBoxMapOnLatLngChange({
    mapRef,
    longitude: deal?.longitude ? Number(deal?.longitude) : null,
    latitude: deal?.longitude ? Number(deal?.latitude) : null,
    animate: false,
  });

  const deals = deal ? [deal] : [];
  const distance = 40000;
  return (
    <>
      <LogisticsUtilitySection deal={deal} isLoading={isDealLoading} />
      <RealEstateFundamentals
        ref={mapRef}
        submarket={deal?.submarket}
        market={deal?.market}
        deals={deals}
        linkedComps={dealComps}
        isLoading={isLoadingLeaseDealComps}
        isRefetching={isRefetchingLeaseDealComps}
      >
        <DealMarketAnalyticsCompsWrapper dealId={deal?.id} />
      </RealEstateFundamentals>
      <SupplyDemandAndRisk
        dealId={deal?.id}
        market={deal?.market}
        submarket={deal?.submarket}
        distance={distance}
        latitude={Number(deal?.latitude) || null}
        longitude={Number(deal?.longitude) || null}
      />
      <Macroeconomics market={deal?.market} submarket={deal?.submarket} />
    </>
  );
};
interface DealMarketAnalyticsCompsProps {
  dealId: Deal["id"];
}
const DealMarketAnalyticsCompsWrapper: FC<DealMarketAnalyticsCompsProps> = ({
  dealId,
}) => {
  const [selectedComp, setSelectedComp] = useState<CompstackComp>(null);
  const { onUnlink, isUnlinking } = useUnlinkCompstackComp();

  return (
    <>
      <MarketAnalyticsCompsModal
        comp={selectedComp}
        onClose={() => setSelectedComp(null)}
      />
      <DealMarketAnalyticsComps
        dealId={dealId}
        isRefetching={isUnlinking({ comp: null })}
        className="commons-grid-span-full"
        tableActions={(comp) => (
          <GenericCompstackCompTableActions
            isLinked
            onShow={() => setSelectedComp(comp)}
            isOnUnlinkLoading={isUnlinking({ comp })}
            onUnlink={() => onUnlink({ comp, dealId })}
          />
        )}
      />
    </>
  );
};

DealMarketAnalytics.getLayout = (page: ReactElement) => {
  return (
    <InAcqPermissionsLayout>
      <DealLayout>
        <AcqHead title="Deal Market Analytics" />
        {page}
      </DealLayout>
    </InAcqPermissionsLayout>
  );
};

export default DealMarketAnalytics;
