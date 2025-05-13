import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { forwardRef, useMemo, useRef } from "react";
import * as THREE from "three";
import { SilverMaterial } from "./SilverMaterial";
import { GroupPropsWithAnimation } from "./types";
import { setComponentRefs } from "in-ui-react";

class SemiCircleCurve extends THREE.Curve<THREE.Vector3> {
  scale: number;
  constructor(scale = 1) {
    super();
    this.scale = scale;
  }

  getPoint(t: number) {
    const radians = t * Math.PI;
    const x = Math.cos(radians) * this.scale;
    const y = Math.sin(radians) * this.scale;
    return new THREE.Vector3(x, y, 0);
  }
}

export const Travel = forwardRef<THREE.Group, GroupPropsWithAnimation>(
  ({ stopAnimation = false, ...props }, forwardRef) => {
    const ref = useRef<THREE.Group>(null);
    const path = useMemo(() => {
      return new SemiCircleCurve(2);
    }, []);

    const path2 = useMemo(() => {
      return new SemiCircleCurve(2.02);
    }, []);

    const ballRef = useRef<THREE.Mesh>(null);
    const tubeRef = useRef<THREE.Mesh>(null);
    const t = useRef(0);

    const { contextSafe } = useGSAP(() => {
      if (stopAnimation) return;
      if (!ballRef.current) return;
      if (!tubeRef.current) return;

      gsap
        .timeline({})
        .to(t, {
          current: 2,
          duration: 3,
          ease: "power1.inOut",
          repeat: -1,
          onUpdate: () => {
            if (!ballRef.current) return;

            const point = path2.getPoint(t.current);
            ballRef.current.position.set(point.x, point.y, point.z);
          },
        })
        .to(
          tubeRef.current.rotation,
          {
            z: -Math.PI,
            ease: "back.out",
            duration: 3,
            repeat: -1,
          },
          0
        );
    }, []);

    const tl = useRef<gsap.core.Timeline>(gsap.timeline());

    const onMouseInteraction = contextSafe(() => {
      if (tl.current.isActive()) return;
      tl.current.to(ref.current.rotation, {
        y: `+=${Math.PI}`,
        duration: 0.6,
        ease: "power4.inOut",
      });
    });

    return (
      <group
        ref={setComponentRefs(ref, forwardRef)}
        onPointerEnter={onMouseInteraction}
        {...props}
      >
        <group scale={0.8}>
          <mesh ref={ballRef} position={[0, 2, 0]}>
            <sphereGeometry args={[0.7]}></sphereGeometry>
            <SilverMaterial />
          </mesh>

          <mesh rotation={[0, 0, Math.PI]} ref={tubeRef}>
            <tubeGeometry args={[path, 20, 0.8, 8, false]}></tubeGeometry>
            <SilverMaterial side={THREE.DoubleSide} />
          </mesh>
        </group>
      </group>
    );
  }
);

Travel.displayName = "Travel";
