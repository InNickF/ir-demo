import { BasicDealInformation } from "@/acquisitions/typings/deals";
import { InputDatePicker } from "@/commons/components/data-entry/InputDatePicker";
import { transformDateToDatePicker } from "@/commons/components/data-entry/InputDatePicker/utils";
import { GenericLabelValueObject } from "@/commons/typings";
import { transformInputDateToMMDDYYYY } from "@/commons/utils/dates";
import {
  lessOrEqualToOneHundred,
  maxLength,
  moreOrEqualToZero,
  onlyNumbers,
  percentageWithTwoDecimals,
  required,
} from "@/commons/utils/input-validations";
import {
  DealDeadReasonTypeSchema,
  DealOfficerStatusSchema,
  DealValueAddTypeSchema,
} from "@/modules/acquisitions/schemas/deals";
import { getPurchasePriceSF } from "@/modules/acquisitions/utils/business-calculations";
import { Input, TextArea } from "in-ui-react";
import { AddressLatLngInput } from "../components/AddressLatLngInput";
import { AnalystSelect } from "../components/AnalystSelect";
import { DeadReasonTypeSelect } from "../components/DeadReasonTypeSelect";
import { DealTypeSelect } from "../components/DealTypeSelect";
import { FundSelect } from "../components/FundSelect";
import { OfficerSelect } from "../components/OfficerSelect";
import { StrategyWYSIWYG } from "../components/StrategyWYSIWYG";
import { GetDealInformationInputs } from "../types";
import { OfficerStatusSelect } from "../components/OfficerStatusSelect";

export const getDealBasicInformationInputs: GetDealInformationInputs<
  BasicDealInformation
