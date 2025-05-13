import { BaseCanvas } from "@/commons/components/3d/BaseCanvas";
import { Coins } from "@/commons/components/3d/Coins";
import { LinesLoop } from "@/commons/components/3d/LinesLoop";
import { Pie } from "@/commons/components/3d/Pie";
import { Rings } from "@/commons/components/3d/Rings";
import { Rubik } from "@/commons/components/3d/Rubik";
import { StaggeredLayers } from "@/commons/components/3d/StaggeredLayers";
import { NextPageWithLayout } from "@/commons/typings";
import { ReactElement, Suspense } from "react";
import { LabHead } from "../../components/general/LabHead";
import { BaseLayout } from "../../layouts/BaseLayout";
import { Vector3 } from "three";
import { Core } from "@/commons/components/3d/Core";
import { Pulse } from "@/commons/components/3d/Pulse";
import { Travel } from "@/commons/components/3d/Travel";

const ThreeJS: NextPageWithLayout = () => {
  const betaSize = 0.32;
  const size = [betaSize, betaSize, betaSize] as unknown as Vector3;
  return (
    <div className="h-[600px]">
      <BaseCanvas>
        <Suspense fallback={null}>
          <group position={[0, 1, 0]}>
            <group position={[-1 + betaSize, 0, 0]} scale={size}>
              <Pie />
            </group>
            <group position={[-3 + betaSize, 0, 0]} scale={size}>
              <Rings />
            </group>
            <group position={[-5 + betaSize, 0, 0]} scale={size}>
              <StaggeredLayers />
            </group>
            <group position={[1 + betaSize, 0, 0]} scale={size}>
              <Coins />
            </group>
            <group position={[3 + betaSize, 0, 0]} scale={size}>
              <LinesLoop />
            </group>
            <group position={[5 + betaSize, 0, 0]} scale={size}>
              <Rubik />
            </group>
          </group>
          <group position={[0, -1, 0]}>
            <group position={[-2, 0, 0]} scale={size}>
              <Core />
            </group>
            <group position={[0, 0, 0]} scale={size}>
              <Pulse />
            </group>
            <group position={[2 + betaSize, 0, 0]} scale={size}>
              <Travel />
            </group>
          </group>
        </Suspense>
      </BaseCanvas>
    </div>
  );
};

ThreeJS.getLayout = (page: ReactElement) => {
  return (
    <>
      <LabHead title="ThreeJS" />
      <BaseLayout title="ThreeJS">{page}</BaseLayout>
    </>
  );
};

export default ThreeJS;
