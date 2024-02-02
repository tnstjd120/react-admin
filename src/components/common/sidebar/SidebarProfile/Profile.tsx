import { logout } from "@/auth/logout";
import { useStylesState } from "@/store/useStylesState";
import { useUserState } from "@/store/useUserState";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  useMediaQuery,
  Theme,
} from "@mui/material";
import { IconPower } from "@tabler/icons-react";

export const Profile = () => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

  const { isCollapse, isSidebarHover } = useStylesState((state) => state);
  const me = useUserState((state) => state.user);

  const hideMenu = lgUp ? isCollapse && !isSidebarHover : "";

  const handleLogout = () => logout();

  return (
    <Box
      display={"flex"}
      alignItems="center"
      justifyContent="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${"secondary.light"}` }}
    >
      <Avatar
        src={`data:image/jpeg;base64,${me?.profileImage}`}
        alt="프로필 이미지"
        sx={{ height: hideMenu ? 24 : 40, width: hideMenu ? 24 : 40 }}
      />

      {!hideMenu ? (
        <>
          <Box>
            <Typography variant="h6">{me?.userName}</Typography>
            <Typography variant="caption">{me?.userId}</Typography>
          </Box>
          <Box sx={{ ml: "auto" }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                color="primary"
                aria-label="logout"
                size="small"
                onClick={handleLogout}
              >
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ""
      )}
    </Box>
  );
};
