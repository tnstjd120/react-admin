import { Box, Skeleton, TableCell, TableRow } from "@mui/material";

const CustomTableSkeleton = ({ rowsCount = 10 }: { rowsCount: number }) => {
  return Array(rowsCount)
    .fill(0)
    .map((_, index) => (
      <TableRow key={index}>
        <TableCell>
          <Skeleton variant="rounded" height={20} width={20} />
        </TableCell>
        <TableCell>
          <Box display="flex" alignItems="center" gap={1}>
            <Skeleton variant="circular" height={40} width={40} />
            <Skeleton variant="rounded" height={32} width="calc(100% - 40px)" />
          </Box>
        </TableCell>
        <TableCell>
          <Skeleton variant="rounded" height={32} width="100%" />
        </TableCell>
        <TableCell>
          <Skeleton variant="rounded" height={32} width="100%" />
        </TableCell>
        <TableCell>
          <Skeleton variant="rounded" height={32} width="100%" />
        </TableCell>
        <TableCell>
          <Skeleton variant="rounded" height={32} width="100%" />
        </TableCell>
      </TableRow>
    ));
};

export default CustomTableSkeleton;
