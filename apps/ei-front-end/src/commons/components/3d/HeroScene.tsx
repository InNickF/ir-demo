import { FC, Suspense } from "react";
import { BaseCanvas } from "./BaseCanvas";
import { HeroIcon } from "./HeroIcon";
interface HeroSceneProps {
  count?: number;
}
// const Effects: FC<HeroSceneProps> = ({ count }) => {
//   return (
//     <Selection enabled>
//       <EffectComposer>
//         <DepthOfField target={[0, 0, 0]} focalLength={0} bokehScale={2.5} />
//       </EffectComposer>
//       <Select>
//         {Array.from({ length: count }, (_, i) => (
//           <HeroIcon key={i} z={-i - 2} />
//         ))}
//       </Select>
//     </Selection>
//   );
// };

export const HeroScene: FC<HeroSceneProps> = ({ count = 12 }) => {
  return (
    <section className="-z-control fixed inset-0 outline-none w-screen h-screen">
      <BaseCanvas>
        <Suspense fallback={null}>
          {Array.from({ length: count }, (_, i) => (
            <HeroIcon key={i} z={-i + 1.5 * 0.8} />
          ))}
        </Suspense>
      </BaseCanvas>
    </section>
  );
};
