import { LogoutButton } from "@/commons/components/general/LogoutButton";
import { ThemeSelector } from "@/commons/components/general/ThemeSelector";
import { ModuleSelector } from "@/commons/components/layout/ModuleSelector";
import { TextLogo } from "@/commons/components/other/TextLogo";
import { Navbar } from "in-ui-react";
import Link from "next/link";
import "./styles.css";

export const InvestorNavbar = () => {
  const prefix = "investor-navbar";

  return (
    <>
      <Navbar paddingX="left" className={prefix}>
        <div className={`${prefix}-container`}>
          <Link href="/investor">
            <a>
              <TextLogo name="Investor" className="text-3xl" />
            </a>
          </Link>

          <div className="flex">
            <ModuleSelector />
            <ThemeSelector />
            <LogoutButton className="hidden navbar-button--size md:inline-block" />
          </div>
        </div>
      </Navbar>
    </>
  );
};
