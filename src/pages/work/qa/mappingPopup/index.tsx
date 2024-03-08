import { API_PATH } from "@/api/API_PATH";
import { api } from "@/api/axios";
import { MappedChip } from "@/components/chip/MappedChip";
import BlankCard from "@/components/common/BlankCard";
import Scrollbar from "@/components/common/Scrollbar";
import { IQaWorkStore, useQaWorkStore } from "@/store/qaWork/useQaWorkStore";
import { IFlgSum } from "@/types/FlgSum";
import { IImage } from "@/types/Image";
import { IMdcs } from "@/types/Mdcs";
import { IQaData } from "@/types/QaData";
import { IReceipt } from "@/types/Receipt";
import { formatNumberWithComma } from "@/utils/comma";
import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Fab,
  IconButton,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { IconArrowsMaximize, IconLink, IconSitemap } from "@tabler/icons-react";
import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import QaWorkTable from "../right/QaWorkTable";
import { useLoadingStore } from "@/store/useLoadingStore";
import CustomCheckbox from "@/components/form/CustomCheckbox";

export interface IQaWorkStoreOnlyData
  extends Omit<
    IQaWorkStore,
    | "setDateRange"
    | "setReceiptsByDate"
    | "setCurrentReceipt"
    | "setImages"
    | "setCurrentImage"
    | "setMdcs"
    | "setQaData"
    | "setWithImage"
  > {}

