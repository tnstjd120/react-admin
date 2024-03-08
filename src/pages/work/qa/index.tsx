import { Box, Stack } from "@mui/material";
import ReceiptsCard from "./left/ReceiptsCard";
import RightCard from "./right/RigthCard";
import TopBar from "./top/TopBar";
import { useEffect } from "react";
import { IQaWorkStore, useQaWorkStore } from "@/store/qaWork/useQaWorkStore";
import { isEqual } from "lodash";
import { IImage } from "@/types/Image";
import { IQaWorkStoreOnlyData } from "./mappingPopup";
import { IQaData } from "@/types/QaData";

const QaWorkPage = () => {
  const { currentImage, setCurrentImage, qaData, setQaData } = useQaWorkStore(
    (state) => state
  );

  useEffect(() => {
    updateStates(useQaWorkStore.getState());

    const onSyncQaWorkStore = (event: StorageEvent) => {
      if (event.key === "qaWorkStore") {
        const newData = JSON.parse(event.newValue as string);

        updateStates(newData.state);
      }
    };

    window.addEventListener("storage", onSyncQaWorkStore);

    return () => {
      window.removeEventListener("storage", onSyncQaWorkStore);
    };
  }, []);

  const updateStates = (newData: IQaWorkStoreOnlyData) => {
    setCurrentImage(
      isEqual(newData.currentImage, currentImage)
        ? (currentImage as IImage)
        : (newData.currentImage as IImage)
    );

    // setQaData(
    //   isEqual(newData.qaData, qaData)
    //     ? (qaData as IQaData[])
    //     : (newData.qaData as IQaData[])
    // );
  };

  return (
    <>
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
    </>
  );
};

export default QaWorkPage;
