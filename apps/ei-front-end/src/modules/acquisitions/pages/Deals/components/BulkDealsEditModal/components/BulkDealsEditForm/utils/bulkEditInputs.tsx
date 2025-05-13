import { GenericLabelValueObject } from "@/commons/typings";
import { GenericFormFieldRenderer } from "@/commons/typings/forms";
import { ClosingProbabilitySelect } from "@/modules/acquisitions/components/data-entry/DealInformationFormInputs/components/ClosingProbabilitySelect";
import { DealTypeSelect } from "@/modules/acquisitions/components/data-entry/DealInformationFormInputs/components/DealTypeSelect";
import { FundSelect } from "@/modules/acquisitions/components/data-entry/DealInformationFormInputs/components/FundSelect";
import { OfficerSelect } from "@/modules/acquisitions/components/data-entry/DealInformationFormInputs/components/OfficerSelect";
import { OfficerStatusSelect } from "@/modules/acquisitions/components/data-entry/DealInformationFormInputs/components/OfficerStatusSelect";
import { StatusSelect } from "@/modules/acquisitions/components/data-entry/DealInformationFormInputs/components/StatusSelect";
import {
  DealLawClosingProbabilitySchema,
  DealOfficerStatusSchema,
  DealStatusSchema,
  DealValueAddTypeSchema,
} from "@/modules/acquisitions/schemas/deals";
import { Deal } from "@/modules/acquisitions/typings/deals";
import { CommonDatePicker } from "../components/CommonDatePicker";
import { CommonInput } from "../components/CommonInput";
import { RenderInputsWrapper } from "../components/RenderInputsWrapper";
import { BrokerSelect } from "@/modules/acquisitions/components/data-entry/DealInformationFormInputs/components/BrokerSelect";

export const bulkEditInputs: GenericFormFieldRenderer<Deal>[] = [
  {
    key: "date_check_in",
    render: (renderProps) => {
      const name = "date_check_in";
      return (
        <RenderInputsWrapper>
          <CommonDatePicker
            label="Check In Date"
            name={name}
            {...renderProps}
          />
        </RenderInputsWrapper>
      );
    },
  },
  {
    key: "latest_follow_up",
    render: (renderProps) => {
      const name = "latest_follow_up";
      return (
        <RenderInputsWrapper>
          <CommonDatePicker
            label="Latest Follow Up"
            name={name}
            {...renderProps}
          />
        </RenderInputsWrapper>
      );
    },
  },
  {
    key: "officer_status",
    render: ({ state: form, HTMLAttributes }) => {
      const name = "officer_status";
      return (
        <RenderInputsWrapper>
          <OfficerStatusSelect
            label="Officer Status"
            identifier={name}
            control={form.control}
            defaultValue={form.getValues(name)}
            onChange={(
              option: GenericLabelValueObject<typeof DealOfficerStatusSchema>
            ) => {
              form.setValue(name, option);
            }}
            error={form.formState.errors[name]?.message}
            {...HTMLAttributes}
          />
        </RenderInputsWrapper>
      );
    },
  },
  {
    key: "latest_loi_submission",
    render: (renderProps) => {
      const name = "latest_loi_submission";
      return (
        <RenderInputsWrapper>
          <CommonDatePicker
            label="Most Recent LOI"
            name={name}
            {...renderProps}
          />
        </RenderInputsWrapper>
      );
    },
  },
  {
    key: "broker_name",
    render: (renderProps) => {
      const name = "broker_name";
      return (
        <RenderInputsWrapper>
          <CommonInput label="Broker Name" name={name} {...renderProps} />
        </RenderInputsWrapper>
      );
    },
  },
  {
    key: "officer_note",
    render: (renderProps) => {
      const name = "officer_note";
      return (
        <RenderInputsWrapper>
          <CommonInput label="Officer Note" name={name} {...renderProps} />
        </RenderInputsWrapper>
      );
    },
  },
  {
    key: "landlord",
    render: (renderProps) => {
      const name = "landlord";
      return (
        <RenderInputsWrapper>
          <CommonInput label="Landlord" name={name} {...renderProps} />
        </RenderInputsWrapper>
      );
    },
  },
  {
    key: "fund",
    render: ({ state }) => {
      const name = "fund";
      return (
        <RenderInputsWrapper>
          <FundSelect
            label="Fund"
            identifier={name}
            control={state.control}
            onChange={(option: GenericLabelValueObject) => {
              state.setValue(name, option);
            }}
            error={state.formState.errors[name]?.message}
            menuPortalTarget={document.body}
          />
        </RenderInputsWrapper>
      );
    },
  },
  {
    key: "law_firm_closing_probability",
    render: ({ state }) => {
      const name = "law_firm_closing_probability";
      return (
        <RenderInputsWrapper>
          <ClosingProbabilitySelect
            label="Closing Probability"
            identifier={name}
            control={state.control}
            onChange={(
              option: GenericLabelValueObject<
                typeof DealLawClosingProbabilitySchema
              >
            ) => {
              state.setValue(name, option);
            }}
            error={state.formState.errors[name]?.message}
            menuPortalTarget={document.body}
          />
        </RenderInputsWrapper>
      );
    },
  },
  {
    key: "officer",
    render: ({ state }) => {
      const name = "officer";
      return (
        <RenderInputsWrapper>
          <OfficerSelect
            label="Officer"
            identifier={name}
            control={state.control}
            onChange={(option: GenericLabelValueObject) => {
              state.setValue(name, option);
            }}
            error={state.formState.errors[name]?.message}
            menuPortalTarget={document.body}
          />
        </RenderInputsWrapper>
      );
    },
  },
  {
    key: "type",
    render: ({ state }) => {
      const name = "type";
      return (
        <RenderInputsWrapper>
          <DealTypeSelect
            label="Deal type"
            identifier={name}
            control={state.control}
            onChange={(
              option: GenericLabelValueObject<typeof DealValueAddTypeSchema>
            ) => {
              state.setValue(name, option);
            }}
            error={state.formState.errors[name]?.message}
            menuPortalTarget={document.body}
          />
        </RenderInputsWrapper>
      );
    },
  },
  {
    key: "status",
    render: ({ state }) => {
      const name = "status";
      return (
        <RenderInputsWrapper>
          <StatusSelect
            label="Investment Committee"
            identifier={name}
            control={state.control}
            onChange={(
              option: GenericLabelValueObject<typeof DealStatusSchema>
            ) => {
              state.setValue(name, option);
            }}
            error={state.formState.errors[name]?.message}
            menuPortalTarget={document.body}
          />
        </RenderInputsWrapper>
      );
    },
  },
  {
    key: "broker_company",
    render: ({ state }) => {
      const name = "broker_company";
      return (
        <RenderInputsWrapper>
          <BrokerSelect
            label="Broker Company"
            identifier={name}
            control={state.control}
            onChange={(option: GenericLabelValueObject) => {
              state.setValue(name, option);
            }}
            error={state.formState.errors[name]?.message}
            menuPortalTarget={document.body}
          />
        </RenderInputsWrapper>
      );
    },
  },
];
