/* eslint-disable react-hooks/rules-of-hooks */
import {
  CLOSING_PROBABILITY_TAGS,
  DEAL_STATUS_TAGS,
} from "@/acquisitions/utils";
import {
  genericGetValue,
  genericNoDataText,
} from "@/commons/model-in/formatters/utils";
import {
  numberToDollar,
  readableNumber,
} from "@/commons/model-in/formatters/utils/amount-conversions";
import { maxLength } from "@/commons/utils/input-validations";
import { useDealBrokerCompanyChoices } from "@/modules/acquisitions/components/data-entry/DealInformationFormInputs/queries/useDealBrokerCompanyChoices";
import { useDealStatusChoices } from "@/modules/acquisitions/components/data-entry/DealInformationFormInputs/queries/useDealStatusChoices";
import { useDealTypeChoices } from "@/modules/acquisitions/components/data-entry/DealInformationFormInputs/queries/useDealTypeChoices";
import { useFundChoices } from "@/modules/acquisitions/components/data-entry/DealInformationFormInputs/queries/useFundChoices";
import { useOfficerChoices } from "@/modules/acquisitions/components/data-entry/DealInformationFormInputs/queries/useOfficerChoices";
import { useOfficerStatusChoices } from "@/modules/acquisitions/components/data-entry/DealInformationFormInputs/queries/useOfficerStatusChoices";
import { Deal } from "@/modules/acquisitions/typings/deals";
import { createColumnHelper } from "@tanstack/react-table";
import { Link, Table, Tag } from "in-ui-react";
import { default as NextLink } from "next/link";
import { TableActions } from "../components/TableActions";
import { TableCommentsColumn } from "../components/TableCommentsColumn";
import { GenericQuickDealDateForm } from "../components/quick-forms/components/GenericQuickDealDateForm";
import { GenericQuickDealsForm } from "../components/quick-forms/components/GenericQuickDealsForm";
import { PurchasePriceSFDealForm } from "../components/quick-forms/components/PurchasePriceSFDealForm";
import { QuickDealBrokerCompanyForm } from "../components/quick-forms/components/QuickDealBrokerCompanyForm";
import { QuickDealClosingProbabilityForm } from "../components/quick-forms/components/QuickDealClosingProbabilityForm";
import { QuickDealOfficerForm } from "../components/quick-forms/components/QuickDealOfficerForm";
import { QuickDealOfficerStatusForm } from "../components/quick-forms/components/QuickDealOfficerStatusForm";
import { QuickDealStatusForm } from "../components/quick-forms/components/QuickDealStatusForm";
import { QuickDealTypeForm } from "../components/quick-forms/components/QuickDealTypeForm";
import { QuickFundDealForm } from "../components/quick-forms/components/QuickFundDealForm";
import { dispatchDynamicTableLeaveSecondSlotEvent } from "../events/onDynamicTableLeaveSecondSlotEvent";

export const dealsTableColumnHelper = createColumnHelper<Deal>();

export const dealColumnsTable = [
  dealsTableColumnHelper.accessor("name", {
    header: "Name",
    cell: (info) => (
      <>
        <NextLink
          href={`/acquisitions/deals/deal-summary/?dealId=${info.row.original.id}`}
          passHref
        >
          <Link className="">{genericGetValue(info.getValue())}</Link>
        </NextLink>
      </>
    ),
  }),
  dealsTableColumnHelper.accessor("fund_name", {
    header: "Fund",
    cell: (info) => genericGetValue(info.getValue()),
  }),
  dealsTableColumnHelper.accessor("address", {
    header: "Address",
    cell: (info) => genericGetValue(info.getValue()),
  }),
  dealsTableColumnHelper.accessor("sf", {
    header: "SF",
    cell: (info) => readableNumber(info.getValue()),
  }),
  dealsTableColumnHelper.accessor("purchase_price", {
    header: "Purchase Price",
    cell: (info) =>
      numberToDollar({
        value: info.getValue(),
        options: {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        },
      }),
  }),
  dealsTableColumnHelper.accessor("origination", {
    header: "Origination",
    cell: (info) => genericGetValue(info.getValue()),
  }),
  dealsTableColumnHelper.accessor("phase", {
    header: "Phase",
    cell: (info) => genericGetValue(info.getValue()?.value),
  }),
  dealsTableColumnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const status = genericGetValue(info.getValue()?.label);
      return (
        <Tag
          text={status}
          color={DEAL_STATUS_TAGS.find((tag) => tag.value === status)?.color}
          size="small"
        />
      );
    },
  }),
  dealsTableColumnHelper.accessor("comments", {
    header: "Comments",
    cell: (info) => (
      <TableCommentsColumn text={genericGetValue(info.getValue())} />
    ),
  }),
  dealsTableColumnHelper.display({
    id: "actions",
    header: "Actions",
    cell: (props) => (
      <TableActions
        dealId={props?.row?.original?.id}
        dealType={props?.row?.original?.type}
        has_post_screening_data={props?.row?.original?.has_post_screening_data}
        phase={props?.row?.original?.phase?.value}
      />
    ),
  }),
];

