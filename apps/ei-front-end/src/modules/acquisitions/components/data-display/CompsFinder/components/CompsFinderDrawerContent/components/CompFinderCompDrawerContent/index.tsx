import { CompstackComp } from "@/acquisitions/typings/market-analytics";
import { allCompstackCompValueFormatters } from "@/modules/acquisitions/utils/formatters/comps-value-formatters";
import { LabelValue } from "@/commons/components/data-display/LabelValue";
import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import {
  getCompKeysOrder,
  getCompstackCompAddress,
  getCompstackCompKeysToIgnore,
  getFullGridSizeCompstackCompKeys,
} from "@/modules/acquisitions/utils/compstack-comps";
import { FC } from "react";

interface CompFinderCompDrawerContentProps {
  comp: CompstackComp;
}
export const CompFinderCompDrawerContent: FC<
  CompFinderCompDrawerContentProps
> = ({ comp }) => {
  const formatter = allCompstackCompValueFormatters[comp?.type];
  const keysToIgnore = getCompstackCompKeysToIgnore({
    compType: comp?.type,
    ignoreAddressKeys: true,
  });
  const fullGridSizeKeys = getFullGridSizeCompstackCompKeys({
    compType: comp?.type,
  });
  const orderedKeys = getCompKeysOrder(comp?.type);

  return (
    <div className="acq-comps-finder-drawer-content__grid">
      <LabelValue
        label="Address"
        value={getCompstackCompAddress(comp)}
        className="md:col-span-2"
      />
      {orderedKeys.map((key) => {
        if (keysToIgnore.includes(key)) return null;
        return (
          <LabelValue
            key={key}
            label={humanizeSnakeCase(key)}
            className={
              fullGridSizeKeys.includes(key) ? "md:col-span-2" : undefined
            }
            value={
              formatter && formatter[key]
                ? formatter[key](comp?.[key])
                : genericGetValue(comp?.[key])
            }
          />
        );
      })}
    </div>
  );
};
