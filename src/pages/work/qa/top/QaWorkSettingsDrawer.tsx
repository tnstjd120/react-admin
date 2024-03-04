import Scrollbar from "@/components/common/Scrollbar";
import { CustomFormLabel } from "@/components/form/CustomFormLabel";
import { useQaWorkStore } from "@/store/qaWork/useQaWorkStore";
import {
  Box,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Switch,
  Typography,
} from "@mui/material";
import { IconX } from "@tabler/icons-react";
import { MouseEventHandler } from "react";

type Props = {
  open: boolean;
  onToggle: (value: boolean) => void;
};

const QaWorkDrawerSettingsDrawer = ({ open, onToggle }: Props) => {
  const { withImage, setWithImage } = useQaWorkStore((state) => state);

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
            <Grid item xs={12} display="flex" alignItems="center" pb={3}>
              <Grid item xs={3}>
                <Grid>
                  <CustomFormLabel htmlFor="userIsUse" textAlign="center">
                    썸네일 포함하기
                  </CustomFormLabel>
                </Grid>
                <Grid textAlign="center">
                  <Switch
                    checked={withImage}
                    onChange={() => setWithImage(!withImage)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Scrollbar>
    </Drawer>
  );
};

export default QaWorkDrawerSettingsDrawer;
