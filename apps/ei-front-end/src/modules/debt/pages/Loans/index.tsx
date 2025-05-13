import { NextPageWithLayout } from "@/commons/typings";
import { DebtHead } from "@/debt/components/general/DebtHead";
import { InDebtPermissionsLayout } from "@/debt/layouts/InDebtPermissionsLayout";
import {
  Button,
  Container,
  FilterType,
  Filters,
  SelectFilterType,
  TextFilterType,
  useFilters,
} from "in-ui-react";
import { ReactElement, useMemo } from "react";
import { LoanModal } from "../../components/general/LoanModal";
import { CreateLoanForm } from "../../components/general/LoanModal/components/forms/CreateLoanForm";
import { useLoanModal } from "../../components/general/LoanModal/hooks/useLoanModal";
import { DebtLoansLayout } from "../../layouts/DebtLoansLayout";
import { useDebtFilters } from "../../services/queries/filters";
import { LoansSortableTable } from "./components/LoansSortableTable";
import "./styles.css";

const DebtLoansPage: NextPageWithLayout = () => {
  const { filteredOptions, onApply } = useFilters();
  const { data: loanFilters, isLoading } = useDebtFilters();

  const { state, resetModalState, createLoan } = useLoanModal();

  const modalActions = {
    onCancel: () => resetModalState(),
    onAction: () => {
      return null;
    },
  };

  const onCreate = () =>
    createLoan({
      Form: CreateLoanForm,
      ...modalActions,
    });

  const memoFilters: FilterType[] = useMemo(() => {
    const ignoredFilterKeys = [
      "timelines_type",
      "attachment_types",
      "property",
      "lender",
    ];

    const apiFilters =
      loanFilters
        ?.filter((filter) => !ignoredFilterKeys.includes(filter.key))
        .map(
          (filter) =>
            ({
              ...filter,
              key:
                filter?.key === "property"
                  ? "yardi_property_code"
                  : filter?.key,
              type: "simple-select",
            } as SelectFilterType)
        ) || [];

    return [
      { key: "search", name: "Search", type: "text" } as TextFilterType,
      ...apiFilters,
    ];
  }, [loanFilters]);

  return (
    <>
      <Container className="debt-loans-filters-wrapper">
        <header className="debt-loans-filters-header">
          <Filters
            filters={memoFilters || []}
            filteredOptions={filteredOptions}
            onApply={onApply}
            isLoading={isLoading}
          />
          <Button onClick={onCreate}>Add New Loan</Button>
        </header>
      </Container>
      <LoansSortableTable filters={{}} />
      <LoanModal {...state} onCancel={() => resetModalState()} />
    </>
  );
};

DebtLoansPage.getLayout = (page: ReactElement) => {
  return (
    <InDebtPermissionsLayout>
      <DebtHead title="Loans" />
      <DebtLoansLayout title="Loans">{page}</DebtLoansLayout>
    </InDebtPermissionsLayout>
  );
};

export default DebtLoansPage;
