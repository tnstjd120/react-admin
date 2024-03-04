import { Box, Card, Divider, Grid } from "@mui/material";
import { styled } from "@mui/system";

import LoginForm from "./LoginForm";
import Logo from "@/components/common/Logo";
import { useEffect } from "react";
import { removeAllCookies } from "@/utils/cookie";

const LoginPage = () => {
  useEffect(() => {
    removeAllCookies();
  }, []);

  return (
    <LoginWrapper>
      <Grid justifyContent="center" spacing={0} container>
        <Grid
          item
          xs={12}
          sm={12}
          lg={5}
          xl={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Card elevation={9}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Logo />
            </Box>

            <Box mt={3}>
              <Divider>Login</Divider>
            </Box>

            <LoginForm />
          </Card>
        </Grid>
      </Grid>
    </LoginWrapper>
  );
};

export default LoginPage;

const LoginWrapper = styled(Box)`
  position: relative;

  &:before {
    content: "";
    background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)";
    background-size: "400% 400%";
    animation: "gradient 15s ease infinite";
    position: "absolute";
    height: "100%";
    width: "100%";
    opacity: "0.3";
  }

  & > .MuiGrid-root {
    height: 100vh;
  }

  & .MuiCard-root {
    padding: 2rem;
    z-index: 1;
    width: 100%;
    max-width: 450px;
  }
`;
