import { InputDatePicker } from "@/commons/components/data-entry/InputDatePicker";
import { transformDateToDatePicker } from "@/commons/components/data-entry/InputDatePicker/utils";
import { GenericFormFieldRenderer } from "@/commons/typings/forms";
import { transformInputDateToMMDDYYYY } from "@/commons/utils/dates";
import { inputRegisterWithRequiredAttribute } from "@/commons/utils/input-register-with-required-attribute";
import {
  lessOrEqualToOneHundred,
  moreOrEqualToZero,
  onlyNumberWithOptionalDecimals,
  onlyNumbers,
  onlyZipCode,
  percentageWithTwoDecimals,
  required,
} from "@/commons/utils/input-validations";
import {
  CompstackCompsCommonFields,
  CompstackSaleAndLandCompsCommonPayload,
} from "@/modules/acquisitions/typings/market-analytics";
import { Input, TextArea } from "in-ui-react";
import { compstackCompInputPrefix } from ".";
import { CompFormAddressAutocompleteInput } from "../../components/CompFormFields/CompFormAddressAutocompleteInput";
import { GenericCompstackCompFormFieldRenderer } from "../../types";
import { GenericControlledCheckbox } from "@/commons/components/data-entry/GenericControlledCheckbox";
import {
  CurrencyDollarIcon,
  ReceiptPercentIcon,
} from "@heroicons/react/24/outline";
import { calculatePSF } from "../fields-calculations";

export const compstackCompFormLatLongFields: GenericCompstackCompFormFieldRenderer[] =
  [
    {
      key: "latitude",
      render: ({ state: { register } }) => (
        <Input
          name="latitude"
          label="Latitude"
          className={`${compstackCompInputPrefix}__hidden`}
          {...inputRegisterWithRequiredAttribute(
            register("latitude", {
              required: required("Latitude"),
            })
          )}
        />
      ),
    },
    {
      key: "longitude",
      render: ({ state: { register } }) => (
        <Input
          name="longitude"
          label="Longitude"
          className={`${compstackCompInputPrefix}__hidden`}
          {...inputRegisterWithRequiredAttribute(
            register("longitude", {
              required: required("Longitude"),
            })
          )}
        />
      ),
    },
  ];

export const compstackCompFormAddressFields: GenericFormFieldRenderer<CompstackCompsCommonFields>[] =
  [
    {
      key: "street_address",
      render: ({
        state: {
          register,
          getValues,
          setValue,
          formState: { errors },
        },
      }) => (
        <CompFormAddressAutocompleteInput
          label="Street Address"
          className={`${compstackCompInputPrefix}__input`}
          error={errors["street_address"]?.message as string}
          addressKey="street_address"
          defaultValue={getValues("street_address")}
          setValue={setValue}
          register={register}
          getValues={getValues}
        />
      ),
    },
    {
      key: "city",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="city"
          label="City"
          type="text"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("city")}
          error={errors["city"]?.message as string}
          {...inputRegisterWithRequiredAttribute(
            register("city", {
              required: required("City"),
            })
          )}
        />
      ),
    },
    {
      key: "state",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="state"
          label="State"
          type="text"
          tooltip="2 Letter state code"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("state")}
          error={errors["state"]?.message as string}
          {...inputRegisterWithRequiredAttribute(
            register("state", {
              required: required("State"),
            })
          )}
        />
      ),
    },
    {
      key: "zip_code",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="zip_code"
          label="Zip Code"
          type="text"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("zip_code")}
          error={errors["zip_code"]?.message as string}
          {...inputRegisterWithRequiredAttribute(
            register("zip_code", {
              required: required("Zip Code"),
              pattern: onlyZipCode(),
            })
          )}
        />
      ),
    },
  ];

