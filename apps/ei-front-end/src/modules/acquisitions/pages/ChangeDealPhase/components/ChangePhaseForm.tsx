import {
  DealFormTimelineItem,
  ExtendedDealInformation,
  ExtendedDealInformationPayload,
  ExtendedDealInformationWithFilesAndTimeline,
} from "@/acquisitions/typings/deals";
import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { notificationMessages } from "@/commons/utils";
import { getExtendedDealInformationInputs } from "@/acquisitions/components/data-entry/DealInformationFormInputs";
import { DealTimeline } from "@/acquisitions/components/data-entry/DealTimeline";
import { EditableDealTimelineTable } from "@/acquisitions/components/data-entry/DealTimeline/components/DealTimelineTable";
import { mergeFormTimelineItems } from "@/acquisitions/components/data-entry/DealTimeline/utils";
import {
  uploadDealUnderwritingModelToS3,
  uploadDealWireInstructionToS3,
} from "@/acquisitions/services/api/deals";
import {
  useMutateDealTimeline,
  useMutateDealUnderwritingModel,
  useMutateDealWireInstruction,
  useMutateEditExtendedDealInformation,
} from "@/acquisitions/services/mutations/deals";
import { transformDealToPayload } from "@/modules/acquisitions/utils/data-transformations";
import { Button, Title } from "in-ui-react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { FC, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
const { subjectErrorCRUD } = notificationMessages;

import "../styles.css";

interface ChangePhaseFormProps {
  deal: ExtendedDealInformation;
  defaultTimeline: DealFormTimelineItem;
}

export const ChangePhaseForm: FC<ChangePhaseFormProps> = ({
  deal,
  defaultTimeline,
}) => {
  const router = useRouter();
  const { dealId } = router.query;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
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
      lender: deal.lender,
      law_firm: deal.law_firm,
      yardi_code: deal.yardi_code,
      strategy: deal.strategy,
      comments: deal.comments,
      timeline: defaultTimeline,
      longitude: deal.longitude,
      latitude: deal.latitude,
      phase: null,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [, createNotification] = useAtom(addNotificationAtom);

  const mutationUpdateDealInformation = useMutateEditExtendedDealInformation();
  const mutationUWModel = useMutateDealUnderwritingModel();
  const mutationWireInstruction = useMutateDealWireInstruction();
  const mutationDealTimeline = useMutateDealTimeline();

  const inputs = useMemo(
    () => {
      const inputs = getExtendedDealInformationInputs({
        control,
        getValues,
        register,
        setValue,
        areFilesRequired: false,
      }).map((input) => {
        /* Adding styling to some specific inputs */
        if (input.key === "strategy" || input.key === "comments") {
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

        return input;
      }) as ReturnType<typeof getExtendedDealInformationInputs>;
      reset();
      return inputs;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const redirectToDeal = () => {
    router.push(`/acquisitions/deals/deal-summary/?dealId=${dealId}`);
  };

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
            message: `Error updating information for ${deal.name} but files and timeline were uploaded successfully.`,
          });
          setIsLoading(false);
        },
        onSuccess: () => {
          redirectToDeal();
        },
      }
    );
  };

  const createTimeline = () => {
    const timelinePayload = mergeFormTimelineItems({
      formTimelineItems: getValues("timeline"),
      dealId: dealId as string,
    });

    mutationDealTimeline.mutate(
      { dealId: dealId as string, timeline: timelinePayload },
      {
        onError: () => {
          createNotification({
            kind: "error",
            subject: subjectErrorCRUD({
              verb: "POST",
              resource: "Deal timeline",
            }),
            message: `Error creating timeline for ${deal.name} but files were uploaded successfully.`,
          });
          setIsLoading(false);
        },
        onSuccess: () => {
          updateDeal();
        },
      }
    );
  };

  const createWireInstruction = () => {
    const wireInstruction = getValues("wire_instructions")[0] as File;

    if (wireInstruction) {
      uploadDealWireInstructionToS3({
        dealId: dealId as string,
        instruction: wireInstruction,
      })
        .then((data) => {
          mutationWireInstruction.mutate(data, {
            onError: () => {
              createNotification({
                kind: "error",
                subject: subjectErrorCRUD({
                  verb: "POST",
                  resource: "Wire Instruction",
                }),
                message: `Error creating wire instruction for deal ${deal.name}`,
              });
              setIsLoading(false);
            },
            onSuccess: () => {
              createUwModel();
            },
          });
        })
        .catch(() => {
          createNotification({
            kind: "error",
            subject: subjectErrorCRUD({
              verb: "POST",
              resource: "Wire instruction in S3 bucket",
            }),
            message: `Error uploading wire instruction for deal ${deal.name}`,
          });
          setIsLoading(false);
        });
    } else {
      createUwModel();
    }
  };

  const createUwModel = () => {
    const uwModel = getValues("underwriting_model")[0] as File;
    if (uwModel) {
      uploadDealUnderwritingModelToS3({
        dealId: dealId as string,
        model: uwModel,
        dealType: deal?.type?.value,
      })
        .then((data) => {
          mutationUWModel.mutate(data, {
            onError: () => {
              createNotification({
                kind: "error",
                subject: subjectErrorCRUD({
                  verb: "POST",
                  resource: "Underwriting Model",
                }),
                message: `Error creating underwriting model for deal ${deal.name}`,
              });
              setIsLoading(false);
            },
            onSuccess: () => {
              createTimeline();
            },
          });
        })
        .catch(() => {
          createNotification({
            kind: "error",
            subject: subjectErrorCRUD({
              verb: "POST",
              resource: "Wire instruction in S3 bucket",
            }),
            message: `Error uploading wire instruction for deal ${deal.name} but its wire instruction was created`,
          });
          setIsLoading(false);
        });
    } else {
      createTimeline();
    }
  };

  const onSubmit = () => {
    setIsLoading(true);
    createWireInstruction();
  };

  return (
    <section>
      <Title className="mb-4">Change Deal Phase</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <div className="acq-change-deal-phase-form-footer">
          <Button type="submit" disabled loading={isLoading}>
            Save
          </Button>
          <Button kind="ghost" onClick={redirectToDeal}>
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
};
