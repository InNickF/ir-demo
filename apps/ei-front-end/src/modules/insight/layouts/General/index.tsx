import { ChatBar } from "@/insight/components/layout/ChatBar";
import { NavBar } from "@/insight/components/layout/Navbar";
import { FC, PropsWithChildren } from "react";
import "./styles.css";

export const GeneralLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header className="z-navigation sticky top-0 left-0 right-0">
        <NavBar />
        <ChatBar />
      </header>
      {children}
    </>
  );
};
