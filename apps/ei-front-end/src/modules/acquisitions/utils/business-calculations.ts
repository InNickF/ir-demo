import { hasDecimals } from "@/commons/utils";
import { floatToTwoDecimal } from "@/commons/model-in/formatters/utils/amount-conversions";
import { MarketRentType } from "../typings/deals";

export interface IGetPurchasePriceSF {
  price: number;
  sf: number;
}
export const getPurchasePriceSF = ({ price, sf }: IGetPurchasePriceSF) => {
  if (price && sf && price > 0 && sf > 0) {
    const formattedPrice = hasDecimals(price)
      ? floatToTwoDecimal(price)
      : Number(price);
    const formattedSF = hasDecimals(sf) ? floatToTwoDecimal(sf) : Number(sf);
    const calculation = formattedPrice / formattedSF;

    return hasDecimals(calculation)
      ? Number(calculation.toFixed(2))
      : calculation;
  }
  return null;
};

export interface IGetSiteCoveragePercentage {
  siteArea: number;
  sf: number;
}
export const getSiteCoveragePercentage = ({
  siteArea,
  sf,
}: IGetSiteCoveragePercentage) => {
  if (siteArea && sf && siteArea > 0 && sf > 0) {
    const formattedSiteArea = hasDecimals(siteArea)
      ? floatToTwoDecimal(siteArea)
      : Number(siteArea);
    const formattedSF = hasDecimals(sf) ? floatToTwoDecimal(sf) : Number(sf);
    const calculation = (formattedSF / (formattedSiteArea * 43560)) * 100;

    return hasDecimals(calculation)
      ? Number(calculation.toFixed(2))
      : calculation;
  }
  return null;
};

export interface IGetTransactionCosts {
  purchasePrice: number;
  transactionCostPercentage: number;
}
export const getTransactionCosts = ({
  purchasePrice,
  transactionCostPercentage,
}: IGetTransactionCosts) => {
  if (purchasePrice && transactionCostPercentage) {
    const formattedPurchasePrice = hasDecimals(purchasePrice)
      ? floatToTwoDecimal(purchasePrice)
      : Number(purchasePrice);
    const formattedTransactionCostPercentage = hasDecimals(
      transactionCostPercentage
    )
      ? floatToTwoDecimal(transactionCostPercentage)
      : Number(transactionCostPercentage);

    const calculation =
      formattedPurchasePrice * (formattedTransactionCostPercentage / 100);

    return hasDecimals(calculation)
      ? Number(calculation.toFixed(2))
      : calculation;
  }
  return null;
};

export interface IGetTransactionCostsPSF {
  transactionCosts: number;
  sf: number;
}
export const getTransactionCostsPSF = ({
  transactionCosts,
  sf,
}: IGetTransactionCostsPSF) => {
  if (transactionCosts && sf && transactionCosts > 0 && sf > 0) {
    const formattedTransactionCosts = hasDecimals(transactionCosts)
      ? floatToTwoDecimal(transactionCosts)
      : Number(transactionCosts);
    const formattedSF = hasDecimals(sf) ? floatToTwoDecimal(sf) : Number(sf);

    const calculation = formattedTransactionCosts / formattedSF;
    return hasDecimals(calculation)
      ? Number(calculation.toFixed(2))
      : calculation;
  }
  return null;
};

export interface IGetTenantImprovements {
  tenantImprovementPSF: number;
  sf: number;
}
export const getTenantImprovements = ({
  tenantImprovementPSF,
  sf,
}: IGetTenantImprovements) => {
  if (tenantImprovementPSF && sf && tenantImprovementPSF > 0 && sf > 0) {
    const formattedTenantImprovementPSF = hasDecimals(tenantImprovementPSF)
      ? floatToTwoDecimal(tenantImprovementPSF)
      : Number(tenantImprovementPSF);
    const formattedSF = hasDecimals(sf) ? floatToTwoDecimal(sf) : Number(sf);

    const calculation = formattedTenantImprovementPSF * formattedSF;
    return hasDecimals(calculation)
      ? Number(calculation.toFixed(2))
      : calculation;
  }
  return null;
};

