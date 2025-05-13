import { DebtLoan } from "@/modules/debt/typings/loans";

export const dndDebtLoansContextId = "dnd-debt-loans-context";
export const sortableDebtLoansContextId = "sortable-debt-loans-context";
export const debtLoansDroppableBodyIdPrefix = "debt-loans-droppable-body-";

export const debtLoansTableCommonFilters = {
  page_size: "-1",
};

export const flatLoansIds = (debtLoans: DebtLoan[]): DebtLoan["id"][] => {
  return debtLoans.map((loan) => {
    return loan.id;
  });
};
