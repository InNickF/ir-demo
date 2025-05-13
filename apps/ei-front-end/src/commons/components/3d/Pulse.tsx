import { useGSAP } from "@gsap/react";
import { Center, Instance, Instances } from "@react-three/drei";
import gsap from "gsap";
import { forwardRef, useCallback, useRef } from "react";
import * as THREE from "three";
import { SilverMaterial } from "./SilverMaterial";
import { GroupPropsWithAnimation } from "./types";
import { GroupProps } from "@react-three/fiber";
import { setComponentRefs } from "in-ui-react";

const PulseElement = forwardRef<THREE.Group, GroupProps>(
  (props, forwardRef) => {
    const ref = useRef<THREE.Group>(null);
    const { contextSafe } = useGSAP();
    const originalPosition = ref?.current?.position?.z;
    const tl = useRef<gsap.core.Timeline>(gsap.timeline());
    const onMouseEnter = contextSafe(() => {
      if (tl.current.isActive()) return;
      tl.current
        .to(ref?.current?.position, {
          z: 3,
          duration: 0.4,
          ease: "power2.inOut",
        })
        .to(ref.current?.position, {
          z: originalPosition,
          duration: 0.4,
          ease: "power2.inOut",
        });
    });

    return (
      <group ref={setComponentRefs(ref, forwardRef)} {...props}>
        <group onPointerEnter={onMouseEnter}>
          <Instance />
        </group>
      </group>
    );
  }
);

PulseElement.displayName = "PulseElement";

export const Pulse = forwardRef<THREE.Group, GroupPropsWithAnimation>(
  ({ stopAnimation = false, ...props }, ref) => {
    const refList = useRef<THREE.Group[]>([]);

    const getRef = useCallback((mesh: THREE.Group) => {
      if (mesh && !refList.current.includes(mesh)) {
        refList.current.push(mesh);
      }
    }, []);

    useGSAP(() => {
      if (stopAnimation) return;
      if (refList.current.length === 0) return;

      refList.current.forEach((mesh, index) => {
        if (mesh) {
          gsap.to(mesh.scale, {
            x: 0.3,
            z: 0.3,
            delay: 0.25 * index,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            duration: 2,
          });
        }
      });
    }, []);
    return (
      <group ref={ref} {...props}>
        <Center>
          <group rotation={[0, 0, Math.PI / 4]}>
            <group rotation={[0, 0, Math.PI / 2]}>
              <Instances>
                <cylinderGeometry args={[1, 1, 0.2, 64]}></cylinderGeometry>
                <SilverMaterial />
                {Array.from({ length: 10 }).map((_, index) => {
                  return (
                    <PulseElement
                      ref={getRef}
                      key={index}
                      position={[0, 0.5 * index, 2]}
                    />
                  );
                })}
              </Instances>
            </group>
          </group>
        </Center>
      </group>
    );
  }
);

Pulse.displayName = "Pulse";
