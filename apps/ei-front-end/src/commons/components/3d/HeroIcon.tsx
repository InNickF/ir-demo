import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Coins } from "./Coins";
import { Pie } from "./Pie";
import { Rings } from "./Rings";
import { StaggeredLayers } from "./StaggeredLayers";
import { LinesLoop } from "./LinesLoop";
import { Rubik } from "./Rubik";

interface BackgroundElementsProps {
  z: number;
}

export const HeroIcon = ({ z }: BackgroundElementsProps) => {
  const ref = useRef<THREE.Group>(null);
  const viewport = useThree((state) => state.viewport);
  const camera = useThree((state) => state.camera);

  const { width, height } = viewport.getCurrentViewport(camera, [
    camera.position.x,
    camera.position.y,
    z * 2,
  ]);

  const models = useMemo(
    () => [Pie, Rings, StaggeredLayers, Coins, LinesLoop, Rubik],
    []
  );
  const Model = useMemo(
    () => models[Math.floor(Math.random() * models.length)],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(1),
    y: THREE.MathUtils.randFloatSpread(height),
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  useFrame(() => {
    const baseSize = 0.3;
    ref.current.scale.x = THREE.MathUtils.lerp(
      ref.current.scale.x,
      baseSize,
      0.005
    );
    ref.current.scale.y = THREE.MathUtils.lerp(
      ref.current.scale.y,
      baseSize,
      0.005
    );
    ref.current.scale.z = THREE.MathUtils.lerp(
      ref.current.scale.z,
      baseSize,
      0.005
    );

    ref.current.rotation.set(
      (data.rX += 0.0005),
      (data.rY += 0.002),
      (data.rZ += 0.0001)
    );
    ref.current.position.set(data.x * width, (data.y += 0.005), z * 2);
    if (data.y > height / 1.5) {
      data.y = -height / 1.5;
      ref.current.children[0].scale.x = 0;
      ref.current.children[0].scale.y = 0;
      ref.current.children[0].scale.z = 0;
    }

    if (ref.current.children[0].scale.x < 0.5) {
      ref.current.children[0].scale.x = THREE.MathUtils.lerp(
        ref.current.children[0].scale.x,
        0.5,
        0.05
      );
      ref.current.children[0].scale.y = THREE.MathUtils.lerp(
        ref.current.children[0].scale.y,
        0.5,
        0.05
      );
      ref.current.children[0].scale.z = THREE.MathUtils.lerp(
        ref.current.children[0].scale.z,
        0.5,
        0.05
      );
    }
  });

  return <Model ref={ref} scale={0} />;
};
