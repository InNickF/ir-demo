import { LoginLayout } from "@/auth/layout/LoginLayout";
import { AuthStates } from "@/auth/typings";
import Lines from "@/commons/components/decoration/Lines";
import { ThemeSelector } from "@/commons/components/general/ThemeSelector";
import { usePrefetchPage } from "@/commons/hooks/usePrefetchPage";
import { useRedirectIfHasSession } from "@/commons/hooks/useRedirectIfHasSession";
import { NextPageWithLayout } from "@/commons/typings";
import { Container, Link, Logo, useTheme } from "in-ui-react";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useRef, useState } from "react";
import { LoginForm } from "./components/LoginForm";
import "./styles.css";

const Login: NextPageWithLayout = () => {
  const router = useRouter();
  const { token } = router.query;
  const { theme } = useTheme();
  const [authState, setAuthState] = useState<AuthStates>("login");
  const [showPage, setShowPage] = useState(false);
  useRedirectIfHasSession({ onNoRedirection: () => setShowPage(true) });
  const pageRef = useRef<HTMLDivElement>(null);
  usePrefetchPage({ url: "/" });

  useEffect(() => {
    if (token) {
      setAuthState("reset");
    } else {
      setAuthState("login");
    }
  }, [token]);

  const AuthForms = () => {
    // if (authState === "login") {
    //   return <LoginForm pageRef={pageRef} />;
    // }
    // if (authState === "forgot") {
    //   return <ForgotForm authStateSwitch={() => switchAuthState("login")} />;
    // }
    // return <ResetForm />;
    return <LoginForm pageRef={pageRef} />;
  };

  const switchAuthState = (to = "login" as AuthStates) => {
    setAuthState(to);
  };

  const getClasses = () => {
    // This is cuz the video background doesn't have the right contrast colors and it looks bad
    return `auth-page ${theme.includes("light") ? "auth-page__light" : ""}`;
  };

  return (
    <>
      {showPage ? (
        <>
          <section ref={pageRef} className={getClasses()}>
            <div className="w-full">
              <ThemeSelector />
            </div>
            <Container className="auth-page__container">
              <div className="auth-page__form-header">
                <Logo theme={theme} className="max-w-[270px!important]" />
              </div>
              <AuthForms />
              <Link
                className={`auth-page__forgot-password-text ${
                  authState === "reset" ? "hidden" : ""
                }`}
                as="button"
                onClick={() =>
                  switchAuthState(authState === "login" ? "forgot" : "login")
                }
              >
                {authState === "login"
                  ? "Forgot password?"
                  : "Login with your credentials"}
              </Link>
            </Container>
            {/* <HeroScene /> */}
          </section>
          <Lines />
        </>
      ) : null}
    </>
  );
};

Login.getLayout = (page: ReactElement) => {
  return <LoginLayout>{page}</LoginLayout>;
};

export default Login;
