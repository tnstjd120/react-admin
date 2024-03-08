import {
  Button,
  IconButton,
  MenuItem,
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
import {
  IconCopy,
  IconDragDrop,
  IconSquarePlus2,
  IconTrash,
} from "@tabler/icons-react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { IQaData } from "@/types/QaData";
import { useTableStore } from "@/store/useTableStore";
import { ChangeEvent, useEffect, useState } from "react";
import NumberCommaTextField from "./NumberCommaTextField";
import NumberFloatTextField from "./NumberFloatTextField";
import { validationRoles } from "./validationQaDataObject";
import { api } from "@/api/axios";
import { API_PATH } from "@/api/API_PATH";
import { useLoadingStore } from "@/store/useLoadingStore";
import EdiSearchModal from "./EdiSearchModal";
import { formatNumberWithUncomma } from "@/utils/comma";
import { useQaWorkStore } from "@/store/qaWork/useQaWorkStore";
import { isEqual } from "lodash";
import CustomCheckbox from "@/components/form/CustomCheckbox";

interface IQaDataWithValidations extends IQaData {
  validations: { [key: string]: boolean };
}

type Props = {
  propQaData?: IQaData[];
  readonly?: boolean;
};

const generateUniqueId = () => {
  return `id-${new Date().getTime()}`;
};

const generateQaData = () => ({
  qaDataId: generateUniqueId(),
  imageId: 0,
  imageName: "",
  isMapping: false,
  isMultiMapping: false,
  clmInfoSeqNo: [],
  dateFrom: "",
  isStandardEdi: false,
  treatmentCode: "",
  treatment: "",
  dateTo: "",
  ediCode: "",
  ediName: "",
  inferenceEdiName: "",
  price: 0,
  cnt: 0,
  term: 0,
  total_price: 0,
  all_selfpay: 0,
  non_benefit: 0,
  classOfMedicalExpense: "01",
  validations: {},
});

const QaWorkTableBody = ({ propQaData, readonly }: Props) => {
  const theme = useTheme();
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  const { rows, setRows, selected, setSelected } = useTableStore(
    (state) => state
  );
  const qaData = propQaData
    ? propQaData
    : useQaWorkStore((state) => state.qaData);

  const [openModal, setOpenModal] = useState(false);
  const [focusQaDataId, setFocusQaDataId] = useState<number | string>("");

  useEffect(() => {
    const initializeRows = qaData.map((row) => {
      const initializeValidations = Object.entries(row).reduce(
        (acc, [key, value]) => {
          if (!validationRoles?.[key]) return acc;
          return { ...acc, [key]: validationRoles[key](String(value)) };
        },
        {}
      );
      return {
        ...row,
        validations: initializeValidations,
      };
    });
    setRows(initializeRows);
  }, [qaData]);

  useEffect(() => {
    if (rows.length)
      console.log("rows 업데이트 됨:", JSON.parse(JSON.stringify(rows)));

    console.log("selected => ", selected);
  }, [rows, selected]);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const getEdiSearchByCode = async (
    qaDataId: number | string,
    ediCode: string
  ) => {
    setIsLoading(true);

    const { PATH, METHOD } = API_PATH.QA.EDI_BY_CODE_GET;

    try {
      const response = await api.get(PATH, {
        method: METHOD.method,
        params: {
          ediCode: ediCode,
        },
      });

      const updateRows = rows.map((row) => {
        if (row.qaDataId === qaDataId)
          return {
            ...row,
            ediName: response.data.ediName,
            ediCode: response.data.ediCode,
          };
        return row;
      });

      if (!response.data.ediName) {
        handleModalOpen();
        setFocusQaDataId(qaDataId);
      }

      setRows(updateRows);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<"01" | "02">,
    qaDataId: number | string,
    CustomValue?: string
  ) => {
    const { name, value } = event.target;
    const { validation, isValidationError } = validationRoles[name](value);

    if (!validation) return;

    const updateRows = rows.map((row) => {
      if (row.qaDataId === qaDataId) {
        return {
          ...row,
          [name]: CustomValue || value,
          total_price: ["price", "cnt", "term"].includes(name)
            ? sumPrice([name, value], row)
            : row.total_price,
          validations: {
            ...row.validations,
            [name]: isValidationError,
          },
        };
      }

      return row;
    });

    console.log("handleInputChange");
    setRows(updateRows);
  };

  const sumPrice = (target: [string, string], row: IQaDataWithValidations) => {
    const [name, value] = target;

    const price = name === "price" ? value : row.price;
    const cnt = name === "cnt" ? value : row.cnt;
    const term = name === "term" ? value : row.term;

    return (
      Number(formatNumberWithUncomma(String(price))) *
      parseFloat(String(cnt)) *
      parseFloat(String(term))
    );
  };

  const handleClickAddRow = (
    qaDataId: string | number = 0,
    copy: boolean = false
  ) => {
    if (qaDataId === 0) return setRows([generateQaData()]);

    const index = rows.findIndex((row) => row.qaDataId === qaDataId);
    const newRow = copy
      ? {
          ...JSON.parse(JSON.stringify(rows[index])),
          qaDataId: generateUniqueId(),
        }
      : generateQaData();

    const updateRows = [
      ...rows.slice(0, index + 1),
      newRow,
      ...rows.slice(index + 1),
    ];

    setRows(updateRows);
  };

  const handleClickRemoveRow = (qaDataId: string | number) => {
    const updatedRows = rows.filter((row) => row.qaDataId !== qaDataId);
    setRows(updatedRows);
  };

  const checkUnsavedRows = (row: any) => {
    const { validations, ...rowOthers } = row;

    return isEqual(
      rowOthers,
      qaData.find((data) => data.qaDataId === row.qaDataId)
    );
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const handleClickRow = (name: string) => {
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
              {rows.map((row: IQaDataWithValidations, index) => {
                const isItemSelected = isSelected(String(row.qaDataId));
                const labelId = `table-checkbox-${index}`;

                return (
                  <Draggable
                    key={row.qaDataId}
                    draggableId={String(row.qaDataId)}
                    index={index}
                  >
                    {(provider) => (
                      <TableRow
                        tabIndex={-1}
                        key={row.qaDataId}
                        sx={{
                          backgroundColor: checkUnsavedRows(row)
                            ? theme.palette.background.paper
                            : theme.palette.error.light,
                        }}
                        selected={isItemSelected}
                        ref={provider.innerRef}
                        {...provider.draggableProps}
                      >
                        {readonly ? (
                          <SmallPaddingTableCell>
                            <CustomCheckbox
                              color="primary"
                              checked={isItemSelected}
                              onClick={() =>
                                handleClickRow(String(row.qaDataId))
                              }
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </SmallPaddingTableCell>
                        ) : (
                          <SmallPaddingTableCell {...provider.dragHandleProps}>
                            <IconDragDrop />
                          </SmallPaddingTableCell>
                        )}

                        <SmallPaddingTableCell {...provider.dragHandleProps}>
                          <Select
                            name="classOfMedicalExpense"
                            value={row.classOfMedicalExpense}
                            size="small"
                            disabled={readonly}
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
                            disabled={readonly}
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
                            disabled={readonly}
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
                            error={
                              readonly ? false : row?.validations?.["dateFrom"]
                            }
                            required
                            inputProps={{
                              maxLength: 8,
                            }}
                            disabled={readonly}
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
                            error={
                              readonly ? false : row?.validations?.["dateTo"]
                            }
                            inputProps={{
                              maxLength: 8,
                            }}
                            disabled={readonly}
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
                            disabled={readonly}
                            onChange={(event) =>
                              handleInputChange(event, row.qaDataId)
                            }
                            onBlur={() =>
                              getEdiSearchByCode(row.qaDataId, row.ediCode)
                            }
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
                            disabled={readonly}
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
                            disabled={readonly}
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
                            disabled={readonly}
                            onInputChange={(event, newValue) =>
                              handleInputChange(event, row.qaDataId, newValue)
                            }
                          />
                        </SmallPaddingTableCell>

                        <SmallPaddingTableCell>
                          <NumberCommaTextField
                            name="total_price"
                            value={row.total_price}
                            disabled={readonly}
                            onInputChange={(event, newValue) =>
                              handleInputChange(event, row.qaDataId, newValue)
                            }
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

                        {!readonly && (
                          <SmallPaddingTableCell sx={{ padding: "2px 8px" }}>
                            <Stack direction="row">
                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() => handleClickAddRow(row.qaDataId)}
                              >
                                <IconSquarePlus2 />
                              </IconButton>

                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() =>
                                  handleClickAddRow(row.qaDataId, true)
                                }
                              >
                                <IconCopy />
                              </IconButton>

                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() =>
                                  handleClickRemoveRow(row.qaDataId)
                                }
                              >
                                <IconTrash />
                              </IconButton>
                            </Stack>
                          </SmallPaddingTableCell>
                        )}
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
          <TableRow>
            <TableCell colSpan={12}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                {readonly ? (
                  <Typography>데이터가 없습니다.</Typography>
                ) : (
                  <Button onClick={() => handleClickAddRow()}>
                    데이터 추가하기
                  </Button>
                )}
              </Stack>
            </TableCell>
          </TableRow>
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

  "&  .MuiTextField-root": {
    width: "100%",
  },
}));
