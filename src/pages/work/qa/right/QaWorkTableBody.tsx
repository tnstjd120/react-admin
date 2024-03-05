import {
  IconButton,
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
import {
  IconCopy,
  IconDragDrop,
  IconSquarePlus2,
  IconTrash,
} from "@tabler/icons-react";
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
import { formatNumberWithUncomma } from "@/utils/comma";
import { useQaWorkStore } from "@/store/qaWork/useQaWorkStore";

interface IQaDataWithValidations extends IQaData {
  validations: { [key: string]: boolean };
}

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

const QaWorkTableBody = () => {
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);
  const { rows, setRows, selected } = useTableStore((state) => state);

  const { qaData, setQaData } = useQaWorkStore((state) => state);

  const [openModal, setOpenModal] = useState(false);
  const [focusQaDataId, setFocusQaDataId] = useState<number | string>("");

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const initializeFormData = rows.map((row) => {
      const initializeValidations = Object.keys(row).reduce((acc, key) => {
        return { ...acc, [key]: true };
      }, {});

      return {
        ...row,
        validations: initializeValidations,
      };
    });

    setRows(initializeFormData);
  }, [qaData]);

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

      const updateCopyRows = rows.map((row) => {
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

      setRows(updateCopyRows);
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

    if (!validationRoles[name](value)) return;

    const updateFormData = rows.map((row) => {
      if (row.qaDataId === qaDataId) {
        const valid =
          "validity" in event.target ? event.target.validity.valid : true;

        return {
          ...row,
          [name]: CustomValue || value,
          total_price: ["price", "cnt", "term"].includes(name)
            ? sumPrice([name, value], row)
            : row.total_price,
          validations: { ...row.validations, [name]: valid },
        };
      }

      return row;
    });

    setRows(updateFormData);
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

  const validationCheck = (row: IQaDataWithValidations, name: string) => {
    return row?.validations?.[name] ? false : true;
  };

  const handleClickAddRow = (
    qaDataId: string | number,
    copy: boolean = false
  ) => {
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

  // const handleClickRemoveRow = (qaDataId: string | number) => {
  //   setRows((currentRows: any) => {
  //     const updatedRows = (currentRows as IQaData[]).filter(
  //       (row) => row.qaDataId !== qaDataId
  //     );
  //     return updatedRows;
  //   });
  // };

  useEffect(() => {
    console.log("rows", rows);
  }, [rows]);

  return (
    <>
      {rows ? (
        <Droppable droppableId="qaWorkDroppable">
          {(provider) => (
            <TableBody ref={provider.innerRef} {...provider.droppableProps}>
              {rows.map((row: IQaDataWithValidations, index) => {
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

                            <IconButton size="small" color="primary">
                              <IconTrash />
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