const MappingPopup = () => {
  const theme = useTheme();

  const { setIsLoading } = useLoadingStore((state) => state);

  const [currentReceipt, setCurrentReceipt] = useState<IReceipt | null>(null);
  const [images, setImages] = useState<IImage[]>([]);
  const [currentImage, setCurrentImage] = useState<IImage | null>(null);
  const [mdcs, setMdcs] = useState<IMdcs[]>([]);
  const [currentMdcs, setCurrentMdcs] = useState<IMdcs | null>(null);
  const [qaData, setQaData] = useState<IQaData[]>([]);

  const [flgSumList, setFlgSumList] = useState<{
    lotteList: IFlgSum[];
    mappedList: IFlgSum[];
  }>({ lotteList: [], mappedList: [] });

  const { mappedColors } = useQaWorkStore((state) => state);

  const originalSetCurrentImage = useQaWorkStore(
    (state) => state.setCurrentImage
  );

  useEffect(() => {
    updateStates(useQaWorkStore.getState());

    const onSyncQaWorkStore = (event: StorageEvent) => {
      if (event.key === "qaWorkStore") {
        const newData = JSON.parse(event.newValue as string);
        console.log(newData.state);
        updateStates(newData.state);
      }
    };

    window.addEventListener("storage", onSyncQaWorkStore);

    return () => {
      window.removeEventListener("storage", onSyncQaWorkStore);
    };
  }, []);

  const updateStates = (newData: IQaWorkStoreOnlyData) => {
    setCurrentReceipt((prevData) => {
      return isEqual(newData.currentReceipt, prevData)
        ? prevData
        : newData.currentReceipt;
    });

    setImages((prevData) => {
      return isEqual(newData.images, prevData) ? prevData : newData.images;
    });

    setCurrentImage((prevData) => {
      return isEqual(newData.currentImage, prevData)
        ? prevData
        : newData.currentImage;
    });

    setMdcs((prevData) => {
      return isEqual(newData.mdcs, prevData) ? prevData : newData.mdcs;
    });

    setQaData((prevData) => {
      return isEqual(newData.qaData, prevData) ? prevData : newData.qaData;
    });
  };

  const handleClickImage = (imageId: number) => {
    const clickImage = images.find(
      (image) => image.imageId === imageId
    ) as IImage;

    originalSetCurrentImage(clickImage);
    setCurrentImage(clickImage);
  };

  const handleClickFlgSum = (mdcsInfoId: number) => {
    setCurrentMdcs(mdcs.find((item) => item.mdcsInfoId === mdcsInfoId) || null);
    getFlgSumList(mdcsInfoId);
  };

  const getFlgSumList = async (mdcsInfoId: number) => {
    try {
      const { PATH, METHOD } = API_PATH.QA.FLG_SUM_GET;

      const response = await api(PATH, {
        method: METHOD.method,
        params: {
          mdcsInfoId: mdcsInfoId,
        },
      });

      setFlgSumList({
        lotteList: [...response.data.flgSumLists],
        mappedList: [...response.data.mappingSumLists],
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, [qaData]);

  return (
    <Stack>
      <Stack direction="row" spacing={2} p={2} pb={0} height={250}>
        <Stack direction="row" width="70%">
          <BlankCard
            sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          >
            <Typography variant="h6" textAlign="center" py={1} color="error">
              롯데 합산금액
            </Typography>

            <Divider />

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell size="small" width={250}>
                      항목명
                    </TableCell>
                    <TableCell size="small">항목코드</TableCell>
                    <TableCell size="small">합산금액</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {flgSumList.lotteList.length ? (
                    flgSumList.lotteList?.map((item) => (
                      <TableRow key={item.flgInfoId}>
                        <TableCell size="small">{item.trmtItnm}</TableCell>
                        <TableCell size="small">{item.trmtItcd}</TableCell>
                        <TableCell size="small">
                          {formatNumberWithComma(item.nslyAmt)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3}>
                        <Typography textAlign="center">
                          데이터가 없습니다.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </BlankCard>

          <BlankCard sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
            <Typography variant="h6" textAlign="center" py={1} color="primary">
              매핑된 합산금액
            </Typography>

            <Divider />

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell size="small" width={250}>
                      항목명
                    </TableCell>
                    <TableCell size="small">항목코드</TableCell>
                    <TableCell size="small">합산금액</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {flgSumList.mappedList.length ? (
                    flgSumList.mappedList?.map((item) => (
                      <TableRow key={item.flgInfoId}>
                        <TableCell size="small">{item.trmtItnm}</TableCell>
                        <TableCell size="small">{item.trmtItcd}</TableCell>
                        <TableCell size="small">
                          {formatNumberWithComma(item.nslyAmt)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3}>
                        <Typography textAlign="center">
                          매핑된 데이터가 없습니다.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </BlankCard>
        </Stack>

        <BlankCard sx={{ width: "30%" }}>
          <Typography variant="h6" textAlign="center" py={1}>
            선택된 합산금액
          </Typography>

          <Divider />

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell size="small" width={200}>
                    항목명
                  </TableCell>
                  <TableCell size="small">항목코드</TableCell>
                  <TableCell size="small">합산금액</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {flgSumList.mappedList.length ? (
                  flgSumList.mappedList?.map((item) => (
                    <TableRow key={item.flgInfoId}>
                      <TableCell size="small">{item.trmtItnm}</TableCell>
                      <TableCell size="small">{item.trmtItcd}</TableCell>
                      <TableCell size="small">
                        {formatNumberWithComma(item.nslyAmt)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Typography textAlign="center">
                        매핑된 데이터가 없습니다.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </BlankCard>
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        p={2}
        sx={{ height: "calc(100vh - 250px)" }}
      >
        <BlankCard sx={{ width: "300px", height: "100%" }}>
          <Typography variant="h6" textAlign="center" py={2}>
            사고 정보 순번
          </Typography>
          <Divider />

          <List sx={{ height: "100%", p: 0 }}>
            <Scrollbar sx={{ height: "calc(100% - 51px)" }}>
              {mdcs.map((item, index) => (
                <ListItem
                  key={item.mdcsInfoId}
                  sx={{
                    display: "flex",
                    gap: 2,
                    px: 2,
                    pr: "40px",
                    borderBottom: `1px solid ${theme.palette.grey[300]}`,
                    position: "relative",
                    backgroundColor:
                      currentMdcs?.mdcsInfoId === item.mdcsInfoId
                        ? theme.palette.primary.light
                        : "white",
                  }}
                >
                  <MappedChip
                    label={item.clmInfoSeqno}
                    mappedColor={mappedColors[index]}
                  />

                  <Stack
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                    onClick={() => handleClickFlgSum(item.mdcsInfoId)}
                  >
                    <Typography variant="body1" fontWeight="bold">
                      {item.hspnm}
                    </Typography>
                    <Typography variant="body2">{item.apprDate}</Typography>
                  </Stack>

                  <IconButton
                    sx={{
                      position: "absolute",
                      right: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <IconLink />
                  </IconButton>
                </ListItem>
              ))}
            </Scrollbar>
          </List>
        </BlankCard>

        <Stack maxWidth="calc(100% - 316px)">
          <BlankCard
            sx={{
              height: "60%",
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={1}
            >
              <Typography variant="subtitle2" py={2} display="flex" gap={1}>
                접수번호:{" "}
                <Typography fontWeight="bold" color="primary">
                  {currentReceipt?.rcpNo}
                </Typography>
              </Typography>
              |
              <Typography variant="subtitle2" py={2} display="flex" gap={1}>
                이미지:{" "}
                <Typography fontWeight="bold" color="primary">
                  {currentImage?.imageName}
                </Typography>
              </Typography>
              <Chip
                label={currentReceipt?.detailDocImageCount}
                variant="outlined"
                size="small"
              />
            </Box>

            <Divider />

            <ImageList
              sx={{
                width: "100%",
                p: 2,
                display: "flex",
                overflowX: "auto",
                gridAutoColumns: "column",
              }}
              cols={images.length}
              rowHeight={216}
              gap={16}
            >
              {images.map((image, j) => (
                <ImageListItem
                  key={image.imageId}
                  sx={{
                    width: "250px",
                    minWidth: "250px",
                    maxHeight: "220px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // cursor: "pointer",
                    backgroundColor:
                      currentImage?.imageId === image.imageId
                        ? theme.palette.primary.main
                        : "white",
                    p: 1,

                    // "& > .MuiStack-root": {
                    //   transition: "0.2s",
                    // },
                    // "&:hover": {
                    //   transition: "0.2s",

                    //   "& > .MuiStack-root": {
                    //     borderColor: theme.palette.primary.light,
                    //     transform: "scale(1.02)",
                    //   },
                    // },
                  }}
                  onClick={() => handleClickImage(image.imageId)}
                >
                  <MappedChip
                    label={28}
                    mappedColor={mappedColors[j]}
                    position="absolute"
                  />

                  <Stack
                    sx={{
                      position: "absolute",
                      right: 5,
                      top: 5,
                      p: 1,
                      zIndex: 10,
                    }}
                    spacing={1}
                  >
                    <Fab
                      size="medium"
                      variant="circular"
                      sx={{
                        bgcolor: "rgba(0,0,0,0.5)",
                        transition: ".2s",
                        ":hover": {
                          bgcolor: "rgba(0,0,0,0.5)",
                          transform: "scale(1.1)",
                        },
                      }}
                      onClick={(event) => event.stopPropagation()}
                    >
                      <CustomCheckbox
                        sx={{
                          "& *, & + *": { m: 0 },
                        }}
                      />
                    </Fab>

                    <Fab
                      size="medium"
                      variant="circular"
                      sx={{
                        bgcolor: "rgba(0,0,0,0.5)",
                        transition: ".2s",
                        ":hover": {
                          bgcolor: "rgba(0,0,0,0.5)",
                          transform: "scale(1.1)",
                        },
                      }}
                      onClick={(event) => event.stopPropagation()}
                    >
                      <IconArrowsMaximize
                        color="white"
                        onClick={(event) => event.stopPropagation()}
                      />
                    </Fab>
                  </Stack>

                  {image.isMapping && !image.isMultiMapping ? (
                    <MappedChip
                      label={image.clmInfoSeqNo[0]}
                      mappedColor={mappedColors[j]}
                      position="absolute"
                    />
                  ) : image.isMapping && image.isMultiMapping ? (
                    <MappedChip
                      label={<IconSitemap />}
                      multiMapped
                      mappedColor={mappedColors[j]}
                      position="absolute"
                    />
                  ) : null}

                  <Stack
                    height="100%"
                    width="100%"
                    sx={{
                      borderRadius: 1,
                      border: 1,
                      borderColor: theme.palette.grey[300],
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      bgcolor={theme.palette.grey[900]}
                      borderRadius={0}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      maxHeight="calc(100% - 64px)"
                      flex={1}
                    >
                      <img
                        width="100%"
                        src={image.imageUrl}
                        alt={image.imageName}
                        loading="lazy"
                      />
                    </Box>

                    <Stack
                      height="64px"
                      justifyContent="space-between"
                      p={1}
                      bgcolor={`${theme.palette.background.paper}`}
                      borderRadius={0}
                    >
                      <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle2">이미지</Typography>

                        <Typography variant="subtitle2" fontWeight="bold">
                          {image.imageName}
                        </Typography>
                      </Stack>

                      {image.lastEditTime ? (
                        <Typography
                          variant="caption"
                          color="primary"
                          textAlign="right"
                          aria-label="updatedAt"
                          fontWeight="bold"
                        >
                          Updated. {image.lastEditTime}
                        </Typography>
                      ) : (
                        <Typography
                          variant="caption"
                          color="default"
                          textAlign="right"
                          aria-label="updatedAt"
                        >
                          Not Updated
                        </Typography>
                      )}
                    </Stack>
                  </Stack>
                </ImageListItem>
              ))}
            </ImageList>
          </BlankCard>

          <BlankCard
            sx={{
              height: "40%",
              overflow: "auto",
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}
          >
            <QaWorkTable propQaData={qaData} readonly />
          </BlankCard>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MappingPopup;
