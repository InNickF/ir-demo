import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { useIdFromQueryParams } from "@/commons/hooks/useIdFromQueryParams";
import { usePagination } from "@/commons/hooks/usePagination";
import { defaultPaginatedData } from "@/commons/utils";
import {
  useMutateDeleteFundTimeline,
  useMutatePatchFundTimeline,
  useMutatePostFundTimeline,
} from "@/modules/assets/services/mutations/funds";
import { useGetFundTimeline } from "@/modules/assets/services/queries/funds";
import { FundTimeline } from "@/modules/assets/typings/funds";
import { getFundsURL } from "@/modules/assets/utils/redirects/funds-redirects";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { Button } from "in-ui-react";
import { FC, useState } from "react";
import { FundCriticalDatesModal } from "./components/FundCriticalDatesModal";
import { CreateFundCriticalDatesForm } from "./components/FundCriticalDatesModal/forms/CreateFundCriticalDatesForm";
import { DeleteFundCriticalDatesForm } from "./components/FundCriticalDatesModal/forms/DeleteFundCriticalDatesForm";
import { EditFundCriticalDatesForm } from "./components/FundCriticalDatesModal/forms/EditFundCriticalDatesForm";
import { GenericFundCriticalDatesUseMutation } from "./components/FundCriticalDatesModal/types";
import { FundCriticalDatesTable } from "./components/FundCriticalDatesTable";
import { FundCriticalDatesTableActions } from "./components/FundCriticalDatesTableActions";
import { useFundCriticalDatesModal } from "./hooks/useFundCriticalDatesModal";
import "./styles.css";

interface EditFundCriticalDatesProps {
  className?: string;
}

export const EditFundCriticalDates: FC<EditFundCriticalDatesProps> = ({
  className,
}) => {
  const fundId = useIdFromQueryParams({
    model: "Fund",
    redirectOnNotFound: true,
    redirectURL: getFundsURL({
      id: null,
    }).rootURL,
  });

  const prefix = "asset-edit-fund-critical-dates";

  const { page, setPage } = usePagination();
  const [ordering, setOrdering] = useState("notable_date");

  const getClasses = () => {
    const classes = [];
    className && classes.push(className);
    return classes.join(" ");
  };

  const { state, createFile, editFile, deleteFile, resetModalState } =
    useFundCriticalDatesModal();

  const modalActions = {
    onCancel: () => resetModalState(),
    onAction: () => resetModalState(),
  };

  const {
    data = defaultPaginatedData,
    isLoading,
    isRefetching,
  } = useGetFundTimeline({
    filters: {
      fund_name: fundId,
      ordering: ordering,
      page: String(page),
    },
  });

  const onCreate = () =>
    createFile({
      Form: CreateFundCriticalDatesForm,
      useMutation:
        useMutatePostFundTimeline as GenericFundCriticalDatesUseMutation,
      ...modalActions,
    });

  const onEdit = (item: FundTimeline) => {
    editFile({
      item,
      Form: EditFundCriticalDatesForm,
      useMutation:
        useMutatePatchFundTimeline as GenericFundCriticalDatesUseMutation,

      ...modalActions,
    });
  };

  const onDelete = (item: FundTimeline) => {
    deleteFile({
      item,
      Form: DeleteFundCriticalDatesForm,
      useMutation:
        useMutateDeleteFundTimeline as GenericFundCriticalDatesUseMutation,
      ...modalActions,
    });
  };

  return (
    <section className={getClasses()}>
      <div className={`${prefix}-actions-section`}>
        <Button onClick={onCreate}>Add New Critical Date</Button>
      </div>
      <CardWithHeader
        title="Fund Critical Dates"
        icon={<CalendarIcon />}
        bodyPadding={false}
        isLoading={isLoading}
        isRefetching={isRefetching}
        className={`${prefix}-table-card`}
        loaderKind="chart"
      >
        <FundCriticalDatesTable
          count={data.count}
          totalPages={data.total_pages}
          isLoading={isLoading}
          data={data?.results}
          page={page}
          setPage={setPage}
          ordering={ordering}
          tableActions={(item: FundTimeline) => (
            <FundCriticalDatesTableActions
              onEdit={() => onEdit(item)}
              onDelete={() => onDelete(item)}
            />
          )}
          setOrdering={setOrdering}
        />
      </CardWithHeader>
      <FundCriticalDatesModal {...state} onCancel={() => resetModalState()} />
    </section>
  );
};
