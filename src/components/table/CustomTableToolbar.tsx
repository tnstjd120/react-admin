import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import { IconDotsVertical, IconFilter, IconSearch } from "@tabler/icons-react";
import { useTableContext } from "./TableContext";
import { ChangeEventHandler } from "react";
import { UserInfoResponse } from "@/types/User";

const CustomTableToolbar = () => {
  const { rows, setRows, selected, search, setSearch } = useTableContext();

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
    const filteredRows: UserInfoResponse[] = rows.filter(
      (row: UserInfoResponse) => {
        return row.userName.toLowerCase().includes(event.target.value);
      }
    );
    setSearch(event.target.value);
    setRows(filteredRows);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selected.length > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {selected.length > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle2"
          component="div"
        >
          {selected.length} 선택됨
        </Typography>
      ) : (
        <Box sx={{ flex: "1 1 100%" }}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch size="1.1rem" />
                </InputAdornment>
              ),
            }}
            placeholder="검색어를 입력해주세요"
            size="small"
            onChange={handleSearch}
            value={search}
          />
        </Box>
      )}

      {selected.length > 0 ? (
        <Box display="flex">
          <Tooltip title="설정">
            <IconButton>
              <IconDotsVertical size="1.1rem" />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <IconFilter size="1.2rem" />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default CustomTableToolbar;
