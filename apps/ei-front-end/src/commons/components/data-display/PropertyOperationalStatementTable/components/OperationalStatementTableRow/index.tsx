import { OperationalStatementTableMetricsType } from "@/modules/assets/typings/property";
import { CSSProperties, FC, useState } from "react";
import { OperationalStatementInnerRow } from "./components/OperationalStatementInnerRow";

type OperationalStatementTableRowProps = {
  className?: string;
  metrics: OperationalStatementTableMetricsType;
  style?: CSSProperties;
  level?: number;
};

export const OperationalStatementTableRow: FC<
  OperationalStatementTableRowProps
> = ({ className, metrics, level = 0 }) => {
  const prefix = "assets-operational-statement-table-row";

  const [drillDownIsOpen, setDrillDownIsOpen] = useState(false);
  const hasDrillDown = metrics.drill_down && metrics.drill_down.length > 0;

  const getClasses = () => {
    const classes = [prefix, "h-12"];
    className && classes.push(className);
    (hasDrillDown || level === 0) && classes.push("bg-ghost-2");
    hasDrillDown && classes.push("cursor-pointer");
    level > 0 && classes.push("assets-operational-statement-table-row--child");
    return classes.join(" ");
  };

  return (
    <>
      <OperationalStatementInnerRow
        className={getClasses()}
        metrics={metrics}
        setDrillDownIsOpen={setDrillDownIsOpen}
        drillDownIsOpen={drillDownIsOpen}
        indentation={level}
      />

      {hasDrillDown && drillDownIsOpen ? (
        <>
          {metrics.drill_down.map((drillDownMetrics, index) => (
            <OperationalStatementTableRow
              metrics={drillDownMetrics}
              key={`${drillDownMetrics.metric}-${index}`}
              level={level + 1}
            />
          ))}
        </>
      ) : null}
    </>
  );
};
