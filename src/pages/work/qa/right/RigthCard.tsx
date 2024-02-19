import { Card, styled } from "@mui/material";
import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";

import "react-reflex/styles.css";
import ImageController from "./ImageController";
import QaWorkTable from "./QaWorkTable";

const RightCard = () => {
  return (
    <RightCardContainer>
      <ReflexContainer>
        <ReflexElement style={{ minWidth: "calc(100% - 41px)" }}>
          <ImageController />
        </ReflexElement>

        <ReflexSplitter />

        <ReflexElement flex={0.2}>
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
