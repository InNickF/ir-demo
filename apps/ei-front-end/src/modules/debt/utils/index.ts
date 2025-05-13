import { GenericLabelValueObject } from "@/commons/typings";

interface GetLoanURLParams {
  loanId: string;
}

export const getLoanURL = ({ loanId }: GetLoanURLParams): string => {
  if (!loanId) return "/debt/loans/";
  return `/debt/loans/loan-summary/?loanId=${loanId}`;
};

export const LOAN_FILE_TYPES = {
  LOAN_ABSTRACT_EXCEL_FILE: "LOAN_ABSTRACT_EXCEL_FILE",
  LOAN_CONTRACT_FILE: "LOAN_ABSTRACT_CONTRACT_FILE",
} as const;

export const legacyLoanAbstractFileFormatter = ({
  file,
  property,
}: {
  file: File;
  property?: string;
}) => {
  if (file.name.split(".").length > 2) {
    throw new Error("File name cannot contain more than one dot.");
  }

  const formattedAbstractFileName = file.name
    .split(".")[0]
    .replace(/_/g, "")
    .replace(/ /g, "-");

  const fileExtension = file.name.split(".")[1];

  const fileName = property
    ? `${property}__${formattedAbstractFileName}_${Date.now()}.${fileExtension}`
    : `${formattedAbstractFileName}_${Date.now()}.${fileExtension}`;

  return {
    file: new File([file], fileName, {
      type: file.type,
    }),
    fileName,
  } as {
    file: File;
    fileName: string;
  };
};

export const loanAbstractFileFormatter = ({
  file,
  properties,
  loan_name,
}: {
  file: File;
  properties: GenericLabelValueObject[];
  loan_name: GenericLabelValueObject;
}): { file: File; fileName: string } => {
  const separator = "__";
  const property = properties.map((p) => p.value).join(".");
  const formattedAbstractFileName = loan_name?.label
    .replace(/_/g, "")
    .replace(".", "-");

  const fileExtension = file.name.split(".")[1];

  const fileName = `${formattedAbstractFileName}${separator}${property}${separator}${Date.now()}.${fileExtension}`;

  return {
    file: new File([file], fileName, {
      type: file.type,
    }),
    fileName,
  };
};
