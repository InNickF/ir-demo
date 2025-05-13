import { LabelValue } from "@/commons/components/data-display/LabelValue";
import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { CompstackComp } from "@/modules/acquisitions/typings/market-analytics";
import { allCompstackCompValueFormatters } from "@/modules/acquisitions/utils/formatters/comps-value-formatters";
import {
  getCompKeysOrder,
  getCompstackCompAddress,
  getCompstackCompKeysToIgnore,
  getFullGridSizeCompstackCompKeys,
} from "@/modules/acquisitions/utils/compstack-comps";
import { Button, Modal } from "in-ui-react";
import { FC } from "react";
import "./styles.css";

interface MarketAnalyticsCompsModalProps {
  comp: CompstackComp;
  onClose: (comp: CompstackComp) => void;
}

export const MarketAnalyticsCompsModal: FC<MarketAnalyticsCompsModalProps> = ({
  comp,
  onClose,
}) => {
  const formatter = comp?.type
    ? allCompstackCompValueFormatters[comp?.type]
    : {};
  const keysToIgnore = getCompstackCompKeysToIgnore({
    compType: comp?.type,
    ignoreAddressKeys: true,
  });
  const fullGridSizeKeys = getFullGridSizeCompstackCompKeys({
    compType: comp?.type,
  });
  const orderedKeys = getCompKeysOrder(comp?.type);
  const fullSizeGridClasses = "sm:col-span-2 md:col-span-3";

  return (
    <Modal
      disclosure={<span className="hidden"></span>}
      modal={!!comp}
      visible={!!comp}
      size="big"
    >
      {() => (
        <>
          <Modal.Header
            onClose={() => {
              onClose(comp);
            }}
          >
            <span className="capitalize">{comp?.type} Comp Details</span>
          </Modal.Header>
          <Modal.Body>
            {comp ? (
              <div className="acq-market-analytics-comps-modal-grid">
                <LabelValue
                  label="Address"
                  value={getCompstackCompAddress(comp)}
                  className={fullSizeGridClasses}
                />
                {orderedKeys.map((key) => {
                  if (keysToIgnore.includes(key)) return null;
                  return (
                    <LabelValue
                      key={key}
                      label={humanizeSnakeCase(key)}
                      className={
                        fullGridSizeKeys.includes(key)
                          ? fullSizeGridClasses
                          : undefined
                      }
                      value={
                        formatter && formatter[key]
                          ? formatter[key](comp?.[key])
                          : genericGetValue(comp?.[key])
                      }
                    />
                  );
                })}
              </div>
            ) : null}
          </Modal.Body>
          <Button
            block
            kind="ghost"
            className="border-t border-t-ghost-2"
            onClick={() => {
              onClose(comp);
            }}
          >
            Close
          </Button>
        </>
      )}
    </Modal>
  );
};
