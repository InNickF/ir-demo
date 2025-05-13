import { privateAxios } from "@/commons/services/clients";
import {
  UploadDataFromExcelPayload,
  UploadLoanAbstractPayload,
} from "../../typings/tools";

export const postExcelData = async (data: UploadDataFromExcelPayload) => {
  const isRentRoll = data?.fileType === "RentRoll";
  const formData = new FormData();
  formData.append("file", data?.file);
  if (!isRentRoll) {
    formData.append("quarter", data?.quarter?.value);
    formData.append("fund", data?.fund?.value);
    formData.append("year", String(data?.year?.value));
  }
  const url = isRentRoll
    ? "/tools/upload/tenants/"
    : "/tools/upload/cashflow/argus/";
  const response = await privateAxios.post(url, formData);
  return response.data;
};

export const postLoanAbstractData = async (data: UploadLoanAbstractPayload) => {
  const formData = new FormData();
  formData.append("file", data?.file);
  formData.append("scode", data?.scode);

  const response = await privateAxios.post(
    "/tools/upload/loan-abstract/",
    formData
  );
  return response.data;
};
