import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import { Button, Checkbox } from "in-ui-react";
import { CSSProperties, FC, useContext } from "react";
import { GenericMetricsVisibilityAndOrderingSharedStateContext } from "../../../../context/GenericMetricsVisibilityAndOrderingSharedState";
import "./styles.css";

interface MetricsItemProps {
  id: string;
  title: string;
  isDisabled?: boolean;
  disableDragging?: boolean;
}
export const MetricsItem: FC<MetricsItemProps> = ({
  id,
  title,
  isDisabled = false,
  disableDragging = false,
}) => {
  const { visibilityState, onChangeVisibility } = useContext(
    GenericMetricsVisibilityAndOrderingSharedStateContext
  );

  const {
    setNodeRef,
    isDragging,
    transition,
    transform,
    listeners,
    attributes,
  } = useSortable({
    id,
    disabled: isDisabled || disableDragging,
    data: {
      metric: id,
    },
  });

  const isSelected = !!visibilityState[id];

  const getClasses = (): string => {
    const classes: string[] = ["commons-generic-metric-dnd-item"];
    isDragging && classes.push("commons-generic-metric-dnd-item--dragging");
    isSelected && classes.push("commons-generic-metric-dnd-item--selected");
    return classes.join(" ");
  };

  const finalStyles: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition: transition,
  };
  return (
    <li ref={(e) => setNodeRef(e)} className={getClasses()} style={finalStyles}>
      <Checkbox
        checked={isSelected}
        onChange={() => {
          onChangeVisibility({
            ...visibilityState,
            [id]: !visibilityState[id],
          });
        }}
        label={title}
        disabled={isDisabled}
      />
      <Button
        onlyIcon
        icon={<ArrowsUpDownIcon />}
        kind="ghost"
        size="small"
        disabled={isDisabled || disableDragging}
        {...listeners}
        {...attributes}
      />
    </li>
  );
};
