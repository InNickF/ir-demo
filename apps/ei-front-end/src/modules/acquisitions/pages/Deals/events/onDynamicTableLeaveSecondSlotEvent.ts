import { useEffect } from "react";

const eventName = "dynamic-table-leave-second-slot";
const dynamicTableLeaveSecondSlotEvent = new Event(eventName);

export const dispatchDynamicTableLeaveSecondSlotEvent = () => {
  window?.dispatchEvent(dynamicTableLeaveSecondSlotEvent);
};

export const subscribeDynamicTableLeaveSecondSlotEvent = (
  callback: () => void
) => {
  window?.addEventListener(eventName, callback);
};

export const unsubscribeDynamicTableLeaveSecondSlotEvent = (
  callback: () => void
) => {
  window?.removeEventListener(eventName, callback);
};

export const useDynamicTableLeaveSecondSlotEvent = ({
  onEvent,
}: {
  onEvent: () => void;
}) => {
  useEffect(() => {
    subscribeDynamicTableLeaveSecondSlotEvent(onEvent);
    return () => unsubscribeDynamicTableLeaveSecondSlotEvent(onEvent);
  }, [onEvent]);
};
