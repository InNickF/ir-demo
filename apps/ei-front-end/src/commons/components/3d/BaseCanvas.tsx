import { Canvas, CanvasProps } from "@react-three/fiber";
import { ReactNode } from "react";

interface BaseCanvasProps extends CanvasProps {
  children: ReactNode;
}

export const BaseCanvas = ({ children, ...props }: BaseCanvasProps) => {
  return (
    <Canvas camera={{ near: 0.01, far: 110 }} {...props}>
      {children}
    </Canvas>
  );
};
