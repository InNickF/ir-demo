import { useGSAP } from "@gsap/react";
import { Center, Instance, Instances } from "@react-three/drei";
import gsap from "gsap";
import { forwardRef, useCallback, useRef } from "react";
import * as THREE from "three";
import { SilverMaterial } from "./SilverMaterial";
import { GroupPropsWithAnimation } from "./types";

export const LinesLoop = forwardRef<THREE.Group, GroupPropsWithAnimation>(
  ({ stopAnimation = false, ...props }, ref) => {
    const groupRef = useRef<THREE.Group>(null);
    const refList = useRef<THREE.Mesh[]>([]);

    const getRef = useCallback((mesh: THREE.Mesh) => {
      if (mesh && !refList.current.includes(mesh)) {
        refList.current.push(mesh);
      }
    }, []);

    useGSAP(() => {
      if (stopAnimation) return;
      gsap
        .timeline()
        .to(
          refList.current.map((item) => item.rotation),
          {
            y: `+=${Math.PI * 2}`,
            repeat: -1,
            duration: 6,

            ease: "none",
          }
        )
        .to(
          groupRef.current.rotation,
          {
            z: Math.PI * 2,
            duration: 24,
            ease: "none",
            repeat: -1,
          },
          0
        );
    }, []);

    const radius = 3;

    return (
      <Center>
        <group ref={ref} {...props}>
          <group rotation={[0, 0, 0]} scale={0.6} ref={groupRef}>
            <Instances>
              <boxGeometry args={[1, 0.2, 1]}></boxGeometry>
              <SilverMaterial />
              {Array.from({ length: 20 }).map((_, index) => {
                return (
                  <group
                    key={index}
                    rotation={[0, 0, (index / 20) * 2 * Math.PI]}
                    position={[
                      Math.cos((index / 20) * 2 * Math.PI) * radius,
                      Math.sin((index / 20) * 2 * Math.PI) * radius,
                      0,
                    ]}
                  >
                    <Instance ref={getRef} />
                  </group>
                );
              })}
            </Instances>
          </group>
        </group>
      </Center>
    );
  }
);

LinesLoop.displayName = "LinesLoop";
