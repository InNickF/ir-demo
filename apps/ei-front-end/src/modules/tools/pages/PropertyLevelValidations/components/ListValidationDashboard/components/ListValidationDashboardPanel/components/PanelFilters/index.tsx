import { IsLoadingProp } from "@/commons/typings";
import { PanelFilter } from "@/modules/tools/pages/PropertyLevelValidations/types";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { Skeleton, Tooltip } from "in-ui-react";
import { FC } from "react";
import { ListValidationDashboardPanelProps } from "../..";
import "./styles.css";
import { listValidationDashboardPanelCSSPrefix } from "../../utils";

interface PanelFiltersProps
  extends Pick<
      ListValidationDashboardPanelProps,
      "currentFilter" | "onChangeFilter"
    >,
    IsLoadingProp {
  filters: PanelFilter[];
  disabled?: boolean;
}
export const PanelFilters: FC<PanelFiltersProps> = ({
  currentFilter,
  onChangeFilter,
  filters,
  isLoading,
  disabled,
}) => {
  const prefix = `${listValidationDashboardPanelCSSPrefix}__filters`;
  return (
    <div className={prefix}>
      {filters.map((filter) => (
        <PanelFilterItem
          key={filter.value}
          {...filter}
          currentFilter={currentFilter}
          isLoading={isLoading}
          onClick={(value) => {
            onChangeFilter(value);
          }}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

interface PanelFilterItemProps
  extends PanelFilter,
    Pick<ListValidationDashboardPanelProps, "currentFilter">,
    IsLoadingProp {
  onClick: (filter: PanelFilter["value"]) => void;
}

const PanelFilterItem: FC<PanelFilterItemProps> = ({
  label,
  quantity,
  color = "primary",
  currentFilter,
  value,
  description,
  isLoading,
  onClick,
  disabled,
}) => {
  const filterPrefix = `${listValidationDashboardPanelCSSPrefix}__filters__filter`;
  const isActive = currentFilter === value;

  const getClasses = () => {
    const classes = [filterPrefix, `${filterPrefix}--color-${color}`];
    isActive && classes.push(`${filterPrefix}--active`);
    disabled && classes.push(`${filterPrefix}--disabled`);
    return classes.join(" ");
  };

  return (
    <button
      disabled={disabled}
      className={getClasses()}
      onClick={() => {
        onClick(value);
      }}
    >
      <div className={`${filterPrefix}__number`}>
        {isLoading ? (
          <Skeleton className="h-3.5 w-3.5">
            <Skeleton.Text className="h-3.5 w-3.5" />
          </Skeleton>
        ) : (
          quantity
        )}
      </div>
      <p>{label}</p>
      <Tooltip content={description}>
        <QuestionMarkCircleIcon className="w-4 h-4" />
      </Tooltip>
    </button>
  );
};
