import { GenericLabelValueObject } from "@/commons/typings";
import { FC, Fragment } from "react";

export interface ComparisonValuesProps {
  data: [GenericLabelValueObject, GenericLabelValueObject][];
}
export const ComparisonValues: FC<ComparisonValuesProps> = ({ data }) => {
  const separatorClasses = "border-r-2 border-silver pr-2";
  return (
    <div className="grid grid-cols-[auto,1fr,auto,auto] gap-2 px-1">
      {data?.map((row, i) => (
        <Fragment key={`comparison-row-${i}`}>
          {row.map((item, index) => (
            <p
              className={index === 0 ? separatorClasses : undefined}
              key={item?.label}
            >
              {item?.label}
            </p>
          ))}
          {row.map((item, index) => (
            <p
              className={
                index === 0
                  ? `${separatorClasses} text-right font-mono`
                  : "text-right font-mono"
              }
              key={`${item?.label}-${item?.value}`}
            >
              {item?.value}
            </p>
          ))}
        </Fragment>
      ))}
    </div>
  );
};
