import { Box, Card, styled } from "@mui/material";
import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";

import "react-reflex/styles.css";
import ImageController from "./ImageController";
import QaWorkTable from "./QaWorkTable";
import { useQaWorkStore } from "@/store/qaWork/useQaWorkStore";

const RightCard = () => {
  const { currentImage } = useQaWorkStore((state) => state);

  return (
    <RightCardContainer>
      <ReflexContainer>
        <ReflexElement
          flex={0.6}
          minSize={100}
          style={{ minWidth: "calc(100% - 41px)" }}
        >
          {currentImage?.imageUrl ? (
            <ImageController source={currentImage?.imageUrl} />
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              width="100%"
              bgcolor="black"
              borderRadius={0}
              sx={{ "& img": { maxWidth: "100%", maxHeight: "100%" } }}
            >
              <img src="/images/noimage.jpg" />
            </Box>
          )}
        </ReflexElement>

        <CustomReflexSplitter />

        <ReflexElement flex={0.4}>
          <QaWorkTable />
        </ReflexElement>
      </ReflexContainer>
    </RightCardContainer>
  );
};

export default RightCard;

const RightCardContainer = styled(Card)`
  padding: 0;
`;

const CustomReflexSplitter = styled(ReflexSplitter)(({ theme }) => ({
  height: "5px !important",
  "&:hover": {
    transition: "0.05s !important",
    backgroundColor: `${theme.palette.primary.main} !important`,
    transform: "scaleY(2) !important",
    border: "0 !important",
  },
}));
