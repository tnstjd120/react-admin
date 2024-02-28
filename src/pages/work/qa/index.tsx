import { Box, Stack } from "@mui/material";
import ReceiptsCard from "./left/ReceiptsCard";
import RightCard from "./right/RigthCard";
import TopBar from "./top/TopBar";
import { FormEvent } from "react";

const QaWorkPage = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    console.log("e.target.checkValidity()", target.checkValidity());
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
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
    </Box>
  );
};

export default QaWorkPage;
