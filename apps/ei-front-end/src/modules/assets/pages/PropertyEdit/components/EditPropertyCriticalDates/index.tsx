import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { usePagination } from "@/commons/hooks/usePagination";
import { defaultPaginatedData } from "@/commons/utils";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";
import { PropertyTimelineTable } from "./components/PropertyTimelineTable";
import { PropertyTimelineTableActions } from "./components/PropertyTimelineTableActions";
import { Button } from "in-ui-react";
import { EditPropertyTimelineForm } from "./components/PropertyTimelineModal/forms/EditPropertyTimelineForm";
import { usePropertyIdFromQueryParams } from "@/modules/assets/hooks/usePropertyIdFromQueryParams";
import {
  useMutateDeletePropertyTimeline,
  useMutatePatchPropertyTimeline,
  useMutatePostPropertyTimeline,
} from "@/modules/assets/services/mutations/properties";
import { useGetPropertyTimeline } from "@/modules/assets/services/queries/properties";
import { usePropertyTimelineModal } from "./hooks/usePropertyTimelineModal";
import { DeletePropertyTimelineForm } from "./components/PropertyTimelineModal/forms/DeletePropertyTimelineForm";
import { CreatePropertyTimelineForm } from "./components/PropertyTimelineModal/forms/CreatePropertyTimelineForm";
import { GenericPropertyTimelineUseMutation } from "./components/PropertyTimelineModal/types";
import { PropertyTimeline } from "@/modules/assets/typings/property";
import { PropertyTimelineModal } from "./components/PropertyTimelineModal";
import "./styles.css";

interface EditPropertyCriticalDatesProps {
  className?: string;
}

export const EditPropertyCriticalDates: FC<EditPropertyCriticalDatesProps> = ({
  className,
}) => {
  const prefix = "asset-edit-property-timeline";
  const propertyId = usePropertyIdFromQueryParams();

  const { page, setPage } = usePagination();
  const [ordering, setOrdering] = useState("notable_date");

  const getClasses = () => {
    const classes = [];
    className && classes.push(className);
    return classes.join(" ");
  };

  const {
    data = defaultPaginatedData,
    isLoading,
    isRefetching,
  } = useGetPropertyTimeline({
    property_under_management_code: propertyId,
    ordering: ordering,
    page: String(page),
  });

  const { state, createFile, editFile, deleteFile, resetModalState } =
    usePropertyTimelineModal();

  const modalActions = {
    onCancel: () => resetModalState(),
    onAction: () => resetModalState(),
  };

  const onCreate = () =>
    createFile({
      Form: CreatePropertyTimelineForm,
      useMutation:
        useMutatePostPropertyTimeline as GenericPropertyTimelineUseMutation,
      ...modalActions,
    });

  const onEdit = (item: PropertyTimeline) => {
    editFile({
      item,
      Form: EditPropertyTimelineForm,
      useMutation:
        useMutatePatchPropertyTimeline as GenericPropertyTimelineUseMutation,

      ...modalActions,
    });
  };

  const onDelete = (item: PropertyTimeline) => {
    deleteFile({
      item,
      Form: DeletePropertyTimelineForm,
      useMutation:
        useMutateDeletePropertyTimeline as GenericPropertyTimelineUseMutation,
      ...modalActions,
    });
  };

  return (
    <section className={getClasses()}>
      <div className={`${prefix}-actions-section`}>
        <Button onClick={onCreate}>Add New Critical Date</Button>
      </div>
      <CardWithHeader
        title="Property Critical Dates"
        icon={<CalendarIcon />}
        bodyPadding={false}
        isLoading={isLoading}
        isRefetching={isRefetching}
        className={`${prefix}-table-card`}
        loaderKind="chart"
      >
        <PropertyTimelineTable
          count={data.count}
          totalPages={data.total_pages}
          isLoading={isLoading}
          data={data.results}
          page={page}
          setPage={setPage}
          ordering={ordering}
          tableActions={(item: PropertyTimeline) => (
            <PropertyTimelineTableActions
              onEdit={() => onEdit(item)}
              onDelete={() => onDelete(item)}
            />
          )}
          setOrdering={setOrdering}
        />
      </CardWithHeader>
      <PropertyTimelineModal {...state} onCancel={() => resetModalState()} />
    </section>
  );
};
