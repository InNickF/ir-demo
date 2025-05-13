import { InputDatePicker } from "@/commons/components/data-entry/InputDatePicker";
import { transformDateToDatePicker } from "@/commons/components/data-entry/InputDatePicker/utils";
import { transformInputDateToMMDDYYYY } from "@/commons/utils/dates";
import {
  moreOrEqualToZero,
  onlyNumberWithOptionalDecimals,
  onlyNumbers,
  percentageWithTwoDecimals,
  required,
} from "@/commons/utils/input-validations";
import { CompstackLeaseComp } from "@/modules/acquisitions/typings/market-analytics";
import { Input, TextArea } from "in-ui-react";
import { compstackCompInputPrefix } from ".";
import { CompFormLeaseAndTransactionTypeSelect } from "../../components/CompFormFields/CompFormLeaseAndTransactionTypeSelect";

import { GenericLabelValueObject } from "@/commons/typings";
import { inputRegisterWithRequiredAttribute } from "@/commons/utils/input-register-with-required-attribute";
import { CompFormTermYearsAndMonths } from "../../components/CompFormFields/CompFormTermYearsAndMonths";
import { CompFormYearListSelect } from "../../components/CompFormFields/CompFormYearListSelect";
import { CompstackCompFormFieldRenderer } from "../../types";
import { calculateLeaseExpirationDate } from "../fields-calculations";
import { compstackCompFormAddressFields } from "./compstackCompCommonFormFields";
import {
  CurrencyDollarIcon,
  ReceiptPercentIcon,
} from "@heroicons/react/24/outline";
import { CompFormRentEscalationSelect } from "../../components/CompFormFields/CompFormRentEscalationSelect";

