import { ScreeningDealInformation } from "@/acquisitions/typings/deals";
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import {
  Component,
  DealInformationGenericListOfInputs,
  GetDealInformationInputs,
} from "../types";
import { getDealBasicInformationInputs } from "./deal-basic-information";
import { getDealSpecsInformationInputs } from "./deal-specs-information";

export const basicDealInformationWithSpecsKeysOrder: Array<
  keyof ScreeningDealInformation
> = [
  "address",
  "name",
  "fund",
  "purchase_price",
  "sf",
  "psf",
  "type",
  "officer",
  "officer_status",
  "officer_note",
  "analyst",
  "landlord",
  "seller",
  "year_built",
  "number_of_buildings",
  "number_of_units",
  "site_area",
  "site_coverage",
  "clear_heights",
  "dock_high_doors",
  "latest_follow_up",
  "date_check_in",
  "latest_loi_submission",
  "pricing_guidance",
  "occupancy_at_acquisitions",
  "dead_reason_type",
  "dead_reason",
  "strategy",
  "comments",
];

export const getBasicDealInformationWithSpecs: GetDealInformationInputs<
  ScreeningDealInformation
> = ({ control, getValues, register, setValue }) => {
  const baseInputs = getDealBasicInformationInputs({
    control,
    getValues,
    register,
    setValue,
  } as unknown as {
    control: Control<ScreeningDealInformation>;
    getValues: UseFormGetValues<ScreeningDealInformation>;
    register: UseFormRegister<ScreeningDealInformation>;
    setValue: UseFormSetValue<ScreeningDealInformation>;
  });

  const dealSpecsInputs = getDealSpecsInformationInputs({
    control,
    register,
    getValues,
    setValue,
  } as unknown as {
    control: Control<ScreeningDealInformation>;
    getValues: UseFormGetValues<ScreeningDealInformation>;
    register: UseFormRegister<ScreeningDealInformation>;
    setValue: UseFormSetValue<ScreeningDealInformation>;
  });

  const inputs = [
    ...baseInputs,
    ...dealSpecsInputs,
  ] as DealInformationGenericListOfInputs<
    Component<ScreeningDealInformation>,
    ScreeningDealInformation
  >[];

  const orderedInputs = inputs.sort((a, b) => {
    const aIndex = basicDealInformationWithSpecsKeysOrder.indexOf(a.key);
    const bIndex = basicDealInformationWithSpecsKeysOrder.indexOf(b.key);
    return aIndex - bIndex;
  });
  const filterFinalInputs = orderedInputs.filter((input) =>
    basicDealInformationWithSpecsKeysOrder.includes(input.key)
  );
  return filterFinalInputs;
};
