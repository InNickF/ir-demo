import { MarketAnalyticsKPIs } from "@/acquisitions/components/data-display/MarketAnalyticsKPIs";
import { UploadDealUWModal } from "@/acquisitions/components/data-entry/UploadDealUWModal";
import { Deal } from "@/acquisitions/typings/deals";
import { HeaderGrid } from "@/commons/components/layout/HeaderGrid";
import { IsLoadingProp } from "@/commons/typings";
import { Button, Skeleton, Tooltip } from "in-ui-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { DealKPIs } from "../DealKPIs";
import { QuickDealEditModal } from "../QuickDealEditModal";
import { DealMarketAnalyticsExportDataButton } from "@/modules/acquisitions/pages/DealMarketAnalytics/components/DealMarketAnalyticsExportDataButton";

export const DealKPIsSection = ({
  deal,
  isLoading,
}: { deal: Deal } & IsLoadingProp) => {
  const router = useRouter();
  const isChangePhasePage = router.pathname.includes("change-phase");
  const [uploadUWModal, setUploadUWModal] = useState(false);
  const [quickDealEditModal, setQuickDealEditModal] = useState(false);
  const isCompsFinderPage = router.pathname.includes("comps-finder");
  const isMarketAnalyticsPage = router.pathname.includes("market-analytics");

  return isLoading ? (
    <Skeleton>
      <Skeleton.Text kind="title" className="h-20 xl:w-96" />
      <Skeleton.Text className="xl:w-full" />
    </Skeleton>
  ) : (
    <div className="acq-header-grid__wrapper">
      {deal?.has_post_screening_data ? (
        <>
          {isCompsFinderPage ? null : (
            <HeaderGrid.KPIsContainer className="mb-4">
              {isMarketAnalyticsPage ? (
                <MarketAnalyticsKPIs
                  submarket={deal?.submarket}
                  isLoading={isLoading}
                />
              ) : (
                <DealKPIs
                  deal={deal}
                  isLoading={isLoading}
                  onClick={() => setQuickDealEditModal(true)}
                />
              )}
            </HeaderGrid.KPIsContainer>
          )}

          <div className="acq-header-grid__action-button">
            <div className="flex gap-3">
              <Button
                kind="outline"
                block
                onClick={() => setUploadUWModal(true)}
              >
                Update UW model
              </Button>
              {isMarketAnalyticsPage ? (
                <DealMarketAnalyticsExportDataButton />
              ) : null}
            </div>
            <UploadDealUWModal
              dealId={deal?.id}
              dealType={deal?.type}
              modal={uploadUWModal}
              onAction={() => setUploadUWModal(false)}
            />
            <QuickDealEditModal
              deal={deal}
              modal={quickDealEditModal}
              onAction={() => setQuickDealEditModal(false)}
            />
          </div>
        </>
      ) : (
        <>
          {isMarketAnalyticsPage ? (
            <HeaderGrid.KPIsContainer className="mb-4">
              <MarketAnalyticsKPIs
                submarket={deal?.submarket}
                isLoading={isLoading}
              />
            </HeaderGrid.KPIsContainer>
          ) : isChangePhasePage ? (
            <Button
              kind="outline"
              onClick={() => {
                router.back();
              }}
              className="w-max"
            >
              Cancel process
            </Button>
          ) : (
            <Tooltip
              content={`To progress to LOI, PSA, DD, etc., ensure complete deal info including UW and timelines. Otherwise, switch only between screening and Dead Deal phases via "Edit Deal Information" page.`}
              options={{
                placement: "bottom",
              }}
            >
              <Button
                kind="outline"
                className="w-full text-center sm:w-max"
                onClick={() => {
                  router.push(
                    `/acquisitions/deals/change-phase/?dealId=${deal.id}`
                  );
                }}
              >
                Change deal phase and add full information
              </Button>
            </Tooltip>
          )}
        </>
      )}
    </div>
  );
};
