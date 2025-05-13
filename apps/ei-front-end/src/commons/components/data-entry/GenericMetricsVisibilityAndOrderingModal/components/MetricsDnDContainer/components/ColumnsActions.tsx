import { Button, Tooltip } from "in-ui-react";
import { FC, useContext } from "react";
import { GenericMetricsVisibilityAndOrderingSharedStateContext } from "../../../context/GenericMetricsVisibilityAndOrderingSharedState";

interface ColumnsActionsProps {
  className?: string;
}
export const ColumnsActions: FC<ColumnsActionsProps> = ({ className }) => {
  const { onResetMetrics, visibilityState, onChangeVisibility } = useContext(
    GenericMetricsVisibilityAndOrderingSharedStateContext
  );

  const getClasses = () => {
    const classes = ["flex", "gap-3"];
    className && classes.push(className);
    return classes.join(" ");
  };

  const areAllMetricsSelected = Object.values(visibilityState).every(
    (value) => value
  );

  return onResetMetrics ? (
    <div className={getClasses()}>
      <Tooltip
        content="All metrics are already selected"
        hidden={!areAllMetricsSelected}
      >
        <div className="w-full">
          <Button
            kind="outline"
            block
            disabled={areAllMetricsSelected}
            size="small"
            onClick={() => {
              if (!areAllMetricsSelected) {
                const newState = { ...visibilityState };
                Object.keys(newState).forEach((key) => {
                  newState[key] = true;
                });
                onChangeVisibility({ ...newState });
              }
            }}
          >
            Select All Metrics
          </Button>
        </div>
      </Tooltip>
      <div className="w-full">
        <Button kind="outline" block size="small" onClick={onResetMetrics}>
          Reset Columns
        </Button>
      </div>
    </div>
  ) : null;
};
