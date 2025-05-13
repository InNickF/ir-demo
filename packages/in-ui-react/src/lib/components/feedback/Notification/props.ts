import { HTMLAttributes } from "react";
import { ButtonProps } from "../../general/Button/props";
import { NotificationItem, NotificationContainer } from ".";

export type NotificationItemKind = "success" | "info" | "error" | "warning";

export interface NotificationItemProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /**
   * Specifies the subject to be shown
   */
  subject: string;
  /**
   * Specifies message be shown
   */
  message?: string;
  /**
   * Specifies the type of notification
   */
  kind?: NotificationItemKind;
  /**
   * Specifies the time of the counter bar animation (in milliseconds)
   */
  timeout?: number;
  /**
   * Action triggered when the close button is clicked
   */
  onClose: NonNullable<ButtonProps<"button">["onClick"]>;
  /**
   * Action triggered when the component is mounted
   */
  onMount?: () => void;
}

export interface NotificationCounterProps {
  kind: NotificationItemProps["kind"];
  timeout: NonNullable<NotificationItemProps["timeout"]>;
  itemPrefix: string;
}

export interface NotificationBodyProps {
  subject: NotificationItemProps["subject"];
  message?: NotificationItemProps["message"];
  itemPrefix: string;
}

export interface NotificationButtonProps {
  onClose: NotificationItemProps["onClose"];
  itemPrefix: string;
}

export type NotificationContainerPosition =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";

export interface NotificationContainerProps
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * Position of the container
   */
  position: NotificationContainerPosition;
}

export type NotificationComponent = {
  Item: typeof NotificationItem;
  Container: typeof NotificationContainer;
};
