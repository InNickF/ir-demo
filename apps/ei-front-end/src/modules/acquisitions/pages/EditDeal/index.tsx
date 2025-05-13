import { timelineItemsToFormValuesForUpdate } from "@/acquisitions/components/data-entry/DealTimeline/utils";
import { AcqHead } from "@/acquisitions/components/general/AcqHead";
import { useDealIdFromQueryParams } from "@/acquisitions/hooks/useDealIdFromQueryParams";
import { DealLayout } from "@/acquisitions/layouts/DealLayout";
import { InAcqPermissionsLayout } from "@/acquisitions/layouts/InAcqPermissionsLayout";
import { useMutateDealPhoto } from "@/acquisitions/services/mutations/deals";
import {
  useDeal,
  useDealTimeline,
} from "@/acquisitions/services/queries/deals";
import { NextPageWithLayout } from "@/commons/typings";
import { getGenericValueOrString } from "@/commons/utils";
import { ButtonGroup, Skeleton, Title } from "in-ui-react";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { DealBackOfNapkinForm } from "./components/DealBackOfTheNapkinForm";
import { DealInformationForm } from "./components/DealInformationForm";
import { DealPhotos } from "./components/DealPhotos";
import { DealRiskAndMitigants } from "./components/DealRiskAndMitigants";
import { DealTenantsInformation } from "./components/DealTenantsInformation";
import { ExtendedDealInformationForm } from "./components/ExtendedDealInformationForm";
import { useButtonGroupEditDeal } from "./hooks/useButtonGroupEditDeal";
import "./styles.css";
import {
  UploadPhotoModal,
  UploadPhotoModalReturnType,
} from "@/commons/components/general/UploadPhotoModal";
import { uploadDealPhotoToS3 } from "../../services/api/deals";

const EditDeal: NextPageWithLayout = () => {
  const router = useRouter();
  const dealId = useDealIdFromQueryParams();
  const { data: deal } = useDeal({
    dealId: dealId,
    onError(error) {
      if (error?.response?.status === 404) {
        router.push("/acquisitions/deals");
      }
    },
  });

  const { data: timeline, isLoading: timelineIsLoading } =
    useDealTimeline(dealId);

  const dealTimeline = !timelineIsLoading
    ? timelineItemsToFormValuesForUpdate(timeline.results)
    : null;

  const {
    editDealFilter,
    editDealFilterItems,
    dealBackOfTheNapkinClasses,
    dealInformationClasses,
    dealPhotosClasses,
    dealRiskAndMitigantsClasses,
    dealTenantsClasses,
  } = useButtonGroupEditDeal({
    phase: getGenericValueOrString(deal?.phase),
    hasUwModel: deal?.has_uw_model,
  });

  const postMutation = useMutateDealPhoto();
  const [isUploading, setIsUploading] = useState(false);

  const createPhoto = ({
    photo,
    dialog,
    reset,
  }: UploadPhotoModalReturnType) => {
    setIsUploading(true);
    uploadDealPhotoToS3({
      dealId,
      photo: photo.file,
    }).then((data) => {
      postMutation?.mutate(data, {
        onSettled: () => {
          setIsUploading(false);
          dialog.hide();
          reset();
        },
      });
    });
  };

  const EditDealForms = () => {
    return (
      <>
        {deal ? (
          <>
            {!deal?.has_post_screening_data ? (
              <>
                <DealInformationForm
                  deal={deal}
                  className={dealInformationClasses}
                />
              </>
            ) : (
              <ExtendedDealInformationForm
                deal={deal}
                className={dealInformationClasses}
                defaultTimeline={dealTimeline}
              />
            )}
            {!deal?.has_uw_model ? (
              <DealBackOfNapkinForm
                deal={deal}
                className={dealBackOfTheNapkinClasses}
              />
            ) : null}
          </>
        ) : (
          <Skeleton className="w-full h-[400px]">
            <Skeleton.Avatar shape="squared" className="w-full h-[400px]" />
          </Skeleton>
        )}
      </>
    );
  };

  return (
    <section className="acq-edit-deal">
      <Title kind="h2">Edit Deal Information</Title>
      <div className="acq-edit-deal-button-group">
        <ButtonGroup active={editDealFilter} items={editDealFilterItems} />
        <UploadPhotoModal
          className={dealPhotosClasses}
          isUploading={isUploading}
          onSave={(args) => createPhoto({ ...args })}
        />
      </div>
      <EditDealForms />
      <DealPhotos className={dealPhotosClasses} />
      <DealTenantsInformation dealId={dealId} className={dealTenantsClasses} />
      <DealRiskAndMitigants
        dealId={dealId}
        className={dealRiskAndMitigantsClasses}
      />
    </section>
  );
};

EditDeal.getLayout = (page: ReactElement) => {
  return (
    <InAcqPermissionsLayout>
      <DealLayout>
        <AcqHead title="Edit Deal" />
        {page}
      </DealLayout>
    </InAcqPermissionsLayout>
  );
};

export default EditDeal;