export const compstackCompLeaseFields: CompstackCompFormFieldRenderer<"lease">[] =
  [
    {
      key: "execution_date",
      render: ({
        state: {
          register,
          getValues,
          setValue,
          formState: { errors },
        },
      }) => (
        <InputDatePicker
          label="Execution Date"
          className={`${compstackCompInputPrefix}__input`}
          error={errors["execution_date"]?.message as string}
          defaultValue={transformDateToDatePicker({
            value: getValues("execution_date"),
          })}
          tooltip="Date the lease was executed/signed."
          {...inputRegisterWithRequiredAttribute(
            register("execution_date", {
              required: required("Execution Date"),
              onChange: (event) => {
                if (event?.target?.value) {
                  setValue(
                    "execution_date",
                    transformInputDateToMMDDYYYY(event.target.value)
                  );
                }
              },
            })
          )}
        />
      ),
    },

    {
      key: "transaction_sqft",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="transaction_sqft"
          label="Transaction Sqft"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("transaction_sqft")}
          tooltip="Size of the lease in Sqft."
          error={errors["transaction_sqft"]?.message as string}
          {...inputRegisterWithRequiredAttribute(
            register("transaction_sqft", {
              required: required("Transaction Sqft"),
              min: moreOrEqualToZero("Transaction Sqft"),
              pattern: onlyNumberWithOptionalDecimals(),
            })
          )}
        />
      ),
    },
    {
      key: "annual_starting_rent",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="annual_starting_rent"
          label="Annual Starting Rent"
          leftIcon={<CurrencyDollarIcon />}
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("annual_starting_rent")}
          error={errors["annual_starting_rent"]?.message as string}
          {...inputRegisterWithRequiredAttribute(
            register("annual_starting_rent", {
              required: required("Annual Starting Rent"),
              min: moreOrEqualToZero("Annual Starting Rent"),
              pattern: onlyNumberWithOptionalDecimals(),
            })
          )}
        />
      ),
    },
    {
      key: "year_built",
      render: ({
        state: {
          setValue,
          control,
          watch,
          formState: { errors },
        },
      }) => (
        <CompFormYearListSelect
          control={control}
          label="Year Built"
          identifier="year_built"
          yearSelected={watch("year_built")}
          className={`${compstackCompInputPrefix}__input`}
          error={errors.year_built?.message as string}
          rules={{ required: required("Year Built") }}
          onChange={(year: GenericLabelValueObject) => {
            setValue("year_built", Number(year.value));
          }}
        />
      ),
    },
    {
      key: "building_size",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="building_size"
          label="Building Size"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("building_size")}
          tooltip="Size of the building in Sqft"
          error={errors["building_size"]?.message as string}
          {...register("building_size", {
            min: moreOrEqualToZero("Building Size"),
            pattern: onlyNumberWithOptionalDecimals(),
          })}
        />
      ),
    },
    {
      key: "commencement_date",
      render: ({
        state: {
          register,
          getValues,
          setValue,
          formState: { errors },
        },
      }) => (
        <InputDatePicker
          label="Commencement Date"
          className={`${compstackCompInputPrefix}__input`}
          error={errors["commencement_date"]?.message as string}
          tooltip="Date the lease is set to commence"
          defaultValue={transformDateToDatePicker({
            value: getValues("commencement_date"),
          })}
          {...inputRegisterWithRequiredAttribute(
            register("commencement_date", {
              required: required("Commencement Date"),
              onChange: (event) => {
                if (event?.target?.value) {
                  setValue(
                    "commencement_date",
                    transformInputDateToMMDDYYYY(event.target.value)
                  );
                  setValue(
                    "expiration_date",
                    calculateLeaseExpirationDate({
                      leaseTermMonths: getValues("lease_term_months"),
                      leaseTermYears: getValues("lease_term_years"),
                      commencementDate: event.target.value,
                    })
                  );
                }
              },
            })
          )}
        />
      ),
    },
    {
      key: "year_renovated",
      render: ({
        state: {
          setValue,
          control,
          watch,
          formState: { errors },
        },
      }) => (
        <CompFormYearListSelect
          control={control}
          label="Year Renovated"
          identifier="year_renovated"
          yearSelected={watch("year_renovated")}
          className={`${compstackCompInputPrefix}__input`}
          error={errors.year_built?.message as string}
          onChange={(year: GenericLabelValueObject) => {
            setValue("year_renovated", Number(year.value));
          }}
        />
      ),
    },
    {
      key: "transaction_type",
      render: ({
        state: {
          control,
          setValue,
          formState: { errors },
        },
      }) => (
        <CompFormLeaseAndTransactionTypeSelect
          control={control}
          label="Transaction Type"
          identifier="transaction_type"
          placeholder="Select a transaction type"
          tooltip="Determines if it's a new lease, renewal, expansion, etc."
          className={`${compstackCompInputPrefix}__input`}
          error={errors.transaction_type?.message as string}
          rules={{ required: required("Transaction Type") }}
          onChange={({ value }) => {
            setValue("transaction_type", value);
          }}
        />
      ),
    },

    {
      key: "concessions_notes",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="concessions_notes"
          label="Concessions Notes"
          type="text"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("concessions_notes")}
          tooltip="Important context for any concessions."
          error={errors["concessions_notes"]?.message as string}
          {...register("concessions_notes")}
        />
      ),
    },
    {
      key: "current_landlord",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="current_landlord"
          label="Current Landlord"
          type="text"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("current_landlord")}
          error={errors["current_landlord"]?.message as string}
          {...register("current_landlord")}
        />
      ),
    },
    {
      key: "lease_term_years",
      render: ({
        state: {
          register,
          getValues,
          setValue,
          formState: { errors },
        },
      }) => (
        <Input
          label="Lease Term Years"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("lease_term_years")}
          tooltip="Years of the lease in (time between Commencement Date and Expiration Date)"
          error={errors["lease_term_years"]?.message as string}
          {...inputRegisterWithRequiredAttribute(
            register("lease_term_years", {
              required: required("Lease Term Years"),
              min: moreOrEqualToZero("Lease Term Years"),
              pattern: onlyNumbers(),
              onChange: (event) => {
                setValue(
                  "expiration_date",
                  calculateLeaseExpirationDate({
                    leaseTermMonths: getValues("lease_term_months"),
                    leaseTermYears: event.target.value,
                    commencementDate: getValues("commencement_date"),
                  })
                );
              },
            })
          )}
        />
      ),
    },
    {
      key: "lease_term_months",
      render: ({
        state: {
          register,
          getValues,
          setValue,
          formState: { errors },
        },
      }) => (
        <Input
          label="Lease Term Months"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("lease_term_months")}
          tooltip="Months of the lease in (time between Commencement Date and Expiration Date)"
          error={errors["lease_term_months"]?.message as string}
          {...inputRegisterWithRequiredAttribute(
            register("lease_term_months", {
              required: required("Lease Term Months"),
              min: moreOrEqualToZero("Lease Term Months"),
              pattern: onlyNumbers(),
              onChange: (event) => {
                setValue(
                  "expiration_date",
                  calculateLeaseExpirationDate({
                    leaseTermMonths: event.target.value,
                    leaseTermYears: getValues("lease_term_years"),
                    commencementDate: getValues("commencement_date"),
                  })
                );
              },
            })
          )}
        />
      ),
    },
    {
      key: "lease_term" as keyof CompstackLeaseComp,
      render: (props) => (
        <CompFormTermYearsAndMonths
          {...props}
          label="Lease Term"
          monthKey="lease_term_months"
          yearKey="lease_term_years"
        />
      ),
    },
    {
      key: "expiration_date",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          label="Expiration Date"
          className={`${compstackCompInputPrefix}__input`}
          error={errors["expiration_date"]?.message as string}
          defaultValue={transformDateToDatePicker({
            value: getValues("expiration_date"),
          })}
          hint="This field is auto-calculated"
          readOnly
          tooltip="This field is auto-calculated based on the Commencement Date, Lease Term Years and Lease Term Months. Represents date the lease is set to expire. "
          {...inputRegisterWithRequiredAttribute(
            register("expiration_date", {
              required: required("Expiration Date"),
            })
          )}
        />
      ),
    },
    {
      key: "rent_escalation",
      render: ({
        state: {
          register,
          getValues,
          watch,
          formState: { errors },
        },
      }) => {
        const rentEscalationType = watch("rent_escalation_type");
        return (
          <Input
            name="rent_escalation"
            label="Rent Escalation"
            step="any"
            className={`${compstackCompInputPrefix}__input`}
            defaultValue={getValues("rent_escalation")}
            leftIcon={
              rentEscalationType === "Percent" ? (
                <ReceiptPercentIcon />
              ) : (
                <CurrencyDollarIcon />
              )
            }
            error={errors["rent_escalation"]?.message as string}
            {...register("rent_escalation", {
              min: moreOrEqualToZero("Rent Escalation"),
              pattern:
                rentEscalationType === "Percent"
                  ? percentageWithTwoDecimals()
                  : onlyNumberWithOptionalDecimals(),
            })}
          />
        );
      },
    },
    {
      key: "free_rent_years",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          label="Free Rent Years"
          tooltip="Years of free rent available"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("free_rent_years")}
          error={errors["free_rent_years"]?.message as string}
          {...register("free_rent_years", {
            min: moreOrEqualToZero("Free Rent Years"),
            pattern: onlyNumbers(),
          })}
        />
      ),
    },
    {
      key: "free_rent_months",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          label="Free Rent Months"
          tooltip="Months of free rent available"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("free_rent_months")}
          error={errors["free_rent_months"]?.message as string}
          {...register("free_rent_months", {
            min: moreOrEqualToZero("Free Rent Months"),
            pattern: onlyNumbers(),
          })}
        />
      ),
    },
    {
      key: "free_rent" as keyof CompstackLeaseComp,
      render: (props) => (
        <CompFormTermYearsAndMonths
          {...props}
          label="Free rent"
          monthKey="free_rent_months"
          yearKey="free_rent_years"
        />
      ),
    },
    {
      key: "lease_type",
      render: ({
        state: {
          control,
          setValue,
          formState: { errors },
        },
      }) => (
        <CompFormLeaseAndTransactionTypeSelect
          control={control}
          label="Lease Type"
          identifier="lease_type"
          placeholder="Select a lease type"
          tooltip="Determines if it's a NNN, Gross, NN, etc"
          className={`${compstackCompInputPrefix}__input`}
          error={errors.lease_type?.message as string}
          rules={{ required: required("Lease Type") }}
          onChange={({ value }) => {
            setValue("lease_type", value);
          }}
        />
      ),
    },
    {
      key: "rent_escalation_type",
      render: ({
        state: {
          control,
          setValue,
          formState: { errors },
        },
      }) => (
        <CompFormRentEscalationSelect
          control={control}
          label="Rent Escalation Type"
          identifier="rent_escalation_type"
          tooltip="Determines if it is a percent or fixed amount."
          className={`${compstackCompInputPrefix}__input`}
          error={errors.rent_escalation_type?.message as string}
          rules={{ required: required("Rent Escalation Type") }}
          onChange={({ value }) => {
            setValue("rent_escalation_type", value);
          }}
        />
      ),
    },
    {
      key: "tenant_name",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="tenant_name"
          label="Tenant Name"
          type="text"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("tenant_name")}
          error={errors["tenant_name"]?.message as string}
          {...inputRegisterWithRequiredAttribute(
            register("tenant_name", {
              required: required("Tenant Name"),
            })
          )}
        />
      ),
    },
    {
      key: "landlord_brokers",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          label="Landlord Brokers"
          className={`${compstackCompInputPrefix}__half-grid`}
          error={errors["landlord_brokers"]?.message as string}
          tooltip="Name of the brokers involved on the landlord side"
          defaultValue={getValues("landlord_brokers")}
          {...register("landlord_brokers")}
        />
      ),
    },
    {
      key: "landlord_brokerage_firms",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          label="Landlord Brokerage Firms"
          className={`${compstackCompInputPrefix}__half-grid`}
          error={errors["landlord_brokerage_firms"]?.message as string}
          tooltip="Brokerage firm for the brokers on the landlord side"
          defaultValue={getValues("landlord_brokerage_firms")}
          {...register("landlord_brokerage_firms")}
        />
      ),
    },
    {
      key: "tenant_brokers",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          label="Tenant Brokers"
          className={`${compstackCompInputPrefix}__half-grid`}
          error={errors["tenant_brokers"]?.message as string}
          tooltip="Name of the brokers involved on the tenant side"
          defaultValue={getValues("tenant_brokers")}
          {...register("tenant_brokers")}
        />
      ),
    },
    {
      key: "tenant_brokerage_firms",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          label="Tenant Brokerage Firms"
          className={`${compstackCompInputPrefix}__half-grid`}
          error={errors["tenant_brokerage_firms"]?.message as string}
          tooltip="Brokerage firm for the brokers on the tenant side"
          defaultValue={getValues("tenant_brokerage_firms")}
          {...register("tenant_brokerage_firms")}
        />
      ),
    },
    {
      key: "loading_docks",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="loading_docks"
          label="Loading Docks"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("loading_docks")}
          tooltip="Number of high docks available to the tenant (interior or exterior)"
          error={errors["loading_docks"]?.message as string}
          {...register("loading_docks", {
            min: moreOrEqualToZero("Loading Docks"),
            pattern: onlyNumbers(),
          })}
        />
      ),
    },
    {
      key: "doors",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="doors"
          label="Doors"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("doors")}
          tooltip="Number of street-level doors available to the tenant"
          error={errors["doors"]?.message as string}
          {...register("doors", {
            min: moreOrEqualToZero("Doors"),
            pattern: onlyNumbers(),
          })}
        />
      ),
    },
    {
      key: "rail",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="rail"
          label="Rail"
          type="text"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("rail")}
          tooltip="Indicates rail connections are available"
          error={errors["rail"]?.message as string}
          {...register("rail")}
        />
      ),
    },
    {
      key: "clear_height",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="clear_height"
          label="Clear Height"
          type="text"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("clear_height")}
          tooltip="Clear height of the ceilings"
          error={errors["clear_height"]?.message as string}
          {...register("clear_height")}
        />
      ),
    },
    {
      key: "parking_notes",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="parking_notes"
          label="Parking Notes"
          type="text"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("parking_notes")}
          tooltip="Additional context about the parking"
          error={errors["parking_notes"]?.message as string}
          {...register("parking_notes")}
        />
      ),
    },
    {
      key: "parking_ratio",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="parking_ratio"
          label="Parking Ratio"
          leftIcon={<ReceiptPercentIcon />}
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("parking_ratio")}
          error={errors["parking_ratio"]?.message as string}
          {...register("parking_ratio", {
            min: moreOrEqualToZero("Parking Ratio"),
            pattern: percentageWithTwoDecimals(),
          })}
        />
      ),
    },
    {
      key: "office_portion",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="office_portion"
          label="Office Portion"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("office_portion")}
          tooltip="Sqft of office space in the lease."
          error={errors["office_portion"]?.message as string}
          {...register("office_portion", {
            min: moreOrEqualToZero("Office Portion"),
            pattern: onlyNumberWithOptionalDecimals(),
          })}
        />
      ),
    },
    {
      key: "tenant_industry",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="tenant_industry"
          label="Tenant Industry"
          type="text"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("tenant_industry")}
          error={errors["tenant_industry"]?.message as string}
          {...register("tenant_industry")}
        />
      ),
    },
    {
      key: "work_value",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="work_value"
          label="Work Value"
          tooltip="Tenant Improvement Allowances"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("work_value")}
          error={errors["work_value"]?.message as string}
          {...register("work_value", {
            min: moreOrEqualToZero("Work Value"),
            pattern: onlyNumberWithOptionalDecimals(),
          })}
        />
      ),
    },
    {
      key: "renewal_options",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="renewal_options"
          label="Renewal Options"
          type="text"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("renewal_options")}
          tooltip="Description of the renewal options available to the tenant"
          error={errors["renewal_options"]?.message as string}
          {...register("renewal_options")}
        />
      ),
    },
    {
      key: "break_option_dates",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="break_option_dates"
          label="Break Option Dates"
          type="text"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("break_option_dates")}
          error={errors["break_option_dates"]?.message as string}
          {...register("break_option_dates")}
        />
      ),
    },

    {
      key: "suite",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="suite"
          label="Suite"
          type="text"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("suite")}
          tooltip="Suite number that the tenant is occupying"
          error={errors["suite"]?.message as string}
          {...register("suite")}
        />
      ),
    },
    {
      key: "sprinkler",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="sprinkler"
          label="Sprinkler"
          type="text"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("sprinkler")}
          tooltip="Indicates if a sprinkler system is available"
          error={errors["sprinkler"]?.message as string}
          {...register("sprinkler")}
        />
      ),
    },
    {
      key: "amps",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="amps"
          label="Amps"
          type="text"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("amps")}
          tooltip="Amps of power available"
          error={errors["amps"]?.message as string}
          {...register("amps")}
        />
      ),
    },
    {
      key: "volts",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="volts"
          label="Volts"
          type="text"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("volts")}
          tooltip="Volts of power available"
          error={errors["volts"]?.message as string}
          {...register("volts")}
        />
      ),
    },
    {
      key: "building_floors",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="building_floors"
          label="Building Floors"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("building_floors")}
          tooltip="Number of floors in the building"
          error={errors["building_floors"]?.message as string}
          {...register("building_floors", {
            min: moreOrEqualToZero("Building Floors"),
            pattern: onlyNumbers(),
          })}
        />
      ),
    },
    {
      key: "lot_size",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="lot_size"
          label="Lot Size"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("lot_size")}
          tooltip="Size of the lot in acres"
          error={errors["lot_size"]?.message as string}
          {...register("lot_size", {
            min: moreOrEqualToZero("Lot Size"),
            pattern: onlyNumberWithOptionalDecimals(),
          })}
        />
      ),
    },
    {
      key: "coverage_ratio",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="coverage_ratio"
          label="Coverage Ratio"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("coverage_ratio")}
          error={errors["coverage_ratio"]?.message as string}
          {...register("coverage_ratio", {
            min: moreOrEqualToZero("Coverage Ratio"),
            pattern: onlyNumberWithOptionalDecimals(),
          })}
        />
      ),
    },
    {
      key: "tenant_websites",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="tenant_websites"
          label="Tenant Websites"
          type="text"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("tenant_websites")}
          error={errors["tenant_websites"]?.message as string}
          {...register("tenant_websites")}
        />
      ),
    },
    {
      key: "comments",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <TextArea
          label="Comments"
          className={`${compstackCompInputPrefix}__full-grid`}
          tooltip="Additional context for the lease"
          error={errors["comments"]?.message as string}
          defaultValue={getValues("comments")}
          {...register("comments")}
        />
      ),
    },
  ];

export const compstackCompLeaseForm: CompstackCompFormFieldRenderer<"lease">[] =
  [
    ...compstackCompFormAddressFields.slice(0, 1),
    ...compstackCompLeaseFields.slice(0, 9), // Insert first 9 keys from compstackCompsSaleAndLandCommonFields
    ...compstackCompFormAddressFields.slice(1), // Insert the rest of compstackCompFormAddressFields
    ...compstackCompLeaseFields.slice(9), // Insert the remaining keys from compstackCompsSaleAndLandCommonFields
  ];
