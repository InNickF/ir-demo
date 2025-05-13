import { PatchLoanOrderingParams } from "../services/api/loans";

type GetNewLoanSortingPayloadParams = Pick<
  PatchLoanOrderingParams,
  "activeItem" | "isBelowOverItem" | "overItem"
>;
export const getNewLoanSortingPayload = ({
  activeItem,
  isBelowOverItem,
  overItem,
}: GetNewLoanSortingPayloadParams) => {
  const newSorting = overItem?.sorting;

  const activeSortingBiggerThanNewSorting = activeItem?.sorting > newSorting;

  const getFinalSorting = (): number => {
    const hasToSubtractModifier =
      isBelowOverItem && activeSortingBiggerThanNewSorting;

    return hasToSubtractModifier ? newSorting - 1 : newSorting;
  };

  return {
    sorting: getFinalSorting(),
  };
};
