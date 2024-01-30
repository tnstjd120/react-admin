import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { getCookie } from "./cookie";

const themeType = getCookie("theme");

const theme =
  themeType === "light"
    ? createTheme({
        palette: {
          primary: {
            main: "#5D87FF",
          },
          secondary: {
            main: "#19857b",
          },
          error: {
            main: red.A400,
          },
        },
      })
    : createTheme({
        palette: {
          primary: {
            main: "#5D87FF",
          },
          secondary: {
            main: "#19857b",
          },
          error: {
            main: red.A400,
          },
        },
      });

export default theme;
