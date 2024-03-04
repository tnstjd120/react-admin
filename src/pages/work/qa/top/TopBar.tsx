import {
  Button,
  Card,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
} from "@mui/material";
import CustomDateRange from "@/components/form/CustomDateRange";
import { useQaWorkStore } from "@/store/qaWork/useQaWorkStore";
import { Settings } from "@mui/icons-material";
import QaWorkDrawerSettingsDrawer from "./QaWorkSettingsDrawer";
import { useState } from "react";

const TopBar = () => {
  const { dateRange, setDateRange } = useQaWorkStore((state) => state);

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Card
        sx={{
          maxHeight: "60px",
          minHeight: "60px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CustomDateRange
          defaultDateRange={dateRange}
          onChangeEndDateRange={(dateRange) => setDateRange(dateRange)}
        />

        <Stack direction="row" gap={2}>
          <Button type="submit">QA데이터 저장</Button>
          <Button>롯데 전송</Button>

          <IconButton onClick={() => setDrawerOpen(true)}>
            <Settings />
          </IconButton>
        </Stack>
      </Card>

      <QaWorkDrawerSettingsDrawer
        open={drawerOpen}
        onToggle={(value) => setDrawerOpen(value)}
      />
    </>
  );
};

export default TopBar;
