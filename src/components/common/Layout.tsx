import { Box, Container, Stack, useTheme } from "@mui/material";
import { ReactNode } from "react";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import { useStylesState } from "@/store/useStylesState";
import { Outlet } from "react-router-dom";

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
  const theme = useTheme();
  const { isCollapse, isLayout, MiniSidebarWidth } = useStylesState.getState();

  return (
    <Stack direction="row" minHeight="100dvh" width="100%">
      <Sidebar />

      <Stack
        flexGrow={1}
        paddingBottom="60px"
        zIndex={1}
        width="100%"
        sx={{
          ...(isCollapse && {
            [theme.breakpoints.up("lg")]: {
              ml: `${MiniSidebarWidth}px`,
            },
          }),
        }}
      >
        <Header />

        <Container
          sx={{
            maxWidth: isLayout === "boxed" ? "lg" : "100%!important",
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{<Outlet />}</Box>
        </Container>
      </Stack>
    </Stack>
  );
};

export default Layout;
