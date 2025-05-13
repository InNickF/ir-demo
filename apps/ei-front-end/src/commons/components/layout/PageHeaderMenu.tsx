import { useIsActiveRoute } from "@/commons/hooks/useIsActiveRoute";
import { AsElement, PageHeader, PageHeaderItemProps } from "in-ui-react";
import Link, { LinkProps } from "next/link";
import { FC } from "react";

export type PageHeaderMenuItemProps<C extends AsElement> = Exclude<
  PageHeaderItemProps<C>,
  "children" | "active"
> & {
  label: string;
  href: LinkProps["href"];
  linksToMatch?: string[];
  regexToMatch?: RegExp;
};

interface PageHeaderProps {
  items: PageHeaderMenuItemProps<AsElement | "a">[];
}

export const PageHeaderMenu: FC<PageHeaderProps> = ({ items }) => {
  return (
    <>
      {items.map((item) => {
        return <PageHeaderMenuItem key={item.label} {...item} />;
      })}
    </>
  );
};

const PageHeaderMenuItem: FC<PageHeaderMenuItemProps<AsElement | "a">> = ({
  href,
  label,
  regexToMatch,
  linksToMatch,
  ...props
}) => {
  const isActive = useIsActiveRoute({
    regexToMatch,
    linksToMatch,
    route: href as string,
  });

  return (
    <Link href={href}>
      <PageHeader.Item {...props} active={isActive}>
        {label}
      </PageHeader.Item>
    </Link>
  );
};
