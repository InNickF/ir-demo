import { CompstackComp } from "@/acquisitions/typings/market-analytics";
import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import {
  getCompKeysOrder,
  getCompstackCompAddress,
  getCompstackCompKeysToIgnore,
} from "@/modules/acquisitions/utils/compstack-comps";
import { FC } from "react";
import { Popup, PopupProps } from "react-map-gl";
import "./styles.css";
import { allCompstackCompValueFormatters } from "@/modules/acquisitions/utils/formatters/comps-value-formatters";

interface CustomDealPopupProps extends PopupProps {
  comp: CompstackComp | null;
}

export const CustomCompPopup: FC<CustomDealPopupProps> = ({
  comp,
  onClose,
  ...props
}) => {
  const formatter = allCompstackCompValueFormatters[comp?.type];
  const keysToIgnore = getCompstackCompKeysToIgnore({
    compType: comp?.type,
    ignoreAddressKeys: true,
  });
  const orderedKeys = getCompKeysOrder(comp?.type)?.slice(0, 6);

  return comp ? (
    <Popup
      className="acq-custom-comp-map-popup"
      focusAfterOpen={false}
      {...props}
      onClose={onClose}
    >
      <div className="acq-market-rent-comp__map-popup">
        <ul>
          <li>
            <strong>Address:</strong> {getCompstackCompAddress(comp)}
          </li>
          {orderedKeys.map((key) => {
            if (keysToIgnore.includes(key)) return null;
            return (
              <li key={key}>
                <strong>{convertToTitleCase(humanizeSnakeCase(key))}:</strong>{" "}
                {formatter && formatter[key]
                  ? formatter[key](comp?.[key])
                  : genericGetValue(comp?.[key])}
              </li>
            );
          })}
        </ul>
      </div>
    </Popup>
  ) : null;
};
