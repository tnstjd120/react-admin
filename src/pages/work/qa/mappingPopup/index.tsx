import { API_PATH } from "@/api/API_PATH";
import { api } from "@/api/axios";
import { MappedChip } from "@/components/chip/MappedChip";
import BlankCard from "@/components/common/BlankCard";
import Scrollbar from "@/components/common/Scrollbar";
import { IQaWorkStore, useQaWorkStore } from "@/store/qaWork/useQaWorkStore";
import { IImage } from "@/types/Image";
import { IMdcs } from "@/types/Mdcs";
import { IQaData } from "@/types/QaData";
import { IReceipt } from "@/types/Receipt";
import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { IconLink, IconSitemap } from "@tabler/icons-react";
import { isEqual } from "lodash";
import { useEffect, useState } from "react";

interface QaWorkStoreOnlyData
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

  const [currentReceipt, setCurrentReceipt] = useState<IReceipt | null>(null);
  const [images, setImages] = useState<IImage[]>([]);
  const [currentImage, setCurrentImage] = useState<IImage | null>(null);
  const [mdcs, setMdcs] = useState<IMdcs[]>([]);
  const [currentMdcs, setCurrentMdcs] = useState<IMdcs | null>(null);
  const [qaData, setQaData] = useState<IQaData[]>([]);

  // const [flgSumList, setFlgSumList] = useState<any[]>([]);

  const { mappedColors } = useQaWorkStore((state) => state);

  useEffect(() => {
    updateStates(useQaWorkStore.getState());

    const onSyncQaWorkStore = (event: StorageEvent) => {
      if (event.key === "qaWorkStore") {
        const newData = JSON.parse(event.newValue as string);

        updateStates(newData.state);
      }
    };

    window.addEventListener("storage", onSyncQaWorkStore);

    return () => {
      window.removeEventListener("storage", onSyncQaWorkStore);
    };
  }, []);

  const updateStates = (newData: QaWorkStoreOnlyData) => {
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

  const handleClickFlgSum = (mdcsInfoId: number) => {
    setCurrentMdcs(mdcs.find((item) => item.mdcsInfoId === mdcsInfoId) || null);
    getFlgSum(mdcsInfoId);
  };

  const getFlgSum = async (mdcsInfoId: number) => {
    try {
      const { PATH, METHOD } = API_PATH.QA.FLG_SUM_GET;

      const response = await api(PATH, {
        method: METHOD.method,
        params: {
          mdcsInfoId: mdcsInfoId,
        },
      });

      console.log("response => ", response);
    } catch (error) {
      console.error(error);
    }
  };

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
            <Box></Box>
          </BlankCard>

          <BlankCard sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
            <Typography variant="h6" textAlign="center" py={1} color="primary">
              매핑된 합산금액
            </Typography>
            <Divider />
            <Box></Box>
          </BlankCard>
        </Stack>

        <BlankCard sx={{ width: "30%" }}>
          <Typography variant="h6" textAlign="center" py={1}>
            선택된 합산금액
          </Typography>
          <Divider />

          <Box></Box>
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
          <BlankCard>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={1}
            >
              <Typography variant="h6" py={2}>
                선택된 이미지: {currentReceipt?.rcpNo} -{" "}
                {currentImage?.imageName}
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
              rowHeight={234}
              gap={16}
            >
              {images.map((image, j) => (
                <ImageListItem
                  key={image.imageId}
                  sx={{
                    width: "100%",
                    minWidth: "300px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    backgroundColor:
                      currentImage?.imageId === image.imageId
                        ? theme.palette.primary.main
                        : "white",
                    p: 1,

                    "& > .MuiStack-root": {
                      transition: "0.2s",
                    },
                    "&:hover": {
                      transition: "0.2s",

                      "& > .MuiStack-root": {
                        borderColor: theme.palette.primary.light,
                        transform: "scale(1.02)",
                      },
                    },
                  }}
                  // onClick={() => handleClickImage(image.imageId)}
                >
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
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MappingPopup;
