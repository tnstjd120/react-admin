import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Divider,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  Stack,
  Tab,
  Tabs,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useQaWorkStore } from "@/store/qaWork/useQaWorkStore";
import { IconChevronDown, IconSitemap } from "@tabler/icons-react";
import {
  Fragment,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";

import BlankCard from "@/components/common/BlankCard";
import Scrollbar from "@/components/common/Scrollbar";
import { api } from "@/api/axios";
import { API_PATH } from "@/api/API_PATH";
import dayjs from "dayjs";
import Loading from "@/components/common/Loading";

const ReceiptsCard = () => {
  const theme = useTheme();
  const {
    mappedColors,
    withImage,
    dateRange,
    setReceiptsByDate,
    receiptsByDate,
    setCurrentReceipt,
    currentReceipt,
    images,
    setImages,
    currentImage,
    setCurrentImage,
    setQaData,
    setMdcs,
  } = useQaWorkStore((state) => state);

  const [expanded, setExpanded] = useState<number | false>(
    currentReceipt?.receiptId || false
  );
  const handleChangeReceipt =
    (receiptId: number) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? receiptId : false);
    };

  const [tabValue, setTabValue] = useState(0);
  const handleChangeTab = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    getReceipts();

    if (!currentReceipt?.receiptId) setExpanded(false);
  }, [dateRange, tabValue]);

  const getReceipts = async () => {
    const { PATH, METHOD } =
      tabValue === 0
        ? API_PATH.QA.RECEIPTS_INCOMPLETE_GET
        : API_PATH.QA.RECEIPTS_COMPLETE_GET;

    const response = await api(PATH, {
      method: METHOD.method,
      params: {
        opDtFrom: dayjs(dateRange.startDate).format("YYYYMMDD"),
        opDtTo: dayjs(dateRange.endDate).format("YYYYMMDD"),
      },
    });

    setReceiptsByDate(
      tabValue === 0
        ? response.data.inCompleteReceiptLists
        : response.data.completeReceiptLists
    );
  };

  const getMdcs = async (receiptId: number) => {
    const { PATH, METHOD } = API_PATH.QA.MDCS_GET;

    const response = await api(PATH, {
      method: METHOD.method,
      params: {
        receiptId: receiptId,
      },
    });

    setMdcs(response.data.mdcsLists);
  };

  const getImages = async (receiptId: number) => {
    const { PATH, METHOD } = API_PATH.QA.IMAGES_GET;

    const response = await api(PATH, {
      method: METHOD.method,
      params: {
        receiptId: receiptId,
      },
    });

    setImages(response.data.imageLists);
  };

  const getQaData = async (imageId: number) => {
    const { PATH, METHOD } = API_PATH.QA.QA_DATA_GET;

    const response = await api(PATH, {
      method: METHOD.method,
      params: {
        imageId: imageId,
      },
    });

    setQaData(response.data.qaDataLists);
  };

  const handleClickReceipt = (receiptId: number) => {
    if (currentReceipt?.receiptId !== receiptId) {
      setCurrentReceipt(
        Object.values(receiptsByDate)
          .flat(1)
          .filter((receipt) => receipt.receiptId === receiptId)[0]
      );
      getMdcs(receiptId);
      getImages(receiptId);
    }
  };

  const handleClickImage = (imageId: number) => {
    if (currentImage?.imageId !== imageId) {
      setCurrentImage(images.filter((image) => image.imageId === imageId)[0]);
      getQaData(imageId);
    }
  };

  const openPopup = () => {
    const url = window.location.origin + "/work/qa/popup";
    window.open(url, "popup", "width=600, height=600");
  };

  return (
    <ReceiptsCardContainer>
      <Tabs value={tabValue} onChange={handleChangeTab}>
        <Tab label="미완료 건" sx={{ flex: 1 }} />
        <Tab label="완료 건" sx={{ flex: 1 }} />
      </Tabs>

      <Divider />

      {receiptsByDate ? (
        <Scrollbar sx={{ height: "100%", pb: 8 }}>
          {Object.entries(receiptsByDate).map(([date, receipts]) => (
            <Fragment key={date}>
              <Typography variant="h6" textAlign="center" pt={3} pb={2} px={1}>
                {date}
              </Typography>

              {receipts.map((receipt, i) => (
                <CustomAccordion
                  key={receipt.receiptId}
                  expanded={expanded === receipt.receiptId}
                  onChange={handleChangeReceipt(receipt.receiptId)}
                >
                  <AccordionSummary
                    expandIcon={<IconChevronDown />}
                    sx={{ position: "sticky", top: "-2px", zIndex: 11 }}
                    onClick={() => handleClickReceipt(receipt.receiptId)}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="body2">{receipt.rcpNo}</Typography>
                      <Chip
                        label={receipt.detailDocImageCount}
                        variant="outlined"
                        size="small"
                      />
                    </Box>
                  </AccordionSummary>

                  <AccordionDetails sx={{ p: withImage ? 2 : "0 !important" }}>
                    {withImage ? (
                      <ImageList
                        sx={{ width: "100%" }}
                        cols={1}
                        rowHeight={234}
                        gap={16}
                      >
                        {images.map((image, j) => (
                          <ImageListItem
                            key={image.imageId}
                            sx={{
                              width: "100%",
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
                            onClick={() => handleClickImage(image.imageId)}
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
                                bgcolor={theme.palette.background.paper}
                                borderRadius={0}
                              >
                                <Stack direction="row" spacing={1}>
                                  <Typography variant="subtitle2">
                                    이미지
                                  </Typography>

                                  <Typography
                                    variant="subtitle2"
                                    fontWeight="bold"
                                  >
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
                    ) : (
                      <List sx={{ p: 0 }}>
                        {images.map((image, j) => (
                          <ListItem
                            key={image.imageId}
                            sx={{
                              p: 0,
                              cursor: "pointer",
                              borderBottom: `1px solid ${theme.palette.grey[300]}`,
                              overflow: "hidden",

                              "& > .MuiStack-root": {
                                transition: "0.2s",
                              },
                              "&:hover": {
                                transition: "0.2s",

                                "& > .MuiStack-root": {
                                  backgroundColor:
                                    currentImage?.imageId !== image.imageId
                                      ? theme.palette.primary.light
                                      : theme.palette.primary.main,
                                  transform: "scale(1.02)",
                                },
                              },
                            }}
                            onClick={() => handleClickImage(image.imageId)}
                          >
                            <Stack
                              bgcolor={
                                currentImage?.imageId === image.imageId
                                  ? theme.palette.primary.main
                                  : theme.palette.background.paper
                              }
                              direction="row"
                              alignItems="center"
                              justifyContent="space-between"
                              width="100%"
                              spacing={1}
                              p={1}
                            >
                              {image.isMapping && !image.isMultiMapping ? (
                                <MappedChip
                                  label={image.clmInfoSeqNo[0]}
                                  mappedColor={mappedColors[j]}
                                />
                              ) : image.isMapping && image.isMultiMapping ? (
                                <MappedChip
                                  label={<IconSitemap />}
                                  mappedColor={mappedColors[j]}
                                  multiMapped
                                />
                              ) : null}

                              <Stack
                                height="42px"
                                width="100%"
                                justifyContent="space-between"
                              >
                                <Stack direction="row" spacing={1}>
                                  <Typography variant="subtitle2">
                                    이미지
                                  </Typography>

                                  <Typography
                                    variant="subtitle2"
                                    fontWeight="bold"
                                  >
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
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </AccordionDetails>
                </CustomAccordion>
              ))}
            </Fragment>
          ))}
        </Scrollbar>
      ) : (
        <Loading />
      )}
    </ReceiptsCardContainer>
  );
};

export default ReceiptsCard;

const ReceiptsCardContainer = styled(BlankCard)`
  min-width: 300px;
  max-width: 300px;
  height: 100%;
  border-radius: 10px;
`;

const CustomAccordion = styled(Accordion)<AccordionProps>(({ theme }) => ({
  "& > .Mui-expanded": {
    borderTop: `2px solid ${theme.palette.primary.main}`,
    borderLeft: `2px solid ${theme.palette.primary.main}`,
    borderRight: `2px solid ${theme.palette.primary.main}`,
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: `${theme.palette.primary.light}`,
    minHeight: "40px",
  },
  "& .MuiAccordionDetails-root": {
    border: `2px solid ${theme.palette.primary.main}`,
    borderTop: 0,
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: `${theme.palette.primary.light}`,
    paddingBlock: "16px",
  },
  "& .MuiAccordionActions-root": {
    border: `2px solid ${theme.palette.primary.main}`,
    borderTop: 0,
    borderRadius: "0 0 8px 8px",
    backgroundColor: `${theme.palette.primary.light}`,
  },
  "& .MuiAccordionSummary-root": {
    minHeight: "40px",

    "& .MuiAccordionSummary-content": {
      margin: 0,
    },
  },
}));

interface ICustomTabPanel {
  children: ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: ICustomTabPanel) => {
  const { children, index, value } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

interface IMappedChip {
  label?: ReactNode;
  mappedColor: string;
  multiMapped?: boolean;
  position?: string;
}
const MappedChip = (props: IMappedChip) => {
  const {
    label,
    mappedColor,
    position = "static",
    multiMapped = false,
  } = props;
  const theme = useTheme();

  const multiMappedStyles = multiMapped
    ? {
        padding: 0,
        width: "32px",
        height: "32px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",

        "& svg": {
          color: theme.palette.text.primary,
          width: 20,
          height: 20,
        },
      }
    : {};

  return (
    <Chip
      variant="outlined"
      label={label}
      sx={{
        position: position,
        left: "10px",
        top: "10px",
        backgroundColor: theme.palette.background.paper,
        borderWidth: "3px",
        borderRadius: "4px",
        borderColor: mappedColor,
        color: theme.palette.text.primary,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,

        "& .MuiChip-label": {
          padding: "0 10px",
          ...multiMappedStyles,
        },
      }}
    />
  );
};
