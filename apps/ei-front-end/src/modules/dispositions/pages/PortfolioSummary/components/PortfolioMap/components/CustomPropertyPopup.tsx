import { FC } from "react";
import { getGenericValueOrString } from "@/commons/utils";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { LegacyProperty } from "@/modules/assets/typings/property";
import { readableNumber } from "@/commons/model-in/formatters/utils/amount-conversions";

interface CustomPropertyPopupProps {
  property?: LegacyProperty;
}

export const CustomPropertyPopup: FC<CustomPropertyPopupProps> = ({
  property,
}) => {
  return (
    <div className="acq-deals-geography__map-popup">
      <ul>
        <li>
          <strong>Address:</strong> {genericGetValue(property.saddr1)}
        </li>
        <li>
          <strong>Fund:</strong> {genericGetValue(property.fund)}
        </li>
        <li>
          <strong>SF:</strong> {readableNumber(property.dtotalarea)}
        </li>
        <li>
          <strong>Status:</strong>{" "}
          {genericGetValue(getGenericValueOrString(property?.status))}
        </li>
      </ul>
    </div>
  );
};
