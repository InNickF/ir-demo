import { AcqHead } from "@/acquisitions/components/general/AcqHead";
import { useDealIdFromQueryParams } from "@/acquisitions/hooks/useDealIdFromQueryParams";
import { DealLayout } from "@/acquisitions/layouts/DealLayout";
import { InAcqPermissionsLayout } from "@/acquisitions/layouts/InAcqPermissionsLayout";
import {
  useMutateDealRoomItem,
  useMutateDeleteDealRoomItem,
  useMutateUpdateDealRoomItem,
} from "@/acquisitions/services/mutations/deals";
import { useDeal, useDealRoom } from "@/acquisitions/services/queries/deals";
import { useDealRoomLabels } from "@/acquisitions/services/queries/filters";
import { DealRoomItem } from "@/acquisitions/typings/deals";
import { DEAL_FILE_TYPES } from "@/acquisitions/utils";
import { usePagination } from "@/commons/hooks/usePagination";
import { GenericFilterPayload, NextPageWithLayout } from "@/commons/typings";
import { defaultPaginatedData } from "@/commons/utils";
import { ArrowDownTrayIcon, CalendarIcon } from "@heroicons/react/24/outline";
import {
  Button,
  FilterType,
  Filters,
  FiltersPayloadType,
  SelectFilterType,
  TextFilterType,
  Title,
  useFilters,
} from "in-ui-react";
import { useRouter } from "next/router";
import { FC, ReactElement, useMemo, useState } from "react";
import { DealRoomCard } from "./components/DealRoomCard";
import { DealRoomModal } from "./components/DealRoomModal";
import { CreateFileForm } from "./components/DealRoomModal/forms/CreateFile";
import { DeleteFileForm } from "./components/DealRoomModal/forms/DeleteFile";
import { EditFileForm } from "./components/DealRoomModal/forms/EditFile";
import { useDealRoomModal } from "./components/DealRoomModal/hooks/useDealRoomModal";
import { GenericDealRoomUseMutation } from "./components/DealRoomModal/types";
import { DealRoomTable } from "./components/DealRoomTable";
import { DealRoomTableActions } from "./components/DealRoomTableActions";
import "./styles.css";
interface DealRoomTableWithDataProps {
  filters: GenericFilterPayload;
  onEdit: (item: DealRoomItem) => void;
  onDelete: (item: DealRoomItem) => void;
}

const DealRoomTableWithData: FC<DealRoomTableWithDataProps> = ({
  filters,
  onEdit,
  onDelete,
}) => {
  const dealId = useDealIdFromQueryParams();
  const { page, setPage } = usePagination();
  const [ordering, setOrdering] = useState("");
  const {
    data = defaultPaginatedData,
    isLoading,
    isRefetching,
  } = useDealRoom({
    deal: dealId,
    page: page.toString(),
    ordering: ordering,
    ...filters,
  });
  const title = "Deal Room";
  const icon = <CalendarIcon />;

  return (
    <DealRoomCard
      icon={icon}
      title={title}
      isLoading={isLoading}
      isRefetching={isRefetching}
    >
      <DealRoomTable
        count={data.count}
        totalPages={data.total_pages}
        isLoading={isLoading}
        data={data.results}
        page={page}
        setPage={setPage}
        ordering={ordering}
        tableActions={(item: DealRoomItem) => (
          <DealRoomTableActions
            onEdit={() => onEdit(item)}
            onDelete={() => onDelete(item)}
          />
        )}
        setOrdering={setOrdering}
      />
    </DealRoomCard>
  );
};

const DealRoom: NextPageWithLayout = () => {
  const { filteredOptions, onApply } = useFilters();
  const { data: dealRoomFilters = [], isLoading } = useDealRoomLabels();

  const memoFilters: FilterType[] = useMemo(() => {
    const apiFilters =
      dealRoomFilters?.map(
        (filter) =>
          ({
            ...filter,
            type: "simple-select",
          } as SelectFilterType)
      ) || [];

    return [
      { key: "search", name: "Search", type: "text" } as TextFilterType,
      ...apiFilters,
    ];
  }, [dealRoomFilters]);

  const { state, createFile, editFile, deleteFile, resetModalState } =
    useDealRoomModal();

  const router = useRouter();
  const { dealId } = router.query;
  const { data: deal } = useDeal({
    dealId: dealId as string,
    onError(error) {
      if (error?.response?.status === 404) {
        router.push("/acquisitions/deals");
      }
    },
  });

  const deal_attachments = deal?.deal_attachments || [];

  const uwFile =
    deal_attachments.length &&
    deal_attachments.find((item) => item.type === DEAL_FILE_TYPES.UW_MODEL);

  const wireFile =
    deal_attachments.length &&
    deal_attachments.find(
      (item) => item.type === DEAL_FILE_TYPES.WIRE_INSTRUCTION
    );

  const modalActions = {
    onCancel: () => resetModalState(),
    onAction: () => resetModalState(),
  };

  const onCreate = () =>
    createFile({
      header: "Add New File",
      actionText: "Create new File",
      Form: CreateFileForm,
      labels: dealRoomFilters,
      useMutation: useMutateDealRoomItem as GenericDealRoomUseMutation,
      ...modalActions,
    });

  const onEdit = (item: DealRoomItem) => {
    editFile({
      header: `Edit File: ${item.name}`,
      item,
      Form: EditFileForm,
      labels: dealRoomFilters,
      useMutation: useMutateUpdateDealRoomItem as GenericDealRoomUseMutation,
      actionText: "Save changes",
      ...modalActions,
    });
  };

  const onDelete = (item: DealRoomItem) => {
    deleteFile({
      header: `Delete File: ${item.name}`,
      item,
      Form: DeleteFileForm,
      labels: dealRoomFilters,
      useMutation: useMutateDeleteDealRoomItem as GenericDealRoomUseMutation,
      actionText: "Delete",
      ...modalActions,
    });
  };

  return (
    <>
      <Title kind="h2" className="mb-6">
        Deal Room
      </Title>
      <section className="acq-deal-room-filters">
        <Filters
          filters={memoFilters ?? []}
          filteredOptions={filteredOptions as FiltersPayloadType}
          onApply={onApply}
          isLoading={isLoading}
        />
        <Button onClick={onCreate}>Add new file</Button>
        <DealRoomModal {...state} onCancel={() => resetModalState()} />
      </section>

      {uwFile && uwFile?.file ? (
        <Button
          className="mr-4 mb-4"
          as="a"
          href={uwFile?.file}
          target="_blank"
          kind="outline"
          icon={<ArrowDownTrayIcon />}
        >
          Download UW file
        </Button>
      ) : null}

      {wireFile && wireFile?.file ? (
        <Button
          className="mr-4 mb-4"
          as="a"
          href={wireFile?.file}
          target="_blank"
          kind="outline"
          icon={<ArrowDownTrayIcon />}
        >
          Download wire instructions file
        </Button>
      ) : null}

      <DealRoomTableWithData
        filters={{}}
        onEdit={(item) => onEdit(item)}
        onDelete={(item) => onDelete(item)}
      />
    </>
  );
};

DealRoom.getLayout = (page: ReactElement) => {
  return (
    <InAcqPermissionsLayout>
      <DealLayout>
        <AcqHead title="Deal room" />
        {page}
      </DealLayout>
    </InAcqPermissionsLayout>
  );
};

export default DealRoom;
