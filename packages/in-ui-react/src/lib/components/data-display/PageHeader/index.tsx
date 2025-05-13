import { forwardRef } from "react";
import { Container } from "../../layout/Container";
import { Item } from "./components/Item";
import { useInView } from "react-intersection-observer";
import { Portal } from "../../other/Portal";
import { default as Drawer } from "../../navigation/Drawer";
import { Button } from "../../general/Button";
import { Bars3Icon } from "@heroicons/react/24/outline";
import {
  PageHeaderProps,
  HeaderContentProps,
  HeaderMenuProps,
  HeaderMenuMobileProps,
  HeaderFixedMenuProps,
  HeaderDrawerProps,
  PageHeaderGroupType,
} from "./props";
import "./styles.css";

/**
 * In UI page header Component
 * @see {@link https://todo.com/} for official documentation.
 * @param className
 * Default: null |
 * You can use this prop to send a string with your custom css classes.
 * @param children
 * The classic React children prop.
 * @param menu
 * Default: null |
 * Elements to render in the header menu section.
 * @param fluid
 * Default: false |
 * Specifies if the container will fill the total width of the horizontal viewport.
 * @returns
 * A inUI page header react component
 */

const prefix = "in-ui-header";

const HeaderContent = ({ fluid, children }: HeaderContentProps) => {
  return (
    <Container fluid={fluid}>
      <div className={`${prefix}__content`}>{children}</div>
    </Container>
  );
};

const HeaderMenuMobile = ({ openDrawer }: HeaderMenuMobileProps) => {
  return (
    <div className={`${prefix}__menu-mobile`}>
      <Button icon={<Bars3Icon />} onlyIcon size="small" onClick={openDrawer} />
    </div>
  );
};

const HeaderMenu = forwardRef<HTMLDivElement, HeaderMenuProps>(
  ({ fluid, menu, className, openDrawer }, ref) => {
    const getClasses = (): string => {
      const classes: string[] = [`${prefix}__menu-container`];
      className && classes.push(className);
      return classes.join(" ");
    };
    return (
      <>
        {menu ? (
          <div ref={ref} className={getClasses()}>
            <Container fluid={fluid}>
              <div className={`${prefix}__menu`}>{menu}</div>
              <HeaderMenuMobile openDrawer={openDrawer} />
            </Container>
          </div>
        ) : null}
      </>
    );
  }
);

HeaderMenu.displayName = "HeaderMenu";

const HeaderFixedMenu = ({
  menu,
  noFixed = false,
  className,
  openDrawer,
  fluid = false,
}: HeaderFixedMenuProps) => {
  return (
    <>
      {!noFixed ? (
        <Portal>
          <HeaderMenu
            openDrawer={openDrawer}
            fluid={fluid}
            className={className}
            menu={menu}
          />
        </Portal>
      ) : null}
    </>
  );
};

const HeaderDrawer = ({
  menu,
  drawerIsOpen = false,
  closeDrawer = () => null,
}: HeaderDrawerProps) => {
  return (
    <Drawer isOpen={drawerIsOpen} close={closeDrawer} placement="left">
      <div className="in-ui-header__menu-drawer">{menu}</div>
    </Drawer>
  );
};

export const PageHeaderWrapper = forwardRef<HTMLDivElement, PageHeaderProps>(
  (
    {
      fluid = false,
      menu,
      className,
      children,
      drawerIsOpen = false,
      closeDrawer = () => {
        return;
      },
      openDrawer = () => {
        return;
      },
      noFixed = false,
      ...props
    },
    ref
  ) => {
    const { ref: observerRef, inView: menuIsVisible } = useInView({
      /* It is the sum of the navigation bar height and the header menu height */
      rootMargin: "-96px 0px 0px 0px",
      initialInView: true,
    });

    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      className && classes.push(className);
      return classes.join(" ");
    };

    const fixedMenuClasses = (): string => {
      const classNames = [`${prefix}__menu-portal`];
      !menuIsVisible && classNames.push(`${prefix}__menu-portal--visible`);
      return classNames.join(" ");
    };

    return (
      <>
        <div {...props} ref={ref} className={getClasses()}>
          <HeaderContent fluid={fluid}>{children}</HeaderContent>
          {menu ? (
            <HeaderMenu
              openDrawer={openDrawer}
              fluid={fluid}
              ref={observerRef}
              menu={menu}
            />
          ) : null}
        </div>
        {menu ? (
          <>
            <HeaderFixedMenu
              menu={menu}
              noFixed={noFixed}
              openDrawer={openDrawer}
              fluid={fluid}
              className={fixedMenuClasses()}
            />
            <HeaderDrawer
              drawerIsOpen={drawerIsOpen}
              closeDrawer={closeDrawer}
              menu={menu}
            />
          </>
        ) : null}
      </>
    );
  }
);

PageHeaderWrapper.displayName = "PageHeaderWrapper";

const PageHeader = PageHeaderWrapper as PageHeaderGroupType;
PageHeader.Item = Item;

export default PageHeader;
