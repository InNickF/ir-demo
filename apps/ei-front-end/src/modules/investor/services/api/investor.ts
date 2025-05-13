import { z } from "zod";
import { privateAxios } from "@/commons/services/clients";
import {
  InvestmentSchema,
  InvestorReportsSchema,
  InvestorSchema,
} from "../../schemas/investor";
import { GenericLabelValueObject } from "@/commons/typings";
import { InvestorReportParams } from "../../typings/investor";

export const getAllInvestors = async () => {
  const response = await privateAxios.get(
    "reports/historical_balance_rows/investors/?investor_code_group=900"
  );
  return z.array(InvestorSchema).parse(response.data);
};

export const getInvestmentsByInvestors = async (
  investors: GenericLabelValueObject[]
) => {
  const investor_codes = investors.map((investor) => investor.value).join(",");
  const response = await privateAxios.get(
    `reports/historical_balance_rows/investments/?investor_codes=${investor_codes}`
  );
  return z.array(InvestmentSchema).parse(response.data);
};

export const getInvestorReport = async (data: InvestorReportParams) => {
  const investors = data?.investor
    ?.map((investor) => investor?.value.trim())
    .join(",");
  const investments = data?.investment
    ?.map((investment) => investment?.value.trim())
    .join(",");
  const date = new Date(data?.asOfMonth);
  const month =
    date.getMonth() < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
  const asOfMonth = `${month}/${date.getFullYear()}`;
  const multipleFiles = data?.multipleFiles === "yes" ? "y" : "n";

  const response = await privateAxios.post(
    `reports/reports/?report_type=investor_report&as_of_month=${asOfMonth}&investment_codes=${investments}&investor_codes=${investors}&split-by-investor=${multipleFiles}`
  );
  return z.array(InvestorReportsSchema).parse(response.data);
};
