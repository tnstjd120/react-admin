import {
  Box,
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { Order, useTableContext } from "./TableContext";
import { visuallyHidden } from "@mui/utils";

const CustomTableHead = () => {
  const { selected, order, setOrder, orderBy, setOrderBy, rows, setSelected } =
    useTableContext();

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n: any) => n.userId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: any
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler =
    (property: any) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={rows.length > 0 && selected.length === rows.length}
            onChange={handleSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.useSortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHead;

interface HeadCellType {
  id: string;
  label: string | React.ReactNode;
  numeric: boolean;
  useSortable: boolean;
}

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
    id: "isUse",
    numeric: false,
    useSortable: true,
    label: "상태",
  },
  {
    id: "createdAt",
    numeric: false,
    useSortable: true,
    label: "가입 일자",
  },
  {
    id: "action",
    numeric: false,
    useSortable: false,
    label: "설정",
  },
];
