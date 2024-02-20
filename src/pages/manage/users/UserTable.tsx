import CustomTableHead, {
  HeadCellType,
} from "@/components/table/CustomTableHead";
import CustomTablePagination from "@/components/table/CustomTablePagination";
import CustomTableToolbar from "@/components/table/CustomTableToolbar";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  useTheme,
} from "@mui/material";
import UserTableBody from "./UserTableBody";
import { useTableStore } from "@/store/useTableStore";
import { API_PATH } from "@/api/API_PATH";
import { api } from "@/api/axios";
import { useEffect } from "react";

const UserTable = () => {
  const theme = useTheme();
  const borderColor = theme.palette.divider;

  const getUsers = async () => {
    const { PATH, METHOD } = API_PATH.USERS.USERS_INFO_GET;
    return await api(PATH, METHOD);
  };

  const { initializeTable } = useTableStore((state) => state);

  useEffect(() => {
    const getUsersInfo = async () => {
      const response = await getUsers();
      initializeTable(response.data.userLists);
    };

    getUsersInfo();
  }, []);

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
    <Box>
      <CustomTableToolbar />

      <Paper
        variant="outlined"
        sx={{ mx: 2, mt: 1, mb: 2, border: `1px solid ${borderColor}` }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <CustomTableHead
              headCells={headCells}
              mainKey="userId"
              isCheckedHead
            />

            <UserTableBody />
          </Table>
        </TableContainer>

        <CustomTablePagination
          rowsPerPageOptions={[1, 2, 3, 10, 20, 30, 40, 50]}
        />
      </Paper>
    </Box>
  );
};

export default UserTable;
