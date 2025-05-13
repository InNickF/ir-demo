import { DownloadUploadButton } from "@/commons/components/data-entry/DownloadUploadButton";
import { GenericLabelValueObject } from "@/commons/typings";
import { GenericAddressLatLong } from "@/commons/typings/addresses";
import { DealPhase } from "@/acquisitions/typings/deals";
import { Input, TextArea } from "in-ui-react";
import { ComponentType, ComponentProps } from "react";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormGetValues,
  Control,
} from "react-hook-form";

import { AddressLatLngInput } from "./components/AddressLatLngInput";
import { PhaseSelect, PhaseSelectProps } from "./components/PhaseSelect";
import { StrategyWYSIWYG } from "./components/StrategyWYSIWYG";
import {
  GenericControlledSelect,
  GenericControlledSelectProps,
} from "@/commons/components/data-entry/GenericControlledSelect";

export type DealInformationSelects = typeof GenericControlledSelect;
export type DealPhaseSelect = typeof PhaseSelect;

export type DealInformationGenericListOfInputs<
  TComponent extends ComponentType,
  Information
> =
  | {
      Component: TComponent;
      key: keyof Information;
      props: ComponentProps<TComponent>;
    }
  | {
      Component: DealInformationSelects;
      key: keyof Information;
      props: GenericControlledSelectProps<
        GenericLabelValueObject,
        false,
        Information
      >;
    }
  | {
      Component: DealPhaseSelect;
      key: keyof Information;
      props: PhaseSelectProps<GenericLabelValueObject, false, Information>;
    };

export type Component<T extends GenericAddressLatLong> =
  | typeof Input
  | typeof TextArea
  | typeof StrategyWYSIWYG
  | typeof DownloadUploadButton
  | typeof AddressLatLngInput<T>;

export type BasicComponent =
  | typeof Input
  | typeof TextArea
  | typeof StrategyWYSIWYG
  | typeof DownloadUploadButton;

export interface SpecificPhasesOption {
  specificPhases?: DealPhase[];
}
export interface GetDealInformationInputsParams<T> {
  register: UseFormRegister<T>;
  control: Control<T>;
  setValue: UseFormSetValue<T>;
  getValues: UseFormGetValues<T>;
  areFilesRequired?: boolean;
}

export type GetDealInformationInputs<
  T extends GenericAddressLatLong,
  TExtraOptions = null
> = (
  props: TExtraOptions extends null
    ? GetDealInformationInputsParams<T>
    : GetDealInformationInputsParams<T> & TExtraOptions
) => DealInformationGenericListOfInputs<Component<T>, T>[];

export type GetDealInformationBasicInputs<T, TExtraOptions = null> = (
  props: TExtraOptions extends null
    ? GetDealInformationInputsParams<T>
    : GetDealInformationInputsParams<T> & TExtraOptions
) => DealInformationGenericListOfInputs<BasicComponent, T>[];

export type GetDealSpecsInformationInputs<T, TExtraOptions = null> = (
  props: TExtraOptions extends null
    ? Omit<GetDealInformationInputsParams<T>, "areFilesRequired">
    : Omit<GetDealInformationInputsParams<T>, "areFilesRequired"> &
        TExtraOptions
) => DealInformationGenericListOfInputs<BasicComponent, T>[];
