import { CompsFinder } from "@/acquisitions/components/data-display/CompsFinder";
import { GenericCompstackCompTableActions } from "@/acquisitions/components/data-display/compstack-comp-tables/GenericCompstackCompTableActions";
import { AcqHead } from "@/acquisitions/components/general/AcqHead";
import { useAssignCompstackComp } from "@/acquisitions/hooks/useAssignCompstackComp";
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
import { getCompstackCompId } from "@/acquisitions/utils/compstack-comps";
import { useMoveMapBoxMapOnLatLngChange } from "@/commons/hooks/useMoveMapBoxMapOnLatLngChange";
import { NextPageWithLayout } from "@/commons/typings";
import { FC, ReactElement, useMemo, useRef, useState } from "react";
import { MapRef } from "react-map-gl";

type CompsFinderActiveElement = CompstackComp | Deal | null;

const DealCompsFinder: NextPageWithLayout = () => {
  const mapRef = useRef<MapRef>(null);
  const [activeElement, setActiveElement] =
    useState<CompsFinderActiveElement>(null);

  const dealId = useDealIdFromQueryParams();
  const {
    data: deal,
    isLoading: isDealLoading,
    isRefetching: isDealRefetching,
  } = useDeal({
    dealId: dealId as string,
  });

  useMoveMapBoxMapOnLatLngChange({
    mapRef,
    longitude: deal?.longitude ? Number(deal?.longitude) : null,
    latitude: deal?.longitude ? Number(deal?.latitude) : null,
  });

  const deals = useMemo(() => (deal ? [deal] : []), [deal]);

  const {
    data: dealComps,
    isLoading: isLoadingDealComps,
    isRefetching: isRefetchingLeaseDealComps,
  } = useAllDealCompstackComps({
    dealId: dealId as string,
    type: "all",
  });

  return (
    <CompsFinder
      ref={mapRef}
      deals={deals}
      dealComps={dealComps}
      submarket={deal?.submarket}
      isLoading={isLoadingDealComps || isDealLoading}
      isRefetching={isRefetchingLeaseDealComps || isDealRefetching}
      activeElement={activeElement}
      setActiveElement={(element) => setActiveElement(element)}
      tableActions={(comp) => (
        <DealCompFinderTableActions
          comp={comp}
          dealId={deal?.id}
          linkedComps={dealComps}
          setActiveElement={setActiveElement}
        />
      )}
    />
  );
};

interface DealCompFinderTableActionsProps {
  comp: CompstackComp;
  linkedComps: CompstackComp[];
  dealId: Deal["id"];
  setActiveElement: (element: CompsFinderActiveElement) => void;
}
const DealCompFinderTableActions: FC<DealCompFinderTableActionsProps> = ({
  comp,
  linkedComps = [],
  dealId,
  setActiveElement,
}) => {
  const { onAssign, isAssigning } = useAssignCompstackComp();
  const { onUnlink, isUnlinking } = useUnlinkCompstackComp();
  return dealId ? (
    <GenericCompstackCompTableActions
      isLinked={linkedComps.some(
        (linkedComp) =>
          getCompstackCompId(linkedComp) === getCompstackCompId(comp)
      )}
      isOnLinkLoading={isAssigning({ comp })}
      isOnUnlinkLoading={isUnlinking({ comp })}
      onShow={() => setActiveElement(comp)}
      onLink={() => onAssign({ comp, dealId })}
      onUnlink={() => onUnlink({ comp, dealId })}
    />
  ) : null;
};

DealCompsFinder.getLayout = (page: ReactElement) => {
  return (
    <InAcqPermissionsLayout>
      <DealLayout>
        <AcqHead title="Deal Comps Finder" />
        {page}
      </DealLayout>
    </InAcqPermissionsLayout>
  );
};

export default DealCompsFinder;
