import { Box, Drawer, IconButton, Typography } from "@mui/material";
import { IconX } from "@tabler/icons-react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  open: boolean;
  onToggle: (value: boolean) => void;
};

const CustomDrawer = ({ children, open, onToggle }: Props) => {
  const handleClose = () => {
    onToggle(false);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { maxWidth: "500px" } }}
    >
      <Box
        display="flex"
        alignItems="center"
        p={3}
        pb={0}
        justifyContent="space-between"
      >
        <Typography variant="h5" fontWeight={600}>
          User Settings
        </Typography>
        <Box>
          <IconButton
            color="inherit"
            sx={{
              color: (theme) => theme.palette.grey.A200,
            }}
            onClick={handleClose}
          >
            <IconX size="1rem" />
          </IconButton>
        </Box>
      </Box>

      {children}
    </Drawer>
  );
};

export default CustomDrawer;
