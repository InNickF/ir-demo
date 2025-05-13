import { useMutateDealPipelinePhase } from "@/acquisitions/services/mutations/deals";
import { DealPhase, DealPipelineSummary } from "@/acquisitions/typings/deals";
import { GenericFilterPayload } from "@/commons/typings";
import { getGenericValueOrString } from "@/commons/utils";
import { DeadDealFormModal } from "@/modules/acquisitions/components/data-entry/DeadDealFormModal";
import { useDeadDealFormState } from "@/modules/acquisitions/components/data-entry/DeadDealFormModal/hooks/useDeadDealFormState";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { usePipelineContainerHeight } from "../../hooks/usePipelineContainerHeight";
import { pipelineStages, possibleStages } from "../../utils";
import { ColumnFilters, PipelineColumn } from "../PipelineColumn";
import "./styles.css";

interface DealsTableProps {
  filters?: GenericFilterPayload;
}

export const PipelineSCRUM: FC<DealsTableProps> = ({ filters }) => {
  const [possibleDrops, setPossibleDrops] = useState<DealPhase[]>([]);
  const {
    showDeadModal,
    deadModalFormProps,
    showDeadDealFormModal,
    hideDeadDealFormModal,
  } = useDeadDealFormState();

  const cleanDeadFormState = () => {
    hideDeadDealFormModal({
      callback: () => {
        setPossibleDrops([]);
      },
    });
  };

  const router = useRouter();
  const mutation = useMutateDealPipelinePhase();
  const pipelineHeight = usePipelineContainerHeight();
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 200,
      tolerance: 40,
    },
  });
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 200,
      tolerance: 40,
    },
  });
  const sensors = useSensors(touchSensor, mouseSensor);

  const defaultAnnouncements = {
    onDragStart(event) {
      const draggedDeal = event.active.data.current.deal as DealPipelineSummary;
      const draggedDealPhase = getGenericValueOrString(draggedDeal?.phase);

      const possibleDrops = possibleStages(draggedDealPhase);
      setPossibleDrops(possibleDrops);
    },
    onDragEnd(event) {
      const draggedDeal = event.active.data.current.deal as DealPipelineSummary;
      const draggedDealPhase = getGenericValueOrString(draggedDeal.phase);

      const filters = event.active.data.current.filters as ColumnFilters;
      const droppedOn = event.over?.id as DealPhase;
      if (!droppedOn || !draggedDeal) {
        setPossibleDrops([]);
        return;
      }

      const possibleDrops = possibleStages(draggedDealPhase);
      const canBeDropped = possibleDrops.includes(droppedOn);

      if (!canBeDropped || droppedOn === draggedDealPhase) {
        setPossibleDrops([]);
        return;
      }
      const dontNeedAllData = ["DEAD"].includes(droppedOn);
      const hasToUploadAllDealInformation =
        !draggedDeal?.has_post_screening_data && !dontNeedAllData;

      if (hasToUploadAllDealInformation) {
        router.push(
          `/acquisitions/deals/change-phase/?dealId=${draggedDeal.id}`
        );
        return;
      }

      if (droppedOn === "DEAD") {
        showDeadDealFormModal({
          dealId: draggedDeal.id,
          dealAddress: draggedDeal?.address,
          defaultValues: {
            sorting: 0,
          },
          onSuccess() {
            cleanDeadFormState();
          },
          onCancel() {
            cleanDeadFormState();
          },
        });
        return;
      }

      mutation.mutate({
        deal: draggedDeal,
        newPhase: droppedOn,
        filters: { ...filters, ordering: "sorting" },
      });

      setPossibleDrops([]);
    },
    onDragCancel() {
      setPossibleDrops([]);
    },
  };

  const getGridClasses = () => {
    const classes = ["acq-fund-pipeline-grid"];
    if (possibleDrops.length) {
      classes.push("acq-fund-pipeline-grid--dragging");
      const possibleDropsClasses = possibleDrops.map(
        (stage) => `acq-fund-pipeline-grid--stage-${stage}--active`
      );
      classes.push(...possibleDropsClasses);
    }
    return classes.join(" ");
  };

  return (
    <>
      <DeadDealFormModal
        show={showDeadModal}
        formProps={deadModalFormProps}
        onCancel={() => {
          cleanDeadFormState();
        }}
        onSuccess={() => {
          cleanDeadFormState();
        }}
      />
      <DndContext {...defaultAnnouncements} sensors={sensors}>
        <section
          className="acq-fund-pipeline"
          style={{
            height: pipelineHeight,
          }}
        >
          <div className={getGridClasses()}>
            {pipelineStages.map((stage) => (
              <PipelineColumn
                key={stage.id}
                id={stage.id}
                name={stage.name}
                filters={filters}
              />
            ))}
          </div>
        </section>
      </DndContext>
    </>
  );
};
