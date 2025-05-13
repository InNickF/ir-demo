import { AcqHead } from "@/acquisitions/components/general/AcqHead";
import { useDealIdFromQueryParams } from "@/acquisitions/hooks/useDealIdFromQueryParams";
import { DealLayout } from "@/acquisitions/layouts/DealLayout";
import { InAcqPermissionsLayout } from "@/acquisitions/layouts/InAcqPermissionsLayout";
import { useDeal, useDealSummary } from "@/acquisitions/services/queries/deals";
import { NextPageWithLayout } from "@/commons/typings";
import { Skeleton } from "in-ui-react";
import { ReactElement } from "react";
import { DealContent } from "./components/DealContent";
import { ScreeningDealContent } from "./components/ScreeningDealContent";
import "./styles.css";

const DealSummary: NextPageWithLayout = () => {
  const dealId = useDealIdFromQueryParams();

  const { data: dealSummary, isLoading: isSummaryLoading } =
    useDealSummary(dealId);
  const { data: deal, isLoading } = useDeal({
    dealId: dealId,
  });

  return (
    <div className="acq-deal-summary-grid">
      {isLoading || isSummaryLoading ? (
        <SkeletonGrid />
      ) : (
        <>
          {dealSummary && deal && !deal.has_uw_model ? (
            <ScreeningDealContent
              deal={deal}
              strategy={dealSummary?.strategy}
              map={dealSummary?.map}
              pictures={dealSummary?.pictures}
              comments={dealSummary?.comments}
              dealRoom={dealSummary?.deal_room}
              timeline={dealSummary?.deal_timeline}
            />
          ) : (
            <DealContent
              deal={deal}
              metrics={dealSummary?.deal_metrics}
              strategy={dealSummary?.strategy}
              map={dealSummary?.map}
              pictures={dealSummary?.pictures}
              dealRoom={dealSummary?.deal_room}
              timeline={dealSummary?.deal_timeline}
            />
          )}
        </>
      )}
    </div>
  );
};

const SkeletonGrid = () => {
  return (
    <>
      <Skeleton className="col-span-2">
        <Skeleton.Avatar shape="squared" className="h-[240px]" />
      </Skeleton>
      <Skeleton className="col-span-2">
        <Skeleton.Avatar shape="squared" className="h-[100px]" />
      </Skeleton>
      <Skeleton>
        <Skeleton.Avatar shape="squared" className="h-[450px]" />
      </Skeleton>
      <Skeleton>
        <Skeleton.Avatar shape="squared" className="h-[450px]" />
      </Skeleton>
    </>
  );
};

DealSummary.getLayout = (page: ReactElement) => {
  return (
    <InAcqPermissionsLayout>
      <DealLayout>
        <AcqHead title="Deal Summary" />
        {page}
      </DealLayout>
    </InAcqPermissionsLayout>
  );
};

export default DealSummary;
