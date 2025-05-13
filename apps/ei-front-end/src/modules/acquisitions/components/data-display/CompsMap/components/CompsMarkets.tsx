import { CompstackComp } from "@/acquisitions/typings/market-analytics";
import { getCompstackCompId } from "@/modules/acquisitions/utils/compstack-comps";
import { FC, memo } from "react";
import { CompMarker } from "./CompMarker";

interface CompsMarketsProps {
  comps: CompstackComp[];
  dealComps: CompstackComp[];
  activeComp: CompstackComp;
  onCompClick: (comp: CompstackComp) => void;
}
const CompsMarkersBase: FC<CompsMarketsProps> = ({
  activeComp,
  comps,
  dealComps,
  onCompClick,
}) => {
  return (
    <>
      {comps?.map((comp) => (
        <CompMarker
          key={getCompstackCompId(comp)}
          longitude={Number(comp?.longitude)}
          latitude={Number(comp?.latitude)}
          type={comp?.type}
          belongsToDeal={dealComps?.some(
            (dealComp) =>
              getCompstackCompId(dealComp) === getCompstackCompId(comp)
          )}
          isActive={getCompstackCompId(comp) === getCompstackCompId(activeComp)}
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            onCompClick?.(comp);
          }}
        />
      ))}
    </>
  );
};

export const CompsMarkers = memo(CompsMarkersBase, (prev, next) => {
  const isSameActiveComp =
    prev.activeComp && next.activeComp
      ? getCompstackCompId(prev.activeComp) ===
        getCompstackCompId(next.activeComp)
      : prev.activeComp === next.activeComp;

  return (
    isSameActiveComp &&
    prev.comps === next.comps &&
    prev.dealComps === next.dealComps &&
    prev.onCompClick === next.onCompClick
  );
});
