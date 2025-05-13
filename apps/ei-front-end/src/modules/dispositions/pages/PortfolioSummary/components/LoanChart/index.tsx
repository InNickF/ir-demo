import { FC } from "react";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import dynamic from "next/dynamic";
import { ButtonGroup, Loader } from "in-ui-react";
import { useLegacyGetLoanPortfolio } from "@/modules/assets/services/queries/portfolio";
import { ChartPieIcon } from "@heroicons/react/24/outline";
import { usePortfolioLoanFilter } from "./hooks/useLoanPortfolioFilter";
import { GenericFilterPayload } from "@/commons/typings";
import "./styles.css";
import { Loader3D } from "@/commons/components/3d/Loader3D";

const StackingLoanChart = dynamic(
  () => import("./component/LoanPortfolioChart"),
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
interface LoanPortfolioChartProps {
  filters: GenericFilterPayload;
  fundFilter?: string;
  className?: string;
}

export const LoanPortfolioChart: FC<LoanPortfolioChartProps> = ({
  filters,
  className,
}) => {
  const prefix = "asset-portfolio-page__loan-chart";
  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  const { portfolioLoanFilter, portfolioLoanItems } = usePortfolioLoanFilter();

  const { data, isLoading, isRefetching } = useLegacyGetLoanPortfolio(
    filters,
    portfolioLoanFilter as string
  );
  return (
    <article className={getClasses()}>
      <CardWithHeader
        icon={<ChartPieIcon />}
        title="Loan Expirations"
        skeletonHeight={350}
        headerActions={
          <ButtonGroup
            active={portfolioLoanFilter}
            items={portfolioLoanItems}
          />
        }
        isLoading={isLoading}
        isRefetching={isRefetching}
        loaderKind="chart"
      >
        <StackingLoanChart
          id="stacking-loan-chart"
          data={data}
          by={portfolioLoanFilter}
        />
      </CardWithHeader>
    </article>
  );
};
