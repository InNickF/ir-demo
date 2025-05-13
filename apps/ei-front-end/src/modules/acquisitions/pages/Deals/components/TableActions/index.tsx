import { TableAction } from "@/commons/components/general/TableAction";
import { UploadDealUWModal } from "@/modules/acquisitions/components/data-entry/UploadDealUWModal";
import { Deal } from "@/modules/acquisitions/typings/deals";
import { phasesToUploadUW } from "@/modules/acquisitions/utils";
import {
  ArrowUpTrayIcon,
  EyeIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { FC, memo, useMemo, useState } from "react";

interface TableActionsProps {
  dealId: Deal["id"];
  dealType: Deal["type"];
  phase: Deal["phase"]["value"];
  has_post_screening_data: Deal["has_post_screening_data"];
}
const BaseTableActions: FC<TableActionsProps> = ({
  phase,
  dealId,
  dealType,
  has_post_screening_data,
}) => {
  const router = useRouter();
  const [uploadUWModal, setUploadUWModal] = useState(false);

  const canUploadUW = useMemo(() => {
    return has_post_screening_data && phasesToUploadUW.includes(phase);
  }, [has_post_screening_data, phase]);

  return (
    <div className="flex">
      <TableAction
        tooltip="See deal information"
        icon={<EyeIcon />}
        onClick={() => {
          router.push(`/acquisitions/deals/deal-summary/?dealId=${dealId}`);
        }}
      />
      <TableAction
        tooltip="Edit deal"
        icon={<PencilIcon />}
        onClick={() => {
          router.push(`/acquisitions/deals/edit/?dealId=${dealId}`);
        }}
      />
      {canUploadUW ? (
        <>
          <TableAction
            tooltip="Upload UW model"
            icon={<ArrowUpTrayIcon />}
            onClick={() => setUploadUWModal(true)}
          />
          <UploadDealUWModal
            modal={uploadUWModal}
            dealId={dealId}
            dealType={dealType}
            onAction={() => setUploadUWModal(false)}
          />
        </>
      ) : null}
    </div>
  );
};

export const TableActions = memo(BaseTableActions, (prev, next) => {
  return (
    prev.dealId === next.dealId &&
    prev.has_post_screening_data === next.has_post_screening_data &&
    prev.phase === next.phase &&
    prev.dealType?.value === next.dealType?.value
  );
});
