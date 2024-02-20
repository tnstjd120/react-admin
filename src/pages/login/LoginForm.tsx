import { CustomFormLabel } from "@/components/form/CustomFormLabel";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios, { AxiosError } from "axios";
import { useUserState } from "@/store/useUserStore";
import { setCookie } from "@/utils/cookie";
import { API_PATH } from "@/api/API_PATH";

const LoginForm = () => {
  const [helperText, setHelperText] = useState("");
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const navigate = useNavigate();
  const setUserInfo = useUserState((state) => state.setUserInfo);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setHelperText("");

    try {
      const { PATH, METHOD } = API_PATH.USERS.LOGIN;

      const response = await fetch(
        `${import.meta.env.VITE_APP_BASE_URL}${PATH}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: METHOD.method,
          body: JSON.stringify({ userId: userId, userPassword: userPassword }),
        }
      );

      const json = await response.json();

      if (!response.ok) {
        setHelperText(json.message);
        return;
      }

      const { accessToken, refreshToken, ...rest } = json;
      setCookie("accessToken", accessToken);
      setCookie("refreshToken", refreshToken);
      setCookie("userId", rest.userId);

      setUserInfo(rest);

      navigate("/");
    } catch (error) {
      if (axios.isAxiosError<{ message: string }>(error)) {
        const serverError = error as AxiosError<{ message: string }>;

        if (serverError && serverError.response) {
          setHelperText(serverError.response.data.message);
        } else {
          setHelperText("Error: 개발자에게 문의해주세요.");
        }
      } else {
        console.error(error);
        setHelperText("Error: 개발자에게 문의해주세요.");
      }
    }
  };

  const onChangeUserId: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUserId(e.target.value);
  };

  const onChangeUserPassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUserPassword(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <Box>
          <CustomFormLabel htmlFor="userId">아이디</CustomFormLabel>
          <TextField
            id="userId"
            name="userId"
            variant="outlined"
            size="small"
            fullWidth
            onChange={onChangeUserId}
          />
        </Box>

        <Box>
          <CustomFormLabel htmlFor="userPassword">비밀번호</CustomFormLabel>
          <TextField
            id="userPassword"
            name="userPassword"
            variant="outlined"
            size="small"
            type="password"
            fullWidth
            onChange={onChangeUserPassword}
          />
        </Box>
      </Stack>

      <Stack
        justifyContent="space-between"
        direction="row"
        alignItems="center"
        my={2}
      >
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                onChange={(e) => console.log(e.target.checked)}
              />
            }
            label="아이디 기억하기"
            color="grey"
          />
        </FormGroup>

        <Stack direction="row" gap={1}>
          <Typography
            component={Link}
            to="/forgot-passowrd"
            fontWeight="500"
            color="primary"
            sx={{ "&:hover": { textDecoration: "underline" } }}
          >
            비밀번호 찾기
          </Typography>
          <Typography
            component={Link}
            to="/signup"
            fontWeight="500"
            color="primary"
            sx={{ "&:hover": { textDecoration: "underline" } }}
          >
            회원가입
          </Typography>
        </Stack>
      </Stack>

      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          type="submit"
          fullWidth
        >
          로그인
        </Button>
      </Box>

      {helperText && (
        <Typography mt={2} textAlign="center" color="error" variant="subtitle2">
          {helperText}
        </Typography>
      )}
    </form>
  );
};

export default LoginForm;
