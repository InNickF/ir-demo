import { GenericFilterPayload } from "@/commons/typings";
import * as XLSX from "xlsx";

interface downloadExcelFileFromAPIResponseProps {
  data: GenericFilterPayload[];
  fileName: string;
}

export const downloadExcelFileFromAPIResponse = ({
  data,
  fileName,
}: downloadExcelFileFromAPIResponseProps) => {
  const finalFileName = fileName.toLocaleLowerCase().includes(".xlsx")
    ? fileName
    : `${fileName}.xlsx`;

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  // create file link in browser's memory
  const href = URL.createObjectURL(blob);

  // create "a" HTML element with href to file & click
  const link = document.createElement("a");
  link.href = href;
  link.setAttribute("download", finalFileName); //or any other extension
  document.body.appendChild(link);
  link.click();

  // clean up "a" element & remove ObjectURL
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};
