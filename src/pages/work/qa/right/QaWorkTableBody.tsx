import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Stack,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
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
import NumberFloatTextField from "./NumberFloatTextField";
import { validationRoles } from "./validationQaDataObject";
import { api } from "@/api/axios";
import { API_PATH } from "@/api/API_PATH";
import { useLoadingStore } from "@/store/useLoadingStore";
import EdiSearchModal from "./EdiSearchModal";

interface IQaDataWithValidations extends IQaData {
  validations: { [key: string]: boolean };
}

const QaWorkTableBody = () => {
  const theme = useTheme();

  const setIsLoading = useLoadingStore((state) => state.setIsLoading);
  const { rows, copyRows, setCopyRows, selected } = useTableStore(
    (state) => state
  );
  const [openModal, setOpenModal] = useState(false);
  const [focusQaDataId, setFocusQaDataId] = useState<number | string>("");

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

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

  const getEdiSearchByCode = async (row: IQaDataWithValidations) => {
    setIsLoading(true);

    const { PATH, METHOD } = API_PATH.QA.EDI_BY_CODE_GET;

    try {
      const response = await api.get(PATH, {
        method: METHOD.method,
        params: {
          ediCode: row.ediCode,
        },
      });

      const updateCopyRows = copyRows.map((copyRow) => {
        if (copyRow.qaDataId === row.qaDataId)
          return {
            ...copyRow,
            ediName: response.data.ediName,
            ediCode: response.data.ediCode,
          };
        return row;
      });

      if (!response.data.ediName) {
        handleModalOpen();
        setFocusQaDataId(row.qaDataId);
      }

      setCopyRows(updateCopyRows);
      setIsLoading(false);

      console.log("response => ", response);
    } catch {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<"01" | "02">,
    qaDataId: number,
    CustomValue?: string
  ) => {
    const { name, value } = event.target;

    if (!validationRoles[name](value)) return;

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
                            onChange={(event) =>
                              handleInputChange(event, row.qaDataId)
                            }
                            onBlur={() => getEdiSearchByCode(row)}
                          />
                        </SmallPaddingTableCell>

                        <SmallPaddingTableCell>
                          <TextField
                            size="small"
                            name="ediName"
                            value={row.ediName}
                            disabled
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

      <EdiSearchModal
        openModal={openModal}
        handleModalClose={handleModalClose}
        qaDataId={focusQaDataId}
      />
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
