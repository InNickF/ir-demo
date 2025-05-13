import { HTMLRendererCard } from "@/commons/components/general/HTMLRendererCard";
import { useIdFromQueryParams } from "@/commons/hooks/useIdFromQueryParams";
import { AssetStrategyTypeSelect } from "@/modules/assets/components/data-entry/AssetStrategyTypeSelect";
import { useGetFundStrategy } from "@/modules/assets/services/queries/funds";
import { FundStrategyTypes } from "@/modules/assets/typings/funds";
import { assetStrategyTypes } from "@/modules/assets/utils";
import { getFundsURL } from "@/modules/assets/utils/redirects/funds-redirects";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";

interface FundStrategyProps {
  className?: string;
}

export const FundStrategy: FC<FundStrategyProps> = ({ className }) => {
  const fundId = useIdFromQueryParams({
    model: "Fund",
    redirectOnNotFound: true,
    redirectURL: getFundsURL({
      id: null,
    }).rootURL,
  });

  const [strategyType, setStrategyType] = useState<FundStrategyTypes>(
    assetStrategyTypes[0]
  );

  const { data, isLoading, isRefetching } = useGetFundStrategy({
    filters: {
      fund_name: fundId,
      latest: "true",
    },
  });

  const selectedStrategy = data?.results?.find(
    (strategy) => strategy?.type === strategyType
  );

  return (
    <HTMLRendererCard
      className={className}
      title="Strategies"
      icon={<LightBulbIcon />}
      skeletonHeight={400}
      content={selectedStrategy?.note}
      isLoading={isLoading}
      isRefetching={isRefetching}
      headerActions={
        <AssetStrategyTypeSelect
          value={strategyType}
          onChange={(option) => {
            setStrategyType(option);
          }}
        />
      }
    />
  );
};
