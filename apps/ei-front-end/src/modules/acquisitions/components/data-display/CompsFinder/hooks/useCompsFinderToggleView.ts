import { ButtonGroupItem } from "in-ui-react";
import { useState } from "react";

const views = ["map", "tables"] as const;
export type View = typeof views[number];

interface UseCompsFinderToggleViewArgs {
  onChange?: (view: View) => void;
}

export const useCompsFinderToggleView = (
  { onChange }: UseCompsFinderToggleViewArgs = { onChange: null }
) => {
  const [view, setView] = useState<View>(views[0]);

  const viewItems: ButtonGroupItem[] = [
    {
      key: "map",
      text: "Map",
      size: "small",
      onClick: (key) => {
        setView(key as View);
        onChange?.(key as View);
      },
    },
    {
      key: "tables",
      text: "Tables",
      size: "small",
      onClick: (key) => {
        setView(key as View);
        onChange?.(key as View);
      },
    },
  ];

  return {
    views,
    view,
    viewItems,
  };
};
