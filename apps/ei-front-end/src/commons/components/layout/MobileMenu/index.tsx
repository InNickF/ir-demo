import { LogoutButton } from "@/commons/components/general/LogoutButton";
import { useOnChangeRoute } from "@/commons/hooks/useOnchangeRoute";
import { Bars3BottomRightIcon } from "@heroicons/react/24/outline";
import { AsElement, Button, ButtonProps, Drawer, Tooltip } from "in-ui-react";
import Link from "next/link";
import { FC, MouseEventHandler, useState } from "react";
import { useIsActiveRoute } from "../../../hooks/useIsActiveRoute";
import { NavigationItemProps } from "@/commons/typings";

type MobileMenuItemProps<C extends AsElement> = Exclude<
  ButtonProps<C>,
  "block" | "kind"
> &
  NavigationItemProps;

type MobileMenuItemType = <C extends AsElement = "a">(
  props: MobileMenuItemProps<C>
) => React.ReactElement | null;
const MobileMenuItem: MobileMenuItemType = function ({
  linksToMatch,
  regexToMatch,
  outlineIcon,
  label,
  href,
  as = "a",
  ...props
}) {
  const isActive = useIsActiveRoute({
    regexToMatch,
    linksToMatch,
    route: href as string,
  });

  const finalAs = as;
  return (
    <Link href={href}>
      <Button
        {...props}
        className="flex h-16"
        as={finalAs as AsElement}
        textLeft
        block
        kind={isActive ? "solid" : "ghost"}
        icon={outlineIcon}
      >
        {label}
      </Button>
    </Link>
  );
};

interface MobileMenuProps {
  items: MobileMenuItemProps<AsElement | "a">[];
}

const MobileMenuButton: FC<{
  onClick: MouseEventHandler<HTMLButtonElement>;
}> = ({ onClick }) => {
  return (
    <Tooltip content="Menu">
      <Button
        className="inline-block ui-commons-navbar__big-button md:hidden"
        kind="ghost"
        onlyIcon
        icon={<Bars3BottomRightIcon />}
        onClick={onClick}
      />
    </Tooltip>
  );
};

export const NavbarMobileMenu: FC<MobileMenuProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeDrawer = () => {
    setIsOpen(false);
  };
  useOnChangeRoute(closeDrawer);
  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <Drawer isOpen={isOpen} close={closeDrawer}>
        <div className="flex flex-col flex-wrap justify-between h-full">
          <div className="w-full">
            {items.map((item) => {
              return <MobileMenuItem key={item.label} {...item} />;
            })}
          </div>
          <div className="w-full">
            <LogoutButton className="h-16">Logout</LogoutButton>
          </div>
        </div>
      </Drawer>
      <MobileMenuButton onClick={toggleDrawer} />
    </>
  );
};
