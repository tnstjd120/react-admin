import BlankCard from "@/components/common/BlankCard";
import Scrollbar from "@/components/common/Scrollbar";
import theme from "@/utils/theme";
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Box,
  Chip,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
  styled,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { IconChevronDown } from "@tabler/icons-react";
import { SyntheticEvent, useState } from "react";

const CustomAccordion = styled(Accordion)<AccordionProps>(({ theme }) => ({
  "& > .Mui-expanded": {
    borderTop: `1px solid ${theme.palette.primary.main}`,
    borderLeft: `1px solid ${theme.palette.primary.main}`,
    borderRight: `1px solid ${theme.palette.primary.main}`,
    borderRadius: "8px 8px 0 0",
  },
  "& .MuiAccordionDetails-root": {
    border: `1px solid ${theme.palette.primary.main}`,
    borderTop: `1px solid #ddd`,
    borderRadius: "0 0 8px 8px",
  },
}));

const LeftCard = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const handleChangeReceipt =
    (value: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? value : false);
    };

  // const [currentImage, setCurrentImage] = useState(null)
  // const handleChangeCurrentImage = (imageUid: number) => {
  //   setCurrentImage()
  // }
  return (
    <LeftCardContainer>
      <Scrollbar sx={{ height: "100%" }}>
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <CustomAccordion
              key={i}
              expanded={expanded === `receipt${i}`}
              onChange={handleChangeReceipt(`receipt${i}`)}
            >
              <AccordionSummary expandIcon={<IconChevronDown />}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="subtitle2">9024589781{i}</Typography>
                  <Typography variant="subtitle2" fontWeight="bold">
                    [{2 * i}]
                  </Typography>
                </Box>
              </AccordionSummary>

              <AccordionDetails>
                <Scrollbar sx={{ height: "50vh" }}>
                  <ImageList
                    sx={{ width: "100%" }}
                    cols={1}
                    rowHeight={200}
                    gap={20}
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
                            <Chip
                              label={j}
                              color="primary"
                              sx={{
                                position: "absolute",
                                left: "5px",
                                top: "5px",
                              }}
                            />
                          )}

                          <img
                            width="100%"
                            src="https://upload.wikimedia.org/wikipedia/commons/c/c3/LibreOffice_Writer_6.3.png"
                            alt={`이미지 ${j}`}
                            loading="lazy"
                          />

                          <ImageListItemBar
                            title={
                              <Typography
                                variant="h6"
                                color={j % 2 === 0 ? "primary" : "grey"}
                                fontWeight="bold"
                              >
                                {j % 2 === 0 ? "완료" : "미완료"}
                              </Typography>
                            }
                            subtitle={`20240215245d000${j}`}
                            position="bottom"
                            sx={{
                              backgroundColor: "rgba(0,0,0,0.8)",
                            }}
                          />
                        </ImageListItem>
                      ))}
                  </ImageList>
                </Scrollbar>
              </AccordionDetails>
            </CustomAccordion>
          ))}
      </Scrollbar>
    </LeftCardContainer>
  );
};

export default LeftCard;

const LeftCardContainer = styled(BlankCard)`
  min-width: 250px;
  max-width: 250px;
  height: 100%;
`;
