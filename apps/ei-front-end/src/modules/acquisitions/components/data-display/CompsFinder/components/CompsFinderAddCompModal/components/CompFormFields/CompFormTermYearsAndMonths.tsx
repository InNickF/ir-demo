import { GenericFormRenderFunctionProps } from "@/commons/typings/forms";
import {
  CompstackLeaseCompPayload,
  CompstackSaleAndLandCompsCommonPayload,
} from "@/modules/acquisitions/typings/market-analytics";
import { Label } from "in-ui-react";
import { FC } from "react";
import { compstackCompInputPrefix } from "../../utils/form-fields";

interface CompFormTermYearsAndMonthsProps
  extends GenericFormRenderFunctionProps<
    CompstackSaleAndLandCompsCommonPayload | CompstackLeaseCompPayload
  > {
  yearKey:
    | keyof CompstackSaleAndLandCompsCommonPayload
    | keyof CompstackLeaseCompPayload;
  monthKey:
    | keyof CompstackSaleAndLandCompsCommonPayload
    | keyof CompstackLeaseCompPayload;
  label: string;
}

export const CompFormTermYearsAndMonths: FC<
  CompFormTermYearsAndMonthsProps
> = ({ state: { watch }, yearKey, monthKey, label }) => {
  const years = Number(watch(yearKey)) || 0;
  const yearSuffix = years > 1 ? "s" : "";

  const months = Number(watch(monthKey)) || 0;
  const monthSuffix = months > 1 ? "s" : "";

  return (
    <div className={`${compstackCompInputPrefix}__input`}>
      <Label
        className="mb-2"
        tooltip={
          <p>This is how the {label} will look after create the comp.</p>
        }
      >
        {label}
      </Label>
      <p>
        {years} year{yearSuffix}, {months} month
        {monthSuffix}.
      </p>
    </div>
  );
};
