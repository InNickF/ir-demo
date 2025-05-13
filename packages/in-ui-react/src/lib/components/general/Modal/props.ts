/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseHTMLAttributes, PropsWithChildren } from "react";
import { DialogInitialState, DialogProps, DialogStateReturn } from "reakit/ts";
import { SealedInitialState } from "reakit-utils/useSealedState";
import { Body, Header, ModalComponent } from ".";
import { Size } from "../../utils/types";

export type ModalSize = Size | "smallest";

export interface ModalProps extends Omit<DialogProps, "baseId" | "children"> {
  /**
   * Specifies the disclosure element.
   */
  disclosure: any;
  /**
   * Reakit dialog options.
   */
  options?: SealedInitialState<DialogInitialState>;
  size?: ModalSize;
  /**
   * Children render prop
   */
  children: (dialog: DialogStateReturn) => JSX.Element;
}
export interface ModalHeaderProps
  extends BaseHTMLAttributes<HTMLDivElement>,
    PropsWithChildren {
  onClose?: () => void;
}

export interface ModalBodyProps
  extends BaseHTMLAttributes<HTMLDivElement>,
    PropsWithChildren {}

export type ModalComponentGroup = typeof ModalComponent & {
  /**
   * ModalHeader component
   */
  Header: typeof Header;
  /**
   * ModalBody component
   */
  Body: typeof Body;
};
