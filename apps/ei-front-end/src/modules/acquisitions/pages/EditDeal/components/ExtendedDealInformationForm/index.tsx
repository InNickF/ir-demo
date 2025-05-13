import { getExtendedDealInformationInputs } from "@/acquisitions/components/data-entry/DealInformationFormInputs";
import { DealTimeline } from "@/acquisitions/components/data-entry/DealTimeline";
import { EditableDealTimelineTable } from "@/acquisitions/components/data-entry/DealTimeline/components/DealTimelineTable";
import {
  mergeFormTimelineItems,
  mergeFormTimelineItemsForUpdate,
} from "@/acquisitions/components/data-entry/DealTimeline/utils";
import {
  uploadDealUnderwritingModelToS3,
  uploadDealWireInstructionToS3,
} from "@/acquisitions/services/api/deals";
import {
  useMutateDealTimeline,
  useMutateDealUnderwritingModel,
  useMutateDealWireInstruction,
  useMutateEditDealTimeline,
  useMutatePatchExtendedDealInformation,
} from "@/acquisitions/services/mutations/deals";
import {
  DealFormTimelineItem,
  DealPhase,
  ExtendedDealInformation,
  ExtendedDealInformationPayload,
  ExtendedDealInformationWithFilesAndTimeline,
} from "@/acquisitions/typings/deals";
import { DEAL_FILE_TYPES } from "@/acquisitions/utils";
import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { notificationMessages } from "@/commons/utils";
import { transformDealToPayload } from "@/modules/acquisitions/utils/data-transformations";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { FC, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { EditDealFormFooter } from "../EditDealFormFooter";
const { subjectErrorCRUD } = notificationMessages;
interface ExtendedDealInformationFormProps {
  className?: string;
  deal: ExtendedDealInformation;
  defaultTimeline: DealFormTimelineItem;
}

export const ExtendedDealInformationForm: FC<
  ExtendedDealInformationFormProps
> = ({ className, deal: dealInformation, defaultTimeline }) => {
  const router = useRouter();
  const { dealId } = router.query as { dealId: string };
  const [isLoading, setIsLoading] = useState(false);
  const [, createNotification] = useAtom(addNotificationAtom);

  const { deal_attachments: dealAttachments = [], ...deal } = dealInformation;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm<ExtendedDealInformationWithFilesAndTimeline>({
    mode: "all",
    defaultValues: {
      address: deal.address,
      name: deal.name,
      status: deal.status,
      law_firm_closing_probability: deal.law_firm_closing_probability,
      fund: deal.fund,
      officer: deal.officer,
      analyst: deal.analyst,
      broker_company: deal.broker_company,
      broker_name: deal.broker_name,
      phase: deal.phase,
      lender: deal.lender,
      law_firm: deal.law_firm,
      yardi_code: deal.yardi_code,
      strategy: deal.strategy,
      comments: deal.comments,
      longitude: deal.longitude,
      latitude: deal.latitude,
      timeline: defaultTimeline,
      type: deal.type,
      dead_reason_type: deal.dead_reason_type,
      dead_reason: deal.dead_reason,
      date_deal_submission: deal?.date_deal_submission,
      pricing_guidance: deal?.pricing_guidance,
      occupancy_at_acquisitions: deal?.occupancy_at_acquisitions,
      latest_follow_up: deal?.latest_follow_up,
      date_check_in: deal?.date_check_in,
      latest_loi_submission: deal?.latest_loi_submission,
      officer_note: deal?.officer_note,
      officer_status: deal?.officer_status,
      seller: deal?.seller,
      landlord: deal?.landlord,
    },
  });

  const mutationUpdateDealInformation = useMutatePatchExtendedDealInformation();
  const mutationUWModel = useMutateDealUnderwritingModel();
  const mutationWireInstruction = useMutateDealWireInstruction();
  const mutationEditDealTimeline = useMutateEditDealTimeline();
  const mutationPostDealTimeline = useMutateDealTimeline();

  const redirectToDeal = () => {
    router.push(`/acquisitions/deals/deal-summary/?dealId=${dealId}`);
  };

  const inputs = useMemo(
    () => {
      const validPhases: DealPhase[] = (
        ["SCREENING", "LOI", "PSA", "DD", "CLOSED", "DEAD"] as DealPhase[]
      ).filter((phase: DealPhase) => {
        return deal?.phase?.value === "DEAD" || phase !== "DEAD";
      });
      const inputs = getExtendedDealInformationInputs({
        control,
        getValues,
        register,
        setValue,
        areFilesRequired: false,
        specificPhases: validPhases,
      }).map((input) => {
        if (
          input.key === "yardi_code" &&
          deal?.phase?.value !== "CLOSING" &&
          input.key === "yardi_code" &&
          deal?.phase?.value !== "CLOSED"
        ) {
          const { Component, props, key } = input;
          return {
            Component: Component,
            key,
            props: {
              ...props,
              className: "hidden",
            },
          };
        }

        if (
          input.key === "strategy" ||
          input.key === "comments" ||
          input.key === "dead_reason"
        ) {
          /* Adding styling to some specific inputs */
          const { Component, props, key } = input;
          return {
            Component: Component,
            key,
            props: {
              ...props,
              className: "acq-default-form-grid__item--span-full",
            },
          };
        }

        if (dealAttachments.length && input.key === "underwriting_model") {
          const { Component, props, key } = input;
          const uwFile = dealAttachments.find(
            (item) => item.type === DEAL_FILE_TYPES.UW_MODEL
          );
          return {
            Component: Component,
            key,
            props: {
              ...props,
              downloadUrl: uwFile?.file,
              uploadedAt: uwFile?.uploaded_at,
            },
          };
        }

        if (dealAttachments.length && input.key === "wire_instructions") {
          const { Component, props, key } = input;

          const wireFile = dealAttachments.find(
            (item) => item.type === DEAL_FILE_TYPES.WIRE_INSTRUCTION
          );
          return {
            Component: Component,
            key,
            props: {
              ...props,
              downloadUrl: wireFile?.file,
              uploadedAt: wireFile?.uploaded_at,
            },
          };
        }
        return input;
      }) as ReturnType<typeof getExtendedDealInformationInputs>;

      const filteredInputs =
        deal?.phase?.value !== "DEAD"
          ? inputs.filter(
              (input) =>
                input.key !== "dead_reason" && input.key !== "dead_reason_type"
            )
          : inputs;

      reset();
      return filteredInputs;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const updateDeal = () => {
    const dealInformationWithoutFiles = {
      ...getValues(),
    };

    delete dealInformationWithoutFiles.underwriting_model;
    delete dealInformationWithoutFiles.wire_instructions;
    delete dealInformationWithoutFiles.timeline;

    const formattedDealInformation = transformDealToPayload(
      dealInformationWithoutFiles
    ) as ExtendedDealInformationPayload;

    mutationUpdateDealInformation.mutate(
      {
        dealId: dealId as string,
        dealInformation: formattedDealInformation,
      },
      {
        onError: () => {
          createNotification({
            kind: "error",
            subject: subjectErrorCRUD({
              verb: "PUT",
              resource: "Deal information",
            }),
            message: `Error updating information for ${deal.name}.`,
          });
        },
        onSuccess: () => {
          redirectToDeal();
        },
      }
    );
  };

  const processTimeline = () => {
    const timelinePayload = mergeFormTimelineItemsForUpdate(
      getValues("timeline")
    );
    const timelinePayloadHasValues = timelinePayload.some(
      (item) =>
        item.deadline !== "N/A" &&
        item.deadline !== undefined &&
        item.deadline !== null
    );

    if (!timelinePayloadHasValues) {
      updateDeal();
      return;
    }

    const handleMutationError = (verb) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: verb,
          resource: "Deal timeline",
        }),
        message: `Error ${
          verb === "PUT" ? "Updating" : "Creating"
        } timeline for ${deal.name}.`,
      });
      setIsLoading(false);
    };

    const handleMutationSuccess = () => {
      updateDeal();
    };

    const mutationOptions = {
      onError: () =>
        handleMutationError(deal?.has_post_screening_timeline ? "PUT" : "POST"),
      onSuccess: handleMutationSuccess,
    };

    if (deal?.has_post_screening_timeline) {
      mutationEditDealTimeline.mutate(
        { dealId: dealId as string, timeline: timelinePayload },
        mutationOptions
      );
    } else {
      const PostTimelinePayload = mergeFormTimelineItems({
        formTimelineItems: getValues("timeline"),
        dealId: dealId as string,
      });

      mutationPostDealTimeline.mutate(
        { dealId: dealId as string, timeline: PostTimelinePayload },
        mutationOptions
      );
    }
  };

  const createWireInstruction = () => {
    const wireInstruction = getValues("wire_instructions")[0];
    if (wireInstruction) {
      uploadDealWireInstructionToS3({
        dealId: dealId as string,
        instruction: getValues("wire_instructions")[0] as File,
      })
        .then((data) => {
          mutationWireInstruction.mutate(data, {
            onError: () => {
              createNotification({
                kind: "error",
                subject: subjectErrorCRUD({
                  verb: "PUT",
                  resource: "Wire Instruction",
                }),
                message: `Error editing wire instruction for deal ${deal.name}`,
              });
              setIsLoading(false);
            },
            onSuccess: () => {
              editUwModel();
            },
          });
        })
        .catch(() => {
          createNotification({
            kind: "error",
            subject: subjectErrorCRUD({
              verb: "PUT",
              resource: "Wire instruction in S3 bucket",
            }),
            message: `Error uploading wire instruction for deal ${deal.name}`,
          });
          setIsLoading(false);
        });
    } else {
      editUwModel();
    }
  };

  const editUwModel = () => {
    const uwModel = getValues("underwriting_model")[0];
    if (uwModel) {
      uploadDealUnderwritingModelToS3({
        dealId: dealId as string,
        model: getValues("underwriting_model")[0] as File,
        dealType: deal?.type?.value,
      })
        .then((data) => {
          mutationUWModel.mutate(data, {
            onError: () => {
              createNotification({
                kind: "error",
                subject: subjectErrorCRUD({
                  verb: "PUT",
                  resource: "Underwriting Model",
                }),
                message: `Error editing underwriting model for deal ${deal.name}`,
              });
              setIsLoading(false);
            },
            onSuccess: () => {
              processTimeline();
            },
          });
        })
        .catch(() => {
          createNotification({
            kind: "error",
            subject: subjectErrorCRUD({
              verb: "PUT",
              resource: "Wire instruction in S3 bucket",
            }),
            message: `Error uploading wire instruction for deal ${deal.name}`,
          });
          setIsLoading(false);
        });
    } else {
      processTimeline();
    }
  };

  const onSubmit = () => {
    setIsLoading(true);
    createWireInstruction();
  };

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6 acq-default-form-grid">
        {inputs.map((input) => {
          const { Component, props, key } = input;
          return (
            <Component
              key={key}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              {...(props as any)}
              error={errors?.[key]?.message}
            />
          );
        })}
      </div>
      <DealTimeline>
        <EditableDealTimelineTable
          control={control}
          getValues={getValues}
          errors={errors.timeline}
          register={register}
          setValue={setValue}
          watch={watch}
        />
      </DealTimeline>
      <EditDealFormFooter
        dealId={deal?.id}
        dealAddress={deal?.address}
        dealPhase={deal?.phase}
        onCancel={redirectToDeal}
        isLoading={isLoading}
      />
    </form>
  );
};
