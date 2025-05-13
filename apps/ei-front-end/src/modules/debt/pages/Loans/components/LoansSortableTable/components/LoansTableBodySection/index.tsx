import { DebtLoan } from "@/modules/debt/typings/loans";
import { useDroppable } from "@dnd-kit/core";
import { Table } from "in-ui-react";
import { FC, useMemo } from "react";
import { debtLoansDroppableBodyIdPrefix } from "../../utils";
import { LoansTableBodyItems } from "./components/LoansTableBodyItems";

interface LoansTableBodySectionProps {
  data?: DebtLoan[];
  isSortingDisabled?: boolean;
}

export const LoansTableBodySection: FC<LoansTableBodySectionProps> = ({
  data = [],
  isSortingDisabled = false,
}) => {
  const { setNodeRef } = useDroppable({
    id: `${debtLoansDroppableBodyIdPrefix}`,
  });

  const LoansTableBodyItemsMemo = useMemo(() => {
    return (
      <LoansTableBodyItems data={data} isSortingDisabled={isSortingDisabled} />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <Table.Body ref={setNodeRef}>{LoansTableBodyItemsMemo}</Table.Body>;
};
