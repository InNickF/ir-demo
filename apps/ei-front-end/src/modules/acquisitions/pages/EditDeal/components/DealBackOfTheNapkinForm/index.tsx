import { DealBackOfNapkinFields } from "@/acquisitions/components/data-entry/DealBackOfTheNapkinFields";
import { useMutatePatchScreeningDealInformation } from "@/acquisitions/services/mutations/deals";
import {
  DealBackOfTheNapkinInformation,
  ScreeningDealInformation,
  ScreeningDealInformationPayload,
} from "@/acquisitions/typings/deals";
import { transformDealToPayload } from "@/modules/acquisitions/utils/data-transformations";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { EditDealFormFooter } from "../EditDealFormFooter";
import { BOTNDependencyFields } from "./components/BOTNDependencyFields";

interface DealBackOfNapkinFormProps {
  className?: string;
  deal: ScreeningDealInformation;
}

export type DealBackOfNapkinFormAndDependencyInputs =
  DealBackOfTheNapkinInformation &
    Pick<ScreeningDealInformation, "purchase_price" | "sf" | "psf">;

export const DealBackOfNapkinForm: FC<DealBackOfNapkinFormProps> = ({
  className,
  deal,
}) => {
  const router = useRouter();
  const { dealId } = router.query as { dealId: string };

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<DealBackOfNapkinFormAndDependencyInputs>({
    defaultValues: {
      purchase_price: deal?.purchase_price,
      sf: deal?.sf,
      psf: deal?.psf,
      transaction_costs_percentage: deal?.transaction_costs_percentage,
      transaction_costs: deal?.transaction_costs,
      transaction_costs_psf: deal?.transaction_costs_psf,
      tenant_improvements_psf: deal?.tenant_improvements_psf,
      tenant_improvements: deal?.tenant_improvements,
      leasing_commissions_psf: deal?.leasing_commissions_psf,
      leasing_commissions: deal?.leasing_commissions,
      capital_expenditures_psf: deal?.capital_expenditures_psf,
      capital_expenditures: deal?.capital_expenditures,
      total_uses: deal?.total_uses,
      total_uses_psf: deal?.total_uses_psf,
      debt_percentage: deal?.debt_percentage,
      debt: deal?.debt,
      debt_psf: deal?.debt_psf,
      equity_percentage: deal?.equity_percentage,
      equity: deal?.equity,
      equity_psf: deal?.equity_psf,
      total_sources: deal?.total_sources,
      total_sources_psf: deal?.total_sources_psf,
      current_market_rent_sf: deal?.current_market_rent_sf,
      current_market_rent_sf_type: deal?.current_market_rent_sf_type,
      imputed_yield_on_cost_percentage: deal?.imputed_yield_on_cost_percentage,
      cap_rate: deal?.cap_rate,
    },
  });

  const editDealInformation = useMutatePatchScreeningDealInformation();

  const redirectToDeal = () => {
    router.push(`/acquisitions/deals/deal-summary/?dealId=${deal.id}`);
  };

  const updateBackOfTheNapkin = (data) => {
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
    <section className={className}>
      <BOTNDependencyFields
        register={register}
        control={control}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
        reset={reset}
      />
      <form onSubmit={handleSubmit(updateBackOfTheNapkin)}>
        <div>
          <DealBackOfNapkinFields
            purchasePrice={watch("purchase_price")}
            sf={watch("sf")}
            psf={watch("psf")}
            register={register}
            control={control}
            setValue={setValue}
            getValues={getValues}
            errors={errors}
            watch={watch}
          />
        </div>
        <EditDealFormFooter
          dealId={deal?.id}
          dealAddress={deal?.address}
          dealPhase={deal?.phase}
          onCancel={redirectToDeal}
          isLoading={isLoading}
        />
      </form>
    </section>
  );
};
