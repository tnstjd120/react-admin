import { Card, styled } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const RightCard = ({ children }: Props) => {
  return <RightCardContainer>{children}</RightCardContainer>;
};

export default RightCard;

const RightCardContainer = styled(Card)``;
