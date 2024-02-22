import { Stack } from "@mui/material";
import ReceiptsCard from "./left/ReceiptsCard";
import RightCard from "./right/RigthCard";
import TopBar from "./top/TopBar";

const QaWorkPage = () => {
  return (
    <Stack sx={{ height: "calc(100vh - 90px)" }} spacing={2}>
      <TopBar />

      <Stack direction="row" maxHeight="calc(100% - 76px)" spacing={2} flex={1}>
        <ReceiptsCard />

        <RightCard />
      </Stack>
    </Stack>
  );
};

export default QaWorkPage;
