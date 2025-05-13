import { useHotkeys } from "react-hotkeys-hook";
import { globalHotkeys } from "./keys/global";
import { idSwitcherHotkeys } from "./keys/id-switcher";

interface useToggleIdSwitcherVisibilityParams {
  toggleCallback: () => void;
}
export const useToggleIdSwitcherVisibility = ({
  toggleCallback,
}: useToggleIdSwitcherVisibilityParams) => {
  useHotkeys(
    globalHotkeys["id-switcher"],
    (e) => {
      e.preventDefault();
      toggleCallback();
    },
    {
      enableOnFormTags: true,
    }
  );
};

export interface useNavigateSwitcherItemsParams {
  onUp: () => void;
  onDown: () => void;
  onEnter: () => void;
  enabled?: boolean;
}
export const useNavigateSwitcherItems = ({
  onUp,
  onDown,
  onEnter,
  enabled,
}: useNavigateSwitcherItemsParams) => {
  useHotkeys(
    idSwitcherHotkeys["id-switcher-up"],
    (e) => {
      e.preventDefault();
      onUp?.();
    },
    { enabled, enableOnFormTags: true }
  );
  useHotkeys(
    idSwitcherHotkeys["id-switcher-down"],
    (e) => {
      e.preventDefault();
      onDown?.();
    },
    { enabled, enableOnFormTags: true }
  );
  useHotkeys(
    idSwitcherHotkeys["id-switcher-select"],
    (e) => {
      e.preventDefault();
      onEnter?.();
    },
    { enabled, enableOnFormTags: true }
  );
};
