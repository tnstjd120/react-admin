import {
  TableBody,
  TableCell,
  TableRow,
  TextField,
  styled,
  useTheme,
} from "@mui/material";
import { IconDragDrop } from "@tabler/icons-react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { IQaData } from "@/types/QaData";
import { useTableStore } from "@/store/useTableStore";
import CustomTableSkeleton from "@/components/table/CustomTableSkeleton";
import CustomCheckbox from "@/components/form/CustomCheckbox";
import { useEffect, useState } from "react";
import NumberCommaTextField from "./NumberCommaTextField";

const QaWorkTableBody = () => {
  const theme = useTheme();

  const { rows, selected, setSelected } = useTableStore((state) => state);

  const [formData, setFormData] = useState<IQaData[]>([]);

  useEffect(() => {
    console.log("rows reRendering => ", rows);

    const initializeFormData = rows.map((row, index) => ({
      ...row,
      index: index,
    }));

    setFormData(initializeFormData);
  }, [rows]);

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

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

  const handleInputChange = (
    qaDataId: number,
    fieldKey: string,
    value: string
  ) => {
    const updateFormData = formData.map((row) => {
      if (row.qaDataId === qaDataId)
        return {
          ...row,
          [fieldKey]: value,
        };
      return row;
    });

    setFormData(updateFormData);
  };

  return (
    <>
      {formData ? (
        <Droppable droppableId="qaWorkDroppable">
          {(provider) => (
            <TableBody ref={provider.innerRef} {...provider.droppableProps}>
              {formData.map((row: IQaData | any, index) => {
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
                          <TextField
                            size="small"
                            onChange={(event) =>
                              handleInputChange(
                                row.qaDataId,
                                "treatmentCode",
                                event.target.value
                              )
                            }
                            defaultValue={row.treatmentCode}
                          />
                        </SmallPaddingTableCell>

                        <SmallPaddingTableCell>
                          <TextField
                            size="small"
                            disabled
                            onChange={(event) =>
                              handleInputChange(
                                row.qaDataId,
                                "treatment",
                                event.target.value
                              )
                            }
                            value={row.treatment}
                          />
                        </SmallPaddingTableCell>

                        <SmallPaddingTableCell>
                          <TextField
                            size="small"
                            onChange={(event) =>
                              handleInputChange(
                                row.qaDataId,
                                "dateFrom",
                                event.target.value
                              )
                            }
                            value={row.dateFrom}
                          />
                        </SmallPaddingTableCell>

                        <SmallPaddingTableCell>
                          <TextField
                            size="small"
                            onChange={(event) =>
                              handleInputChange(
                                row.qaDataId,
                                "dateTo",
                                event.target.value
                              )
                            }
                            value={row.dateTo}
                          />
                        </SmallPaddingTableCell>

                        <SmallPaddingTableCell>
                          <TextField
                            size="small"
                            onChange={(event) =>
                              handleInputChange(
                                row.qaDataId,
                                "ediCode",
                                event.target.value
                              )
                            }
                            value={row.ediCode}
                          />
                        </SmallPaddingTableCell>

                        <SmallPaddingTableCell>
                          <TextField
                            size="small"
                            onChange={(event) =>
                              handleInputChange(
                                row.qaDataId,
                                "ediName",
                                event.target.value
                              )
                            }
                            value={row.ediName}
                          />
                        </SmallPaddingTableCell>

                        <SmallPaddingTableCell>
                          <TextField
                            size="small"
                            onChange={(event) =>
                              handleInputChange(
                                row.qaDataId,
                                "price",
                                event.target.value
                              )
                            }
                            value={row.price}
                          />
                        </SmallPaddingTableCell>

                        <SmallPaddingTableCell>
                          <TextField
                            size="small"
                            onChange={(event) =>
                              handleInputChange(
                                row.qaDataId,
                                "cnt",
                                event.target.value
                              )
                            }
                            value={row.cnt}
                          />
                        </SmallPaddingTableCell>

                        <SmallPaddingTableCell>
                          <TextField
                            size="small"
                            onChange={(event) =>
                              handleInputChange(
                                row.qaDataId,
                                "term",
                                event.target.value
                              )
                            }
                            value={row.term}
                          />
                        </SmallPaddingTableCell>

                        <SmallPaddingTableCell>
                          <NumberCommaTextField
                            value={row.total_price}
                            onInputChange={(newValue) =>
                              handleInputChange(
                                row.qaDataId,
                                "total_price",
                                newValue
                              )
                            }
                          />
                        </SmallPaddingTableCell>

                        <SmallPaddingTableCell>
                          <NumberCommaTextField
                            value={row.non_benefit}
                            onInputChange={(newValue) =>
                              handleInputChange(
                                row.qaDataId,
                                "non_benefit",
                                newValue
                              )
                            }
                          />
                        </SmallPaddingTableCell>

                        <SmallPaddingTableCell>
                          <NumberCommaTextField
                            value={row.all_selfpay}
                            onInputChange={(newValue) =>
                              handleInputChange(
                                row.qaDataId,
                                "all_selfpay",
                                newValue
                              )
                            }
                          />
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
