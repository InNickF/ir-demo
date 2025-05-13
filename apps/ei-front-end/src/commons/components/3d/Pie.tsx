import { useGSAP } from "@gsap/react";
import { Center, Instance, Instances } from "@react-three/drei";
import gsap from "gsap";
import { forwardRef, useCallback, useMemo, useRef } from "react";
import * as THREE from "three";
import { SilverMaterial } from "./SilverMaterial";
import { GroupPropsWithAnimation } from "./types";
import { setComponentRefs } from "in-ui-react";

const shapes = 4;
export const Pie = forwardRef<THREE.Group, GroupPropsWithAnimation>(
  ({ stopAnimation = false, ...props }, forwardRef) => {
    const refList = useRef<THREE.Group[]>([]);
    const interactiveTimelines = useRef<gsap.core.Timeline[]>(
      Array.from({ length: shapes }).map(() => gsap.timeline())
    );
    const groupRef = useRef<THREE.Group>(null);

    const geometry = useMemo(() => {
      const shape = new THREE.Shape();

      // Outer arc
      shape.absarc(0, 0, 1, 0, Math.PI / 2, false);
      shape.lineTo(Math.cos(Math.PI / 2) * 0.5, Math.sin(Math.PI / 2) * 0.5);

      // Inner arc
      shape.absarc(0, 0, 0.2, Math.PI / 2, 0, true);
      shape.lineTo(1, 0);

      const extrudeSettings = {
        steps: 1,
        depth: 0.3,
        bevelEnabled: false,
      };

      return new THREE.ExtrudeGeometry(shape, extrudeSettings);
    }, []);

    const getRef = useCallback((mesh: THREE.Group) => {
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
          repeatDelay: 1,
          yoyo: true,
        })
        .to(
          groupRef.current.rotation,
          {
            z: `+=${Math.PI / 2}`,
            duration: 1.25,
            ease: "sine.inOut",
          },
          0.25
        )
        .to(
          refList.current.map((item) => item.position),
          {
            x: (index) => {
              return `+=${Math.sin((index / 4) * 2 * Math.PI) * 0.5}`;
            },
            z: (index) => {
              return `+=${Math.cos((index / 4) * 2 * Math.PI) * 0.5}`;
            },
            duration: 1,
            ease: "power3.inOut",
          },
          0
        )
        .to(
          refList.current.map((item) => item.rotation),
          {
            z: `+=${Math.PI * 2}`,
            ease: "power3.inOut",
            duration: 1.85,
          },
          0.25
        )
        .to(
          refList.current.map((item) => item.position),
          {
            x: 0,
            z: 0,
            ease: "power3.inOut",
            duration: 1,
          },
          1.2
        );
    }, []);

    const onMouseInteraction = (index: number) =>
      contextSafe(() => {
        if (interactiveTimelines.current?.[index].isActive()) return;
        interactiveTimelines.current?.[index]
          .to(refList.current?.[index].scale, {
            x: 1.2,
            y: 1.2,
            z: 1.2,
            duration: 0.35,
            ease: "power2.inOut",
          })
          .to(refList.current?.[index].scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.35,
            ease: "power2.inOut",
          });
      });

    return (
      <Center scale={1.6}>
        <group ref={setComponentRefs(groupRef, forwardRef)} {...props}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group>
              <Instances geometry={geometry}>
                <SilverMaterial side={THREE.DoubleSide} />
                {Array.from({ length: shapes }).map((_, index) => {
                  return (
                    <group
                      ref={getRef}
                      key={index}
                      rotation={[0, (index * Math.PI) / 2, 0]}
                      onPointerEnter={() => onMouseInteraction(index)()}
                    >
                      <Instance rotation={[Math.PI / 2, 0, 0]} />
                    </group>
                  );
                })}
              </Instances>
            </group>
          </group>
        </group>
      </Center>
    );
  }
);

Pie.displayName = "Pie";
