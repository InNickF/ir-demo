import { Logo as RawLogo, LogoProps, useTheme } from "in-ui-react";
import { FC } from "react";

const Logo: FC<Exclude<LogoProps, "theme">> = (props) => {
  const { theme } = useTheme();
  return <RawLogo {...props} theme={theme} />;
};

export default Logo;
