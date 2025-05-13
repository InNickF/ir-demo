import { ButtonGroupItem } from "in-ui-react";
import React, { useCallback, useState } from "react";

const views = ["smart-sheet", "basic"] as const;
export type DealsView = typeof views[number];

interface UseDealToggleViewArgs {
  onChange?: (view: DealsView) => void;
}

type GetViewClasses = (args: {
  matchingView: DealsView;
  returnMatchingClasses?: string;
}) => string | undefined;

type UseDealToggleViewFn = (args?: UseDealToggleViewArgs) => {
  views: DealsView[];
  activeView: DealsView;
  viewItems: ButtonGroupItem[];
  setActiveView: React.Dispatch<React.SetStateAction<DealsView>>;
  getViewClasses: GetViewClasses;
};

export const useDealToggleView: UseDealToggleViewFn = (args) => {
  const [activeView, setActiveView] = useState<DealsView>(views[0]);

  const getViewClasses: GetViewClasses = useCallback(
    ({ matchingView, returnMatchingClasses }): string | undefined => {
      if (activeView === matchingView) {
        return returnMatchingClasses || undefined;
      }
      return "hidden";
    },
    [activeView]
  );

  const changeView = (key: DealsView) => {
    setActiveView(key);
    args?.onChange?.(key);
  };

  const viewItems: ButtonGroupItem[] = [
    {
      key: "smart-sheet",
      text: "Dynamic Table",
      size: "small",
      onClick: (key: DealsView) => changeView(key),
    },
    {
      key: "basic",
      text: "Basic",
      size: "small",
      onClick: (key: DealsView) => changeView(key),
    },
  ];

  return {
    views: [...views],
    activeView,
    viewItems,
    setActiveView,
    getViewClasses,
  };
};
