import {
  DealBackOfTheNapkinInformation,
  MarketRentType,
} from "@/acquisitions/typings/deals";
import {
  getCapitalExpenditures,
  getDebt,
  getDebtPSF,
  getEquity,
  getEquityPSF,
  getEquityPercentage,
  getImputedYieldOnCostPercentage,
  getLeasingCommissions,
  getTenantImprovements,
  getTotalSources,
  getTotalSourcesPSF,
  getTotalUses,
  getTotalUsesPSF,
  getTransactionCosts,
  getTransactionCostsPSF,
} from "@/modules/acquisitions/utils/business-calculations";
import { GenericLabelValueObject } from "@/commons/typings";
import {
  numberToDollar,
  numberToPercent,
} from "@/commons/model-in/formatters/utils/amount-conversions";
import {
  lessOrEqualToOneHundred,
  moreOrEqualToZero,
  onlyNumbers,
  required,
} from "@/commons/utils/input-validations";
import {
  CurrencyDollarIcon,
  ReceiptPercentIcon,
} from "@heroicons/react/24/outline";
import { Input } from "in-ui-react";
import { FC, useEffect } from "react";
import {
  Control,
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { RentTypeSelect } from "../DealInformationFormInputs/components/RentType";
import { AutoCalculatedField } from "./components/AutoCalculatedField";
import { CalculationSection } from "./components/CalculationSection";

export interface DealBackOfNapkinFieldsProps<T> {
  purchasePrice: number;
  sf: number;
  psf: number;
  getValues: UseFormGetValues<T>;
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  control: Control<T>;
  errors: Merge<FieldError, FieldErrorsImpl<T>>;
  watch: UseFormWatch<T>;
}

export const DealBackOfNapkinFields: FC<
  DealBackOfNapkinFieldsProps<DealBackOfTheNapkinInformation>
> = ({
  purchasePrice,
  sf,
  psf,
  getValues,
  register,
  setValue,
  control,
  errors,
  watch,
}) => {
  useEffect(() => {
    calculateTransactionCosts(getValues("transaction_costs_percentage"));
    calculateTenantImprovements(getValues("tenant_improvements_psf"));
    calculateLeasingCommissions(getValues("leasing_commissions_psf"));
    calculateCapitalExpenditures(getValues("capital_expenditures_psf"));
    calculateDebt(getValues("debt_percentage"));
    calculateEquityPercentage(getValues("debt_percentage"));
    calculateEquity(getValues("equity_percentage"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchasePrice, psf, sf]);

  getValues("current_market_rent_sf_type") ||
    setValue("current_market_rent_sf_type", { label: "Year", value: "year" });

  const calculateTransactionCosts = (transactionCostPercentage: number) => {
    setValue(
      "transaction_costs",
      getTransactionCosts({
        purchasePrice,
        transactionCostPercentage,
      })
    );
    calculateTotalUses();
    calculateTransactionCostsPsf();
  };
  const calculateTransactionCostsPsf = () => {
    const transactionCosts = getValues("transaction_costs");

    setValue(
      "transaction_costs_psf",
      getTransactionCostsPSF({
        transactionCosts,
        sf,
      })
    );
  };

  const calculateTenantImprovements = (tenantImprovementPSF: number) => {
    setValue(
      "tenant_improvements",
      getTenantImprovements({ sf, tenantImprovementPSF })
    );
    calculateTotalUses();
  };

  const calculateLeasingCommissions = (leasingCommissionsPSF: number) => {
    setValue(
      "leasing_commissions",
      getLeasingCommissions({ leasingCommissionsPSF, sf })
    );
    calculateTotalUses();
  };

  const calculateCapitalExpenditures = (capitalExpendituresPSF: number) => {
    setValue(
      "capital_expenditures",
      getCapitalExpenditures({ capitalExpendituresPSF, sf })
    );
    calculateTotalUses();
  };

  const calculateTotalUses = () => {
    const transactionCosts = getValues("transaction_costs");
    const tenantImprovements = getValues("tenant_improvements");
    const leasingCommissions = getValues("leasing_commissions");
    const capitalExpenditures = getValues("capital_expenditures");
    setValue(
      "total_uses",
      getTotalUses({
        purchasePrice,
        transactionCosts,
        tenantImprovements,
        leasingCommissions,
        capitalExpenditures,
      })
    );
    calculateTotalUsesPsf();
  };

  const calculateTotalUsesPsf = () => {
    const totalUses = getValues("total_uses");

    const currentMarketRentSF = getValues("current_market_rent_sf");
    setValue("total_uses_psf", getTotalUsesPSF({ sf, totalUses }));
    calculateImputedYieldOnCost(currentMarketRentSF);
    calculateDebt(getValues("debt_percentage"));
    calculateImputedYieldOnCost(currentMarketRentSF);
  };

  const calculateDebt = (debtPercentage: number) => {
    const totalUses = getValues("total_uses");
    setValue("debt", getDebt({ totalUses, debtPercentage }));
    calculateDebtPsf();
    calculateEquityPercentage();
  };

  const calculateDebtPsf = () => {
    const debt = getValues("debt");

    setValue("debt_psf", getDebtPSF({ debt, sf }));
  };

  const calculateEquityPercentage = (debtPercentage?: number) => {
    debtPercentage |= getValues("debt_percentage");
    setValue("equity_percentage", getEquityPercentage({ debtPercentage }));
    calculateEquity();
  };

  const calculateEquity = (equityPercentage?: number) => {
    equityPercentage |= getValues("equity_percentage");
    const totalUses = getValues("total_uses");
    setValue("equity", getEquity({ totalUses, equityPercentage }));
    calculateEquityPsf();
  };

  const calculateEquityPsf = () => {
    const equity = getValues("equity");

    setValue("equity_psf", getEquityPSF({ equity, sf }));
    calculateTotalSources();
  };

  const calculateTotalSources = () => {
    const debt = getValues("debt");
    const equity = getValues("equity");
    setValue("total_sources", getTotalSources({ debt, equity }));
    calculateTotalSourcesPsf();
  };

  const calculateTotalSourcesPsf = () => {
    const debtPSF = getValues("debt_psf");
    const equityPSF = getValues("equity_psf");
    setValue("total_sources_psf", getTotalSourcesPSF({ debtPSF, equityPSF }));
  };

  const calculateImputedYieldOnCost = (currentMarketRentSF: number) => {
    const currentMarketRentType = getValues("current_market_rent_sf_type")
      ?.value as MarketRentType;
    const totalUsesPSF = getValues("total_sources_psf");

    setValue(
      "imputed_yield_on_cost_percentage",
      getImputedYieldOnCostPercentage({
        currentMarketRentSF,
        currentMarketRentType,
        totalUsesPSF,
      })
    );
  };

  return (
    <>
      <CalculationSection
        hasValue={
          !!watch("transaction_costs") && !!watch("transaction_costs_psf")
        }
        noDivider
        extended
      >
        <Input
          label="Transaction Costs Percentage"
          leftIcon={<ReceiptPercentIcon />}
          type="number"
          step="any"
          error={errors.transaction_costs_percentage?.message}
          {...register("transaction_costs_percentage", {
            pattern: onlyNumbers(),
            valueAsNumber: true,
            min: moreOrEqualToZero("Transaction Costs Percentage"),
            max: lessOrEqualToOneHundred("Transaction Costs Percentage"),
            onChange: ({ target: { value } }) =>
              calculateTransactionCosts(value),
          })}
        />
        <CalculationSection.SubSection>
          <AutoCalculatedField
            label="Transaction Costs"
            value={numberToDollar({ value: watch("transaction_costs") })}
          />
          <AutoCalculatedField
            label="Transaction Costs (PSF)"
            value={numberToDollar({ value: watch("transaction_costs_psf") })}
          />
        </CalculationSection.SubSection>
      </CalculationSection>
      <CalculationSection hasValue={!!watch("tenant_improvements")} extended>
        <Input
          label="Tenant Improvements (PSF)"
          leftIcon={<CurrencyDollarIcon />}
          type="number"
          step="any"
          error={errors.tenant_improvements_psf?.message}
          {...register("tenant_improvements_psf", {
            pattern: onlyNumbers(),
            valueAsNumber: true,
            min: moreOrEqualToZero("Transaction Improvements (PSF)"),
            onChange: ({ target: { value } }) =>
              calculateTenantImprovements(value),
          })}
        />
        <AutoCalculatedField
          label="Tenant Improvements"
          value={numberToDollar({ value: watch("tenant_improvements") })}
        />
      </CalculationSection>
      <CalculationSection hasValue={!!watch("leasing_commissions")} extended>
        <Input
          label="Leasing Commissions (PSF)"
          leftIcon={<CurrencyDollarIcon />}
          type="number"
          step="any"
          error={errors.leasing_commissions_psf?.message}
          {...register("leasing_commissions_psf", {
            pattern: onlyNumbers(),
            valueAsNumber: true,
            min: moreOrEqualToZero("Leasing Commissions (PSF)"),
            onChange: ({ target: { value } }) =>
              calculateLeasingCommissions(value),
          })}
        />
        <AutoCalculatedField
          label="Leasing Commissions"
          value={numberToDollar({ value: watch("leasing_commissions") })}
        />
      </CalculationSection>
      <CalculationSection hasValue={!!watch("capital_expenditures")} extended>
        <Input
          label="Capital Expenditures (PSF)"
          leftIcon={<CurrencyDollarIcon />}
          type="number"
          step="any"
          error={errors.capital_expenditures_psf?.message}
          {...register("capital_expenditures_psf", {
            pattern: onlyNumbers(),
            valueAsNumber: true,
            min: moreOrEqualToZero("Capital Expenditures (PSF)"),
            onChange: ({ target: { value } }) =>
              calculateCapitalExpenditures(value),
          })}
        />
        <AutoCalculatedField
          label="Capital Expenditures"
          value={numberToDollar({ value: watch("capital_expenditures") })}
        />
      </CalculationSection>
      <CalculationSection
        hasValue={!!watch("total_uses") && !!watch("total_uses_psf")}
      >
        <AutoCalculatedField
          label="Total Uses"
          value={numberToDollar({ value: watch("total_uses") })}
        />
        <AutoCalculatedField
          label="Total Uses (PSF)"
          value={numberToDollar({ value: watch("total_uses_psf") })}
        />
      </CalculationSection>
      <CalculationSection hasValue={!!watch("debt")} extended>
        <Input
          label="Debt Percentage"
          type="number"
          step="any"
          error={errors.debt_percentage?.message}
          leftIcon={<ReceiptPercentIcon />}
          {...register("debt_percentage", {
            pattern: onlyNumbers(),
            valueAsNumber: true,
            min: moreOrEqualToZero("Debt Percentage"),
            max: lessOrEqualToOneHundred("Transaction Costs Percentage"),
            onChange: ({ target: { value } }) => calculateDebt(value),
          })}
        />
        <CalculationSection.SubSection>
          <AutoCalculatedField
            label="Debt"
            value={numberToDollar({ value: watch("debt") })}
          />
          <AutoCalculatedField
            label="Debt (PSF)"
            value={numberToDollar({ value: watch("debt_psf") })}
          />
        </CalculationSection.SubSection>
      </CalculationSection>
      <CalculationSection hasValue={!!watch("equity")} extended>
        <Input
          label="Equity Percentage"
          type="number"
          step="any"
          readOnly
          error={errors.equity_percentage?.message}
          leftIcon={<ReceiptPercentIcon />}
          {...register("equity_percentage", {
            pattern: onlyNumbers(),
            valueAsNumber: true,
            min: moreOrEqualToZero("Equity percentage"),
            max: lessOrEqualToOneHundred("Transaction Costs Percentage"),
            onChange: ({ target: { value } }) => calculateEquity(value),
          })}
        />
        <CalculationSection.SubSection>
          <AutoCalculatedField
            label="Equity"
            value={numberToDollar({ value: watch("equity") })}
          />
          <AutoCalculatedField
            label="Equity (PSF)"
            value={numberToDollar({ value: watch("equity_psf") })}
          />
        </CalculationSection.SubSection>
      </CalculationSection>
      <CalculationSection
        hasValue={!!watch("total_sources") && !!watch("total_sources_psf")}
      >
        <AutoCalculatedField
          label="Total Sources"
          value={numberToDollar({ value: watch("total_sources") })}
        />
        <AutoCalculatedField
          label="Total Sources (PSF)"
          value={numberToDollar({ value: watch("total_sources_psf") })}
        />
      </CalculationSection>
      <CalculationSection
        hasValue={!!watch("imputed_yield_on_cost_percentage")}
        extended
      >
        <div className="flex gap-3">
          <Input
            label="Current Market Rent (SF)"
            type="number"
            step="any"
            leftIcon={<CurrencyDollarIcon />}
            error={errors.current_market_rent_sf?.message}
            {...register("current_market_rent_sf", {
              pattern: onlyNumbers(),
              valueAsNumber: true,
              min: moreOrEqualToZero("Current Market Rent (SF)"),
              onChange: ({ target: { value } }) =>
                calculateImputedYieldOnCost(value),
            })}
          />
          <RentTypeSelect
            label="Current Market Rent Type"
            identifier="current_market_rent_sf_type"
            control={control}
            onChange={(option: GenericLabelValueObject) => {
              setValue("current_market_rent_sf_type", option);
              calculateImputedYieldOnCost(getValues("current_market_rent_sf"));
            }}
            rules={{ required: required("Current Market Rent Type") }}
          />
        </div>
        <AutoCalculatedField
          label="Imputed Yield on Cost"
          value={numberToPercent(watch("imputed_yield_on_cost_percentage"))}
        />
      </CalculationSection>
    </>
  );
};

export const dealBackOfNapkinKeysOrder = [
  "transaction_costs_percentage",
  "transaction_costs",
  "transaction_costs_psf",
  "tenant_improvements_psf",
  "tenant_improvements",
  "leasing_commissions_psf",
  "leasing_commissions",
  "capital_expenditures",
  "total_uses",
  "total_uses_psf",
  "debt_percentage",
  "debt",
  "debt_psf",
  "equity_percentage",
  "equity",
  "equity_psf",
  "total_sources",
  "total_sources_psf",
  "current_market_rent_sf",
  "current_market_rent_sf_type",
  "imputed_yield_on_cost_percentage",
];
