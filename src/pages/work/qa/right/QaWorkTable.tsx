import CustomTableHead from "@/components/table/CustomTableHead";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableContainer,
  Typography,
  styled,
} from "@mui/material";
import QaWorkTableBody from "./QaWorkTableBody";
import { DragDropContext, OnDragEndResponder } from "@hello-pangea/dnd";
import { useTableStore } from "@/store/useTableStore";
import { useEffect } from "react";
import { useQaWorkStore } from "@/store/qaWork/useQaWorkStore";
import { IconCopy, IconSquarePlus2 } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import { IQaData } from "@/types/QaData";

export interface HeadCellType {
  id: string;
  label: string | React.ReactNode;
  numeric: boolean;
  useSortable: boolean;
}

type Props = {
  propQaData?: IQaData[];
  readonly?: boolean;
};

const QaWorkTable = ({ propQaData, readonly }: Props) => {
  const qaData = propQaData
    ? propQaData
    : useQaWorkStore((state) => state.qaData);
  const { initializeTable, rows, setRows } = useTableStore((state) => state);

  useEffect(() => {
    console.log(location.pathname);

    console.log("qaData", qaData);
    console.log("rows", rows);
  }, [qaData]);

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
      width: "94px",
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
      width: "94px",
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
      width: "250px",
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
      id: "action",
      label: (
        <Stack direction="row">
          <IconButton
            size="small"
            color="primary"
            sx={{ opacity: 0, userSelect: "none", pointerEvents: "none" }}
          >
            <IconSquarePlus2 />
          </IconButton>

          <IconButton
            size="small"
            color="primary"
            sx={{ opacity: 0, userSelect: "none", pointerEvents: "none" }}
          >
            <IconCopy />
          </IconButton>

          <IconButton size="small" color="primary" onClick={() => setRows([])}>
            <IconTrash />
          </IconButton>
        </Stack>
      ),
      numeric: false,
      useSortable: false,
      width: "120px",
    },
  ];

  useEffect(() => {
    initializeTable(qaData);
  }, [qaData]);

  const handleDragEnd: OnDragEndResponder = (e) => {
    if (!e.destination) return;

    let tempData = Array.from(rows);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setRows(tempData);
  };

  return (
    <Box flex={1}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Paper sx={{ minWidth: 1100, borderRadius: 0 }} variant="outlined">
          <TableContainer sx={{ overflow: "visible" }}>
            <Table stickyHeader>
              <CustomTableHead
                headCells={headCells}
                mainKey="qaDataId"
                paddingSize="small"
                isDragHead
                readonly={readonly}
              />

              <QaWorkTableBody propQaData={propQaData} readonly={readonly} />
            </Table>
          </TableContainer>
        </Paper>
      </DragDropContext>
    </Box>
  );
};

export default QaWorkTable;

const SaveButton = styled(Button)(({ theme }) => ({}));
