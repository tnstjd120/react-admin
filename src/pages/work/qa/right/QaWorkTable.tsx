import CustomTableHead from "@/components/table/CustomTableHead";
import { Box, Paper, Table, TableContainer, Typography } from "@mui/material";
import QaWorkTableBody from "./QaWorkTableBody";
import { DragDropContext, OnDragEndResponder } from "@hello-pangea/dnd";
import { useTableStore } from "@/store/useTableStore";
import { useEffect } from "react";

export interface HeadCellType {
  id: string;
  label: string | React.ReactNode;
  numeric: boolean;
  useSortable: boolean;
}

const QaWorkTable = () => {
  const headCells = [
    {
      id: "treatmentCode",
      label: "항목코드",
      numeric: false,
      useSortable: false,
    },
    {
      id: "treatment",
      label: "항목명",
      numeric: false,
      useSortable: false,
    },
    {
      id: "dateFrom",
      label: (
        <Box>
          진료일자<Typography variant="caption">(From)</Typography>
        </Box>
      ),
      numeric: false,
      useSortable: false,
    },
    {
      id: "dateTo",
      label: (
        <Box>
          진료일자<Typography variant="caption">(To)</Typography>
        </Box>
      ),
      numeric: false,
      useSortable: false,
    },
    {
      id: "ediCode",
      label: "EDI 코드",
      numeric: false,
      useSortable: false,
    },
    {
      id: "ediName",
      label: "EDI 명칭",
      numeric: false,
      useSortable: false,
    },
    {
      id: "price",
      label: "단가",
      numeric: false,
      useSortable: false,
    },
    {
      id: "cnt",
      label: "횟수",
      numeric: false,
      useSortable: false,
    },
    {
      id: "term",
      label: "일수",
      numeric: false,
      useSortable: false,
    },
    {
      id: "total_price",
      label: "총액",
      numeric: false,
      useSortable: false,
    },
    {
      id: "non_benefit",
      label: "비급여",
      numeric: false,
      useSortable: false,
    },
    {
      id: "all_selfpay",
      label: "전액본인부담금",
      numeric: false,
      useSortable: false,
    },
  ];

  const { initializeTable, rows, setRows } = useTableStore((state) => state);

  useEffect(() => {
    initializeTable([
      {
        qaDataId: 0,
        imageId: 0,
        imageName: "string",
        isMapping: true,
        isMultiMapping: true,
        clmInfoSeqNo: [0],
        dateFrom: "string",
        isStandardEdi: true,
        treatmentCode: "string",
        treatment: "string",
        dateTo: "string",
        ediCode: "string",
        ediName: "string",
        inferenceEdiName: "string",
        price: 0,
        cnt: 0,
        term: 0,
        total_price: 1111111,
        all_selfpay: 2222222,
        non_benefit: 3333333,
      },
      {
        qaDataId: 1,
        imageId: 0,
        imageName: "string",
        isMapping: true,
        isMultiMapping: true,
        clmInfoSeqNo: [0],
        dateFrom: "string",
        isStandardEdi: true,
        treatmentCode: "string",
        treatment: "string",
        dateTo: "string",
        ediCode: "string",
        ediName: "string",
        inferenceEdiName: "string",
        price: 0,
        cnt: 0,
        term: 0,
        total_price: 1111111,
        all_selfpay: 2222222,
        non_benefit: 3333333,
      },
      {
        qaDataId: 2,
        imageId: 0,
        imageName: "string",
        isMapping: true,
        isMultiMapping: true,
        clmInfoSeqNo: [0],
        dateFrom: "string",
        isStandardEdi: true,
        treatmentCode: "string",
        treatment: "string",
        dateTo: "string",
        ediCode: "string",
        ediName: "string",
        inferenceEdiName: "string",
        price: 0,
        cnt: 0,
        term: 0,
        total_price: 1111111,
        all_selfpay: 2222222,
        non_benefit: 3333333,
      },
      {
        qaDataId: 3,
        imageId: 0,
        imageName: "string",
        isMapping: true,
        isMultiMapping: true,
        clmInfoSeqNo: [0],
        dateFrom: "string",
        isStandardEdi: true,
        treatmentCode: "string",
        treatment: "string",
        dateTo: "string",
        ediCode: "string",
        ediName: "string",
        inferenceEdiName: "string",
        price: 0,
        cnt: 0,
        term: 0,
        total_price: 1111111,
        all_selfpay: 2222222,
        non_benefit: 3333333,
      },
      {
        qaDataId: 4,
        imageId: 0,
        imageName: "string",
        isMapping: true,
        isMultiMapping: true,
        clmInfoSeqNo: [0],
        dateFrom: "string",
        isStandardEdi: true,
        treatmentCode: "string",
        treatment: "string",
        dateTo: "string",
        ediCode: "string",
        ediName: "string",
        inferenceEdiName: "string",
        price: 0,
        cnt: 0,
        term: 0,
        total_price: 1111111,
        all_selfpay: 2222222,
        non_benefit: 3333333,
      },
      {
        qaDataId: 5,
        imageId: 0,
        imageName: "string",
        isMapping: true,
        isMultiMapping: true,
        clmInfoSeqNo: [0],
        dateFrom: "string",
        isStandardEdi: true,
        treatmentCode: "string",
        treatment: "string",
        dateTo: "string",
        ediCode: "string",
        ediName: "string",
        inferenceEdiName: "string",
        price: 0,
        cnt: 0,
        term: 0,
        total_price: 1111111,
        all_selfpay: 2222222,
        non_benefit: 3333333,
      },
    ]);
  }, []);

  const handleDragEnd: OnDragEndResponder = (e) => {
    if (!e.destination) return;

    let tempData = Array.from(rows);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setRows(tempData);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Paper sx={{ minWidth: 1700, borderRadius: 0 }} variant="outlined">
        <TableContainer sx={{ overflow: "visible" }}>
          <Table stickyHeader>
            <CustomTableHead
              headCells={headCells}
              mainKey="qaDataId"
              isCheckedHead
              isDragHead
            />

            <QaWorkTableBody />
          </Table>
        </TableContainer>
      </Paper>
    </DragDropContext>
  );
};

export default QaWorkTable;
