import { IsLoadingProp } from "@/commons/typings";
import { useGSAP } from "@gsap/react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { setComponentRefs } from "in-ui-react";
import { FC, forwardRef, HTMLAttributes, useMemo, useRef } from "react";
import * as THREE from "three";
import { BaseCanvas } from "./BaseCanvas";
import { Pie } from "./Pie";
import { Rings } from "./Rings";
import { StaggeredLayers } from "./StaggeredLayers";
import { GroupPropsWithAnimation } from "./types";

export interface Loader3DProps
  extends IsLoadingProp,
    HTMLAttributes<HTMLDivElement> {
  kind?: "chart" | "table" | "other";
  onChangeIsLoading?: () => void;
  localIsLoading?: boolean;
}

const Element = forwardRef<
  THREE.Group,
  GroupPropsWithAnimation &
    Pick<
      Loader3DProps,
      "kind" | "isLoading" | "onChangeIsLoading" | "localIsLoading"
    >
>(
  (
    { kind = "other", isLoading, onChangeIsLoading, localIsLoading, ...props },
    forwardRef
  ) => {
    const ref = useRef<THREE.Group>(null);

    /* startTime, endTime and timeDiff help to allow the animation to run a little bit, sometime the response
     * is too fast and the animation looks like a bug
     */
    const startTime = useRef(new Date());

    const loadingTimeLine = useRef<gsap.core.Timeline>(gsap.timeline());
    useGSAP(() => {
      if (loadingTimeLine.current.isActive()) return;
      if (!isLoading && localIsLoading) {
        const endTime = new Date();
        const timeDiff = endTime.getTime() - startTime.current.getTime();

        /**
         * Is use it to get the delay for the animation depending on how takes the response
         * If it's a quick response but not too fast, the animation will run a little bit
         * This numbers are ms
         * @returns {number} The delay for the animation
         */
        const getDelay = () => {
          if (timeDiff < 100) return 0;
          if (timeDiff < 500) return 1.5;
          return 0;
        };

        /**
         * Is use it to get the duration for the animation depending on how takes the response
         * If it's a quick response the user doesn't need to see the animation
         * This numbers are ms
         * @returns {number} The duration for the animation
         */
        const getDuration = () => {
          if (timeDiff < 100) return 0;
          if (timeDiff < 500) return 0.8;
          return 0.8;
        };

        loadingTimeLine.current.to(ref.current.scale, {
          x: 0,
          y: 0,
          z: 0,
          duration: getDuration(),
          onComplete: () => {
            onChangeIsLoading?.();
          },
          ease: "power2.inOut",
          delay: getDelay(),
        });
      }
    }, [isLoading, localIsLoading]);

    const models: Record<Loader3DProps["kind"], Array<typeof Pie>> = useMemo(
      () => ({
        chart: [Pie],
        table: [StaggeredLayers],
        other: [Rings],
      }),
      []
    );

    const Model = useMemo(
      () => models?.[kind][Math.floor(Math.random() * models[kind].length)],
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );

    useFrame(() => {
      const baseSize = 1;
      if (ref.current) {
        ref.current.scale.x = THREE.MathUtils.lerp(
          ref.current.scale.x,
          baseSize,
          0.05
        );
        ref.current.scale.y = THREE.MathUtils.lerp(
          ref.current.scale.y,
          baseSize,
          0.05
        );
        ref.current.scale.z = THREE.MathUtils.lerp(
          ref.current.scale.z,
          baseSize,
          0.05
        );
      }
    });

    return (
      <Model {...props} ref={setComponentRefs(ref, forwardRef)} scale={0} />
    );
  }
);

Element.displayName = "Loader3DElement";

export const Loader3D: FC<Loader3DProps> = ({
  kind = "chart",
  isLoading,
  onChangeIsLoading,
  localIsLoading,
  ...props
}) => {
  return (
    <BaseCanvas {...props}>
      <Element
        kind={kind}
        isLoading={isLoading}
        onChangeIsLoading={onChangeIsLoading}
        localIsLoading={localIsLoading}
      />
    </BaseCanvas>
  );
};
