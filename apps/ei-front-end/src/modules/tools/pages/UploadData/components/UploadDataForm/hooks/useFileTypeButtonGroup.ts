import { ExcelDataTypes } from "@/modules/tools/typings/tools";
import { EXCEL_DATA_TYPES } from "@/modules/tools/utils";
import { ButtonGroupItem } from "in-ui-react";
import { useState } from "react";

export const useFileTypeFilter = () => {
  const [fileType, setFileType] = useState<ExcelDataTypes>(EXCEL_DATA_TYPES[0]);

  const fileTypeItems: ButtonGroupItem[] = [
    {
      key: "CashFlow",
      text: "Cash Flow",
      onClick: (key) => setFileType(key as ExcelDataTypes),
    },
    {
      key: "RentRoll",
      text: "Rent Roll",
      onClick: (key) => setFileType(key as ExcelDataTypes),
    },
  ];

  return {
    fileType,
    fileTypeItems,
  };
};
