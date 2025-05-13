import { Empty, Loader } from "in-ui-react";
import dynamic from "next/dynamic";
import { FC } from "react";
import { UtilityGaugeOverallScoreProps } from "./props";
import { Loader3D } from "@/commons/components/3d/Loader3D";

const UtilityGaugeOverallScore = dynamic(() => import("./components/Chart"), {
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

export const UtilityGaugeOverallScoreWrapper: FC<
  UtilityGaugeOverallScoreProps
> = ({ id, data = null }) => {
  return data !== null && data !== undefined ? (
    <UtilityGaugeOverallScore data={data} id={id} />
  ) : (
    <Empty />
  );
};
