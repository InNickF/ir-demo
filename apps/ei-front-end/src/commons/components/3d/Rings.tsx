import { useGSAP } from "@gsap/react";
import { Center } from "@react-three/drei";
import gsap from "gsap";
import { forwardRef, useCallback, useRef } from "react";
import * as THREE from "three";
import { SilverMaterial } from "./SilverMaterial";
import { GroupPropsWithAnimation } from "./types";

export const Rings = forwardRef<THREE.Group, GroupPropsWithAnimation>(
  ({ stopAnimation = false, ...props }, ref) => {
    const refList = useRef<THREE.Mesh[]>([]);
    const interactiveTimeline = useRef<gsap.core.Timeline>(gsap.timeline());
    const getRef = useCallback((mesh: THREE.Mesh) => {
      if (mesh && !refList.current.includes(mesh)) {
        refList.current.push(mesh);
      }
    }, []);

    const { contextSafe } = useGSAP(() => {
      if (stopAnimation) return;
      if (refList.current.length === 0) return;

      gsap
        .timeline({
          repeat: -1,
          repeatDelay: 0.35,
        })
        .to(
          refList.current.map((item) => item.rotation),
          {
            y: `+=${Math.PI * 2}`,
            x: `-=${Math.PI * 2}`,
            duration: 3,
            stagger: {
              each: 0.15,
            },
            ease: "power2.inOut",
          }
        );
    }, []);

    const onMouseInteraction = contextSafe(() => {
      if (interactiveTimeline.current.isActive()) return;
      interactiveTimeline.current
        .to(
          refList.current.map((item) => item.scale),
          {
            z: 1.2,
            y: 1.2,
            x: 1.2,
            ease: "power1.inOut",
            duration: 0.4,
            stagger: 0.1,
          }
        )
        .to(
          refList.current.map((item) => item.scale),
          {
            z: 1,
            y: 1,
            x: 1,
            ease: "power1.inOut",
            duration: 0.4,
            stagger: 0.1,
          }
        );
    });

    return (
      <Center>
        <group ref={ref} {...props}>
          <group>
            {Array.from({ length: 4 }).map((_, index) => {
              return (
                <mesh
                  key={index}
                  ref={getRef}
                  onPointerEnter={onMouseInteraction}
                >
                  <torusGeometry
                    args={[(index + 1) * 0.5, 0.125]}
                  ></torusGeometry>
                  <SilverMaterial />
                </mesh>
              );
            })}
          </group>
        </group>
      </Center>
    );
  }
);

Rings.displayName = "Rings";
