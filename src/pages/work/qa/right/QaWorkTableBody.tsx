import {
  TableBody,
  TableCell,
  TableRow,
  TextField,
  styled,
} from "@mui/material";
import { IconDragDrop } from "@tabler/icons-react";
import { Order } from "@/components/table/TableContext";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { IQaData } from "@/types/QaData";
import { useTableStore } from "@/store/useTableStore";
import CustomTableSkeleton from "@/components/table/CustomTableSkeleton";
import CustomCheckbox from "@/components/form/CustomCheckbox";

const QaWorkTableBody = () => {
  const { rows, page, rowsPerPage, order, orderBy, selected, setSelected } =
    useTableStore((state) => state);

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
        <Droppable droppableId="qaWorkDroppable">
          {(provider) => (
            <TableBody ref={provider.innerRef} {...provider.droppableProps}>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: IQaData | any, index) => {
                  const isItemSelected = isSelected(row.qaDataId);
                  const labelId = `table-checkbox-${index}`;
                  return (
                    <Draggable
                      key={row.qaDataId}
                      draggableId={String(row.qaDataId)}
                      index={index}
                    >
                      {(provider) => (
                        <TableRow
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.qaDataId}
                          selected={isItemSelected}
                          ref={provider.innerRef}
                          {...provider.draggableProps}
                        >
                          <SmallPaddingTableCell {...provider.dragHandleProps}>
                            <IconDragDrop />
                          </SmallPaddingTableCell>

                          <SmallPaddingTableCell padding="checkbox">
                            <CustomCheckbox
                              color="primary"
                              checked={isItemSelected}
                              onClick={(event) =>
                                handleClick(event, row.qaDataId)
                              }
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </SmallPaddingTableCell>

                          <SmallPaddingTableCell>
                            <TextField size="small" />
                          </SmallPaddingTableCell>

                          <SmallPaddingTableCell>
                            <TextField size="small" />
                          </SmallPaddingTableCell>

                          <SmallPaddingTableCell>
                            <TextField size="small" />
                          </SmallPaddingTableCell>

                          <SmallPaddingTableCell>
                            <TextField size="small" />
                          </SmallPaddingTableCell>

                          <SmallPaddingTableCell>
                            <TextField size="small" />
                          </SmallPaddingTableCell>

                          <SmallPaddingTableCell>
                            <TextField size="small" />
                          </SmallPaddingTableCell>

                          <SmallPaddingTableCell>
                            <TextField size="small" />
                          </SmallPaddingTableCell>

                          <SmallPaddingTableCell>
                            <TextField size="small" />
                          </SmallPaddingTableCell>

                          <SmallPaddingTableCell>
                            <TextField size="small" />
                          </SmallPaddingTableCell>

                          <SmallPaddingTableCell>
                            <TextField size="small" />
                          </SmallPaddingTableCell>

                          <SmallPaddingTableCell>
                            <TextField size="small" />
                          </SmallPaddingTableCell>

                          <SmallPaddingTableCell>
                            <TextField size="small" />
                          </SmallPaddingTableCell>
                        </TableRow>
                      )}
                    </Draggable>
                  );
                })}

              {provider.placeholder}
            </TableBody>
          )}
        </Droppable>
      ) : (
        <TableBody>
          <CustomTableSkeleton rowsCount={5} />
        </TableBody>
      )}
    </>
  );
};

export default QaWorkTableBody;

const SmallPaddingTableCell = styled(TableCell)(({ theme }) => ({
  padding: "4px",
}));
