import { useGSAP } from "@gsap/react";
import { Center } from "@react-three/drei";
import gsap from "gsap";
import { forwardRef, useRef } from "react";
import * as THREE from "three";
import { SilverMaterial } from "./SilverMaterial";
import { GroupPropsWithAnimation } from "./types";

export const Core = forwardRef<THREE.Group, GroupPropsWithAnimation>(
  ({ stopAnimation = false, ...props }, ref) => {
    const ring1Ref = useRef<THREE.Mesh>(null);
    const ring2Ref = useRef<THREE.Mesh>(null);
    const sphereRef = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);

    useGSAP(() => {
      if (stopAnimation) return;
      if (
        ring1Ref.current &&
        ring2Ref.current &&
        sphereRef.current &&
        groupRef.current
      ) {
        gsap
          .timeline({
            repeat: -1,
          })
          .to(
            ring1Ref.current.rotation,
            {
              z: `+=${Math.PI * 2}`,
              x: `+=${Math.PI * 2}`,

              duration: 10,
              ease: "power1.inOut",
            },
            0
          )
          .to(
            ring2Ref.current.rotation,
            {
              z: `-=${Math.PI * 2}`,
              x: `-=${Math.PI * 2}`,

              ease: "power1.inOut",
              duration: 4,
            },
            0
          )
          .to(
            groupRef.current.rotation,
            {
              y: Math.PI * 2,
              duration: 10,
              ease: "power1.inOut",
            },
            0
          );
      }
    }, []);
    return (
      <group ref={ref} {...props}>
        <Center ref={groupRef}>
          <mesh ref={ring1Ref}>
            <torusGeometry args={[2.1, 0.1]}></torusGeometry>
            <SilverMaterial />
          </mesh>
          <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.8, 0.1]}></torusGeometry>
            <SilverMaterial />
          </mesh>
          <group scale={0.8}>
            <mesh position={[0, 0, 0]} rotation={[0, 0, 0]} ref={sphereRef}>
              <sphereGeometry args={[0.5, 32, 32]}></sphereGeometry>
              <SilverMaterial />
            </mesh>
          </group>
        </Center>
      </group>
    );
  }
);

Core.displayName = "Core";
