import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import SidebarItems from "./SidebarItems";
import { Profile } from "./SidebarProfile/Profile";
import { useStylesStore } from "@/store/useStylesStore";
import Scrollbar from "../Scrollbar";
import Logo from "../Logo";

const Sidebar = () => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const theme = useTheme();
  const {
    isMobileSidebar,
    isCollapse,
    isSidebarHover,
    MiniSidebarWidth,
    SidebarWidth,
    toggleMobileSidebar,
  } = useStylesStore((state) => state);

  const toggleWidth =
    isCollapse && !isSidebarHover ? MiniSidebarWidth : SidebarWidth;

  if (lgUp) {
    return (
      <Box
        sx={{
          zIndex: 100,
          width: toggleWidth,
          flexShrink: 0,
          ...(isCollapse && {
            position: "absolute",
          }),
        }}
      >
        <Drawer
          anchor="left"
          open
          variant="permanent"
          PaperProps={{
            sx: {
              transition: theme.transitions.create("width", {
                duration: theme.transitions.duration.shortest,
              }),
              width: toggleWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Box
            sx={{
              height: "100%",
            }}
          >
            <Box px={3}>
              <Logo />
            </Box>

            <Scrollbar sx={{ height: "calc(100% - 190px)" }}>
              <SidebarItems />
            </Scrollbar>
            <Profile />
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={isMobileSidebar}
      onClose={toggleMobileSidebar}
      variant="temporary"
      PaperProps={{
        sx: {
          width: SidebarWidth,
          border: "0 !important",
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      <Box px={2}>
        <Logo />
      </Box>
      <SidebarItems />
    </Drawer>
  );
};

export default Sidebar;
