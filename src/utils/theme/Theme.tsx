import _ from "lodash";
import { createTheme } from "@mui/material/styles";
import { useEffect } from "react";
import components from "./Components";
import typography from "./Typography";
import { shadows, darkshadows } from "./Shadows";
import { DarkThemeColors } from "./DarkThemeColors";
import { LightThemeColors } from "./LightThemeColors";
import { baseDarkTheme, baselightTheme } from "./DefaultColors";
import * as locales from "@mui/material/locale";
import { useStylesStore } from "@/store/useStylesStore";

export const BuildTheme = (config: any = {}) => {
  const themeOptions = LightThemeColors.find(
    (theme) => theme.name === config.theme
  );
  const darkthemeOptions = DarkThemeColors.find(
    (theme) => theme.name === config.theme
  );
  const customizer = useStylesStore((state) => state);
  const defaultTheme =
    customizer.activeMode === "dark" ? baseDarkTheme : baselightTheme;
  const defaultShadow =
    customizer.activeMode === "dark" ? darkshadows : shadows;
  const themeSelect =
    customizer.activeMode === "dark" ? darkthemeOptions : themeOptions;
  const baseMode = {
    palette: {
      mode: customizer.activeMode,
    },
    shape: {
      borderRadius: customizer.borderRadius,
    },
    shadows: defaultShadow,
    typography: typography,
  };
  const theme = createTheme(
    _.merge({}, baseMode, defaultTheme, locales, themeSelect, {
      direction: config.direction,
    })
  );
  theme.components = components(theme);

  return theme;
};

const ThemeSettings = () => {
  const activDir = useStylesStore((state) => state.activeDir);
  const activeTheme = useStylesStore((state) => state.activeTheme);
  const theme = BuildTheme({
    direction: activDir,
    theme: activeTheme,
  });
  useEffect(() => {
    document.dir = activDir;
  }, [activDir]);

  return theme;
};

export { ThemeSettings };
