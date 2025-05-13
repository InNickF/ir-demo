import { SorterMap } from "@/commons/model-in/formatters/sorters";
import { DebtLoan } from "@/modules/debt/typings/loans";
import { getLoanURL } from "@/modules/debt/utils";
import { debtLoansFormatter } from "@/modules/debt/utils/formatters/loans-formatters";
import { createColumnHelper } from "@tanstack/react-table";
import { Link, Table } from "in-ui-react";
import { default as NextLink } from "next/link";
import { LoansTableActions } from "../components/LoansTableActions";

export const loansTableColumnHelper = createColumnHelper<DebtLoan>();

export const loansColumnsTable = [
  loansTableColumnHelper.accessor("loan_name", {
    header: "Loan Name",
    cell: (info) => (
      <Table.Data>
        <NextLink
          href={getLoanURL({ loanId: info?.row?.original?.id })}
          passHref
        >
          <Link>
            {
              debtLoansFormatter.format({
                key: info.column.id as keyof DebtLoan,
                value: info.getValue(),
              }).value
            }
          </Link>
        </NextLink>
      </Table.Data>
    ),
  }),
  loansTableColumnHelper.accessor("borrower_name", {
    header: "Borrower Name",
    cell: (info) => (
      <Table.Data>
        {
          debtLoansFormatter.format({
            key: info.column.id as keyof DebtLoan,
            value: info.getValue(),
          }).value
        }
      </Table.Data>
    ),
  }),
  loansTableColumnHelper.accessor("lender_name", {
    header: "Lender Name",
    cell: (info) => (
      <Table.Data>
        {
          debtLoansFormatter.format({
            key: info.column.id as keyof DebtLoan,
            value: info.getValue(),
          }).value
        }
      </Table.Data>
    ),
  }),
  loansTableColumnHelper.accessor("loan_amount_max_commitment", {
    header: "Loan Amount Max Commitment",
    cell: (info) => (
      <Table.Data monospaceFont textAlignment="right">
        {
          debtLoansFormatter.format({
            key: info.column.id as keyof DebtLoan,
            value: info.getValue(),
          }).value
        }
      </Table.Data>
    ),
  }),
  loansTableColumnHelper.accessor("current_outstanding_loan_balance", {
    header: "Outstanding Balance",
    cell: (info) => (
      <Table.Data monospaceFont textAlignment="right">
        {
          debtLoansFormatter.format({
            key: info.column.id as keyof DebtLoan,
            value: info.getValue(),
          }).value
        }
      </Table.Data>
    ),
  }),
  loansTableColumnHelper.accessor("debt_yield_over_last_12_months_noidm", {
    header: "Debt Yield (T12)",
    cell: (info) => (
      <Table.Data>
        {
          debtLoansFormatter.format({
            key: info.column.id as keyof DebtLoan,
            value: info.getValue(),
          }).value
        }
      </Table.Data>
    ),
  }),
  loansTableColumnHelper.accessor("debt_yield_leased_noidm", {
    header: "Debt Yield (Leased)",
    cell: (info) => (
      <Table.Data>
        {
          debtLoansFormatter.format({
            key: info.column.id as keyof DebtLoan,
            value: info.getValue(),
          }).value
        }
      </Table.Data>
    ),
  }),
  loansTableColumnHelper.accessor("yield_on_cost_over_last_12_months_noidm", {
    header: "Yield On Cost ((T12))",
    cell: (info) => (
      <Table.Data>
        {
          debtLoansFormatter.format({
            key: info.column.id as keyof DebtLoan,
            value: info.getValue(),
          }).value
        }
      </Table.Data>
    ),
  }),
  loansTableColumnHelper.accessor("yield_on_cost_leased_noidm", {
    header: "Yield On Cost (Leased)",
    cell: (info) => (
      <Table.Data>
        {
          debtLoansFormatter.format({
            key: info.column.id as keyof DebtLoan,
            value: info.getValue(),
          }).value
        }
      </Table.Data>
    ),
  }),
  loansTableColumnHelper.accessor("current_dscr", {
    header: "DSCR",
    cell: (info) => (
      <Table.Data>
        {
          debtLoansFormatter.format({
            key: info.column.id as keyof DebtLoan,
            value: info.getValue(),
          }).value
        }
      </Table.Data>
    ),
  }),
  loansTableColumnHelper.accessor("dscr_over_last_12_months_noidm", {
    header: "DSCR (T12)",
    cell: (info) => (
      <Table.Data>
        {
          debtLoansFormatter.format({
            key: info.column.id as keyof DebtLoan,
            value: info.getValue(),
          }).value
        }
      </Table.Data>
    ),
  }),
  loansTableColumnHelper.accessor("dscr_leased_noidm", {
    header: "DSCR (Leased)",
    cell: (info) => (
      <Table.Data>
        {
          debtLoansFormatter.format({
            key: info.column.id as keyof DebtLoan,
            value: info.getValue(),
          }).value
        }
      </Table.Data>
    ),
  }),
  loansTableColumnHelper.accessor("current_ltv", {
    header: "LTV",
    cell: (info) => (
      <Table.Data>
        {
          debtLoansFormatter.format({
            key: info.column.id as keyof DebtLoan,
            value: info.getValue(),
          }).value
        }
      </Table.Data>
    ),
  }),
  loansTableColumnHelper.accessor("note_date", {
    header: "Note Date",
    cell: (info) => (
      <Table.Data>
        {
          debtLoansFormatter.format({
            key: info.column.id as keyof DebtLoan,
            value: info.getValue(),
          }).value
        }
      </Table.Data>
    ),
  }),
  loansTableColumnHelper.accessor("initial_maturity_date", {
    header: "Initial Maturity Date",
    cell: (info) => (
      <Table.Data>
        {
          debtLoansFormatter.format({
            key: info.column.id as keyof DebtLoan,
            value: info.getValue(),
          }).value
        }
      </Table.Data>
    ),
  }),
  loansTableColumnHelper.accessor("calculated_interest_rate", {
    header: "Interest Rate",
    cell: (info) => (
      <Table.Data>
        {
          debtLoansFormatter.format({
            key: info.column.id as keyof DebtLoan,
            value: info.getValue(),
          }).value
        }
      </Table.Data>
    ),
  }),
  loansTableColumnHelper.accessor("spread", {
    header: "Spread",
    cell: (info) => (
      <Table.Data>
        {
          debtLoansFormatter.format({
            key: info.column.id as keyof DebtLoan,
            value: info.getValue(),
          }).value
        }
      </Table.Data>
    ),
  }),
  loansTableColumnHelper.accessor("index_name", {
    header: "Index",
    cell: (info) => (
      <Table.Data>
        {
          debtLoansFormatter.format({
            key: info.column.id as keyof DebtLoan,
            value: info.getValue(),
          }).value
        }
      </Table.Data>
    ),
  }),
  loansTableColumnHelper.accessor("index_rate", {
    header: "Index Rate",
    cell: (info) => (
      <Table.Data>
        {
          debtLoansFormatter.format({
            key: info.column.id as keyof DebtLoan,
            value: info.getValue(),
          }).value
        }
      </Table.Data>
    ),
  }),
  loansTableColumnHelper.accessor("maturity_date", {
    header: "Cap Maturity Date",
    cell: (info) => (
      <Table.Data>
        {
          debtLoansFormatter.format({
            key: info.column.id as keyof DebtLoan,
            value: info.getValue(),
          }).value
        }
      </Table.Data>
    ),
  }),
  loansTableColumnHelper.accessor("index_spread", {
    header: "Index Spread",
    cell: (info) => (
      <Table.Data>
        {
          debtLoansFormatter.format({
            key: info.column.id as keyof DebtLoan,
            value: info.getValue(),
          }).value
        }
      </Table.Data>
    ),
  }),
  loansTableColumnHelper.accessor("current_notional", {
    header: "Current Notional",
    cell: (info) => (
      <Table.Data>
        {
          debtLoansFormatter.format({
            key: info.column.id as keyof DebtLoan,
            value: info.getValue(),
          }).value
        }
      </Table.Data>
    ),
  }),
  loansTableColumnHelper.accessor("chatham_loan_name", {
    header: "Chatham Cap Name",
    cell: (info) => (
      <Table.Data>
        {
          debtLoansFormatter.format({
            key: info.column.id as keyof DebtLoan,
            value: info.getValue(),
          }).value
        }
      </Table.Data>
    ),
  }),
  loansTableColumnHelper.accessor("current_strike", {
    header: "Current Strike",
    cell: (info) => (
      <Table.Data>
        {
          debtLoansFormatter.format({
            key: info.column.id as keyof DebtLoan,
            value: info.getValue(),
          }).value
        }
      </Table.Data>
    ),
  }),
  loansTableColumnHelper.display({
    id: "actions",
    header: "Actions",
    cell: (props) => (
      <Table.Data className="p-0">
        <LoansTableActions loan={props.row.original} />
      </Table.Data>
    ),
  }),
];

export const loanSorter: SorterMap<DebtLoan> = {
  loan_name: "string",
  borrower_name: "string",
  lender_name: "string",
  spread: "number",
  index_rate: "number",
  current_strike: "number",
  index_spread: "string",
  index_description: "string",
  maturity_date: "date",
  current_notional: "number",
  chatham_loan_name: "string",
  calculated_interest_rate: "number",
  current_outstanding_loan_balance: "number",
  debt_yield_over_last_12_months_noidm: "number",
  debt_yield_leased_noidm: "number",
  dscr_leased_noidm: "number",
  yield_on_cost_leased_noidm: "number",
  yield_on_cost_over_last_12_months_noidm: "number",
  current_dscr: "number",
  dscr_over_last_12_months_noidm: "number",
  current_ltv: "number",
  percentage_debt: "number",
  original_term: "number",
  loan_amount_max_commitment: "number",
  note_date: "date",
  sorting: "number",
  initial_maturity_date: "date",
  amortization_type: "string",
  expiration_date: "date",
  fund_name: "string",
  rate_cap_vs_swap: "string",
  index_name: "string",
  updated_at: "date",
};
