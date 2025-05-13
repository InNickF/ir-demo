import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { GenericFilterPayload } from "@/commons/typings";
import { useGetLoanExpiration } from "@/modules/assets/services/queries/portfolio";
import { ChartPieIcon } from "@heroicons/react/24/outline";
import { ButtonGroup, Loader } from "in-ui-react";
import dynamic from "next/dynamic";
import { FC } from "react";
import { usePortfolioLoanFilter } from "./hooks/useLoanPortfolioFilter";
import "./styles.css";
import { Loader3D } from "@/commons/components/3d/Loader3D";

const StackingLoanChart = dynamic(
  () => import("@/commons/components/data-display/charts/GenericStackedChart"),
  {
    ssr: false,
    loading: () => (
      <div className="flex w-full justify-center items-center h-96">
        <Loader3D
          kind="chart"
          style={{
            minHeight: 350,
          }}
          isLoading
          localIsLoading
          onChangeIsLoading={() => null}
        />
      </div>
    ),
  }
);
interface LoanExpirationsChartProps {
  filters: GenericFilterPayload;
  fundFilter?: string;
  className?: string;
  lenders?: string[];
}

export const LoanExpirationsChart: FC<LoanExpirationsChartProps> = ({
  filters,
  className,
  lenders,
}) => {
  const prefix = "asset-portfolio-page__loan-chart";
  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  const { portfolioLoanFilter, portfolioLoanItems } = usePortfolioLoanFilter();

  const { data, isLoading, isRefetching } = useGetLoanExpiration(filters);

  const orderedExpirationData =
    lenders && lenders.length > 0
      ? data?.sort(
          (a, b) =>
            lenders?.indexOf(a.lender_name) - lenders?.indexOf(b.lender_name)
        )
      : data;

  return (
    <article className={getClasses()}>
      <CardWithHeader
        icon={<ChartPieIcon />}
        title="Loan Expirations"
        skeletonHeight={350}
        headerActions={
          <div className="flex items-center gap-2">
            <p className="text-silver">View by:</p>
            <ButtonGroup
              active={portfolioLoanFilter}
              items={portfolioLoanItems}
            />
          </div>
        }
        isLoading={isLoading}
        isRefetching={isRefetching}
        hasDataToShow={data?.length > 0}
        loaderKind="chart"
      >
        <StackingLoanChart
          id="loan-expiration-chart"
          data={orderedExpirationData}
          nameAccessor={portfolioLoanFilter}
          yAccessor="current_outstanding_loan_balance"
          xAccessor="initial_maturity_year"
          colorMapping={lenders}
        />
      </CardWithHeader>
    </article>
  );
};
