import {
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  styled,
  useTheme,
} from "@mui/material";
import { IconDotsVertical, IconDragDrop } from "@tabler/icons-react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { IQaData } from "@/types/QaData";
import { useTableStore } from "@/store/useTableStore";
import CustomTableSkeleton from "@/components/table/CustomTableSkeleton";
import { ChangeEvent, useEffect, useState } from "react";
import NumberCommaTextField from "./NumberCommaTextField";
import { SearchOutlined } from "@mui/icons-material";
import NumberFloatTextField from "./NumberFloatTextField";
import { useQaWorkStore } from "@/store/qaWork/useQaWorkStore";

interface IQaDataWithValidations extends IQaData {
  validations: { [key: string]: boolean };
}

const QaWorkTableBody = () => {
  const theme = useTheme();

  const { rows, copyRows, setCopyRows, selected, setSelected } = useTableStore(
    (state) => state
  );

  // const [formData, setFormData] = useState<IQaDataWithValidations[]>([]);

  useEffect(() => {
    const initializeFormData = copyRows.map((row, index) => {
      const initializeValidations = Object.keys(row).reduce((acc, key) => {
        return { ...acc, [key]: true };
      }, {});

      return {
        ...row,
        index: index,
        validations: initializeValidations,
      };
    });

    setCopyRows(initializeFormData);
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
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<"01" | "02">,
    qaDataId: number,
    CustomValue?: string
  ) => {
    const { name, value } = event.target;

    const updateFormData = copyRows.map((row) => {
      if (row.qaDataId === qaDataId) {
        const valid =
          "validity" in event.target ? event.target.validity.valid : true;

        return {
          ...row,
          [name]: CustomValue ? CustomValue : value,
          validations: { ...row.validations, [name]: valid },
        };
      }

      return row;
    });

    setCopyRows(updateFormData);
  };

  const validationCheck = (row: IQaDataWithValidations, name: string) => {
    return row?.validations?.[name] ? false : true;
  };

  return (
    <>
      {copyRows ? (
        <Droppable droppableId="qaWorkDroppable">
          {(provider) => (
            <TableBody ref={provider.innerRef} {...provider.droppableProps}>
              {copyRows.map((row: IQaDataWithValidations, index) => {
                const isItemSelected = isSelected(String(row.qaDataId));

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

                        <SmallPaddingTableCell {...provider.dragHandleProps}>
                          <Select
                            name="classOfMedicalExpense"
                            value={row.classOfMedicalExpense}
                            size="small"
                            onChange={(event) =>
                              handleInputChange(event, row.qaDataId)
                            }
                          >
                            <MenuItem value="01">비급여</MenuItem>
                            <MenuItem value="02">전액본인부담금</MenuItem>
                          </Select>
                        </SmallPaddingTableCell>
                        {/* 
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
                        </SmallPaddingTableCell> */}

                        {/* <SmallPaddingTableCell>
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
                        </SmallPaddingTableCell> */}

                        <SmallPaddingTableCell>
                          <TextField
                            size="small"
                            name="dateFrom"
                            value={row.dateFrom}
                            error={validationCheck(row, "dateFrom")}
                            required
                            inputProps={{
                              maxLength: 8,
                              pattern: "^[0-9]{8}$",
                            }}
                            onChange={(event) =>
                              handleInputChange(event, row.qaDataId)
                            }
                          />
                        </SmallPaddingTableCell>

                        <SmallPaddingTableCell>
                          <TextField
                            size="small"
                            name="dateTo"
                            value={row.dateTo}
                            error={validationCheck(row, "dateTo")}
                            inputProps={{
                              maxLength: 8,
                              pattern: "^(\\d{8}|)$",
                            }}
                            onChange={(event) =>
                              handleInputChange(event, row.qaDataId)
                            }
                          />
                        </SmallPaddingTableCell>

                        <SmallPaddingTableCell>
                          <TextField
                            size="small"
                            name="ediCode"
                            value={row.ediCode}
                            required
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton sx={{ p: 0 }}>
                                    <SearchOutlined />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            onChange={(event) =>
                              handleInputChange(event, row.qaDataId)
                            }
                          />
                        </SmallPaddingTableCell>

                        <SmallPaddingTableCell>
                          <TextField
                            size="small"
                            name="ediName"
                            value={row.ediName}
                            required
                            onChange={(event) =>
                              handleInputChange(event, row.qaDataId)
                            }
                          />
                        </SmallPaddingTableCell>

                        <SmallPaddingTableCell>
                          <NumberCommaTextField
                            name="price"
                            value={row.price}
                            onInputChange={(event, newValue) =>
                              handleInputChange(event, row.qaDataId, newValue)
                            }
                          />
                        </SmallPaddingTableCell>

                        <SmallPaddingTableCell>
                          <NumberFloatTextField
                            size="small"
                            name="cnt"
                            value={row.cnt}
                            onInputChange={(event, newValue) =>
                              handleInputChange(event, row.qaDataId, newValue)
                            }
                          />
                        </SmallPaddingTableCell>

                        <SmallPaddingTableCell>
                          <NumberFloatTextField
                            size="small"
                            name="term"
                            value={row.term}
                            onInputChange={(event, newValue) =>
                              handleInputChange(event, row.qaDataId, newValue)
                            }
                          />
                        </SmallPaddingTableCell>

                        <SmallPaddingTableCell>
                          <NumberCommaTextField
                            name="total_price"
                            value={row.total_price}
                            onInputChange={(event, newValue) => {
                              console.log(
                                "evnet.target.value",
                                event.target.value
                              );
                              console.log("newValue", newValue);

                              return handleInputChange(
                                event,
                                row.qaDataId,
                                newValue
                              );
                            }}
                          />
                        </SmallPaddingTableCell>

                        {/* <SmallPaddingTableCell>
                          <NumberCommaTextField
                            name="non_benefit"
                            value={row.non_benefit}
                            sx={{
                              ".MuiInputBase-root": { paddingRight: "4px" },
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end" sx={{ ml: 0 }}>
                                  <Radio
                                    size="small"
                                    name="classOfMedicalExpense"
                                    id={`non_benefit_radio_${row.qaDataId}`}
                                    value="01"
                                    tabIndex={-1}
                                    sx={{ p: 0 }}
                                    defaultChecked
                                  />
                                </InputAdornment>
                              ),
                            }}
                            onInputChange={(event, newValue) =>
                              handleInputChange(event, row.qaDataId, newValue)
                            }
                          />
                        </SmallPaddingTableCell>

                        <SmallPaddingTableCell>
                          <NumberCommaTextField
                            name="all_selfpay"
                            value={row.all_selfpay}
                            sx={{
                              ".MuiInputBase-root": { paddingRight: "4px" },
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end" sx={{ ml: 0 }}>
                                  <Radio
                                    size="small"
                                    name="classOfMedicalExpense"
                                    id={`all_selfpay_radio_${row.qaDataId}`}
                                    value="02"
                                    tabIndex={-1}
                                    sx={{ p: 0 }}
                                  />
                                </InputAdornment>
                              ),
                            }}
                            onInputChange={(event, newValue) =>
                              handleInputChange(event, row.qaDataId, newValue)
                            }
                          />
                        </SmallPaddingTableCell> */}

                        <SmallPaddingTableCell>
                          <Stack>
                            <IconButton size="small">
                              <IconDotsVertical />
                            </IconButton>
                          </Stack>
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

  "& input": {
    padding: "8px !important",
  },
}));
