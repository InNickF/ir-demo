import { FundLender } from "@/modules/debt/typings/fund";
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

const BalancePieChart = dynamic(() => import("./components/BalancePieChart"), {
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
});

interface OutstandingBalanceByLender
  extends Omit<CardWithHeaderProps, "title" | "icon"> {
  data: FundLender[];
}

export const OutstandingBalanceByLender: FC<OutstandingBalanceByLender> = ({
  data,
  className,
  ...props
}) => {
  return (
    <CardWithHeader
      icon={<CalendarIcon />}
      title="Outstanding Principal Balance: by lender"
      className={className}
      skeletonHeight={230}
      hasDataToShow={data?.length > 0}
      loaderKind="chart"
      {...props}
    >
      <BalancePieChart data={data} id="debt-outstanding-principal-balance" />
    </CardWithHeader>
  );
};
