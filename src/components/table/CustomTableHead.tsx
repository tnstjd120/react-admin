import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import CustomCheckbox from "../form/CustomCheckbox";
import { useTableStore } from "@/store/useTableStore";

export interface HeadCellType {
  id: string;
  label: string | React.ReactNode;
  numeric: boolean;
  useSortable: boolean;
}

type Props = {
  headCells: readonly HeadCellType[];
  mainKey: string;
  sticky: boolean;
  isCheckedHead?: boolean;
  isDragHead?: boolean;
};

const CustomTableHead = ({
  headCells,
  mainKey,
  sticky = false,
  isCheckedHead = false,
  isDragHead = false,
}: Props) => {
  const { selected, order, setOrder, orderBy, setOrderBy, rows, setSelected } =
    useTableStore((state) => state);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n: any) => n[mainKey]);
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
    <TableHead sx={{ position: sticky ? "sticky" : "static", top: 0 }}>
      <TableRow>
        {isDragHead && <TableCell padding="normal"></TableCell>}

        {isCheckedHead && (
          <TableCell padding="checkbox">
            <CustomCheckbox
              color="primary"
              checked={rows.length > 0 && selected.length === rows.length}
              onChange={handleSelectAllClick}
              inputProps={{
                "aria-label": "전체 선택",
              }}
            />
          </TableCell>
        )}

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
