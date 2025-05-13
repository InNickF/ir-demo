import React, { useEffect } from "react";

interface UseFocusInputOnMenuVisibleParams {
  isMenuVisible: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}
export const useFocusInputOnMenuVisible = ({
  inputRef,
  isMenuVisible,
}: UseFocusInputOnMenuVisibleParams) => {
  useEffect(() => {
    if (isMenuVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMenuVisible]);
};
