import {
  Avatar,
  Badge,
  Box,
  Checkbox,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  MenuProps,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { IconDotsVertical, IconEdit } from "@tabler/icons-react";
import { UserInfoResponse } from "@/types/User";
import { Order, useTableContext } from "./TableContext";
import CustomTableSkeleton from "./CustomTableSkeleton";
import { API_PATH } from "@/api/API_PATH";
import { api } from "@/api/axios";
import { EditNotifications } from "@mui/icons-material";

type Props = {
  rows: UserInfoResponse[];
  order: Order;
  orderBy: string;
  page: number;
  rowsPerPage: number;
  selected: readonly string[];
  handleClick: (event: React.MouseEvent<unknown>, name: string) => void;
};

const CustomTableRow = () => {
  const {
    rows,
    setRows,
    page,
    rowsPerPage,
    order,
    orderBy,
    selected,
    setSelected,
  } = useTableContext();

  const getUsers = async () => {
    const { PATH, METHOD } = API_PATH.USERS.USERS_INFO_GET;
    return await api(PATH, METHOD);
  };

  useEffect(() => {
    const getUsersInfo = async () => {
      const response = await getUsers();
      setRows(response.data.userLists);
    };

    getUsersInfo();
  }, []);

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }

    return 0;
  }

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string | boolean | null },
    b: { [key in Key]: number | string | boolean | null }
  ) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }

      return a[1] - b[1];
    });

    return stabilizedThis.map((el) => el[0]);
  }

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleSettingsClick: React.MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleSettingsClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  return (
    <>
      {rows.length ? (
        stableSort(rows, getComparator(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row: UserInfoResponse | any, index) => {
            const isItemSelected = isSelected(row.userId);
            const labelId = `table-checkbox-${index}`;

            return (
              <TableRow
                hover
                onClick={(event) => handleClick(event, row.userId)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.userId}
                selected={isItemSelected}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                  />
                </TableCell>

                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Tooltip
                      title={
                        row.activeStatus === 0
                          ? "오프라인"
                          : row.activeStatus === 1
                          ? "온라인"
                          : "자리비움"
                      }
                      arrow
                    >
                      <Badge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        color={row.activeStatus === 1 ? "success" : "warning"}
                        sx={{
                          "& .MuiBadge-badge": {
                            backgroundColor:
                              row.activeStatus === 0 ? grey[500] : "",
                          },
                        }}
                        badgeContent=" "
                      >
                        <Avatar
                          src={`data:image/jpeg;base64,${row.profileImage}`}
                          alt={`${row.userName} 프로필 이미지`}
                          sx={{ width: 56, height: 56 }}
                        />
                      </Badge>
                    </Tooltip>
                    <Box
                      sx={{
                        ml: 2,
                      }}
                    >
                      <Typography variant="h6" fontWeight="600">
                        {row.userName}
                      </Typography>

                      <Typography color="textSecondary" variant="subtitle2">
                        {row.roleLabel}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell>
                  <Typography variant="subtitle2">{row.userId}</Typography>
                </TableCell>

                <TableCell>
                  <Chip
                    color={row.isUse ? "success" : "error"}
                    size="small"
                    label={row.isUse ? "승인" : "미승인"}
                    sx={{
                      borderRadius: "6px",
                    }}
                  />
                </TableCell>

                <TableCell>
                  <Typography>
                    {dayjs(new Date(row.createdAt as string)).format(
                      "YYYY. MM. DD"
                    )}
                  </Typography>
                </TableCell>

                <TableCell width={60}>
                  <Tooltip title="사용자 설정">
                    <IconButton size="small" onClick={handleSettingsClick}>
                      <IconDotsVertical size="1.1rem" />
                    </IconButton>
                  </Tooltip>

                  <StyledMenu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleSettingsClose}
                  >
                    <MenuItem onClick={handleSettingsClose} disableRipple>
                      <IconEdit />
                      Edit
                    </MenuItem>
                  </StyledMenu>
                </TableCell>
              </TableRow>
            );
          })
      ) : (
        <CustomTableSkeleton rowsCount={10} />
      )}
    </>
  );
};

export default CustomTableRow;

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
