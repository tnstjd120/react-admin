import Scrollbar from "@/components/common/Scrollbar";
import { CustomFormLabel } from "@/components/form/CustomFormLabel";
import {
  Box,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { IconX } from "@tabler/icons-react";
import { MouseEventHandler } from "react";

type Props = {
  open: boolean;
  onToggle: (value: boolean) => void;
};

const QaWorkDrawerSettingsDrawer = ({ open, onToggle }: Props) => {
  const handleClose: MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation();
    onToggle(false);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: { maxWidth: "400px", width: "100%", overflow: "hidden" },
      }}
    >
      <Box
        p={2}
        display="flex"
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Typography variant="h4">정보입력 설정</Typography>

        <IconButton color="inherit" onClick={handleClose}>
          <IconX size="1rem" />
        </IconButton>
      </Box>

      <Divider />

      <Scrollbar sx={{ height: "calc(100vh - 64px)", minWidth: "100%" }}>
        <Box p={3} pt={0}>
          <Grid container>
            <Grid item xs={12} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="userName" sx={{ mt: 0 }}>
                이름
              </CustomFormLabel>
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </Box>
      </Scrollbar>
    </Drawer>
  );
};

export default QaWorkDrawerSettingsDrawer;
