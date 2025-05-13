/* eslint-disable @typescript-eslint/no-explicit-any */
import { XMarkIcon } from "@heroicons/react/24/outline";
import { cloneElement, forwardRef } from "react";
import { Dialog, DialogDisclosure, useDialogState } from "reakit/Dialog";
import { Divider } from "../../layout/Divider";
import { Overlay } from "../../navigation/Overlay";
import { Portal } from "../../other/Portal";
import { Button } from "../Button";
import { Heading } from "../Heading";
import {
  ModalBodyProps,
  ModalComponentGroup,
  ModalHeaderProps,
  ModalProps,
} from "./props";
import "./styles.css";

const prefix = "in-ui-modal";
/**
 * In UI Modal Component
 * @see {@link https://todo.com/} for official documentation.
 * @param className
 * Default: undefined |
 * You can use this prop to send a string with your custom css classes.
 * @param disclosure
 * Specifies the disclosure element.
 * @param options
 * Reakit dialog options.
 * @interface ModalProps
 * This is the custom interface created for this component logic.
 * @interface HTMLAttributes
 * @returns
 * A inUI Modal react component
 */
export const ModalComponent = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      children,
      disclosure,
      className,
      options,
      size = "normal",
      "aria-label": ariaLabel = "Modal",
      ...props
    },
    ref
  ) => {
    const dialog = useDialogState({
      ...options,
      animated: true,
    });

    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      classes.push(`${prefix}--${size}-size`);
      className && classes.push(className);
      return classes.join(" ");
    };

    return (
      <>
        <DialogDisclosure
          {...dialog}
          ref={disclosure.ref}
          {...disclosure.props}
          unstable_disclosureRef={false}
        >
          {(disclosureProps: any) => cloneElement(disclosure, disclosureProps)}
        </DialogDisclosure>
        {/* workaround to prevent focus trap passing modal as `false` */}
        {dialog.modal ? (
          <Dialog
            {...dialog}
            {...props}
            ref={ref}
            aria-label={ariaLabel}
            unstable_finalFocusRef={disclosure.ref}
            className={getClasses()}
          >
            {children(dialog)}
          </Dialog>
        ) : (
          <Portal>
            <Dialog {...dialog} {...props} ref={ref} className={getClasses()}>
              {children(dialog)}
            </Dialog>
          </Portal>
        )}
        {dialog.visible || props?.visible ? <Overlay /> : null}
      </>
    );
  }
);
ModalComponent.displayName = "Modal";

export const Body = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, className, ...props }, ref) => {
    const getClasses = (): string => {
      const classes: string[] = [`${prefix}__content`];
      className && classes.push(className);
      return classes.join(" ");
    };

    return (
      <>
        {children ? (
          <div ref={ref} {...props} className={getClasses()}>
            {children}
          </div>
        ) : null}
      </>
    );
  }
);
Body.displayName = "ModalBody";

export const Header = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ onClose, children, className, ...props }, ref) => {
    const closeModal = () => {
      onClose && onClose();
    };
    const getClasses = (): string => {
      const classes: string[] = [`${prefix}__header`];
      className && classes.push(className);
      return classes.join(" ");
    };

    return (
      <>
        <div ref={ref} {...props} className={getClasses()}>
          <Heading kind="h5" className={`${prefix}__header__title`}>
            {children}
          </Heading>
          {onClose ? (
            <div className={`${prefix}__header__container`}>
              <Button
                kind="ghost"
                icon={<XMarkIcon />}
                onlyIcon
                onClick={closeModal}
              />
            </div>
          ) : null}
        </div>
        <Divider />
      </>
    );
  }
);
Header.displayName = "ModalHeader";

const Modal = ModalComponent as ModalComponentGroup;
Modal.Header = Header;
Modal.Body = Body;

export default Modal;
