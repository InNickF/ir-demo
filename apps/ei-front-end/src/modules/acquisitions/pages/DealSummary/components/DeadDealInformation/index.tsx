import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { Deal } from "@/modules/acquisitions/typings/deals";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

interface DeadDealInformationProps {
  dealPhase: Deal["phase"];
  deadReasonType: Deal["dead_reason_type"];
  deadReason: Deal["dead_reason"];
  className?: string;
}

export const DeadDealInformation: FC<DeadDealInformationProps> = ({
  dealPhase,
  deadReasonType,
  deadReason,
  className,
}) => {
  return dealPhase?.value === "DEAD" && deadReasonType?.value ? (
    <CardWithHeader
      title="Dead Information"
      icon={<ArchiveBoxXMarkIcon />}
      className={className}
    >
      <div className="flex flex-col gap-2">
        <p>
          Dead Reason:{" "}
          <strong className="font-extrabold">
            {genericGetValue(deadReasonType?.label)}.
          </strong>
        </p>
        <p>Details: {genericGetValue(deadReason)}</p>
      </div>
    </CardWithHeader>
  ) : null;
};
