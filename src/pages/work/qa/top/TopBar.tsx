import { Button, Card, IconButton, Stack } from "@mui/material";
import CustomDateRange from "@/components/form/CustomDateRange";
import { useQaWorkStore } from "@/store/qaWork/useQaWorkStore";
import { Settings } from "@mui/icons-material";
import QaWorkDrawerSettingsDrawer from "./QaWorkSettingsDrawer";
import { useState } from "react";
import { useLoadingStore } from "@/store/useLoadingStore";
import { useTableStore } from "@/store/useTableStore";
import { API_PATH } from "@/api/API_PATH";
import { api } from "@/api/axios";
import { IQaDataSaveRequest } from "@/types/QaData";
import { formatNumberWithUncomma } from "@/utils/comma";
import { useSnackbar } from "notistack";
import axios, { AxiosResponse } from "axios";

const TopBar = () => {
  const { dateRange, setDateRange } = useQaWorkStore((state) => state);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const { setIsLoading } = useLoadingStore((state) => state);
  const { currentImage, setQaData } = useQaWorkStore((state) => state);
  const { rows } = useTableStore((state) => state);

  const { enqueueSnackbar } = useSnackbar();

  const handleClickQaSave = async () => {
    try {
      setIsLoading(true);

      const { PATH, METHOD } = API_PATH.QA.QA_DATA_POST;

      const response: AxiosResponse = await api(PATH, {
        method: METHOD.method,
        data: {
          imageId: currentImage?.imageId,
          editQaData: rows.map((row) => {
            const requestData: IQaDataSaveRequest = {
              treatmentCode: row.treatmentCode,
              treatment: row.treatment,
              dateFrom: row.dateFrom,
              dateTo: row.dateTo,
              ediCode: row.ediCode,
              ediName: row.ediName,
              price: formatNumberWithUncomma(String(row.price)),
              cnt: row.cnt,
              term: row.term,
              total_price: formatNumberWithUncomma(String(row.total_price)),
              classOfMedicalExpense: row.classOfMedicalExpense,
            };

            if (typeof row.qaDataId === "number")
              requestData["qaDataId"] = row.qaDataId;

            return requestData;
          }),
        },
      });

      console.log("response", response);

      setQaData(response.data.qaDataLists);

      setIsLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.message;
        enqueueSnackbar(message || "알 수 없는 에러가 발생했습니다.", {
          variant: "error",
        });
      } else {
        console.error(error);
        enqueueSnackbar("알 수 없는 에러가 발생했습니다.", {
          variant: "error",
        });
      }
      setIsLoading(false);
    }
  };

  const openPopup = async () => {
    const url = window.location.origin + "/work/qa/popup";
    let targetScreen = { width: 800, height: 800, left: 0, top: 0 };

    const newWindow = window.open(url, "_blank", "QA Popup");

    try {
      const screenDetails = await (window as any).getScreenDetails();

      if (
        (window.screen as any).isExtended &&
        screenDetails.screens.length > 1
      ) {
        screenDetails.screens.forEach(
          (screen: {
            width: number;
            height: number;
            left: number;
            top: number;
          }) => {
            if (!(screenDetails.currentScreen === screen)) {
              targetScreen = {
                width: screen.width,
                height: screen.height,
                left: screen.left,
                top: screen.top,
              };

              newWindow?.resizeTo(targetScreen.width, targetScreen.height);
              newWindow?.moveTo(targetScreen.left, 0);
            }
          }
        );
      }
    } catch {
      newWindow?.resizeTo(targetScreen.width, targetScreen.height);
      newWindow?.moveTo(targetScreen.left, 0);
    }
  };

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
        <Stack direction="row" gap={2}>
          <CustomDateRange
            defaultDateRange={dateRange}
            onChangeEndDateRange={(dateRange) => setDateRange(dateRange)}
          />

          <Button onClick={openPopup} color="warning" variant="outlined">
            작업창 열기
          </Button>
        </Stack>

        <Stack direction="row" gap={2}>
          <Button onClick={handleClickQaSave}>QA데이터 저장</Button>
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
