import { Box, Stack } from "@mui/material";
import ReceiptsCard from "./left/ReceiptsCard";
import RightCard from "./right/RigthCard";
import TopBar from "./top/TopBar";
import { FormEvent } from "react";
import { API_PATH } from "@/api/API_PATH";
import { api } from "@/api/axios";
import { useQaWorkStore } from "@/store/qaWork/useQaWorkStore";
import { useTableStore } from "@/store/useTableStore";
import { formatNumberWithUncomma } from "@/utils/comma";

const QaWorkPage = () => {
  const { currentImage } = useQaWorkStore((state) => state);
  const { rows } = useTableStore((state) => state);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;

    if (!target.checkValidity()) {
      return alert("입력값을 확인해주세요.");
    }

    const { PATH, METHOD } = API_PATH.QA.QA_DATA_POST;

    const response = await api(PATH, {
      method: METHOD.method,
      data: {
        // imageId: currentImage?.imageId,
        // editQaData: rows.map((row) => {
        //   return {
        //     qaDataId: row.qaDataId,
        //     treatmentCode: row.treatmentCode,
        //     treatment: row.treatment,
        //     dateFrom: row.dateFrom,
        //     dateTo: row.dateTo,
        //     ediCode: row.ediCode,
        //     ediName: row.ediName,
        //     price: formatNumberWithUncomma(String(row.price)),
        //     cnt: row.cnt,
        //     term: row.term,
        //     total_price: formatNumberWithUncomma(String(row.total_price)),
        //     classOfMedicalExpense: row.classOfMedicalExpense,
        //   };
        // }),

        imageId: 13,
        editQaData: [
          {
            qaDataId: 34,
            dateFrom: "20230320",
            treatmentCode: "AB001",
            treatment: "치료재료대",
            dateTo: "20230420",
            ediCode: "AB001",
            ediName: "요양병원간호사2/3이상 확보(1일당)",
            inferenceEdiName: "",
            price: 50000,
            cnt: 2,
            term: 10,
            total_price: 1000000,
            classOfMedicalExpense: "01",
          },
        ],
      },
    });

    console.log("response", response);
  };

  return (
    <>
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
    </>
  );
};

export default QaWorkPage;
