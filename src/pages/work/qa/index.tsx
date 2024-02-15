import BlankCard from "@/components/common/BlankCard";
import Breadcrumb from "@/components/common/Breadcrumb";
import { Card, Input, Stack } from "@mui/material";
import ReceiptsCard from "./left/ReceiptsCard";
import RightCard from "./RigthCard";
import { QaWorkProvider } from "./QaWorkContext";

const QaWorkPage = () => {
  return (
    <QaWorkProvider>
      <Stack sx={{ height: "calc(100vh - 90px)" }} spacing={2}>
        <Card sx={{ height: "60px", minHeight: "60px" }}>
          <Input type="date" />
        </Card>

        <Stack
          direction="row"
          maxHeight="calc(100% - 76px)"
          spacing={2}
          flex={1}
        >
          <ReceiptsCard />

          <RightCard>
            <div>Right</div>
          </RightCard>
        </Stack>
      </Stack>
    </QaWorkProvider>
  );
};

export default QaWorkPage;
