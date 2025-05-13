import {
  DndContext,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { ComponentProps, FC, useMemo } from "react";

interface GenericDnDContextProps extends ComponentProps<typeof DndContext> {
  sensorDelay?: number;
}

export const GenericDnDContext: FC<GenericDnDContextProps> = ({
  collisionDetection = closestCenter,
  modifiers = [restrictToVerticalAxis],
  sensorDelay = 0,
  children,
  sensors,
  ...props
}) => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: sensorDelay,
      tolerance: 40,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: sensorDelay,
      tolerance: 40,
    },
  });

  const defaultSensors = useSensors(mouseSensor, touchSensor);

  const finalSensors = useMemo(() => {
    return sensors || defaultSensors;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sensors]);

  return (
    <DndContext
      collisionDetection={collisionDetection}
      modifiers={modifiers}
      sensors={finalSensors}
      {...props}
    >
      {children}
    </DndContext>
  );
};
