import BlankCard from "@/components/common/BlankCard";
import Scrollbar from "@/components/common/Scrollbar";
import theme from "@/utils/theme";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  AppBar,
  Box,
  Button,
  Chip,
  ChipProps,
  Divider,
  FormControlLabel,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  List,
  ListItem,
  MenuItem,
  Select,
  Stack,
  Switch,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { IconChevronDown, IconList, IconPhoto } from "@tabler/icons-react";
import { ReactNode, SyntheticEvent, useState } from "react";
import { useQaWorkContext } from "../QaWorkContext";

const ReceiptsCard = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const handleChangeReceipt =
    (value: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? value : false);
    };

  // const [currentImage, setCurrentImage] = useState(null)
  // const handleChangeCurrentImage = (imageUid: number) => {
  //   setCurrentImage()
  // }

  const [tabValue, setTabValue] = useState(0);
  const handleChangeTab = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const [withImage, setWithImage] = useState(true);
  const handleChangeWithImage = (withImage: boolean) => {
    setWithImage(withImage);
  };

  const { mappedColors } = useQaWorkContext();

  return (
    <ReceiptsCardContainer>
      <Tabs value={tabValue} onChange={handleChangeTab}>
        <Tab label="미완료 건" sx={{ flex: 1 }} />
        <Tab label="완료 건" sx={{ flex: 1 }} />
      </Tabs>

      <Divider />

      <Scrollbar sx={{ height: "100%", pb: 8 }}>
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <CustomAccordion
              key={i}
              expanded={expanded === `receipt${i}`}
              onChange={handleChangeReceipt(`receipt${i}`)}
            >
              <AccordionSummary
                expandIcon={<IconChevronDown />}
                sx={{ position: "sticky", top: "-2px", zIndex: 10 }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="subtitle2">9024589781{i}</Typography>
                  <Chip label={2 * i} variant="outlined" size="small" />
                </Box>
              </AccordionSummary>

              <AccordionDetails sx={{ p: withImage ? 2 : "0 !important" }}>
                <Scrollbar sx={{ height: "50vh" }}>
                  {withImage ? (
                    <ImageList
                      sx={{ width: "100%" }}
                      cols={1}
                      rowHeight={234}
                      gap={16}
                    >
                      {Array(10)
                        .fill(0)
                        .map((_, j) => (
                          <ImageListItem
                            key={j}
                            sx={{
                              width: "100%",
                              borderRadius: "8px",
                              overflow: "hidden",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor:
                                j === 2 ? theme.palette.primary.main : "white",
                              p: 1,
                            }}
                          >
                            {![6, 7, 10].includes(i) && (
                              <MappedChip
                                label={j}
                                mappedColor={mappedColors[j]}
                                position="absolute"
                              />
                            )}

                            <Stack
                              height="100%"
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
                                flex={1}
                              >
                                <img
                                  width="100%"
                                  src="https://upload.wikimedia.org/wikipedia/commons/c/c3/LibreOffice_Writer_6.3.png"
                                  alt={`이미지 ${j}`}
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
                                  >{`20240215245d000${j}`}</Typography>
                                </Stack>

                                {[0, 1, 2, 3, 4].includes(j) ? (
                                  <Typography
                                    variant="caption"
                                    color="primary"
                                    textAlign="right"
                                    aria-label="updatedAt"
                                    fontWeight="bold"
                                  >
                                    Updated. 2024.02.15 16:4{j}
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
                      {Array(10)
                        .fill(0)
                        .map((_, j) => (
                          <ListItem
                            sx={{
                              p: 0,
                              borderBottom: `1px solid ${theme.palette.grey[300]}`,
                            }}
                          >
                            <Stack
                              direction="row"
                              alignItems="center"
                              justifyContent="space-around"
                              spacing={1}
                              p={1}
                              bgcolor={theme.palette.background.paper}
                              width="100%"
                            >
                              <MappedChip
                                label={j}
                                mappedColor={mappedColors[j]}
                              />

                              <Stack
                                height="42px"
                                justifyContent="space-between"
                              >
                                <Stack direction="row" spacing={1}>
                                  <Typography variant="subtitle2">
                                    이미지
                                  </Typography>

                                  <Typography
                                    variant="subtitle2"
                                    fontWeight="bold"
                                  >{`20240215245d000${j}`}</Typography>
                                </Stack>

                                {[0, 1, 2, 3, 4].includes(j) ? (
                                  <Typography
                                    variant="caption"
                                    color="primary"
                                    textAlign="right"
                                    aria-label="updatedAt"
                                    fontWeight="bold"
                                  >
                                    Updated. 2024.02.15 16:4{j}
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
                </Scrollbar>

                {/* <AppBar
                  position="absolute"
                  color="primary"
                  sx={{ top: 0, bottom: "auto" }}
                >
                  <Toolbar>
                    <IconButton color="inherit">
                      <IconList />
                    </IconButton>
                  </Toolbar>
                </AppBar> */}
              </AccordionDetails>

              <AccordionActions sx={{ justifyContent: "flex-start" }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={withImage}
                      onChange={() => handleChangeWithImage(!withImage)}
                    />
                  }
                  label="With image"
                  labelPlacement="start"
                />
              </AccordionActions>
            </CustomAccordion>
          ))}
      </Scrollbar>
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
    // borderRadius: "8px 8px 0 0",
    backgroundColor: `${theme.palette.primary.light}`,
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
  label: string | number;
  mappedColor: string;
  position?: string;
}
const MappedChip = (props: IMappedChip) => {
  const { label, mappedColor, position = "static" } = props;
  const theme = useTheme();

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
        color: mappedColor,

        "& .MuiChip-label": {
          padding: "0 10px",
        },
      }}
    />
  );
};
