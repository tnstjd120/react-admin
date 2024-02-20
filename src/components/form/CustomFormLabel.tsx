import styled from "@emotion/styled";
import { Typography, TypographyProps } from "@mui/material";

type CustomTypographyProps = {
  htmlFor: string;
} & TypographyProps;

export const CustomFormLabel = (props: CustomTypographyProps) => (
  <CustomFormLabelContainer
    component="label"
    variant="subtitle1"
    fontWeight={600}
    {...props}
  />
);

const CustomFormLabelContainer = styled(Typography)`
  margin-bottom: 5px;
  margin-top: 25px;
  display: block;
`;
