import {
  onlyNumberWithOptionalDecimals,
  onlyNumbers,
} from "@/commons/utils/input-validations";
import { ScreeningDealInformation } from "@/acquisitions/typings/deals";
import { getSiteCoveragePercentage } from "@/modules/acquisitions/utils/business-calculations";
import { ReceiptPercentIcon } from "@heroicons/react/24/outline";
import { Input } from "in-ui-react";
import { GetDealSpecsInformationInputs } from "../types";

export const getDealSpecsInformationInputs: GetDealSpecsInformationInputs<
  ScreeningDealInformation
> = ({ register, getValues, setValue }) => [
  {
    Component: Input,
    key: "year_built",
    props: {
      label: "Year Built",
      type: "number",
      step: "any",
      ...register("year_built", {
        pattern: onlyNumbers(),
      }),
    },
  },
  {
    Component: Input,
    key: "number_of_buildings",
    props: {
      type: "number",
      step: "any",
      label: "Number of Buildings",
      ...register("number_of_buildings", {
        pattern: onlyNumbers(),
      }),
    },
  },
  {
    Component: Input,
    key: "number_of_units",
    props: {
      type: "number",
      step: "any",
      label: "Number of Units",
      ...register("number_of_units", {
        pattern: onlyNumbers(),
      }),
    },
  },
  {
    Component: Input,
    key: "site_area",
    props: {
      label: "Site Area",
      type: "number",
      step: "any",
      ...register("site_area", {
        valueAsNumber: true,
        pattern: onlyNumberWithOptionalDecimals(),
        onChange: (e) => {
          const { value: siteArea } = e.target;
          setValue(
            "site_coverage",
            getSiteCoveragePercentage({ sf: getValues("sf"), siteArea })
          );
        },
      }),
    },
  },
  {
    Component: Input,
    key: "site_coverage",
    props: {
      readOnly: true,
      hint: "This field is auto-calculated",
      tooltip: "This field is auto-calculated based on Site Area and SF",
      leftIcon: <ReceiptPercentIcon />,
      label: "Site Coverage",
      ...register("site_coverage"),
    },
  },
  {
    Component: Input,
    key: "clear_heights",
    props: {
      type: "number",
      step: "any",
      label: "Clear Heights",
      ...register("clear_heights", {
        pattern: onlyNumberWithOptionalDecimals(),
      }),
    },
  },
  {
    Component: Input,
    key: "dock_high_doors",
    props: {
      type: "number",
      step: "any",
      label: "Dock High Doors",
      ...register("dock_high_doors", {
        pattern: onlyNumbers(),
      }),
    },
  },
];

export const dealSpecsInformationKeysOrder = [
  "year_built",
  "number_of_buildings",
  "number_of_units",
  "site_area",
  "site_coverage",
  "clear_heights",
  "dock_high_doors",
];
