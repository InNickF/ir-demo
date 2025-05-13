import { usePropertyRuleDetail } from "@/modules/tools/services/queries/property-level-validations";
import { PropertyRule } from "@/modules/tools/typings/property-level-validations";
import { Loader, Modal } from "in-ui-react";
import { useRouter } from "next/router";
import { FC, memo, useMemo, useState } from "react";
import { PropertyExecutedRuleDetailModalTable } from "./components/PropertyExecutedRuleDetailModalTable";
import { PropertyExecutedRuleDetailModalGrid } from "./components/PropertyExecutedRuleDetailModalGrid";
import "./styles.css";
import { PropertyExecutedRuleDetailModalExportButton } from "./components/PropertyExecutedRuleDetailModalExportButton";
import {
  legacyCreateSorterMap,
  sortItems,
} from "@/commons/model-in/formatters/sorters";
interface PropertyExecutedRuleDetailModalProps {
  className?: string;
  rule: PropertyRule;
}

export const PropertyExecutedRuleDetailModal: FC<PropertyExecutedRuleDetailModalProps> =
  memo(({ className, rule }) => {
    const [ordering, setOrdering] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const router = useRouter();
    const { property } = router.query;

    const prefix = "tools-property-executed-rule-detail-modal";

    const getClasses = () => {
      const classes = [prefix];
      className && classes.push(className);
      return classes.join(" ");
    };

    const { data: ruleDetail, isLoading } = usePropertyRuleDetail({
      filters: {
        property_code: property as string,
        rule_code: rule?.check_code,
        detail_type: rule?.detail_type,
        month: "3",
        year: "2024",
      },
      enabled: modalIsOpen,
    });

    const hasRuleDetail = rule?.detail_type !== null && !rule?.check_pass;

    const hasMoreThanOneDetail = ruleDetail?.length > 1;

    const sortedRuleDetails = useMemo(() => {
      return sortItems({
        items: ruleDetail,
        sortBy: ordering,
        sorter: legacyCreateSorterMap({ data: ruleDetail }),
      });
    }, [ruleDetail, ordering]);

    const ModalBodyDetail = () => {
      return (
        <>
          <div className="flex justify-end mb-2">
            <PropertyExecutedRuleDetailModalExportButton
              ruleDetails={ruleDetail}
              propertyCode={property as string}
            />
          </div>
          {hasMoreThanOneDetail ? (
            <PropertyExecutedRuleDetailModalTable
              ruleDetails={sortedRuleDetails}
              ordering={ordering}
              // onChangeOrdering={setOrdering}
            />
          ) : (
            <PropertyExecutedRuleDetailModalGrid ruleDetails={ruleDetail} />
          )}
        </>
      );
    };

    return (
      <Modal
        size="big"
        className={getClasses()}
        disclosure={
          hasRuleDetail ? (
            <a
              onClick={() => {
                setModalIsOpen(true);
              }}
            >
              See Details
            </a>
          ) : (
            <span></span>
          )
        }
        // workaround to prevent focus trap
        options={{ modal: false, animated: true }}
      >
        {(dialog) => (
          <>
            <Modal.Header
              onClose={() => {
                dialog.hide();
                setModalIsOpen(false);
              }}
            >
              Rule detail: {rule?.check_name}
            </Modal.Header>
            <Modal.Body>
              {isLoading ? (
                <div className="flex content-center justify-center w-full p-3">
                  <Loader size="big" />
                </div>
              ) : ruleDetail?.length > 0 ? (
                <ModalBodyDetail />
              ) : null}
            </Modal.Body>
          </>
        )}
      </Modal>
    );
  });

PropertyExecutedRuleDetailModal.displayName = "PropertyExecutedRuleDetailModal";
