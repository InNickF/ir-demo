import { LegendArrow } from "@/commons/components/data-display/LegendArrow";

import { FundMaturityLender } from "@/modules/debt/typings/fund";
import { CalendarIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { FC } from "react";
import "./styles.css";
import {
  CardWithHeader,
  CardWithHeaderProps,
} from "@/commons/components/general/CardWithHeader";
import { Loader } from "in-ui-react";
import { Loader3D } from "@/commons/components/3d/Loader3D";

const LoanMaturityChart = dynamic(
  () => import("./components/LoanMaturityChart"),
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
interface LoanMaturityScheduleProps
  extends Omit<CardWithHeaderProps, "title" | "icon"> {
  data: FundMaturityLender[];
  lenders: string[];
}

export const LoanMaturitySchedule: FC<LoanMaturityScheduleProps> = ({
  data,
  lenders,
  className,
  ...props
}) => {
  return (
    <CardWithHeader
      icon={<CalendarIcon />}
      title="Loan Maturity Schedule"
      className={className}
      skeletonHeight={270}
      headerActions={<LegendArrow upText="Amount" rightText="Months" />}
      hasDataToShow={data?.some((item) => item?.value?.length !== 0)}
      {...props}
    >
      <LoanMaturityChart
        data={data}
        lenders={lenders}
        id="debt-loan-maturity-schedule"
      />
    </CardWithHeader>
  );
};
