import { Card, styled } from "@mui/material";
import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";

import "react-reflex/styles.css";
import ImageEditor from "./ImageEditor";

const RightCard = () => {
  return (
    <RightCardContainer>
      <ReflexContainer>
        <ReflexElement>
          <ImageEditor />
        </ReflexElement>

        <ReflexSplitter />

        <ReflexElement flex={0.1}>Bottom Panel</ReflexElement>
      </ReflexContainer>
    </RightCardContainer>
  );
};

export default RightCard;

const RightCardContainer = styled(Card)`
  padding: 0;
`;
