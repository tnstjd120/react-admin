import { API_PATH } from "@/api/API_PATH";
import { api } from "@/api/axios";
import Scrollbar from "@/components/common/Scrollbar";
import CustomTableHead from "@/components/table/CustomTableHead";
import { useQaWorkStore } from "@/store/qaWork/useQaWorkStore";
import { useLoadingStore } from "@/store/useLoadingStore";
import { useTableStore } from "@/store/useTableStore";
import { Search } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  Modal,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { IconX } from "@tabler/icons-react";
import { debounce, set } from "lodash";
import {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

type TEdiKey =
  | "medicineLists"
  | "pharmacyLists"
  | "cmdcLists"
  | "diagnossLists";
type TEdiItem = { ediCode: string; ediName: string };

type Props = {
  openModal: boolean;
  handleModalClose: () => void;
  qaDataId: string | number;
};

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "600px",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const EdiSearchModal = ({ openModal, handleModalClose, qaDataId }: Props) => {
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);
  const { copyRows, setCopyRows } = useTableStore((state) => state);

  const [tabValue, setTabValue] = useState<TEdiKey>("medicineLists");
  const [searchQuery, setSearchQuery] = useState("");
  const [ediList, setEdiList] = useState<Record<TEdiKey, TEdiItem[]>>({
    medicineLists: [],
    pharmacyLists: [],
    cmdcLists: [],
    diagnossLists: [],
  });

  const handleChangeTab = (event: SyntheticEvent, newValue: TEdiKey) => {
    setTabValue(newValue);
  };

  const handleChangeSearchQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClickSearchEdi = () => {
    getEdiSearchByName();
  };

  const handleClick = (ediItem: TEdiItem) => {
    const updateCopyRows = copyRows.map((copyRow) => {
      if (copyRow.qaDataId === qaDataId) {
        return {
          ...copyRow,
          ediCode: ediItem.ediCode,
          ediName: ediItem.ediName,
        };
      }

      return copyRow;
    });

    setCopyRows(updateCopyRows);
    handleModalClose();
  };

  const getEdiSearchByName = async () => {
    setIsLoading(true);
    const { PATH, METHOD } = API_PATH.QA.EDI_BY_NAME_GET;

    try {
      const response = await api(PATH, {
        method: METHOD.method,
        params: { ediName: searchQuery },
      });

      setIsLoading(false);
      console.log("ediSearch response", response);

      const ediKeys = [
        "medicineLists",
        "pharmacyLists",
        "cmdcLists",
        "diagnossLists",
      ];
      const newEdiList = ediKeys.reduce((acc, key) => {
        return {
          ...acc,
          [key]: response.data[key],
        };
      }, {} as Record<TEdiKey, TEdiItem[]>);
      setEdiList(newEdiList);
    } catch (error) {
      console.error(error);
    }
  };

  const getEdiSearchByNameWithDebounce = useCallback(
    debounce(async (value: string) => {
      setIsLoading(true);
      const { PATH, METHOD } = API_PATH.QA.EDI_BY_NAME_GET;

      try {
        const response = await api(PATH, {
          method: METHOD.method,
          params: { ediName: value },
        });

        setIsLoading(false);
        console.log("ediSearch response", response);

        const ediKeys = [
          "medicineLists",
          "pharmacyLists",
          "cmdcLists",
          "diagnossLists",
        ];
        const newEdiList = ediKeys.reduce((acc, key) => {
          return {
            ...acc,
            [key]: response.data[key],
          };
        }, {} as Record<TEdiKey, TEdiItem[]>);
        setEdiList(newEdiList);
      } catch (error) {
        console.error(error);
      }
    }, 500),
    []
  );

  return (
    <Modal open={openModal} onClose={handleModalClose} tabIndex={-1}>
      <Stack sx={modalStyles}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          py={2}
          px={3}
        >
          <TextField
            size="small"
            variant="standard"
            color="primary"
            label="EDI 명칭"
            value={searchQuery}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleClickSearchEdi}>
                  <Search />
                </IconButton>
              ),
            }}
            onChange={handleChangeSearchQuery}
            onKeyUp={(event) => event.key === "Enter" && handleClickSearchEdi()}
          />

          <IconButton onClick={handleModalClose}>
            <IconX />
          </IconButton>
        </Stack>

        <Divider />

        <Box>
          <Tabs value={tabValue} onChange={handleChangeTab}>
            <Tab
              label={`약재 [${ediList["medicineLists"].length ?? 0}]`}
              value="medicineLists"
              sx={{ flex: 1 }}
            />
            <Tab
              label={`약국수가 [${ediList["pharmacyLists"].length ?? 0}]`}
              value="pharmacyLists"
              sx={{ flex: 1 }}
            />
            <Tab
              label={`한방수가 [${ediList["cmdcLists"].length ?? 0}]`}
              value="cmdcLists"
              sx={{ flex: 1 }}
            />
            <Tab
              label={`진료수가 [${ediList["diagnossLists"].length ?? 0}]`}
              value="diagnossLists"
              sx={{ flex: 1 }}
            />
          </Tabs>

          <Divider />

          <Box
            sx={{
              height: "500px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {ediList && ediList[tabValue].length !== 0 ? (
              <TableContainer sx={{ height: "100%" }}>
                <Table stickyHeader>
                  <CustomTableHead
                    headCells={[
                      {
                        id: "ediCode",
                        label: "EDI 코드",
                        numeric: false,
                        useSortable: false,
                        bold: true,
                        width: "120px",
                      },
                      {
                        id: "ediName",
                        label: "EDI 명칭",
                        numeric: false,
                        useSortable: false,
                        bold: true,
                      },
                    ]}
                    mainKey="ediCode"
                  />

                  <TableBody>
                    {ediList[tabValue].map((ediItem) => (
                      <TableRow
                        hover
                        key={ediItem.ediCode}
                        sx={{ cursor: "pointer" }}
                        tabIndex={-1}
                        onClick={() => handleClick(ediItem)}
                      >
                        <TableCell>{ediItem.ediCode}</TableCell>
                        <TableCell>{ediItem.ediName}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="h5" color="">
                검색 결과가 없습니다.
              </Typography>
            )}
          </Box>
        </Box>
      </Stack>
    </Modal>
  );
};

export default EdiSearchModal;
