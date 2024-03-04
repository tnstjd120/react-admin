import CustomTableHead from "@/components/table/CustomTableHead";
import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Paper,
  Table,
  TableContainer,
  Typography,
} from "@mui/material";
import QaWorkTableBody from "./QaWorkTableBody";
import { DragDropContext, OnDragEndResponder } from "@hello-pangea/dnd";
import { useTableStore } from "@/store/useTableStore";
import { useEffect } from "react";
import { useQaWorkStore } from "@/store/qaWork/useQaWorkStore";
import { IconDotsVertical } from "@tabler/icons-react";

export interface HeadCellType {
  id: string;
  label: string | React.ReactNode;
  numeric: boolean;
  useSortable: boolean;
}

const QaWorkTable = () => {
  const headCells = [
    // {
    //   id: "treatmentCode",
    //   label: "항목코드",
    //   numeric: false,
    //   useSortable: false,
    // },
    // {
    //   id: "treatment",
    //   label: "항목명",
    //   numeric: false,
    //   useSortable: false,
    // },
    {
      id: "classOfMedicalExpense",
      label: "진료비구분",
      numeric: false,
      useSortable: false,
    },
    {
      id: "dateFrom",
      label: (
        <Box>
          진료일자 <br />
          <Typography variant="caption" fontWeight="bold">
            (From)
          </Typography>
        </Box>
      ),
      numeric: false,
      useSortable: false,
      width: "90px",
    },
    {
      id: "dateTo",
      label: (
        <Box>
          진료일자
          <br />
          <Typography variant="caption" fontWeight="bold">
            (To)
          </Typography>
        </Box>
      ),
      numeric: false,
      useSortable: false,
      width: "90px",
    },
    {
      id: "ediCode",
      label: "EDI 코드",
      numeric: false,
      useSortable: false,
      width: "140px",
    },
    {
      id: "ediName",
      label: "EDI 명칭",
      numeric: false,
      useSortable: false,
      width: "140px",
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
      width: "54px",
    },
    {
      id: "term",
      label: "일수",
      numeric: false,
      useSortable: false,
      width: "54px",
    },
    {
      id: "total_price",
      label: "총액",
      numeric: false,
      useSortable: false,
    },
    // {
    //   id: "non_benefit",
    //   label: "비급여",
    //   numeric: false,
    //   useSortable: false,
    // },
    // {
    //   id: "all_selfpay",
    //   label: "전액본인부담금",
    //   numeric: false,
    //   useSortable: false,
    // },
    {
      id: "setting",
      label: (
        <IconButton size="small">
          <IconDotsVertical />
        </IconButton>
      ),
      numeric: false,
      useSortable: false,
    },
  ];

  const { qaData } = useQaWorkStore((state) => state);
  const { initializeTable, copyRows, setCopyRows } = useTableStore(
    (state) => state
  );

  useEffect(() => {
    initializeTable(qaData);
  }, [qaData]);

  const handleDragEnd: OnDragEndResponder = (e) => {
    if (!e.destination) return;

    let tempData = Array.from(copyRows);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setCopyRows(tempData);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Paper sx={{ minWidth: 1100, borderRadius: 0 }} variant="outlined">
        <TableContainer sx={{ overflow: "visible" }}>
          <Table stickyHeader>
            <CustomTableHead
              headCells={headCells}
              mainKey="qaDataId"
              paddingSize="small"
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
