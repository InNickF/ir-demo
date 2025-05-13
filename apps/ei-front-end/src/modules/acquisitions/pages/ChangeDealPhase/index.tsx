import {
  defaultTimelinePayload,
  timelineItemsToFormValues,
} from "@/acquisitions/components/data-entry/DealTimeline/utils";
import { AcqHead } from "@/acquisitions/components/general/AcqHead";
import { useDealIdFromQueryParams } from "@/acquisitions/hooks/useDealIdFromQueryParams";
import { DealLayout } from "@/acquisitions/layouts/DealLayout";
import { useDeal } from "@/acquisitions/services/queries/deals";
import { NextPageWithLayout } from "@/commons/typings";
import { Skeleton } from "in-ui-react";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import { InAcqPermissionsLayout } from "@/acquisitions/layouts/InAcqPermissionsLayout";
import { ChangePhaseForm } from "./components/ChangePhaseForm";
import "./styles.css";

const ChangeDealPhase: NextPageWithLayout = () => {
  const router = useRouter();
  const dealId = useDealIdFromQueryParams();
  const { data: deal, isLoading } = useDeal({
    dealId: dealId as string,
    onError(error) {
      if (error?.response?.status === 404) {
        router.push("/acquisitions/deals");
      }
    },
  });
  const defaultTimeline = timelineItemsToFormValues(defaultTimelinePayload);

  useEffect(() => {
    if (deal && deal?.has_post_screening_data) {
      router.push(`/acquisitions/deals/deal-summary/?dealId=${deal.id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deal, dealId]);

  return (
    <>
      {isLoading ? (
        <Skeleton className="w-full h-[400px]">
          <Skeleton.Avatar shape="squared" className="w-full h-[400px]" />
        </Skeleton>
      ) : (
        <ChangePhaseForm deal={deal} defaultTimeline={defaultTimeline} />
      )}
    </>
  );
};

ChangeDealPhase.getLayout = (page: ReactElement) => {
  return (
    <InAcqPermissionsLayout>
      <DealLayout>
        <AcqHead title="Change deal phase" />
        {page}
      </DealLayout>
    </InAcqPermissionsLayout>
  );
};

export default ChangeDealPhase;
