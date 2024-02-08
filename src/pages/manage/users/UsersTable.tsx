import CustomTable from "@/components/table/CustomTable";
import CustomTableHead from "@/components/table/CustomTableHead";
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

  return (
    <CustomTable>
      <CustomTableToolbar />

      <Paper
        variant="outlined"
        sx={{ mx: 2, mt: 1, mb: 2, border: `1px solid ${borderColor}` }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <CustomTableHead />

            <TableBody>
              <CustomTableRow />
            </TableBody>
          </Table>
        </TableContainer>

        <CustomTablePagination rowsPerPageOptions={[10, 20, 30, 40, 50]} />
      </Paper>
    </CustomTable>
  );
};

export default UsersTable;
