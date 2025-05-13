import { useGSAP } from "@gsap/react";
import { Center, RoundedBox } from "@react-three/drei";
import gsap from "gsap";
import { forwardRef, useCallback, useRef } from "react";
import * as THREE from "three";
import { SilverMaterial } from "./SilverMaterial";
import { GroupPropsWithAnimation } from "./types";
import { setComponentRefs } from "in-ui-react";

const Element = forwardRef<THREE.Mesh, { index: number }>(
  ({ index }, forwardRef) => {
    const ref = useRef<THREE.Mesh>();
    const tl = useRef<gsap.core.Timeline>(gsap.timeline());

    const { contextSafe } = useGSAP();

    const onMouseInteraction = contextSafe(() => {
      if (!ref.current || tl.current.isActive()) return;
      const originalZ = ref.current.position.z;
      tl.current
        .to(ref.current.position, {
          z: 0.5,
          duration: 0.5,
          ease: "power2.inOut",
        })
        .to(ref.current.position, {
          z: originalZ,
          duration: 0.5,
          ease: "power2.inOut",
        });
    });

    return (
      <RoundedBox
        ref={setComponentRefs(ref, forwardRef)}
        onPointerEnter={onMouseInteraction}
        args={[1, 0.1, 1]}
        radius={0.02}
        position={[0, (index - 1) * 0.1, 0]}
      >
        <SilverMaterial />
      </RoundedBox>
    );
  }
);

Element.displayName = "StaggeredLayersElement";

export const StaggeredLayers = forwardRef<THREE.Group, GroupPropsWithAnimation>(
  ({ stopAnimation = false, ...props }, ref) => {
    const refList = useRef<THREE.Mesh[]>([]);

    const getRef = useCallback((mesh: THREE.Mesh) => {
      if (mesh && !refList.current.includes(mesh)) {
        refList.current.push(mesh);
      }
    }, []);

    useGSAP(() => {
      if (stopAnimation) return;
      if (refList.current.length === 0) return;

      gsap.to(
        refList.current.map((i) => i.rotation),
        {
          y: `+=${Math.PI / 2}`,
          repeat: -1,
          ease: "power2.inOut",
          stagger: {
            each: 0.1,
          },
          duration: 1.5,
        }
      );
    }, []);

    return (
      <Center scale={3} rotation={[Math.PI / 10, 0, 0]}>
        <group ref={ref} {...props}>
          {Array.from({ length: 5 }).map((_, index) => {
            return <Element key={index} index={index} ref={getRef} />;
          })}
        </group>
      </Center>
    );
  }
);

StaggeredLayers.displayName = "StaggeredLayers";