export interface IGetLeasingCommissions {
  leasingCommissionsPSF: number;
  sf: number;
}
export const getLeasingCommissions = ({
  leasingCommissionsPSF,
  sf,
}: IGetLeasingCommissions) => {
  if (leasingCommissionsPSF && sf && leasingCommissionsPSF > 0 && sf > 0) {
    const formattedLeasingCommissionPSF = hasDecimals(leasingCommissionsPSF)
      ? floatToTwoDecimal(leasingCommissionsPSF)
      : Number(leasingCommissionsPSF);
    const formattedSF = hasDecimals(sf) ? floatToTwoDecimal(sf) : Number(sf);

    const calculation = formattedLeasingCommissionPSF * formattedSF;
    return hasDecimals(calculation)
      ? Number(calculation.toFixed(2))
      : calculation;
  }
  return null;
};

export interface IGetCapitalExpenditures {
  capitalExpendituresPSF: number;
  sf: number;
}
export const getCapitalExpenditures = ({
  capitalExpendituresPSF,
  sf,
}: IGetCapitalExpenditures) => {
  if (capitalExpendituresPSF && sf && capitalExpendituresPSF > 0 && sf > 0) {
    const formattedCapitalExpendituresPSF = hasDecimals(capitalExpendituresPSF)
      ? floatToTwoDecimal(capitalExpendituresPSF)
      : Number(capitalExpendituresPSF);
    const formattedSF = hasDecimals(sf) ? floatToTwoDecimal(sf) : Number(sf);

    const calculation = formattedCapitalExpendituresPSF * formattedSF;
    return hasDecimals(calculation)
      ? Number(calculation.toFixed(2))
      : calculation;
  }
  return null;
};

export interface IGetTotalUses {
  purchasePrice: number;
  transactionCosts: number;
  tenantImprovements: number;
  leasingCommissions: number;
  capitalExpenditures: number;
}
export const getTotalUses = ({
  purchasePrice,
  transactionCosts,
  tenantImprovements,
  leasingCommissions,
  capitalExpenditures,
}: IGetTotalUses) => {
  if (
    purchasePrice &&
    transactionCosts &&
    tenantImprovements &&
    leasingCommissions &&
    capitalExpenditures
  ) {
    const formattedPurchasePrice = hasDecimals(purchasePrice)
      ? floatToTwoDecimal(purchasePrice)
      : Number(purchasePrice);
    const formattedTransactionCosts = hasDecimals(transactionCosts)
      ? floatToTwoDecimal(transactionCosts)
      : Number(transactionCosts);
    const formattedTenantImprovements = hasDecimals(tenantImprovements)
      ? floatToTwoDecimal(tenantImprovements)
      : Number(tenantImprovements);
    const formattedLeasingCommissions = hasDecimals(leasingCommissions)
      ? floatToTwoDecimal(leasingCommissions)
      : Number(leasingCommissions);
    const formattedCapitalExpenditures = hasDecimals(capitalExpenditures)
      ? floatToTwoDecimal(capitalExpenditures)
      : Number(capitalExpenditures);

    const calculation =
      formattedPurchasePrice +
      formattedTransactionCosts +
      formattedTenantImprovements +
      formattedLeasingCommissions +
      formattedCapitalExpenditures;

    return hasDecimals(calculation)
      ? Number(calculation.toFixed(2))
      : calculation;
  }
  return null;
};

export interface IGetTotalUsesPSF {
  totalUses: number;
  sf: number;
}
export const getTotalUsesPSF = ({ totalUses, sf }: IGetTotalUsesPSF) => {
  if (totalUses && sf && totalUses > 0 && sf > 0) {
    const formattedTotalUses = hasDecimals(totalUses)
      ? floatToTwoDecimal(totalUses)
      : Number(totalUses);
    const formattedSF = hasDecimals(sf) ? floatToTwoDecimal(sf) : Number(sf);

    const calculation = formattedTotalUses / formattedSF;
    return hasDecimals(calculation)
      ? Number(calculation.toFixed(2))
      : calculation;
  }
  return null;
};

