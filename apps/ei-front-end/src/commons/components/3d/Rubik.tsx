import { useGSAP } from "@gsap/react";
import { Center, Instance, Instances } from "@react-three/drei";
import gsap from "gsap";
import { forwardRef, useMemo, useRef } from "react";
import * as THREE from "three";
import { SilverMaterial } from "./SilverMaterial";
import { GroupPropsWithAnimation } from "./types";

export const Rubik = forwardRef<THREE.Group, GroupPropsWithAnimation>(
  ({ stopAnimation = false, ...props }, ref) => {
    const groupRef = useRef<THREE.Group>(null);
    const firstLayerRef = useRef<THREE.Group>(null);
    const secondLayerRef = useRef<THREE.Group>(null);
    const thirdLayerRef = useRef<THREE.Group>(null);

    const blockSize = 1;
    const gap = 0.1;
    const distance = blockSize + gap;

    const layers = useMemo(() => {
      const layer1 = [];
      const layer2 = [];
      const layer3 = [];

      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          for (let z = -1; z <= 1; z++) {
            if (z === -1) {
              layer1.push(
                new THREE.Vector3(x * distance, y * distance, z * distance)
              );
            } else if (z === 0) {
              layer2.push(
                new THREE.Vector3(x * distance, y * distance, z * distance)
              );
            } else {
              layer3.push(
                new THREE.Vector3(x * distance, y * distance, z * distance)
              );
            }
          }
        }
      }

      return [layer1, layer2, layer3];
    }, [distance]);

    useGSAP(() => {
      if (stopAnimation) return;
      if (
        firstLayerRef.current &&
        secondLayerRef.current &&
        thirdLayerRef.current &&
        groupRef.current
      ) {
        gsap
          .timeline({
            repeat: -1,
            defaults: {
              ease: "power2.inOut",
            },
          })
          .to(firstLayerRef.current.rotation, {
            z: Math.PI,
            duration: 3,
          })
          .to(
            secondLayerRef.current.rotation,
            {
              z: Math.PI,
              duration: 3,
              delay: 0.15,
            },
            "<"
          )
          .to(
            thirdLayerRef.current.rotation,
            {
              z: Math.PI,
              duration: 3,
              delay: 0.25,
            },
            "<"
          )
          .to(
            groupRef.current.rotation,
            {
              y: Math.PI * 2,
              duration: 4,
            },
            0
          );
      }
    }, []);

    return (
      <Center>
        <group ref={ref} {...props}>
          <group rotation={[0, 0, Math.PI / 8]} scale={1.2}>
            <group rotation={[0, Math.PI / 2, 0]} scale={0.6} ref={groupRef}>
              <Instances>
                <boxGeometry args={[1, 1, 1]}></boxGeometry>
                <SilverMaterial />

                <group ref={firstLayerRef}>
                  {layers[0].map((item, index) => {
                    return <Instance key={index} position={item} />;
                  })}
                </group>
                <group ref={secondLayerRef}>
                  {layers[1].map((item, index) => {
                    return <Instance key={index} position={item} />;
                  })}
                </group>
                <group ref={thirdLayerRef}>
                  {layers[2].map((item, index) => {
                    return <Instance key={index} position={item} />;
                  })}
                </group>
              </Instances>
            </group>
          </group>
        </group>
      </Center>
    );
  }
);

Rubik.displayName = "Rubik";
