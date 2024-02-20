import { useState } from "react";
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import * as dropdownData from "./data";

import { Stack } from "@mui/system";
import { useUserState } from "@/store/useUserStore";
import { logout } from "@/auth/logout";
import { Link } from "react-router-dom";

const Profile = () => {
  const me = useUserState((state) => state.user);

  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleLogout = () => logout();

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={`data:image/jpeg;base64,${me?.profileImage}`}
          alt={"ProfileImg"}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>

      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "450px",
            p: 4,
          },
        }}
      >
        <Stack direction="row" pb={3} spacing={2} alignItems="center">
          <Avatar
            src={`data:image/jpeg;base64,${me?.profileImage}`}
            alt="프로필 이미지"
            sx={{ width: 95, height: 95 }}
          />
          <Box>
            <Box display="flex" alignItems="flex-end" gap={1}>
              <Typography
                variant="h5"
                color="textPrimary"
                fontWeight={600}
                display="flex"
                alignItems="center"
                gap={1}
              >
                {me?.userName}
              </Typography>

              <Typography
                variant="subtitle2"
                color="textSecondary"
                fontWeight={300}
              >
                {me?.roleLabel}
              </Typography>
            </Box>

            <Divider sx={{ margin: "5px 0" }} />

            <Typography variant="subtitle1" color="textSecondary">
              {me?.userId}
            </Typography>
            {/* <Typography
                variant="subtitle2"
                color="textSecondary"
                fontWeight={300}
              >
                {me?.roleLabel}
              </Typography> */}
          </Box>
        </Stack>
        <Divider />
        {dropdownData.profile.map((profile) => (
          <Box key={profile.title}>
            <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
              <Link to={profile.href}>
                <Stack direction="row" spacing={2}>
                  <Box
                    width="45px"
                    height="45px"
                    bgcolor="primary.light"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink="0"
                  >
                    <Avatar
                      src={profile.icon}
                      alt={profile.icon}
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: 0,
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color="textPrimary"
                      className="text-hover"
                      noWrap
                      sx={{
                        width: "240px",
                      }}
                    >
                      {profile.title}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      sx={{
                        width: "240px",
                      }}
                      noWrap
                    >
                      {profile.subtitle}
                    </Typography>
                  </Box>
                </Stack>
              </Link>
            </Box>
          </Box>
        ))}
        <Box mt={2}>
          <Box
            bgcolor="primary.light"
            p={3}
            mb={3}
            overflow="hidden"
            position="relative"
          >
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Typography variant="h5" mb={2}>
                  QuantumAI에 <br />
                  바라는게 있나요?
                </Typography>
                <Button variant="contained" color="primary">
                  요청하기
                </Button>
              </Box>
              <img
                src={"/images/backgrounds/unlimited-bg.png"}
                width={150}
                height={183}
                alt="unlimited"
                className="signup-bg"
              />
            </Box>
          </Box>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleLogout}
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