export interface IGetDebt {
  totalUses: number;
  debtPercentage: number;
}
export const getDebt = ({ totalUses, debtPercentage }: IGetDebt) => {
  if (totalUses && debtPercentage && totalUses > 0 && debtPercentage > 0) {
    const formattedTotalUses = hasDecimals(totalUses)
      ? floatToTwoDecimal(totalUses)
      : Number(totalUses);
    const formattedDebtPercentage = hasDecimals(debtPercentage)
      ? floatToTwoDecimal(debtPercentage)
      : Number(debtPercentage);

    const calculation = formattedTotalUses * (formattedDebtPercentage / 100);

    return hasDecimals(calculation)
      ? Number(calculation.toFixed(2))
      : calculation;
  }
  return null;
};

export interface IGetDebtPSF {
  debt: number;
  sf: number;
}
export const getDebtPSF = ({ debt, sf }: IGetDebtPSF) => {
  if (debt && sf && debt > 0 && sf > 0) {
    const formattedDebt = hasDecimals(debt)
      ? floatToTwoDecimal(debt)
      : Number(debt);
    const formattedSF = hasDecimals(sf) ? floatToTwoDecimal(sf) : Number(sf);

    const calculation = formattedDebt / formattedSF;
    return hasDecimals(calculation)
      ? Number(calculation.toFixed(2))
      : calculation;
  }
  return null;
};

export interface IGetEquityPercentage {
  debtPercentage: number;
}
export const getEquityPercentage = ({
  debtPercentage,
}: IGetEquityPercentage) => {
  if (debtPercentage || debtPercentage >= 0) {
    const formattedDebtPercentage = hasDecimals(debtPercentage)
      ? floatToTwoDecimal(debtPercentage)
      : Number(debtPercentage);

    const calculation = 100 - formattedDebtPercentage;
    return hasDecimals(calculation)
      ? Number(calculation.toFixed(2))
      : calculation;
  }
  return null;
};

export interface IGetEquity {
  totalUses: number;
  equityPercentage: number;
}
export const getEquity = ({ totalUses, equityPercentage }: IGetEquity) => {
  if (totalUses && equityPercentage && totalUses > 0 && equityPercentage > 0) {
    const formattedTotalUses = hasDecimals(totalUses)
      ? floatToTwoDecimal(totalUses)
      : Number(totalUses);
    const formattedEquityPercentage = hasDecimals(equityPercentage)
      ? floatToTwoDecimal(equityPercentage)
      : Number(equityPercentage);

    const calculation = formattedTotalUses * (formattedEquityPercentage / 100);

    return hasDecimals(calculation)
      ? Number(calculation.toFixed(2))
      : calculation;
  }
  return null;
};

export interface IGetEquityPSF {
  equity: number;
  sf: number;
}
export const getEquityPSF = ({ equity, sf }: IGetEquityPSF) => {
  if (equity && sf && equity > 0 && sf > 0) {
    const formattedEquity = hasDecimals(equity)
      ? floatToTwoDecimal(equity)
      : Number(equity);
    const formattedSF = hasDecimals(sf) ? floatToTwoDecimal(sf) : Number(sf);

    const calculation = formattedEquity / formattedSF;
    return hasDecimals(calculation)
      ? Number(calculation.toFixed(2))
      : calculation;
  }
  return null;
};

export interface IGetTotalSources {
  equity: number;
  debt: number;
}
export const getTotalSources = ({ equity, debt }: IGetTotalSources) => {
  if (equity && debt && equity > 0 && debt > 0) {
    const formattedEquity = hasDecimals(equity)
      ? floatToTwoDecimal(equity)
      : Number(equity);
    const formattedDebt = hasDecimals(debt)
      ? floatToTwoDecimal(debt)
      : Number(debt);

    const calculation = formattedEquity + formattedDebt;

    return hasDecimals(calculation)
      ? Number(calculation.toFixed(2))
      : calculation;
  }
  return null;
};