export const editableDealColumnsTable = [
  dealsTableColumnHelper.accessor("address", {
    header: "Address",
    cell: (info) => (
      <Table.Data className="w-auto h-4 py-0">
        <div className="flex items-center">
          <NextLink
            href={`/acquisitions/deals/deal-summary/?dealId=${info.row.original.id}`}
            passHref
          >
            <Link>{genericGetValue(info.getValue())}</Link>
          </NextLink>
        </div>
      </Table.Data>
    ),
  }),
  dealsTableColumnHelper.accessor("submarket", {
    header: "Market",
    cell: (info) => (
      <Table.Data className="h-0 py-0">
        {genericGetValue(info.getValue())}
      </Table.Data>
    ),
  }),
  dealsTableColumnHelper.accessor("date_check_in", {
    header: "Check In Date",
    cell: (info) => (
      <Table.Data
        className="h-0 py-0"
        secondSlot={({ setSecondSlot }) => {
          return (
            <GenericQuickDealDateForm
              dealId={info.row.original.id}
              defaultValues={{
                date_check_in: info.getValue(),
              }}
              deal={info.row.original}
              name="date_check_in"
              onCancel={() => {
                setSecondSlot(false);
              }}
              onSuccess={() => {
                setSecondSlot(false);
              }}
            />
          );
        }}
        onLeaveSecondSlotWithClick={() => {
          dispatchDynamicTableLeaveSecondSlotEvent();
        }}
      >
        {genericGetValue(info.getValue())}
      </Table.Data>
    ),
  }),
  dealsTableColumnHelper.accessor("latest_follow_up", {
    header: "Latest Follow Up",
    cell: (info) => (
      <Table.Data
        className="h-0 py-0"
        secondSlot={({ setSecondSlot }) => {
          return (
            <GenericQuickDealDateForm
              dealId={info.row.original.id}
              deal={info.row.original}
              name="latest_follow_up"
              defaultValues={{
                latest_follow_up: info.getValue(),
              }}
              onCancel={() => {
                setSecondSlot(false);
              }}
              onSuccess={() => {
                setSecondSlot(false);
              }}
            />
          );
        }}
        onLeaveSecondSlotWithClick={() => {
          dispatchDynamicTableLeaveSecondSlotEvent();
        }}
      >
        {genericGetValue(info.getValue())}
      </Table.Data>
    ),
  }),
  dealsTableColumnHelper.accessor("officer_status", {
    header: "Status",
    cell: (info) => {
      const { options } = useOfficerStatusChoices();

      return (
        <Table.Data
          className="h-0 py-0"
          secondSlot={({ setSecondSlot }) => {
            return (
              <QuickDealOfficerStatusForm
                deal={info.row.original}
                dealId={info.row.original.id}
                defaultValues={{
                  officer_status: info.getValue(),
                }}
                onCancel={() => {
                  setSecondSlot(false);
                }}
                onSuccess={() => {
                  setSecondSlot(false);
                }}
              />
            );
          }}
          onLeaveSecondSlotWithDoubleClick={() => {
            dispatchDynamicTableLeaveSecondSlotEvent();
          }}
        >
          {genericGetValue(
            info.getValue()?.label ||
              options.find((option) => option.value === info.getValue())?.label
          )}
        </Table.Data>
      );
    },
  }),
  dealsTableColumnHelper.accessor("purchase_price", {
    header: "Purchase Price",
    cell: (info) => (
      <Table.Data
        className="h-4 py-0 max-w-[300px]"
        monospaceFont
        textAlignment="right"
        secondSlot={
          !info.row.original?.has_uw_model
            ? ({ setSecondSlot }) => {
                return (
                  <PurchasePriceSFDealForm
                    deal={info.row.original}
                    dealId={info.row.original.id}
                    defaultValues={{
                      sf: info.row.original.sf,
                      purchase_price: info.getValue(),
                    }}
                    is="purchase_price"
                    purchasePrice={info.getValue()}
                    sf={info.row.original.sf}
                    onCancel={() => {
                      setSecondSlot(false);
                    }}
                    onSuccess={() => {
                      setSecondSlot(false);
                    }}
                  />
                );
              }
            : null
        }
        onLeaveSecondSlotWithClick={() => {
          dispatchDynamicTableLeaveSecondSlotEvent();
        }}
      >
        {numberToDollar({
          value: info.getValue(),
          options: {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          },
        })}
      </Table.Data>
    ),
  }),
  dealsTableColumnHelper.accessor("sf", {
    header: "SF",
    cell: (info) => (
      <Table.Data
        className="h-4 py-0 max-w-[300px]"
        monospaceFont
        textAlignment="right"
        secondSlot={
          !info.row.original?.has_uw_model
            ? ({ setSecondSlot }) => {
                return (
                  <PurchasePriceSFDealForm
                    deal={info.row.original}
                    dealId={info.row.original.id}
                    defaultValues={{
                      sf: info.getValue(),
                      purchase_price: info.row.original.purchase_price,
                    }}
                    is="sf"
                    purchasePrice={info.row.original.purchase_price}
                    sf={info.getValue()}
                    onCancel={() => {
                      setSecondSlot(false);
                    }}
                    onSuccess={() => {
                      setSecondSlot(false);
                    }}
                  />
                );
              }
            : null
        }
        onLeaveSecondSlotWithClick={() => {
          dispatchDynamicTableLeaveSecondSlotEvent();
        }}
      >
        {readableNumber(info.getValue())}
      </Table.Data>
    ),
  }),
  dealsTableColumnHelper.accessor("psf", {
    header: "Purchase Price/SF",
    cell: (info) => (
      <Table.Data
        className="h-4 py-0 max-w-[150px]"
        monospaceFont
        textAlignment="right"
      >
        {numberToDollar({
          value: info.getValue(),
          options: {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          },
        })}
      </Table.Data>
    ),
  }),
  dealsTableColumnHelper.accessor("latest_loi_submission", {
    header: "Most Recent LOI",
    cell: (info) => (
      <Table.Data
        className="h-0 py-0"
        secondSlot={({ setSecondSlot }) => {
          return (
            <GenericQuickDealDateForm
              deal={info.row.original}
              dealId={info.row.original.id}
              defaultValues={{
                latest_loi_submission: info.getValue(),
              }}
              name="latest_loi_submission"
              onCancel={() => {
                setSecondSlot(false);
              }}
              onSuccess={() => {
                setSecondSlot(false);
              }}
            />
          );
        }}
        onLeaveSecondSlotWithClick={() => {
          dispatchDynamicTableLeaveSecondSlotEvent();
        }}
      >
        {genericGetValue(info.getValue())}
      </Table.Data>
    ),
  }),
  dealsTableColumnHelper.accessor("broker_name", {
    header: "Broker Name",
    cell: (info) => (
      <Table.Data
        className="h-12 py-2 max-w-[300px]"
        secondSlot={({ setSecondSlot }) => {
          return (
            <GenericQuickDealsForm
              deal={info.row.original}
              dealId={info.row.original.id}
              name="broker_name"
              defaultValues={{
                broker_name: info.getValue(),
              }}
              onCancel={() => {
                setSecondSlot(false);
              }}
              onSuccess={() => {
                setSecondSlot(false);
              }}
            />
          );
        }}
        onLeaveSecondSlotWithClick={() => {
          dispatchDynamicTableLeaveSecondSlotEvent();
        }}
      >
        {genericGetValue(info.getValue())}
      </Table.Data>
    ),
  }),
  dealsTableColumnHelper.accessor("officer_note", {
    header: "Officer Note",
    cell: (info) => (
      <Table.Data
        className="h-0 py-0"
        secondSlot={({ setSecondSlot }) => {
          return (
            <GenericQuickDealsForm
              deal={info.row.original}
              dealId={info.row.original.id}
              name="officer_note"
              defaultValues={{
                officer_note: info.getValue(),
              }}
              onCancel={() => {
                setSecondSlot(false);
              }}
              onSuccess={() => {
                setSecondSlot(false);
              }}
              registerOptions={{
                maxLength: maxLength(40),
              }}
            />
          );
        }}
        onLeaveSecondSlotWithClick={() => {
          dispatchDynamicTableLeaveSecondSlotEvent();
        }}
      >
        {genericGetValue(info.getValue())}
      </Table.Data>
    ),
  }),
  dealsTableColumnHelper.accessor("landlord", {
    header: "Landlord",
    cell: (info) => (
      <Table.Data
        className="h-0 py-0"
        secondSlot={({ setSecondSlot }) => {
          return (
            <GenericQuickDealsForm
              deal={info.row.original}
              dealId={info.row.original.id}
              name="landlord"
              defaultValues={{
                landlord: info.getValue(),
              }}
              onCancel={() => {
                setSecondSlot(false);
              }}
              onSuccess={() => {
                setSecondSlot(false);
              }}
            />
          );
        }}
        onLeaveSecondSlotWithClick={() => {
          dispatchDynamicTableLeaveSecondSlotEvent();
        }}
      >
        {genericGetValue(info.getValue())}
      </Table.Data>
    ),
  }),
  dealsTableColumnHelper.accessor("fund", {
    header: "Fund",
    cell: (info) => {
      const { options } = useFundChoices();

      return (
        <Table.Data
          className="h-4 py-0 max-w-[300px]"
          secondSlot={({ setSecondSlot }) => {
            return (
              <QuickFundDealForm
                deal={info.row.original}
                dealId={info.row.original.id}
                defaultValues={{
                  fund: info.getValue(),
                }}
                onCancel={() => {
                  setSecondSlot(false);
                }}
                onSuccess={() => {
                  setSecondSlot(false);
                }}
              />
            );
          }}
          onLeaveSecondSlotWithDoubleClick={() => {
            dispatchDynamicTableLeaveSecondSlotEvent();
          }}
        >
          {genericGetValue(
            info.getValue()?.label ||
              options.find((option) => option.value === info.getValue())?.label
          )}
        </Table.Data>
      );
    },
  }),
  dealsTableColumnHelper.accessor("law_firm_closing_probability", {
    header: "Closing Probability",
    cell: (info) => {
      const closingProbability = info.getValue();
      const value = closingProbability?.value || (closingProbability as string);
      const color = closingProbability
        ? CLOSING_PROBABILITY_TAGS.find((tag) => tag.value === value)?.color
        : null;

      return (
        <Table.Data
          className="h-4 py-0 max-w-[300px]"
          secondSlot={({ setSecondSlot }) => {
            return (
              <QuickDealClosingProbabilityForm
                deal={info.row.original}
                dealId={info.row.original.id}
                defaultValues={{
                  law_firm_closing_probability: info.getValue(),
                }}
                onCancel={() => {
                  setSecondSlot(false);
                }}
                onSuccess={() => {
                  setSecondSlot(false);
                }}
              />
            );
          }}
          onLeaveSecondSlotWithDoubleClick={() => {
            dispatchDynamicTableLeaveSecondSlotEvent();
          }}
        >
          {closingProbability ? (
            <Tag
              className="pointer-events-none"
              text={value}
              color={color}
              size="small"
            />
          ) : (
            genericNoDataText
          )}
        </Table.Data>
      );
    },
  }),
  dealsTableColumnHelper.accessor("has_uw_model", {
    header: "UW Status",
    cell: (info) => {
      const text = info.getValue() ? "Uploaded" : "Not Uploaded";
      return (
        <Table.Data className="h-4 py-0 max-w-[300px]">
          <Tag
            text={text}
            color={info.getValue() ? "success" : "warning"}
            size="small"
          />
        </Table.Data>
      );
    },
  }),
  dealsTableColumnHelper.accessor("officer", {
    header: "Name Investment Lead",
    cell: (info) => {
      const { options } = useOfficerChoices();
      return (
        <Table.Data
          className="h-4 py-0"
          secondSlot={({ setSecondSlot }) => {
            return (
              <QuickDealOfficerForm
                deal={info.row.original}
                dealId={info.row.original.id}
                defaultValues={{
                  officer: info.getValue(),
                }}
                onCancel={() => {
                  setSecondSlot(false);
                }}
                onSuccess={() => {
                  setSecondSlot(false);
                }}
              />
            );
          }}
          onLeaveSecondSlotWithDoubleClick={() => {
            dispatchDynamicTableLeaveSecondSlotEvent();
          }}
        >
          {genericGetValue(
            info.getValue()?.label ||
              options.find((option) => option.value === info.getValue())?.label
          )}
        </Table.Data>
      );
    },
  }),
  dealsTableColumnHelper.accessor("type", {
    header: "Type",
    cell: (info) => {
      const { options } = useDealTypeChoices();
      return (
        <Table.Data
          className="h-4 py-0"
          secondSlot={({ setSecondSlot }) => {
            return (
              <QuickDealTypeForm
                deal={info.row.original}
                dealId={info.row.original.id}
                defaultValues={{
                  type: info.getValue(),
                }}
                onCancel={() => {
                  setSecondSlot(false);
                }}
                onSuccess={() => {
                  setSecondSlot(false);
                }}
              />
            );
          }}
          onLeaveSecondSlotWithDoubleClick={() => {
            dispatchDynamicTableLeaveSecondSlotEvent();
          }}
        >
          {genericGetValue(
            info.getValue()?.label ||
              options.find((option) => option.value === info.getValue())?.label
          )}
        </Table.Data>
      );
    },
  }),
  dealsTableColumnHelper.accessor("status", {
    header: "Investment Committee",
    cell: (info) => {
      const { options } = useDealStatusChoices();
      const status = genericGetValue(
        info.getValue()?.label ||
          options.find((option) => option.value === info.getValue())?.label
      );

      return (
        <Table.Data
          className="h-4 py-0"
          secondSlot={({ setSecondSlot }) => {
            return (
              <QuickDealStatusForm
                deal={info.row.original}
                dealId={info.row.original.id}
                defaultValues={{
                  status: info.getValue(),
                }}
                onCancel={() => {
                  setSecondSlot(false);
                }}
                onSuccess={() => {
                  setSecondSlot(false);
                }}
              />
            );
          }}
          onLeaveSecondSlotWithDoubleClick={() => {
            dispatchDynamicTableLeaveSecondSlotEvent();
          }}
        >
          <Tag
            className="pointer-events-none"
            text={status}
            color={DEAL_STATUS_TAGS.find((tag) => tag.value === status)?.color}
            size="small"
          />
        </Table.Data>
      );
    },
  }),
  dealsTableColumnHelper.accessor("broker_company", {
    header: "Broker Company",
    cell: (info) => {
      const { options } = useDealBrokerCompanyChoices();

      return (
        <Table.Data
          className="h-4 py-0"
          secondSlot={({ setSecondSlot }) => {
            return (
              <QuickDealBrokerCompanyForm
                deal={info.row.original}
                dealId={info.row.original.id}
                defaultValues={{
                  broker_company: info.getValue(),
                }}
                onCancel={() => {
                  setSecondSlot(false);
                }}
                onSuccess={() => {
                  setSecondSlot(false);
                }}
              />
            );
          }}
          onLeaveSecondSlotWithDoubleClick={() => {
            dispatchDynamicTableLeaveSecondSlotEvent();
          }}
        >
          {genericGetValue(
            info.getValue()?.label ||
              options.find((option) => option.value === info.getValue())?.label
          )}
        </Table.Data>
      );
    },
  }),
  dealsTableColumnHelper.display({
    id: "actions",
    header: "Actions",
    cell: (info) => (
      <Table.Data className="h-4 py-0 max-w-[300px]">
        <TableActions
          dealId={info?.row?.original?.id}
          dealType={info?.row?.original?.type}
          has_post_screening_data={info?.row?.original?.has_post_screening_data}
          phase={info?.row?.original?.phase?.value}
        />
      </Table.Data>
    ),
  }),
];
