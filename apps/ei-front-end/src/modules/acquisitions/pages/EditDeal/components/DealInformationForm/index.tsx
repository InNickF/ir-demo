import {
  getDealBasicInformationInputs,
  getDealCommonEditableAttributes,
} from "@/acquisitions/components/data-entry/DealInformationFormInputs";
import { getBasicDealInformationWithSpecs } from "@/acquisitions/components/data-entry/DealInformationFormInputs/inputs/deal-basic-information-with-specs";
import { useMutateEditDealInformation } from "@/acquisitions/services/mutations/deals";
import {
  DealCommonEditableAttributes,
  ScreeningDealInformation,
  ScreeningDealInformationPayload,
} from "@/acquisitions/typings/deals";
import { transformDealToPayload } from "@/modules/acquisitions/utils/data-transformations";
import { useRouter } from "next/router";
import { FC, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { EditDealFormFooter } from "../EditDealFormFooter";

type ScreeningDeal = ScreeningDealInformation & DealCommonEditableAttributes;
interface DealInformationFormProps {
  className?: string;
  deal: ScreeningDeal;
}

export const DealInformationForm: FC<DealInformationFormProps> = ({
  className,
  deal,
}) => {
  const router = useRouter();
  const { dealId } = router.query as { dealId: string };

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ScreeningDeal>({
    mode: "all",
    defaultValues: {
      address: deal?.address,
      name: deal?.name,
      purchase_price: deal?.purchase_price,
      equity_percentage: deal?.equity_percentage,
      equity: deal?.equity,
      sf: deal?.sf,
      phase: deal?.phase,
      psf: deal?.psf,
      officer: deal?.officer,
      analyst: deal?.analyst,
      fund: deal?.fund,
      fund_name: deal?.fund_name,
      strategy: deal?.strategy,
      comments: deal?.comments,
      latitude: deal?.latitude,
      longitude: deal?.longitude,
      law_firm_closing_probability: deal?.law_firm_closing_probability,
      status: deal?.status,
      seller: deal?.seller,
      type: deal?.type,
      year_built: deal?.year_built,
      number_of_buildings: deal?.number_of_buildings,
      number_of_units: deal?.number_of_units,
      site_area: deal?.site_area,
      site_coverage: deal?.site_coverage,
      clear_heights: deal?.clear_heights,
      dock_high_doors: deal?.dock_high_doors,
      dead_reason_type: deal?.dead_reason_type,
      dead_reason: deal?.dead_reason,
      date_deal_submission: deal?.date_deal_submission,
      latest_follow_up: deal?.latest_follow_up,
      date_check_in: deal?.date_check_in,
      latest_loi_submission: deal?.latest_loi_submission,
      officer_note: deal?.officer_note,
      officer_status: deal?.officer_status,
      landlord: deal?.landlord,
      pricing_guidance: deal?.pricing_guidance,
      occupancy_at_acquisitions: deal?.occupancy_at_acquisitions,
    },
  });

  const editDealInformation = useMutateEditDealInformation();

  const redirectToDeal = () => {
    router.push(`/acquisitions/deals/deal-summary/?dealId=${dealId}`);
  };

  const inputs = useMemo(
    () => {
      const inputs = getBasicDealInformationWithSpecs({
        control,
        getValues,
        register,
        setValue,
      }).map((input) => {
        /* Adding styling to some specific inputs */
        if (
          input.key === "strategy" ||
          input.key === "comments" ||
          input.key === "dead_reason"
        ) {
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
      }) as ReturnType<typeof getDealBasicInformationInputs>;

      const commonEditableInputs = getDealCommonEditableAttributes({
        control,
        getValues,
        register,
        setValue,
        specificPhases: ["SCREENING"],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);

      const inputOrdering: Array<keyof ScreeningDeal> = [
        "address",
        "name",
        "phase",
        "fund",
        "purchase_price",
        "sf",
        "psf",
        "officer",
        "analyst",
        "seller",
        "type",
        "year_built",
        "number_of_buildings",
        "number_of_units",
        "site_area",
        "site_coverage",
        "clear_heights",
        "dock_high_doors",
        "dead_reason_type",
        "dead_reason",
        "strategy",
        "comments",
      ];
      const allInputs = [...inputs, ...commonEditableInputs];
      const orderedInputsByKey = inputOrdering.map((key) =>
        allInputs.find((input) => input.key === key)
      );

      const filteredInputs =
        deal?.phase?.value !== "DEAD"
          ? orderedInputsByKey.filter(
              (input) =>
                input.key !== "dead_reason" && input.key !== "dead_reason_type"
            )
          : orderedInputsByKey;

      return filteredInputs;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onSubmit = (data: ScreeningDealInformation) => {
    setIsLoading(true);
    const formattedDealInformation = transformDealToPayload(
      data
    ) as ScreeningDealInformationPayload;

    editDealInformation.mutate(
      { dealId, dealInformation: formattedDealInformation },
      {
        onSuccess: () => {
          redirectToDeal();
        },
        onSettled: () => {
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <div className="acq-default-form-grid">
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
