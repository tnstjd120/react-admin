import BlankCard from "@/components/common/BlankCard";
import Breadcrumb from "@/components/common/Breadcrumb";
import { Card, Input, Stack } from "@mui/material";
import LeftCard from "./LeftCard";
import RightCard from "./RigthCard";

const BCrumb = [
  {
    title: "Work",
  },
  {
    title: "정보 입력",
  },
];

const QaWorkPage = () => {
  return (
    <>
      {/* <Breadcrumb title="정보 입력" items={BCrumb} /> */}

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
          <LeftCard />

          <RightCard>
            <div>Right</div>
          </RightCard>
        </Stack>
      </Stack>
    </>
  );
};

export default QaWorkPage;
