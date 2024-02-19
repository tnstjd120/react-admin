import CustomTable from "@/components/table/CustomTable";
import CustomTableHead from "@/components/table/CustomTableHead";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
  useTheme,
} from "@mui/material";
import QaWorkTableRow from "./QaWorkTableRow";

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
      id: "treatment",
      label: "항목명",
      numeric: false,
      useSortable: true,
    },
    {
      id: "treatmentCode",
      label: "항목코드",
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
  ];

  return (
    <CustomTable>
      <Paper variant="outlined">
        <TableContainer>
          <Table>
            <CustomTableHead headCells={headCells} />
            <TableBody>
              <QaWorkTableRow />
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </CustomTable>
  );
};

export default QaWorkTable;
