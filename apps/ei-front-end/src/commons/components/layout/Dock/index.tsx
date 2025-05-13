import { useIsActiveRoute } from "@/commons/hooks/useIsActiveRoute";
import { NavigationItemProps } from "@/commons/typings";
import { AsElement, Dock, DockItemProps } from "in-ui-react";
import Link from "next/link";
import { FC } from "react";

type ItemProps<C extends AsElement> = Exclude<
  DockItemProps<C>,
  "children" | "active"
> &
  NavigationItemProps;

type Item = <C extends AsElement>(
  props: ItemProps<C>
) => React.ReactElement | null;
const DockItem: Item = function ({
  linksToMatch,
  regexToMatch,
  as = "a",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  outlineIcon,
  ...props
}) {
  const isActive = useIsActiveRoute({
    regexToMatch,
    linksToMatch,
    route: props.href as string,
  });

  const finalAs = as;
  return (
    <Link href={props.href}>
      <Dock.Item
        {...props}
        as={finalAs as AsElement}
        icon={props.icon}
        label={props.label}
        active={isActive}
      >
        {props.description}
      </Dock.Item>
    </Link>
  );
};

interface DockItemsProps {
  items: ItemProps<AsElement | "a">[];
}
export const LayoutDock: FC<DockItemsProps> = ({ items }) => {
  return (
    <Dock className="hidden md:flex">
      {items.map((item) => {
        return <DockItem key={item.label} {...item} />;
      })}
    </Dock>
  );
};