export interface IGetTotalSourcesPSF {
  debtPSF: number;
  equityPSF: number;
}
export const getTotalSourcesPSF = ({
  debtPSF,
  equityPSF,
}: IGetTotalSourcesPSF) => {
  if (debtPSF && equityPSF && debtPSF > 0 && equityPSF > 0) {
    const formattedDebtPSF = hasDecimals(debtPSF)
      ? floatToTwoDecimal(debtPSF)
      : Number(debtPSF);
    const formattedEquityPSF = hasDecimals(equityPSF)
      ? floatToTwoDecimal(equityPSF)
      : Number(equityPSF);

    const calculation = formattedDebtPSF + formattedEquityPSF;

    return hasDecimals(calculation)
      ? Number(calculation.toFixed(2))
      : calculation;
  }
  return null;
};

export interface IGetImputedYieldOnCostPercentage {
  currentMarketRentSF: number;
  currentMarketRentType: MarketRentType;
  totalUsesPSF: number;
}

export const getImputedYieldOnCostPercentage = ({
  currentMarketRentSF,
  currentMarketRentType,
  totalUsesPSF,
}: IGetImputedYieldOnCostPercentage) => {
  if (
    currentMarketRentSF &&
    currentMarketRentType &&
    totalUsesPSF &&
    currentMarketRentSF > 0 &&
    totalUsesPSF > 0
  ) {
    return currentMarketRentType === "year"
      ? getImputedYieldOnCostByYearPercentage({
          currentMarketRentSF,
          totalUsesPSF,
        })
      : getImputedYieldOnCostByMonthPercentage({
          currentMarketRentSF,
          totalUsesPSF,
        });
  }
  return null;
};

export interface IGetImputedYieldOnCostByYearPercentage {
  currentMarketRentSF: number;
  totalUsesPSF: number;
}
export const getImputedYieldOnCostByYearPercentage = ({
  currentMarketRentSF,
  totalUsesPSF,
}: IGetImputedYieldOnCostByYearPercentage) => {
  if (
    currentMarketRentSF &&
    totalUsesPSF &&
    currentMarketRentSF > 0 &&
    totalUsesPSF > 0
  ) {
    const formattedCurrentMarketRentSF = hasDecimals(currentMarketRentSF)
      ? floatToTwoDecimal(currentMarketRentSF)
      : Number(currentMarketRentSF);
    const formattedTotalUsesPSF = hasDecimals(totalUsesPSF)
      ? floatToTwoDecimal(totalUsesPSF)
      : Number(totalUsesPSF);

    const calculation =
      (formattedCurrentMarketRentSF / formattedTotalUsesPSF) * 100;

    return hasDecimals(calculation)
      ? Number(calculation.toFixed(2))
      : calculation;
  }
  return null;
};

export interface IGetImputedYieldOnCostByMonthPercentage {
  currentMarketRentSF: number;
  totalUsesPSF: number;
}
export const getImputedYieldOnCostByMonthPercentage = ({
  currentMarketRentSF,
  totalUsesPSF,
}: IGetImputedYieldOnCostByMonthPercentage) => {
  if (
    currentMarketRentSF &&
    totalUsesPSF &&
    currentMarketRentSF > 0 &&
    totalUsesPSF > 0
  ) {
    const formattedCurrentMarketRentSF = hasDecimals(currentMarketRentSF)
      ? floatToTwoDecimal(currentMarketRentSF)
      : Number(currentMarketRentSF);
    const formattedTotalUsesPSF = hasDecimals(totalUsesPSF)
      ? floatToTwoDecimal(totalUsesPSF)
      : Number(totalUsesPSF);

    const calculation =
      ((formattedCurrentMarketRentSF * 12) / formattedTotalUsesPSF) * 100;

    return hasDecimals(calculation)
      ? Number(calculation.toFixed(2))
      : calculation;
  }
  return null;
};
