import { Center, Instance, Instances } from "@react-three/drei";
import { GroupProps, useFrame } from "@react-three/fiber";
import { forwardRef, useRef } from "react";
import * as THREE from "three";
import { SilverMaterial } from "./SilverMaterial";
import { GroupPropsWithAnimation } from "./types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const radius = 3;
const count = 8;

const Coin = (props: GroupProps) => {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.005;
      ref.current.rotation.y += 0.005;
      ref.current.rotation.z += 0.005;
    }
  });

  const { contextSafe } = useGSAP();
  const tl = useRef<gsap.core.Timeline>(gsap.timeline());
  const onMouseInteraction = contextSafe(() => {
    if (tl.current.isActive()) return;
    tl.current.to(ref.current?.rotation, {
      x: `+=${Math.PI * 2}`,
      duration: 0.5,
      ease: "power2.inOut",
    });
  });

  return (
    <group {...props} onPointerEnter={onMouseInteraction}>
      <group ref={ref} rotation={[0, Math.PI / count, Math.PI / 2]}>
        <Instance />
      </group>
    </group>
  );
};

export const Coins = forwardRef<THREE.Group, GroupPropsWithAnimation>(
  ({ stopAnimation = false, ...props }, ref) => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
      if (stopAnimation) return;

      if (groupRef.current) {
        groupRef.current.rotation.z -= 0.005;
      }
    });

    return (
      <Center>
        <group ref={ref} {...props}>
          <group scale={0.6} ref={groupRef}>
            <Instances>
              <cylinderGeometry args={[1, 1, 0.1, 64]}></cylinderGeometry>
              <SilverMaterial />
              {Array.from({ length: 8 }).map((_, index) => {
                return (
                  <Coin
                    position={[
                      radius *
                        Math.cos((index * 2 * Math.PI) / count + Math.PI / 4),
                      radius *
                        Math.sin((index * 2 * Math.PI) / count + Math.PI / 4),
                      0,
                    ]}
                    rotation={[0, 0, (index * 2 * Math.PI) / count]}
                    key={index}
                  ></Coin>
                );
              })}
            </Instances>
          </group>
        </group>
      </Center>
    );
  }
);

Coins.displayName = "Coins";
