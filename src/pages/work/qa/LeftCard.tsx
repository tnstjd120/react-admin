import BlankCard from "@/components/common/BlankCard";
import theme from "@/utils/theme";
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Box,
  Button,
  Card,
  Chip,
  Collapse,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  styled,
} from "@mui/material";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { ReactNode, SyntheticEvent, useState } from "react";

type Props = {
  // children: ReactNode;
};

const CustomAccordion = styled(Accordion)<AccordionProps>(({ theme }) => ({
  "& .Mui-expanded": {
    backgroundColor: theme.palette.primary.main,

    "& .MuiCollapse-root": {
      backgroundColor: `${theme.palette.primary.main} !important`,
    },
  },
}));

const LeftCard = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const handleChangeReceipt =
    (value: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      console.log("value => ", value);
      console.log("isExpanded => ", isExpanded);
      setExpanded(isExpanded ? value : false);
    };
  return (
    <LeftCardContainer>
      {Array(20)
        .fill(0)
        .map((_, i) => (
          <CustomAccordion
            key={i}
            expanded={expanded === `receipt${i}`}
            onChange={handleChangeReceipt(`receipt${i}`)}
            variant="outlined"
          >
            <AccordionSummary expandIcon={<IconChevronDown />}>
              <Box display="flex" alignItems="center" gap={1}>
                <Chip label={i} color="primary" size="small" />

                <span>9024589781{i}</span>
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              <ImageList
                sx={{ width: "100%", maxHeight: "412px" }}
                cols={1}
                rowHeight={80}
              >
                {Array(10)
                  .fill(0)
                  .map((_, j) => (
                    <ImageListItem key={j} sx={{ width: "100%" }}>
                      <img
                        width="100%"
                        src="https://upload.wikimedia.org/wikipedia/commons/c/c3/LibreOffice_Writer_6.3.png"
                        alt={`이미지 ${j}`}
                        loading="lazy"
                      ></img>
                    </ImageListItem>
                  ))}
              </ImageList>
            </AccordionDetails>
          </CustomAccordion>
        ))}

      {/* <List>
        <ListItem sx={{ display: "flex", flexDirection: "column" }}>
          <Button
            fullWidth
            endIcon={open ? <IconArrowUp /> : <IconArrowDown />}
            onClick={() => setOpen(!open)}
            sx={{ justifyContent: "space-between" }}
          >
            90245897813
          </Button>

          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            sx={{ border: "1px solid blue", borderTop: 0 }}
          >
            <List>
              <ListItem sx={{ width: "100%" }}>
                <img
                  width="100%"
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c3/LibreOffice_Writer_6.3.png"
                ></img>
              </ListItem>
            </List>
          </Collapse>
        </ListItem>
      </List> */}
    </LeftCardContainer>
  );
};

export default LeftCard;

const LeftCardContainer = styled(BlankCard)`
  min-width: 200px;
  max-width: 200px;
  max-height: 100%;
`;
