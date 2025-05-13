import { FC, forwardRef, useEffect, useRef } from "react";
import { Button } from "../../general/Button";
import { Heading } from "../../general/Heading";
import { Portal } from "../../other/Portal";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  NotificationItemProps,
  NotificationContainerProps,
  NotificationComponent,
  NotificationCounterProps,
  NotificationBodyProps,
  NotificationButtonProps,
} from "./props";
import "./styles.css";

const prefix = "in-ui-notification";
/**
 * In UI NotificationItem Component
 * @see {@link https://todo.com/} for official documentation.
 * @param subject
 * Specifies the title of the notification
 * @param message
 * Specifies the message of the notification
 * @param kind
 * Default: 'info'
 * Type of notification item
 * @param timeout
 * Default: 8000 |
 * Specifies the time of the counter bar animation.
 * Specifies if the component will show only the description
 * @param className
 * Default: undefined |
 * You can use this prop to send a string with your custom css
 * @interface NotificationItemProps
 * This is the custom interface created for this component logic.
 * @interface HTMLAttributes
 * @returns
 * A inUI NotificationItem react component
 */
export const NotificationItem = forwardRef<
  HTMLDivElement,
  NotificationItemProps
>(
  (
    {
      subject,
      message,
      kind = "info",
      timeout = 8000,
      onClose,
      className,
      onMount,
      ...props
    },
    ref
  ) => {
    const wasMounted = useRef(false);
    useEffect(() => {
      if (!wasMounted.current) {
        wasMounted.current = true;
        onMount && onMount();
      }
    }, [onMount]);

    const itemPrefix = `${prefix}-item`;
    const getClasses = (): string => {
      const classes: string[] = [`${itemPrefix}`];
      className && classes.push(className);
      return classes.join(" ");
    };
    return (
      <div className={getClasses()} ref={ref} {...props}>
        <NotificationCounter
          itemPrefix={itemPrefix}
          kind={kind}
          timeout={timeout}
        />
        <NotificationBody
          itemPrefix={itemPrefix}
          message={message}
          subject={subject}
        />
        <NotificationButton itemPrefix={itemPrefix} onClose={onClose} />
      </div>
    );
  }
);

const NotificationCounter: FC<NotificationCounterProps> = ({
  kind,
  timeout,
  itemPrefix,
}) => {
  const time = `${timeout}ms`;
  return (
    <div
      className={`${itemPrefix}__counter-bg ${itemPrefix}__counter-bg--${kind}`}
    >
      <div
        className={`${itemPrefix}__counter ${itemPrefix}__counter--${kind}`}
        style={{ animationDuration: time }}
      />
    </div>
  );
};

const NotificationBody: FC<NotificationBodyProps> = ({
  itemPrefix,
  message,
  subject,
}) => {
  return (
    <div className={`${itemPrefix}__body`}>
      <Heading kind="h5">{subject}</Heading>
      {message ? <p>{message}</p> : null}
    </div>
  );
};

const NotificationButton: FC<NotificationButtonProps> = ({
  itemPrefix,
  onClose,
}) => {
  return (
    <div className={`${itemPrefix}__close`}>
      <Button size="small" icon={<XMarkIcon />} onlyIcon onClick={onClose} />
    </div>
  );
};

NotificationItem.displayName = "NotificationItem";

/**
 * In UI NotificationContainer Component
 * @see {@link https://todo.com/} for official documentation.
 * @param position
 * The position of the container
 * @param children
 * The classic React children prop.
 * @param className
 * Default: null |
 * You can use this prop to send a string with your custom css
 * @interface NotificationContainerProps
 * This is the custom interface created for this component logic.
 * @interface HTMLAttributes
 * @returns
 * A inUI NotificationContainer react component
 */
export const NotificationContainer = forwardRef<
  HTMLDivElement,
  NotificationContainerProps
>(({ position, className, children, ...props }, ref) => {
  const getClasses = (): string => {
    const containerPrefix = `${prefix}-container`;

    const classes: string[] = [
      `${containerPrefix}`,
      `${containerPrefix}--position-${position}`,
    ];
    className && classes.push(className);
    return classes.join(" ");
  };

  return (
    <Portal>
      <div className={getClasses()} ref={ref} {...props}>
        {children}
      </div>
    </Portal>
  );
});

NotificationContainer.displayName = "NotificationContainer";

export const Notification: NotificationComponent = {
  Item: NotificationItem,
  Container: NotificationContainer,
};
