import { LogoutButton } from "@/commons/components/general/LogoutButton";
import { LayoutDock } from "@/commons/components/layout/Dock";
import { NavbarMobileMenu } from "@/commons/components/layout/MobileMenu";
import { ModuleSelector } from "@/commons/components/layout/ModuleSelector";
import { TextLogo } from "@/commons/components/other/TextLogo";
import { NavigationBarRoutes } from "@/commons/typings";
import { ChartPieIcon as ChartPieIconOutline } from "@heroicons/react/24/outline";
import { ChartPieIcon } from "@heroicons/react/24/solid";
import { AsElement, Navbar } from "in-ui-react";
import Link from "next/link";
import { FC, PropsWithChildren, useEffect, useState } from "react";

export const LabNavBar: FC<PropsWithChildren> = () => {
  const prefix = "lab-navbar";
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const navigationRoutes: NavigationBarRoutes[] = [
    {
      href: "/lab/tree/",
      regexToMatch: /(\/lab\/tree).*/,
      icon: <ChartPieIcon />,
      outlineIcon: <ChartPieIconOutline />,
      label: "Labs",
      as: "a" as AsElement,
    },
  ];
  return (
    <>
      <Navbar paddingX="left" className={prefix}>
        <div className="flex items-center justify-between w-full h-full">
          <Link href="/lab/tree/">
            <a>
              <TextLogo name="Lab" className="text-3xl" />
            </a>
          </Link>
          <LayoutDock items={navigationRoutes} />
          <div className="flex">
            {isClient ? (
              <>
                <ModuleSelector />
                <LogoutButton className="hidden navbar-button--size md:inline-block" />
                <NavbarMobileMenu items={navigationRoutes} />
              </>
            ) : null}
          </div>
        </div>
      </Navbar>
    </>
  );
};
