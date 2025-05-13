import { ButtonGroup, ButtonGroupItem } from "in-ui-react";
import { FC } from "react";
import { View } from "../../hooks/useCompsFinderToggleView";
import "./styles.css";

interface CompsFinderToggleViewProps {
  views: ButtonGroupItem[];
  activeView: View;
  className?: string;
}

export const CompsFinderToggleView: FC<CompsFinderToggleViewProps> = ({
  views,
  activeView,
  className,
}) => {
  const getClasses = (): string => {
    const classes = ["acq-comps-finder-toggle-view"];
    activeView === "map" && classes.push("acq-comps-finder-toggle-view--map");
    className && classes.push(className);
    return classes.join(" ");
  };

  return (
    <div className={getClasses()}>
      <ButtonGroup
        className="acq-comps-finder-toggle-view__button"
        items={views}
        active={activeView}
      />
    </div>
  );
};
