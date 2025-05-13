import { CompstackCompType } from "@/acquisitions/typings/market-analytics";
import { compsIcons } from "@/acquisitions/utils/compsIcons";
import { FC } from "react";
import { Marker, MarkerProps } from "react-map-gl";
import "./styles.css";

interface CompsFinderMarkerProps extends MarkerProps {
  isActive?: boolean;
  belongsToDeal?: boolean;
  type: CompstackCompType;
}

/**
 *
 * @see {@link https://visgl.github.io/react-map-gl/docs/api-reference/marker} for official documentation.
 */
export const CompMarker: FC<CompsFinderMarkerProps> = ({
  isActive,
  belongsToDeal,
  type,
  ...props
}) => {
  const prefix = "acq-comp-marker";
  const getClasses = (): string => {
    const classes = [prefix];
    isActive && classes.push("acq-comp-marker--active");
    belongsToDeal && classes.push("acq-comp-marker--belongs-to-deal");
    return classes.join(" ");
  };

  const getContainerClasses = (): string => {
    const baseClass = `${prefix}-container`;
    const classes = [baseClass];
    isActive && classes.push(`${baseClass}--active`);
    return classes.join(" ");
  };

  const Icon = compsIcons[type];

  const styles = belongsToDeal
    ? {
        zIndex: 2,
      }
    : undefined;

  return (
    <Marker {...props} style={styles}>
      <div className={getContainerClasses()}>
        <Icon className={getClasses()} />
      </div>
    </Marker>
  );
};
