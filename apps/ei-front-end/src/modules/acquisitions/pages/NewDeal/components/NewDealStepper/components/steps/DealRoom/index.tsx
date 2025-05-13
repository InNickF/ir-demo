import { StepFooter } from "@/acquisitions/pages/NewDeal/components/NewDealStepper/components/StepFooter";
import { LocalDealRoomItem } from "@/acquisitions/typings/deals";
import { useDealRoomLabels } from "@/acquisitions/services/queries/filters";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { Button, Stepper } from "in-ui-react";
import { FC, useState } from "react";
import { GenericStepContentActions } from "../../../types";
import { LocalDealRoomCard } from "./components/LocalDealRoomCard";
import { LocalDealRoomModal } from "./components/LocalDealRoomModal";
import { useLocalDealRoomModal } from "./components/LocalDealRoomModal/hooks/useLocalDealRoomModal";
import { LocalDealRoomTable } from "./components/LocalDealRoomTable";
import { LocalDealRoomTableActions } from "./components/LocalDealRoomTableActions";
import { CreateLocalFileForm } from "./components/LocalDealRoomModal/forms/CreateLocalFile";

export const DealRoomStep: FC<
  GenericStepContentActions<LocalDealRoomItem[]>
> = ({ current, onBack, onContinue }) => {
  const title = "Deal Room";
  const icon = <CalendarIcon />;

  const [localDealRoomItems, setLocalDealRoomItems] = useState<
    LocalDealRoomItem[]
  >([]);

  const { data: labelsFilter } = useDealRoomLabels();
  const { state, createFile, editFile, resetModalState } =
    useLocalDealRoomModal();

  const onCreate = () =>
    createFile({
      header: "Add New File",
      actionText: "Create new File",
      Form: CreateLocalFileForm,
      labels: labelsFilter,
      onCancel: () => resetModalState(),
      onAction: (item) => {
        setLocalDealRoomItems([...localDealRoomItems, item]);
        resetModalState();
      },
    });

  const onEdit = (item: LocalDealRoomItem) => {
    editFile({
      header: "Edit File",
      actionText: "Edit File",
      Form: CreateLocalFileForm,
      item: item,
      labels: labelsFilter,
      onCancel: () => resetModalState(),
      onAction: (item) => {
        setLocalDealRoomItems(
          localDealRoomItems.map((dealRoomItem) => {
            return dealRoomItem.tempId === item.tempId ? item : dealRoomItem;
          })
        );
        resetModalState();
      },
    });
  };

  return (
    <Stepper.StepContent step={4} current={current}>
      <Button className="mb-6" onClick={onCreate}>
        Add new file
      </Button>
      <LocalDealRoomCard icon={icon} title={title}>
        <LocalDealRoomTable
          data={localDealRoomItems as unknown as LocalDealRoomItem[]}
          tableActions={(item) => (
            <LocalDealRoomTableActions
              onDelete={() => {
                setLocalDealRoomItems(
                  localDealRoomItems.filter(
                    (localDealRoomItem) =>
                      localDealRoomItem.tempId !== item.tempId
                  )
                );
                resetModalState();
              }}
              onEdit={() => onEdit(item)}
            />
          )}
        />
      </LocalDealRoomCard>
      <LocalDealRoomModal {...state} onCancel={() => resetModalState()} />
      <StepFooter
        current={current}
        onBack={onBack}
        onContinue={() => onContinue(localDealRoomItems)}
      />
    </Stepper.StepContent>
  );
};
