import AppBar from "@mui/material/AppBar";
import Box, { BoxProps } from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Theme, styled } from "@mui/material/styles";
import { IconMenu2 } from "@tabler/icons-react";
import Notifications from "./Notification";
import Profile from "./Profile";
import ThemeToggle from "./ThemeToggle";
import { useStylesState } from "@/store/useStylesStore";

const Header = () => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

  const { TopbarHeight, toggleSidebar, toggleMobileSidebar } = useStylesState(
    (state) => state
  );

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: TopbarHeight,
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={lgUp ? toggleSidebar : toggleMobileSidebar}
        >
          <IconMenu2 size="20" />
        </IconButton>

        <Box flexGrow={1} />

        <Stack spacing={1} direction="row" alignItems="center">
          <ThemeToggle />
          <Notifications />
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;
