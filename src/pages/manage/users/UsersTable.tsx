import CustomTable from "@/components/table/CustomTable";
import CustomTableHead, {
  HeadCellType,
} from "@/components/table/CustomTableHead";
import CustomTablePagination from "@/components/table/CustomTablePagination";
import CustomTableRow from "@/components/table/CustomTableRow";
import CustomTableToolbar from "@/components/table/CustomTableToolbar";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  useTheme,
} from "@mui/material";

const UsersTable = () => {
  const theme = useTheme();
  const borderColor = theme.palette.divider;

  const headCells: readonly HeadCellType[] = [
    {
      id: "userName",
      numeric: false,
      useSortable: true,
      label: "프로필",
    },
    {
      id: "userId",
      numeric: false,
      useSortable: true,
      label: "아이디",
    },
    {
      id: "createdAt",
      numeric: false,
      useSortable: true,
      label: "가입 일자",
    },
    {
      id: "isUse",
      numeric: false,
      useSortable: true,
      label: "승인 상태",
    },
    {
      id: "isPossAssign",
      numeric: false,
      useSortable: true,
      label: "배정 상태",
    },
    {
      id: "action",
      numeric: false,
      useSortable: false,
      label: "설정",
    },
  ];

  return (
    <CustomTable>
      <CustomTableToolbar />

      <Paper
        variant="outlined"
        sx={{ mx: 2, mt: 1, mb: 2, border: `1px solid ${borderColor}` }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <CustomTableHead headCells={headCells} />

            <TableBody>
              <CustomTableRow />
            </TableBody>
          </Table>
        </TableContainer>

        <CustomTablePagination
          rowsPerPageOptions={[1, 2, 3, 10, 20, 30, 40, 50]}
        />
      </Paper>
    </CustomTable>
  );
};

export default UsersTable;
