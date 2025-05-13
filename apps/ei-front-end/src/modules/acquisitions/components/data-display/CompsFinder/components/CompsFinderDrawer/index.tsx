import { Drawer } from "in-ui-react";
import "./styles.css";

interface CompsFinderDrawerProps<T> {
  element: T | null;
  onClose?: () => void;
  withPortal?: boolean;
  withOverlay?: boolean;
  className?: string;
  drawerActions: (element: T) => React.ReactNode;
  children?: (element: T) => React.ReactNode;
}
export const CompsFinderDrawer = <T,>({
  element,
  onClose,
  withPortal,
  withOverlay,
  className,
  drawerActions,
  children,
}: CompsFinderDrawerProps<T>) => {
  return (
    <Drawer
      className={className}
      isOpen={!!element}
      close={() => {
        onClose?.();
      }}
      placement="right"
      withPortal={withPortal}
      withOverlay={withOverlay}
      header={<Drawer.Header title="Comp details" />}
    >
      {element ? (
        <div className="acq-comps-finder-drawer-body">
          <section className="overflow-auto">{children(element)}</section>
          <footer>{drawerActions(element)}</footer>
        </div>
      ) : null}
    </Drawer>
  );
};
