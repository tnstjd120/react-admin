import { Stack } from "@mui/material";
import { QaWorkProvider } from "./QaWorkContext";
import ReceiptsCard from "./left/ReceiptsCard";
import RightCard from "./right/RigthCard";
import TopBar from "./top/TopBar";

const QaWorkPage = () => {
  return (
    <QaWorkProvider>
      <Stack sx={{ height: "calc(100vh - 90px)" }} spacing={2}>
        <TopBar />

        <Stack
          direction="row"
          maxHeight="calc(100% - 76px)"
          spacing={2}
          flex={1}
        >
          <ReceiptsCard />

          <RightCard />
        </Stack>
      </Stack>
    </QaWorkProvider>
  );
};

export default QaWorkPage;
