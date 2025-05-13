import { HTMLRendererCard } from "@/commons/components/general/HTMLRendererCard";
import { AssetStrategyTypeSelect } from "@/modules/assets/components/data-entry/AssetStrategyTypeSelect";
import { useGetPropertyStrategy } from "@/modules/assets/services/queries/properties";
import { PropertyStrategyTypes } from "@/modules/assets/typings/properties";
import { assetStrategyTypes } from "@/modules/assets/utils";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";

interface AssetPropertyStrategyProps {
  propertyId: string;
  className?: string;
}

export const AssetPropertyStrategy: FC<AssetPropertyStrategyProps> = ({
  propertyId,
  className,
}) => {
  const prefix = "asset-property-strategy";

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  const [strategyType, setStrategyType] = useState<PropertyStrategyTypes>(
    assetStrategyTypes[0]
  );

  const { data, isLoading, isRefetching } = useGetPropertyStrategy({
    filters: {
      property_under_management_code: propertyId,
    },
  });

  const selectedStrategy = data?.results?.find(
    (strategy) => strategy?.type === strategyType
  );
  return (
    <HTMLRendererCard
      className={getClasses()}
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
