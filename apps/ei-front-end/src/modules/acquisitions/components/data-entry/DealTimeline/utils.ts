import {
  Deal,
  DealFormTimelineItem,
  DealTimelineItem,
  DealTimelineItemPayload,
} from "@/acquisitions/typings/deals";
import { transformDateToString } from "@/commons/utils/dates";

export const timelineItemsToFormValues = (
  timelineItems: DealTimelineItem[]
): DealFormTimelineItem => {
  if (timelineItems.length > 0) {
    const formItems: DealFormTimelineItem[] = timelineItems.map((item) => {
      return {
        [item.type.id]: {
          deadline: item.deadline,
          amount: item.amount,
          days: item.days,
        },
      } as DealFormTimelineItem;
    });
    return Object.assign({}, ...formItems);
  }
};

export const timelineItemsToFormValuesForUpdate = (
  timelineItems: DealTimelineItem[]
): DealFormTimelineItem => {
  if (timelineItems.length > 0) {
    const formItems: DealFormTimelineItem[] = timelineItems.map((item) => {
      return {
        [item.type.id]: {
          id: item.id,
          deadline: item.deadline,
          amount: item.amount,
          days: item.days,
        },
      } as DealFormTimelineItem;
    });
    return Object.assign({}, ...formItems);
  }
};

export const mergeFormTimelineItems = ({
  formTimelineItems,
  dealId,
}: {
  formTimelineItems: DealFormTimelineItem;
  dealId: Deal["id"];
}): DealTimelineItemPayload[] => {
  const timelineItems = Object.entries(formTimelineItems);

  return timelineItems.map((item) => {
    const [key, value] = item;
    return {
      deal: dealId,
      type: key,
      deadline:
        value.deadline && value.deadline !== "N/A"
          ? transformDateToString(new Date(value.deadline))
          : null,
      amount: value.amount,
      days: value.days,
    };
  }) as DealTimelineItemPayload[];
};

export const mergeFormTimelineItemsForUpdate = (
  formTimelineItems: DealFormTimelineItem
): DealTimelineItemPayload[] => {
  const timelineItems = Object.entries(formTimelineItems);

  return timelineItems.map((item) => {
    const [key, value] = item;
    return {
      id: value.id,
      type: key,
      deadline:
        value.deadline && value.deadline !== "N/A"
          ? transformDateToString(new Date(value.deadline))
          : null,
      amount: value.amount,
      days: value.days,
    };
  }) as DealTimelineItemPayload[];
};

export const defaultTimelinePayload: DealTimelineItem[] = [
  {
    type: {
      id: "LOI_EXECUTED",
      name: "LOI EXECUTED",
    },
    deadline: null,
    amount: null,
    days: null,
  },
  {
    type: {
      id: "PSA_EFFECTIVE_DATE",
      name: "PSA EFFECTIVE DATE",
    },
    deadline: null,
    amount: null,
    days: null,
  },
  {
    type: {
      id: "PSA_DEPOSIT_DAYS",
      name: "PSA DEPOSIT DAYS",
    },
    deadline: null,
    amount: null,
    days: null,
  },
  {
    type: {
      id: "PSA_DEPOSIT_DATE",
      name: "PSA DEPOSIT DATE",
    },
    deadline: null,
    amount: null,
    days: null,
  },
  {
    type: {
      id: "DUE_DILIGENCE_DAYS",
      name: "DUE DILIGENCE DAYS",
    },
    deadline: null,
    amount: null,
    days: null,
  },
  {
    type: {
      id: "GO_HARD_DATE",
      name: "GO HARD DATE",
    },
    deadline: null,
    amount: null,
    days: null,
  },
  {
    type: {
      id: "DAYS_UNTIL_CLOSING",
      name: "DAYS UNTIL CLOSING",
    },
    deadline: null,
    amount: null,
    days: null,
  },
  {
    type: {
      id: "CLOSING",
      name: "CLOSING",
    },
    deadline: null,
    amount: null,
    days: null,
  },
  {
    type: {
      id: "EXTENSION_DAYS_1",
      name: "EXTENSION DAYS 1",
    },
    deadline: null,
    amount: null,
    days: null,
  },
  {
    type: {
      id: "EXTENSION_DATE_1",
      name: "EXTENSION DATE 1",
    },
    deadline: null,
    amount: null,
    days: null,
  },
  {
    type: {
      id: "EXTENSION_DAYS_2",
      name: "EXTENSION DAYS 2",
    },
    deadline: null,
    amount: null,
    days: null,
  },
  {
    type: {
      id: "EXTENSION_DATE_2",
      name: "EXTENSION DATE 2",
    },
    deadline: null,
    amount: null,
    days: null,
  },
];
