import { GenericLabelValueObject } from "@/commons/typings";
import { required } from "@/commons/utils/input-validations";
import {
  DealLawClosingProbabilitySchema,
  DealPhaseSchema,
  DealStatusSchema,
} from "@/acquisitions/schemas/deals";
import { DealCommonEditableAttributes } from "@/acquisitions/typings/deals";
import { ClosingProbabilitySelect } from "../components/ClosingProbabilitySelect";
import { PhaseSelect } from "../components/PhaseSelect";
import { StatusSelect } from "../components/StatusSelect";
import { GetDealInformationBasicInputs, SpecificPhasesOption } from "../types";

export const getDealCommonEditableAttributes: GetDealInformationBasicInputs<
  DealCommonEditableAttributes,
  SpecificPhasesOption
> = ({ control, setValue, specificPhases = null }) => [
  {
    Component: PhaseSelect,
    key: "phase",
    props: {
      label: "Phase",
      identifier: "phase",
      specificOptions: specificPhases,
      control,
      onChange: (
        option: GenericLabelValueObject<
          typeof DealPhaseSchema,
          typeof DealPhaseSchema
        >
      ) => {
        setValue("phase", option);
      },
      rules: {
        required: required("Phase"),
      },
    },
  },
  {
    Component: StatusSelect,
    key: "status",
    props: {
      label: "Status",
      identifier: "status",
      control,
      onChange: (
        option: GenericLabelValueObject<
          typeof DealStatusSchema,
          typeof DealStatusSchema
        >
      ) => {
        setValue("status", option);
      },
      rules: {
        required: required("Status"),
      },
    },
  },
  {
    Component: ClosingProbabilitySelect,
    key: "law_firm_closing_probability",
    props: {
      label: "Closing Probability",
      identifier: "law_firm_closing_probability",
      control,
      onChange: (
        option: GenericLabelValueObject<
          typeof DealLawClosingProbabilitySchema,
          typeof DealLawClosingProbabilitySchema
        >
      ) => {
        setValue("law_firm_closing_probability", option);
      },
      rules: {
        required: required("Closing Probability"),
      },
    },
  },
];
