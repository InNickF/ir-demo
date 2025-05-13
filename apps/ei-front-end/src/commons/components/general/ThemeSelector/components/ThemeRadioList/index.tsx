import { Heading, Radio, themes, useTheme } from "in-ui-react";
import { SoundButton } from "../../../SoundButton";
import { themeSelectorCSSPrefix } from "../../../ThemeSelector";
import "./styles.css";

const themesLabels: Record<typeof themes[number], string> = {
  "Default-light": "Base (Light)",
  "Default-dark": "Base (Dark)",
  "Minimal-light": "Minimal (Light)",
  "Minimal-dark": "Minimal (Dark)",
};

export const ThemeRadioList = () => {
  const { theme, changeThemeTo } = useTheme();
  const prefix = `${themeSelectorCSSPrefix}__radio-list`;

  const getListContainerClasses = () => {
    const classes = [prefix];
    return classes.join(" ");
  };

  return (
    <div className="p-3" onClick={(e) => e.stopPropagation()}>
      <header className={`${themeSelectorCSSPrefix}__header`}>
        <Heading kind="h5">Themes</Heading>
        <SoundButton />
      </header>
      <div className={getListContainerClasses()}>
        {themes.map((themeName) => {
          const themeLabel = themesLabels[themeName];
          const isSelected = theme === themeName;
          return (
            <Radio
              key={themeName}
              label={themeLabel}
              checked={isSelected}
              onChange={(e) => {
                e.stopPropagation();
                changeThemeTo(themeName);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
