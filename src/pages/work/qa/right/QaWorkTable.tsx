import CustomTableHead from "@/components/table/CustomTableHead";
import {
  Box,
  Paper,
  Table,
  TableContainer,
  Typography,
  useTheme,
} from "@mui/material";
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
  const theme = useTheme();
  const borderColor = theme.palette.divider;

  const headCells = [
    {
      id: "treatmentCode",
      label: "항목코드",
      numeric: false,
      useSortable: true,
    },
    {
      id: "treatment",
      label: "항목명",
      numeric: false,
      useSortable: true,
    },
    {
      id: "dateFrom",
      label: (
        <Box>
          진료일자<Typography variant="caption">(From)</Typography>
        </Box>
      ),
      numeric: false,
      useSortable: true,
    },
    {
      id: "dateTo",
      label: (
        <Box>
          진료일자<Typography variant="caption">(To)</Typography>
        </Box>
      ),
      numeric: false,
      useSortable: true,
    },
    {
      id: "ediCode",
      label: "EDI 코드",
      numeric: false,
      useSortable: true,
    },
    {
      id: "ediName",
      label: "EDI 명칭",
      numeric: false,
      useSortable: true,
    },
    {
      id: "price",
      label: "단가",
      numeric: false,
      useSortable: true,
    },
    {
      id: "cnt",
      label: "횟수",
      numeric: false,
      useSortable: true,
    },
    {
      id: "term",
      label: "일수",
      numeric: false,
      useSortable: true,
    },
    {
      id: "total_price",
      label: "총액",
      numeric: false,
      useSortable: true,
    },
    {
      id: "non_benefit",
      label: "비급여",
      numeric: false,
      useSortable: true,
    },
    {
      id: "all_selfpay",
      label: "전액본인부담금",
      numeric: false,
      useSortable: true,
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
        total_price: 0,
        all_selfpay: 0,
        non_benefit: 0,
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
        total_price: 0,
        all_selfpay: 0,
        non_benefit: 0,
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
        total_price: 0,
        all_selfpay: 0,
        non_benefit: 0,
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
        total_price: 0,
        all_selfpay: 0,
        non_benefit: 0,
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
        total_price: 0,
        all_selfpay: 0,
        non_benefit: 0,
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
        total_price: 0,
        all_selfpay: 0,
        non_benefit: 0,
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
        <TableContainer>
          <Table sx={{ position: "relative" }}>
            <CustomTableHead
              headCells={headCells}
              mainKey="qaDataId"
              sticky
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
