import {
  Popover,
  Stack,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import CustomCheckbox from "../form/CustomCheckbox";
import { useTableStore } from "@/store/useTableStore";
import { MouseEvent, useState } from "react";
import { formatNumberWithComma, formatNumberWithUncomma } from "@/utils/comma";

export interface HeadCellType {
  id: string;
  label: string | React.ReactNode;
  numeric: boolean;
  useSortable: boolean;
  width?: string | number;
  bold?: boolean;
}

type Props = {
  headCells: readonly HeadCellType[];
  mainKey: string;
  paddingSize?: "small" | "medium";
  isCheckedHead?: boolean;
  isDragHead?: boolean;
};

const CustomTableHead = ({
  headCells,
  mainKey,
  paddingSize = "medium",
  isCheckedHead = false,
  isDragHead = false,
}: Props) => {
  const {
    selected,
    order,
    setOrder,
    orderBy,
    setOrderBy,
    rows,
    copyRows,
    setSelected,
  } = useTableStore((state) => state);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const popOverOpen = Boolean(anchorEl);
  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

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
    <TableHead>
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
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              padding: paddingSize === "small" ? "2px 8px" : "16px",
            }}
            width={headCell.width ? headCell.width : "auto"}
          >
            <Stack direction="row">
              {headCell.useSortable ? (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  <Stack>
                    <Typography
                      variant="caption"
                      fontWeight={headCell.bold ? "bold" : "normal"}
                    >
                      {headCell.label}
                    </Typography>
                  </Stack>
                </TableSortLabel>
              ) : (
                <Stack>
                  <Typography
                    variant="caption"
                    fontWeight={headCell.bold ? "bold" : "normal"}
                  >
                    {headCell.label}
                  </Typography>

                  {["total_price", "all_selfpay", "non_benefit"].includes(
                    headCell.id
                  ) && (
                    <Typography variant="caption" fontWeight="bold">
                      {formatNumberWithComma(
                        copyRows.reduce((acc, cur) => {
                          return (acc += formatNumberWithUncomma(
                            String(cur[headCell.id])
                          ));
                        }, 0)
                      )}
                    </Typography>
                  )}
                </Stack>
              )}
            </Stack>
          </TableCell>
        ))}
      </TableRow>

      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={popOverOpen}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>총액: 255,555,555</Typography>
      </Popover>
    </TableHead>
  );
};

export default CustomTableHead;
