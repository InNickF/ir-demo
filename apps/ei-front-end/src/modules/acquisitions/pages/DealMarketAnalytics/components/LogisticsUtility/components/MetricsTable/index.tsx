import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { IsLoadingProp } from "@/commons/typings";
import { Empty } from "in-ui-react";
import { FC, ReactElement } from "react";
import "./styles.css";

export type GenericMetric = {
  name: string;
  value: string;
};

interface MetricsTableProps extends IsLoadingProp {
  metrics: GenericMetric[];
  icon: ReactElement;
  title: string;
  className?: string;
  comingSoon?: boolean;
}

export const MetricsTable: FC<MetricsTableProps> = ({
  metrics,
  icon,
  title,
  className,
  isLoading,
  ...props
}) => {
  const prefix = "acq-logistics__metrics";
  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  return (
    <CardWithHeader
      {...props}
      className={getClasses()}
      icon={icon}
      title={title}
      bodyPadding={isLoading}
      isLoading={isLoading}
    >
      <div>
        {metrics && metrics.length ? (
          metrics.map((metric) => {
            return (
              <div key={metric.name} className={`${prefix}-row`}>
                <div className={`${prefix}-name`}>{metric.name}</div>
                <div className={`${prefix}-value`}>{metric.value}</div>
              </div>
            );
          })
        ) : (
          <Empty />
        )}
      </div>
    </CardWithHeader>
  );
};
