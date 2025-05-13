import { useEffect } from "react";

const generalFiltersAppliedEvent = new Event("generalFiltersApplied");

export const dispatchGeneralFiltersAppliedEvent = () => {
  window.dispatchEvent(generalFiltersAppliedEvent);
};

export const subscribeToGeneralFiltersAppliedEvent = (callback: () => void) => {
  window.addEventListener("generalFiltersApplied", callback);
};

export const unsubscribeToGeneralFiltersAppliedEvent = (
  callback: () => void
) => {
  window.removeEventListener("generalFiltersApplied", callback);
};

export const useGeneralFiltersAppliedEvent = ({
  onEvent,
}: {
  onEvent: () => void;
}) => {
  useEffect(() => {
    subscribeToGeneralFiltersAppliedEvent(onEvent);
    return () => unsubscribeToGeneralFiltersAppliedEvent(onEvent);
  }, [onEvent]);
};
