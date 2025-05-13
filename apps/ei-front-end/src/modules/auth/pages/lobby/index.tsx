import { AuthHead } from "@/auth/components/general/AuthHead";
import { LogoutButton } from "@/commons/components/general/LogoutButton";
import { ThemeSelector } from "@/commons/components/general/ThemeSelector";
import { useWelcomeNotification } from "@/commons/hooks/useWelcomeNotification";
import { WithAuthLayout } from "@/commons/layouts/WithUserLayout";
import { useMe } from "@/commons/services/managers/react-query/queries/user";
import { userPermissions } from "@/commons/utils/user";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Container, Empty, Input, Logo, useTheme } from "in-ui-react";
import { ReactElement, useState } from "react";
import { AppCard, AppCardProps } from "./components/AppCard";
import "./styles.css";
import Lines from "@/commons/components/decoration/Lines";

const Lobby = () => {
  useWelcomeNotification();
  const { theme } = useTheme();
  const [filter, setFilter] = useState("");
  const getClasses = () => {
    // This is cuz the video background doesn't have the right contrast colors and it looks bad
    return `lobby__page ${theme.includes("light") ? "lobby__page--light" : ""}`;
  };

  const { data: user } = useMe();

  const modules: Array<AppCardProps & { key: typeof userPermissions[number] }> =
    [
      {
        logo: null,
        name: "Acquisitions",
        url: "/acquisitions",
        key: "IN_ACQUISITIONS",
      },
      {
        logo: null,
        name: "Debt",
        url: "/debt",
        key: "IN_DEBT",
      },
      {
        logo: null,
        name: "Assets",
        url: "/assets",
        key: "IN_ASSETS",
      },
      {
        logo: null,
        name: "Tools",
        url: "/tools",
        key: "IN_TOOLS",
      },
    ];

  const validUserApps = modules.filter((app) => {
    const userPermissions = user?.modules || [];
    return userPermissions?.includes(app.key);
  });

  const filteredApps = validUserApps.filter((app) =>
    app.name.toLowerCase().includes(filter.toLowerCase())
  );

  const alphabeticallySortedApps = filteredApps.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  useGSAP(() => {
    gsap.fromTo(
      ".lobby-app-card__logo-container-button",
      {
        opacity: 0,
        scale: 0,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: {
          from: "edges",
          amount: 0.25,
        },
        ease: "power4.inOut",
      }
    );
  }, []);

  return (
    <>
      <section data-cy="lobby" className={getClasses()}>
        <div className="flex justify-between w-full">
          <ThemeSelector />
          <LogoutButton className="w-16 h-16" />
        </div>
        <Container className="lobby__container">
          <section>
            <div className="lobby-ei-logo lobby-entrance-animation">
              <Logo theme={theme} />
            </div>
            <div className="flex flex-col items-center justify-center gap-2 lobby-entrance-animation">
              <p className="text-silver">Choose an application</p>
              <Input
                className="max-w-xs mx-auto"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Search app..."
              />
            </div>
          </section>
          <section className="lobby__card-grid">
            {alphabeticallySortedApps.map(({ logo, name, url }) => (
              <AppCard key={name} logo={logo} name={name} url={url} />
            ))}
            {alphabeticallySortedApps.length === 0 ? (
              <Empty description={<p>No app found.</p>} />
            ) : null}
            {/* <AppCard
              logo={alphabeticallySortedApps[0].logo}
              name={alphabeticallySortedApps[0].name}
              url="/export"
            /> */}
          </section>
        </Container>
      </section>
      <Lines />
    </>
  );
};

Lobby.getLayout = (page: ReactElement) => {
  return (
    <>
      <AuthHead title="Lobby" />
      <WithAuthLayout>{page}</WithAuthLayout>
    </>
  );
};

export default Lobby;