export const compstackCompsSaleAndLandCommonFields: GenericFormFieldRenderer<CompstackSaleAndLandCompsCommonPayload>[] =
  [
    {
      key: "sales_date",
      render: ({
        state: {
          register,
          getValues,
          setValue,
          formState: { errors },
        },
      }) => (
        <InputDatePicker
          label="Sales Date"
          className={`${compstackCompInputPrefix}__input`}
          error={errors["sales_date"]?.message as string}
          defaultValue={transformDateToDatePicker({
            value: getValues("sales_date"),
          })}
          {...inputRegisterWithRequiredAttribute(
            register("sales_date", {
              required: required("Sales Date"),
              onChange: (event) => {
                if (event?.target?.value) {
                  setValue(
                    "sales_date",
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
      key: "sale_price",
      render: ({
        state: {
          register,
          getValues,
          setValue,
          formState: { errors },
        },
      }) => (
        <Input
          name="sale_price"
          label="Sale Price"
          leftIcon={<CurrencyDollarIcon />}
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("sale_price")}
          error={errors["sale_price"]?.message as string}
          {...inputRegisterWithRequiredAttribute(
            register("sale_price", {
              required: required("Sale Price"),
              pattern: onlyNumberWithOptionalDecimals(),
              min: moreOrEqualToZero("Sale Price"),
              onChange: (event) =>
                setValue(
                  "price_per_sf",
                  calculatePSF({
                    amount: event.target.value,
                    size: getValues("size"),
                  })
                ),
            })
          )}
        />
      ),
    },
    {
      key: "size",
      render: ({
        state: {
          register,
          getValues,
          setValue,
          formState: { errors },
        },
      }) => (
        <Input
          name="size"
          label="Size"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("size")}
          error={errors["size"]?.message as string}
          {...inputRegisterWithRequiredAttribute(
            register("size", {
              pattern: onlyNumbers(),
              min: moreOrEqualToZero("Size"),
              required: required("Size"),
              onChange: (event) =>
                setValue(
                  "price_per_sf",
                  calculatePSF({
                    amount: getValues("sale_price"),
                    size: event.target.value,
                  })
                ),
            })
          )}
        />
      ),
    },
    {
      key: "price_per_sf",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="price_per_sf"
          label="Price Per SF"
          tooltip="This field is auto-calculated based on the Sale Price and Size"
          leftIcon={<CurrencyDollarIcon />}
          readOnly
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("price_per_sf")}
          error={errors["price_per_sf"]?.message as string}
          {...register("price_per_sf")}
        />
      ),
    },

    {
      key: "sale_price_comment",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="sale_price_comment"
          label="Sale Price Comment"
          type="text"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("sale_price_comment")}
          error={errors["sale_price_comment"]?.message as string}
          {...register("sale_price_comment")}
        />
      ),
    },
    {
      key: "recording_date",
      render: ({
        state: {
          register,
          getValues,
          setValue,
          formState: { errors },
        },
      }) => (
        <InputDatePicker
          label="Recording Date"
          className={`${compstackCompInputPrefix}__input`}
          error={errors["recording_date"]?.message as string}
          defaultValue={transformDateToDatePicker({
            value: getValues("recording_date"),
          })}
          {...register("recording_date", {
            onChange: (event) => {
              if (event?.target?.value) {
                setValue(
                  "recording_date",
                  transformInputDateToMMDDYYYY(event.target.value)
                );
              }
            },
          })}
        />
      ),
    },
    {
      key: "percent_leased",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="percent_leased"
          label="Percent Leased"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("percent_leased")}
          error={errors["percent_leased"]?.message as string}
          leftIcon={<ReceiptPercentIcon />}
          {...register("percent_leased", {
            pattern: percentageWithTwoDecimals(),
            min: moreOrEqualToZero("Percent Leased"),
            max: lessOrEqualToOneHundred("Percent Leased"),
          })}
        />
      ),
    },
    {
      key: "in_place_cap_rate",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="in_place_cap_rate"
          label="In Place Cap Rate"
          leftIcon={<ReceiptPercentIcon />}
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("in_place_cap_rate")}
          error={errors["in_place_cap_rate"]?.message as string}
          {...register("in_place_cap_rate", {
            pattern: percentageWithTwoDecimals(),
            min: moreOrEqualToZero("In Place Cap Rate"),
            max: lessOrEqualToOneHundred("In Place Cap Rate"),
          })}
        />
      ),
    },
    {
      key: "imputed_cap_rate",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="imputed_cap_rate"
          label="Imputed Cap Rate"
          leftIcon={<ReceiptPercentIcon />}
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("imputed_cap_rate")}
          error={errors["imputed_cap_rate"]?.message as string}
          {...register("imputed_cap_rate", {
            pattern: percentageWithTwoDecimals(),
            min: moreOrEqualToZero("Imputed Cap Rate"),
            max: lessOrEqualToOneHundred("Imputed Cap Rate"),
          })}
        />
      ),
    },
    {
      key: "buyer_contact",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="buyer_contact"
          label="Buyer Contact"
          type="text"
          className={`${compstackCompInputPrefix}__half-grid`}
          defaultValue={getValues("buyer_contact")}
          error={errors["buyer_contact"]?.message as string}
          {...register("buyer_contact")}
        />
      ),
    },
    {
      key: "buyer_true_company",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="buyer_true_company"
          label="Buyer True Company"
          type="text"
          className={`${compstackCompInputPrefix}__half-grid`}
          defaultValue={getValues("buyer_true_company")}
          error={errors["buyer_true_company"]?.message as string}
          {...register("buyer_true_company")}
        />
      ),
    },
    {
      key: "buyer_true_contact",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="buyer_true_contact"
          label="Buyer True Contact"
          type="text"
          className={`${compstackCompInputPrefix}__half-grid`}
          defaultValue={getValues("buyer_true_contact")}
          error={errors["buyer_true_contact"]?.message as string}
          {...register("buyer_true_contact")}
        />
      ),
    },
    {
      key: "buyers_broker_company",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="buyers_broker_company"
          label="Buyers Broker Company"
          type="text"
          className={`${compstackCompInputPrefix}__half-grid`}
          defaultValue={getValues("buyers_broker_company")}
          error={errors["buyers_broker_company"]?.message as string}
          {...register("buyers_broker_company")}
        />
      ),
    },
    {
      key: "buyers_broker_agent_first_name",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="buyers_broker_agent_first_name"
          label="Buyers Broker Agent First Name"
          type="text"
          className={`${compstackCompInputPrefix}__half-grid`}
          defaultValue={getValues("buyers_broker_agent_first_name")}
          error={errors["buyers_broker_agent_first_name"]?.message as string}
          {...register("buyers_broker_agent_first_name")}
        />
      ),
    },
    {
      key: "buyers_broker_agent_last_name",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="buyers_broker_agent_last_name"
          label="Buyers Broker Agent Last Name"
          type="text"
          className={`${compstackCompInputPrefix}__half-grid`}
          defaultValue={getValues("buyers_broker_agent_last_name")}
          error={errors["buyers_broker_agent_last_name"]?.message as string}
          {...register("buyers_broker_agent_last_name")}
        />
      ),
    },

    {
      key: "seller_company",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="seller_company"
          label="Seller Company"
          type="text"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("seller_company")}
          error={errors["seller_company"]?.message as string}
          {...register("seller_company")}
        />
      ),
    },
    {
      key: "seller_contact",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="seller_contact"
          label="Seller Contact"
          type="text"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("seller_contact")}
          error={errors["seller_contact"]?.message as string}
          {...register("seller_contact")}
        />
      ),
    },
    {
      key: "seller_true_contact",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="seller_true_contact"
          label="Seller True Contact"
          type="text"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("seller_true_contact")}
          error={errors["seller_true_contact"]?.message as string}
          {...register("seller_true_contact")}
        />
      ),
    },
    {
      key: "seller_true_company",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="seller_true_company"
          label="Seller True Company"
          type="text"
          className={`${compstackCompInputPrefix}__half-grid`}
          defaultValue={getValues("seller_true_company")}
          error={errors["seller_true_company"]?.message as string}
          {...register("seller_true_company")}
        />
      ),
    },
    {
      key: "listing_broker_company",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="listing_broker_company"
          label="Listing Broker Company"
          type="text"
          className={`${compstackCompInputPrefix}__half-grid`}
          defaultValue={getValues("listing_broker_company")}
          error={errors["listing_broker_company"]?.message as string}
          {...register("listing_broker_company")}
        />
      ),
    },
    {
      key: "listing_broker_agent_first_name",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="listing_broker_agent_first_name"
          label="Listing Broker Agent First Name"
          type="text"
          className={`${compstackCompInputPrefix}__half-grid`}
          defaultValue={getValues("listing_broker_agent_first_name")}
          error={errors["listing_broker_agent_first_name"]?.message as string}
          {...register("listing_broker_agent_first_name")}
        />
      ),
    },
    {
      key: "listing_broker_agent_last_name",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="listing_broker_agent_last_name"
          label="Listing Broker Agent Last Name"
          type="text"
          className={`${compstackCompInputPrefix}__half-grid`}
          defaultValue={getValues("listing_broker_agent_last_name")}
          error={errors["listing_broker_agent_last_name"]?.message as string}
          {...register("listing_broker_agent_last_name")}
        />
      ),
    },
    {
      key: "asking_price",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="asking_price"
          label="Asking Price"
          leftIcon={<CurrencyDollarIcon />}
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("asking_price")}
          error={errors["asking_price"]?.message as string}
          {...register("asking_price", {
            pattern: onlyNumberWithOptionalDecimals(),
            min: moreOrEqualToZero("Asking Price"),
          })}
        />
      ),
    },
    {
      key: "down_payment",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="down_payment"
          label="Down Payment"
          leftIcon={<CurrencyDollarIcon />}
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("down_payment")}
          error={errors["down_payment"]?.message as string}
          {...register("down_payment", {
            pattern: onlyNumberWithOptionalDecimals(),
            min: moreOrEqualToZero("Down Payment"),
          })}
        />
      ),
    },
    {
      key: "transaction_notes",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <TextArea
          name="transaction_notes"
          label="Transaction Notes"
          className={`${compstackCompInputPrefix}__full-grid`}
          defaultValue={getValues("transaction_notes")}
          error={errors["transaction_notes"]?.message as string}
          {...register("transaction_notes")}
        />
      ),
    },
    {
      key: "net_income",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="net_income"
          label="Net Income"
          leftIcon={<CurrencyDollarIcon />}
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("net_income")}
          error={errors["net_income"]?.message as string}
          {...register("net_income", {
            pattern: onlyNumberWithOptionalDecimals(),
            min: moreOrEqualToZero("Net Income"),
          })}
        />
      ),
    },
    {
      key: "total_expense_amount",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="total_expense_amount"
          label="Total Expense Amount"
          step="any"
          leftIcon={<CurrencyDollarIcon />}
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("total_expense_amount")}
          error={errors["total_expense_amount"]?.message as string}
          {...register("total_expense_amount", {
            pattern: onlyNumberWithOptionalDecimals(),
            min: moreOrEqualToZero("Down Payment"),
          })}
        />
      ),
    },
    {
      key: "portfolio_name",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="portfolio_name"
          label="Portfolio Name"
          type="text"
          className={`${compstackCompInputPrefix}__input`}
          defaultValue={getValues("portfolio_name")}
          error={errors["portfolio_name"]?.message as string}
          {...register("portfolio_name")}
        />
      ),
    },
    {
      key: "building_operating_expenses",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="building_operating_expenses"
          label="Building Operating Expenses"
          type="text"
          className={`${compstackCompInputPrefix}__half-grid`}
          defaultValue={getValues("building_operating_expenses")}
          error={errors["building_operating_expenses"]?.message as string}
          {...register("building_operating_expenses")}
        />
      ),
    },
    {
      key: "building_tax_expenses",
      render: ({
        state: {
          register,
          getValues,
          formState: { errors },
        },
      }) => (
        <Input
          name="building_tax_expenses"
          label="Building Tax Expenses"
          type="text"
          className={`${compstackCompInputPrefix}__half-grid`}
          defaultValue={getValues("building_tax_expenses")}
          error={errors["building_tax_expenses"]?.message as string}
          {...register("building_tax_expenses")}
        />
      ),
    },
    {
      key: "is_part_of_multi_property",
      render: ({
        state: {
          setValue,
          control,
          formState: { errors },
        },
      }) => (
        <GenericControlledCheckbox
          label="Is Part Of Multi Property"
          className={`${compstackCompInputPrefix}__half-grid`}
          control={control}
          identifier={"is_part_of_multi_property"}
          onChange={(e) => {
            setValue("is_part_of_multi_property", e.target.checked);
          }}
          error={errors["is_part_of_multi_property"]?.message as string}
        />
      ),
    },
    {
      key: "is_part_of_portfolio",
      render: ({
        state: {
          setValue,
          control,
          formState: { errors },
        },
      }) => (
        <GenericControlledCheckbox
          label="Is Part Of Portfolio"
          className={`${compstackCompInputPrefix}__half-grid`}
          control={control}
          identifier={"is_part_of_portfolio"}
          onChange={(e) => {
            setValue("is_part_of_portfolio", e.target.checked);
          }}
          error={errors["is_part_of_portfolio"]?.message as string}
        />
      ),
    },
  ];

export const compstackCompsSaleAndLandCommonForm: GenericFormFieldRenderer<CompstackSaleAndLandCompsCommonPayload>[] =
  [
    ...compstackCompFormAddressFields.slice(0, 1), // Insert street address at the start
    ...compstackCompsSaleAndLandCommonFields.slice(0, 9), // Insert first 9 keys from compstackCompsSaleAndLandCommonFields
    ...compstackCompFormAddressFields.slice(1), // Insert the rest of compstackCompFormAddressFields
    ...compstackCompsSaleAndLandCommonFields.slice(9), // Insert the remaining keys from compstackCompsSaleAndLandCommonFields
  ];
