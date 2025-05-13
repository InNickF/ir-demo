import { DownloadUploadButton } from "@/commons/components/data-entry/DownloadUploadButton";
import { GenericLabelValueObject } from "@/commons/typings";
import { required } from "@/commons/utils/input-validations";
import {
  BasicDealInformation,
  DealPhase,
  ExtendedDealInformationWithFilesAndTimeline,
} from "@/acquisitions/typings/deals";
import { Input } from "in-ui-react";
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { BrokerSelect } from "../components/BrokerSelect";
import { LawFirmSelect } from "../components/LawFirmSelect";
import { LenderSelect } from "../components/LenderSelect";
import {
  Component,
  DealInformationGenericListOfInputs,
  GetDealInformationInputs,
  SpecificPhasesOption,
} from "../types";
import { getDealBasicInformationInputs } from "./deal-basic-information";
import { getDealCommonEditableAttributes } from "./deal-common-editable";

export const extendedInputKeys: Array<
  keyof ExtendedDealInformationWithFilesAndTimeline
> = [
  "address",
  "name",
  "phase",
  "status",
  "law_firm_closing_probability",
  "fund",
  "type",
  "officer",
  "officer_status",
  "officer_note",
  "analyst",
  "landlord",
  "seller",
  "broker_company",
  "broker_name",
  "lender",
  "law_firm",
  "extension_option",
  "yardi_code",
  "latest_follow_up",
  "date_check_in",
  "latest_loi_submission",
  "pricing_guidance",
  "occupancy_at_acquisitions",
  "dead_reason_type",
  "underwriting_model",
  "wire_instructions",
  "dead_reason",
  "strategy",
  "comments",
];

export const getExtendedDealInformationInputs: GetDealInformationInputs<
  ExtendedDealInformationWithFilesAndTimeline,
  SpecificPhasesOption
> = ({
  control,
  getValues,
  register,
  setValue,
  areFilesRequired = true,
  specificPhases = null,
}) => {
  const baseInputs = getDealBasicInformationInputs({
    control,
    getValues,
    register,
    setValue,
  } as unknown as {
    control: Control<BasicDealInformation>;
    getValues: UseFormGetValues<BasicDealInformation>;
    register: UseFormRegister<BasicDealInformation>;
    setValue: UseFormSetValue<BasicDealInformation>;
  });

  interface ExtendedInputsParams {
    areFilesRequired?: boolean;
    specificPhases?: DealPhase[];
  }

  const extendedInputs = ({
    areFilesRequired = true,
    specificPhases,
  }: ExtendedInputsParams): DealInformationGenericListOfInputs<
    Component<ExtendedDealInformationWithFilesAndTimeline>,
    ExtendedDealInformationWithFilesAndTimeline
  >[] => [
    ...(getDealCommonEditableAttributes({
      control,
      getValues,
      register,
      setValue,
      specificPhases,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any) as DealInformationGenericListOfInputs<
      Component<ExtendedDealInformationWithFilesAndTimeline>,
      ExtendedDealInformationWithFilesAndTimeline
    >[]),
    {
      Component: BrokerSelect,
      key: "broker_company",
      props: {
        label: "Brokerage",
        identifier: "broker_company",
        control,
        onChange: (option: GenericLabelValueObject) => {
          setValue("broker_company", option);
        },
      },
    },
    {
      Component: Input,
      key: "broker_name",
      props: {
        label: "Broker Name",
        ...register("broker_name"),
      },
    },
    {
      Component: LenderSelect,
      key: "lender",
      props: {
        label: "Lender",
        identifier: "lender",
        control,
        onChange: (option: GenericLabelValueObject) => {
          setValue("lender", option);
        },
      },
    },
    {
      Component: LawFirmSelect,
      key: "law_firm",
      props: {
        label: "Law Firm",
        identifier: "law_firm",
        control,
        onChange: (option: GenericLabelValueObject) => {
          setValue("law_firm", option);
        },
      },
    },
    {
      Component: Input,
      key: "yardi_code",
      props: {
        label: "Yardi Code",
        ...register("yardi_code"),
      },
    },
    {
      Component: DownloadUploadButton,
      key: "underwriting_model",
      props: {
        label: "Underwriting Model",
        accept: ".xlsx, .xls, .xlsb",
        canDelete: false,
        ...register("underwriting_model", {
          required: areFilesRequired ? required("Underwriting Model") : false,
        }),
      },
    },
    {
      Component: DownloadUploadButton,
      key: "wire_instructions",
      props: {
        label: "Wire Instructions",
        canDelete: false,
        ...register("wire_instructions", {
          required: areFilesRequired ? required("Wire Instructions") : false,
        }),
      },
    },
  ];

  const inputs = [
    ...baseInputs,
    ...extendedInputs({ areFilesRequired, specificPhases }),
  ] as DealInformationGenericListOfInputs<
    Component<ExtendedDealInformationWithFilesAndTimeline>,
    ExtendedDealInformationWithFilesAndTimeline
  >[];

  const orderedInputs = inputs.sort((a, b) => {
    const aIndex = extendedInputKeys.indexOf(a.key);
    const bIndex = extendedInputKeys.indexOf(b.key);
    return aIndex - bIndex;
  });
  const filterFinalInputs = orderedInputs.filter((input) =>
    extendedInputKeys.includes(input.key)
  );
  return filterFinalInputs;
};
