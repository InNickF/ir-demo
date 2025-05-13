import { numberToDollar } from "@/commons/model-in/formatters/utils/amount-conversions";

import { FundKpiData } from "@/modules/debt/typings/fund";
import { FC } from "react";
import "../styles.css";
import { LabelValue } from "@/commons/components/data-display/LabelValue";
import {
  CardWithHeader,
  CardWithHeaderProps,
} from "@/commons/components/general/CardWithHeader";

interface KpiCard extends CardWithHeaderProps {
  data: FundKpiData[];
}

export const KpiCard: FC<KpiCard> = ({
  data,
  title,
  icon,
  className,
  ...props
}) => {
  const prefix = "debt-summary-kpis-kpi-card";
  return (
    <CardWithHeader
      icon={icon}
      title={title}
      className={className}
      bodyPadding={false}
      skeletonHeight={120}
      {...props}
    >
      <div className={`${prefix}__body`}>
        {data?.map((item, index) => (
          <>
            {item.title.toLowerCase() === "total debt" ? (
              <div key={index} className="w-full">
                <p className={`${prefix}__kpi-long`}>
                  {numberToDollar({
                    value: Number(item.text),
                    options: {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    },
                  })}
                </p>
              </div>
            ) : (
              <div key={index} className={`${prefix}__kpi-short`}>
                <LabelValue
                  label={item.title.toUpperCase()}
                  value={<p className={`${prefix}__kpi-value`}>{item.text}</p>}
                />
              </div>
            )}
          </>
        ))}
      </div>
    </CardWithHeader>
  );
};
