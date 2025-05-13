import { StepFooter } from "@/acquisitions/pages/NewDeal/components/NewDealStepper/components/StepFooter";
import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { notificationMessages } from "@/commons/utils";
import {
  uploadDealPhotosToS3,
  uploadDealRoomItemsToS3,
  uploadDealUnderwritingModelToS3,
} from "@/acquisitions/services/api/deals";
import {
  useMutateBulkDealPhotos,
  useMutateBulkDealRoomItems,
  useMutateDealUnderwritingModel,
  useMutateNewDeal,
} from "@/acquisitions/services/mutations/deals";
import {
  Deal,
  LocalDealRoomItem,
  ScreeningDealInformationPayload,
} from "@/acquisitions/typings/deals";
import { transformDealToPayload } from "@/modules/acquisitions/utils/data-transformations";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { Heading, Stepper } from "in-ui-react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { GenericStepContentActions, NewDealState } from "../../../types";
import { LocalDealRoomCard } from "../DealRoom/components/LocalDealRoomCard";
import { LocalDealRoomTable } from "../DealRoom/components/LocalDealRoomTable";
import { LocalDealPhotosGrid } from "../Photos/components/LocalDealPhotosGrid";
import { DealBackOfTheNapkinFields } from "./components/DealBackOfTheNapkinFields";
import { DealInformationFields } from "./components/DealInformationFields";
import { FieldBlock } from "./components/FieldBlock";
const { subjectErrorCRUD } = notificationMessages;

interface SummaryStepProps extends GenericStepContentActions<null> {
  summary: NewDealState;
}
export const SummaryStep: FC<SummaryStepProps> = ({
  summary,
  current,
  onBack,
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  const title = "Deal Room";
  const icon = <CalendarIcon />;
  const mutationCreateNewDeal = useMutateNewDeal();
  const mutationBulkDealRoomItems = useMutateBulkDealRoomItems();
  const mutationBulkDealPhotos = useMutateBulkDealPhotos();
  const mutationUWModel = useMutateDealUnderwritingModel();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<"normal" | "pursue">(null);

  const newDealHasBackOfTheNapkin =
    Object.entries(summary.dealBackOfTheNapkin).length > 0;

  const newDealHasUnderwritingModel = summary.dealUnderwritingModel !== null;

  const canDontPersue = () => {
    if (summary.dealInformation?.dead_reason_type?.value === "OTHER") {
      return summary.dealInformation?.dead_reason?.length > 0;
    }
    return !!summary.dealInformation?.dead_reason_type?.value;
  };

  const createDealRoomItems = (id: Deal["id"]) => {
    uploadDealRoomItemsToS3({
      dealId: id,
      items: summary.dealRoomItems,
    })
      .then((data) => {
        mutationBulkDealRoomItems.mutate(data, {
          onSuccess: () => {
            router.push(`/acquisitions/deals/deal-summary/?dealId=${id}`);
          },
          onError: () => {
            createNotification({
              kind: "error",
              subject: subjectErrorCRUD({
                verb: "POST",
                resource: "deal room items",
              }),
              message: `Error uploading deal room files, but the deal with ID: ${id} and its photos was created.`,
            });
          },
          onSettled: () => {
            setIsLoading(null);
          },
        });
      })
      .catch(() => {
        createNotification({
          kind: "error",
          subject: subjectErrorCRUD({
            verb: "POST",
            resource: "deal room items in S3 bucket",
          }),
          message: `Error uploading deal room files, but the deal with ID: ${id} and its photos was created.`,
        });
        setIsLoading(null);
      });
  };

  const createDealPhotos = (id: Deal["id"]) => {
    uploadDealPhotosToS3({
      dealId: id,
      photos: summary.dealAttachments,
    })
      .then((data) => {
        mutationBulkDealPhotos.mutate(data, {
          onSuccess: () => {
            createDealRoomItems(id);
          },
          onError: () => {
            createNotification({
              kind: "error",
              subject: subjectErrorCRUD({
                verb: "POST",
                resource: "deal photos",
              }),
              message: `Error uploading photos, but the deal was created with ID: ${id}`,
            });
            setIsLoading(null);
          },
        });
      })
      .catch(() => {
        createNotification({
          kind: "error",
          subject: subjectErrorCRUD({
            verb: "POST",
            resource: "deal photos in S3 bucket",
          }),
          message: `Error uploading photos, but the deal was created with ID: ${id}`,
        });
        setIsLoading(null);
      });
  };

  const createDealUnderwritingModel = (id: Deal["id"]) => {
    uploadDealUnderwritingModelToS3({
      dealId: id,
      model: summary.dealUnderwritingModel,
      dealType: summary.dealInformation.type.value,
    })
      .then((data) => {
        mutationUWModel.mutate(data, {
          onSuccess: () => {
            createDealPhotos(id);
          },
          onError: () => {
            createNotification({
              kind: "error",
              subject: subjectErrorCRUD({
                verb: "POST",
                resource: "Underwriting Model",
              }),
              message: `Error uploading underwriting model, but the deal was created with ID: ${id}`,
            });
            setIsLoading(null);
          },
        });
      })
      .catch(() => {
        createNotification({
          kind: "error",
          subject: subjectErrorCRUD({
            verb: "POST",
            resource: "Underwriting Model in S3 bucket",
          }),
          message: `Error uploading underwriting model, but the deal was created with ID: ${id}`,
        });
        setIsLoading(null);
      });
  };

  const createNewDeal = (pursue = true) => {
    router.push(`/acquisitions/deals/deal-summary/?dealId=1000-llc`);
  };

  return (
    <Stepper.StepContent step={5} current={current}>
      <Heading kind="h2" className="mt-8 mb-6">
        Confirm Information
      </Heading>
      <DealInformationFields inputs={summary.dealInformation} />
      {newDealHasBackOfTheNapkin ? (
        <>
          <Heading kind="h3" className="mt-8 mb-6">
            Back of the Napkin
          </Heading>
          <DealBackOfTheNapkinFields inputs={summary.dealBackOfTheNapkin} />
        </>
      ) : null}
      {newDealHasUnderwritingModel ? (
        <>
          <Heading kind="h3" className="mt-8 mb-6">
            Underwriting File
          </Heading>
          <FieldBlock
            label="File name"
            value={summary?.dealUnderwritingModel?.name}
          />
        </>
      ) : null}
      <Heading kind="h3" className="mt-8 mb-6">
        Photos
      </Heading>
      <LocalDealPhotosGrid photos={summary.dealAttachments} />
      <Heading kind="h3" className="mt-8 mb-6">
        Deal Room
      </Heading>
      <LocalDealRoomCard icon={icon} title={title}>
        <LocalDealRoomTable
          data={summary.dealRoomItems as unknown as LocalDealRoomItem[]}
        />
      </LocalDealRoomCard>
      <StepFooter
        current={current}
        onBack={onBack}
        isLoading={isLoading === "normal"}
        isLoadingPursue={isLoading === "pursue"}
        onContinue={() => {
          createNewDeal();
        }}
        onDontPursue={() => {
          createNewDeal(false);
        }}
        canDontPursue={canDontPersue()}
      />
    </Stepper.StepContent>
  );
};
