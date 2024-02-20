import { Card, styled } from "@mui/material";
import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";

import "react-reflex/styles.css";
import ImageController from "./ImageController";
import QaWorkTable from "./QaWorkTable";

const RightCard = () => {
  return (
    <RightCardContainer>
      <ReflexContainer>
        <ReflexElement
          flex={0.8}
          minSize={100}
          style={{ minWidth: "calc(100% - 41px)" }}
        >
          <ImageController />
        </ReflexElement>

        <CustomReflexSplitter />

        <ReflexElement style={{ overflow: "auto" }} flex={0.2}>
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
  "&:hover": {
    transition: "0.05s !important",
    backgroundColor: `${theme.palette.primary.main} !important`,
    transform: "scaleY(3) !important",
    border: "0 !important",
  },
}));