> = ({ control, getValues, register, setValue }) => [
  {
    Component: Input,
    key: "address",
    props: {
      required: true,
      label: "Address",
      ...register("address", {
        required: required("Address"),
      }),
    },
  },
  {
    Component: Input,
    key: "name",
    props: {
      required: true,
      label: "Name",
      ...register("name", {
        required: required("Name"),
      }),
    },
  },
  {
    Component: Input,
    key: "purchase_price",
    props: {
      required: true,
      label: "Purchase Price",
      type: "number",
      step: "any",
      ...register("purchase_price", {
        required: required("Purchase Price"),
        valueAsNumber: true,
        pattern: onlyNumbers(),
        onChange: ({ target: { value: price } }) => {
          setValue("psf", getPurchasePriceSF({ price, sf: getValues("sf") }));
        },
      }),
    },
  },
  {
    Component: Input,
    key: "sf",
    props: {
      required: true,
      type: "number",
      step: "any",
      label: "SF",
      ...register("sf", {
        required: required("SF"),
        valueAsNumber: true,
        pattern: onlyNumbers(),
        onChange: ({ target: { value: sf } }) => {
          setValue(
            "psf",
            getPurchasePriceSF({
              price: getValues("purchase_price"),
              sf,
            })
          );
        },
      }),
    },
  },
  {
    Component: Input,
    key: "psf",
    props: {
      label: "PSF",
      type: "number",
      step: "any",
      hint: "This field is auto-calculated",
      tooltip:
        "This field is auto-calculated based on the Purchase Price and SF",
      readOnly: true,
      ...register("psf", {
        valueAsNumber: true,
        pattern: onlyNumbers(),
      }),
    },
  },
  {
    Component: OfficerSelect,
    key: "officer",
    props: {
      label: "Officer",
      identifier: "officer",
      control,
      onChange: (option: GenericLabelValueObject) => {
        setValue("officer", option);
      },
      rules: {
        required: required("Officer"),
      },
    },
  },
  {
    Component: OfficerStatusSelect,
    key: "officer_status",
    props: {
      label: "Officer Status",
      identifier: "officer_status",
      control,
      onChange: (
        option: GenericLabelValueObject<typeof DealOfficerStatusSchema>
      ) => {
        setValue("officer_status", option);
      },
    },
  },
  {
    Component: Input,
    key: "officer_note",
    props: {
      label: "Officer Notes",
      ...register("officer_note", {
        maxLength: maxLength(40),
      }),
    },
  },
  {
    Component: AnalystSelect,
    key: "analyst",
    props: {
      label: "Analyst",
      identifier: "analyst",
      control,
      onChange: (option: GenericLabelValueObject) => {
        setValue("analyst", option);
      },
      rules: {
        required: required("Analyst"),
      },
    },
  },
  {
    Component: FundSelect,
    key: "fund",
    props: {
      label: "Fund",
      identifier: "fund",
      control,
      onChange: (option: GenericLabelValueObject) => {
        setValue("fund", option);
      },
      rules: {
        required: required("Fund"),
      },
    },
  },
  {
    Component: Input,
    key: "landlord",
    props: {
      label: "Landlord",
      ...register("landlord"),
    },
  },
  {
    Component: Input,
    key: "seller",
    props: {
      label: "Seller",
      ...register("seller"),
    },
  },
  {
    Component: DealTypeSelect,
    key: "type",
    props: {
      label: "Type",
      identifier: "type",
      control,
      onChange: (
        option: GenericLabelValueObject<typeof DealValueAddTypeSchema>
      ) => {
        setValue("type", option);
      },
      rules: {
        required: required("Type"),
      },
    },
  },
  {
    Component: InputDatePicker as typeof Input,
    key: "latest_follow_up",
    props: {
      label: "Latest Follow Up",
      defaultValue: transformDateToDatePicker({
        value: getValues("latest_follow_up"),
      }),
      ...register("latest_follow_up"),
      onChange: (event) => {
        if (event?.target?.value) {
          setValue(
            "latest_follow_up",
            transformInputDateToMMDDYYYY(event.target.value)
          );
        }
      },
    },
  },
  {
    Component: InputDatePicker as typeof Input,
    key: "date_check_in",
    props: {
      label: "Check-In Date",
      defaultValue: transformDateToDatePicker({
        value: getValues("date_check_in"),
      }),
      ...register("date_check_in"),
      onChange: (event) => {
        if (event?.target?.value) {
          setValue(
            "date_check_in",
            transformInputDateToMMDDYYYY(event.target.value)
          );
        }
      },
    },
  },
  {
    Component: InputDatePicker as typeof Input,
    key: "latest_loi_submission",
    props: {
      label: "Latest LOI Submission",
      defaultValue: transformDateToDatePicker({
        value: getValues("latest_loi_submission"),
      }),
      ...register("latest_loi_submission"),
      onChange: (event) => {
        if (event?.target?.value) {
          setValue(
            "latest_loi_submission",
            transformInputDateToMMDDYYYY(event.target.value)
          );
        }
      },
    },
  },
  {
    Component: Input,
    key: "pricing_guidance",
    props: {
      label: "Pricing Guidance",
      ...register("pricing_guidance", {
        pattern: onlyNumbers(),
        valueAsNumber: true,
        min: moreOrEqualToZero("Pricing Guidance"),
      }),
    },
  },
  {
    Component: Input,
    key: "occupancy_at_acquisitions",
    props: {
      label: "% Occupancy at Acquisitions",
      ...register("occupancy_at_acquisitions", {
        pattern: percentageWithTwoDecimals(),
        min: moreOrEqualToZero("Percent Leased"),
        max: lessOrEqualToOneHundred("Percent Leased"),
      }),
    },
  },
  {
    Component: DeadReasonTypeSelect,
    key: "dead_reason_type",
    props: {
      label: "Dead Reason",
      identifier: "dead_reason_type",
      control,
      onChange: (
        option: GenericLabelValueObject<
          typeof DealDeadReasonTypeSchema,
          typeof DealDeadReasonTypeSchema
        >
      ) => {
        setValue("dead_reason_type", option);
      },
      rules: {
        required: required("Dead Reason"),
      },
    },
  },
  {
    Component: TextArea,
    key: "dead_reason",
    props: {
      label: "Dead Reason Details",
      ...register("dead_reason", {
        validate: (value) => {
          const deadReasonType = getValues("dead_reason_type");
          const isDeadReasonTypeOther = deadReasonType?.value === "OTHER";
          if (isDeadReasonTypeOther && !value) {
            return "Dead Reason Details is required.";
          }
          return true;
        },
      }),
    },
  },
  {
    Component: StrategyWYSIWYG,
    key: "strategy",
    props: {
      label: "Deal Summary",
      content: getValues("strategy"),
      onContentChange: (value: string) => {
        setValue("strategy", value);
      },
      ...register("strategy"),
    },
  },
  {
    Component: TextArea,
    key: "comments",
    props: {
      label: "Specs and Notes",
      style: { height: 170 },
      ...register("comments"),
    },
  },
];

export const dealBasicInformationKeysOrder = [
  "address",
  "name",
  "purchase_price",
  "sf",
  "psf",
  "type",
  "officer",
  "officer_status",
  "officer_note",
  "analyst",
  "fund",
  "landlord",
  "seller",
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
