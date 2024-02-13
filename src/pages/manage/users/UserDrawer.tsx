import Scrollbar from "@/components/common/Scrollbar";
import { CustomFormLabel } from "@/components/form/CustomFormLabel";
import { UserInfoResponse } from "@/types/User";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { BoxProps } from "@mui/system";
import { IconRefresh, IconX } from "@tabler/icons-react";
import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";
import UserDrawerSkeleton from "./UserDrawerSkeleton";
import dayjs from "dayjs";
import { Role } from "@/types/Role";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { API_PATH } from "@/api/API_PATH";
import { api } from "@/api/axios";
import { VariantType, useSnackbar } from "notistack";

type Props = {
  open: boolean;
  onToggle: (value: boolean) => void;
  data: UserInfoResponse | null;
  roles: Role[] | null;
};

const UserDrawer = ({ open, onToggle, data, roles }: Props) => {
  const [userData, setUserData] = useState<UserInfoResponse | null>(null);

  useEffect(() => {
    if (data) setUserData({ ...data });
  }, [data, open]);

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (userData)
      setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleChangeSelect = (event: SelectChangeEvent<number>) => {
    if (userData)
      setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleChangeSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    if (userData)
      setUserData({ ...userData, [event.target.name]: event.target.checked });
  };

  const handleClose: MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation();
    onToggle(false);
  };

  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleClickConfirmOpen = () => {
    setConfirmOpen(true);
  };

  const handleClickConfirmClose = () => {
    setConfirmOpen(false);
  };

  const { enqueueSnackbar } = useSnackbar();
  const handleOpenSnack = (text: string, variant?: VariantType) => {
    console.log("snack");
    enqueueSnackbar(text, { variant });
  };

  const handleClickResetPassword = async () => {
    const { PATH, METHOD } = API_PATH.USERS.PASSWORD_INIT;
    const response = await api(PATH, {
      ...METHOD,
      data: { userId: userData?.userId },
    });

    console.log(response);
    handleOpenSnack("성공적으로 초기화 되었습니다.", "success");
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: { maxWidth: "400px", width: "100%", overflow: "hidden" },
      }}
      onClick={(event) => event.stopPropagation()}
    >
      <Box
        p={2}
        display="flex"
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Typography variant="h4">사용자 설정</Typography>

        <IconButton color="inherit" onClick={handleClose}>
          <IconX size="1rem" />
        </IconButton>
      </Box>

      <Divider />

      <Scrollbar sx={{ height: "calc(100vh - 64px)", minWidth: "100%" }}>
        <Box p={3} pt={0}>
          {userData ? (
            <Grid container>
              <Grid item xs={12} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="userName" sx={{ mt: 0 }}>
                  이름
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  id="userName"
                  name="userName"
                  placeholder="이름을 입력해주세요"
                  value={userData.userName}
                  onChange={handleChangeInput}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="userId">아이디</CustomFormLabel>
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  id="userId"
                  placeholder="아이디를 입력해주세요."
                  value={userData.userId}
                  fullWidth
                  disabled
                />
              </Grid>

              <Grid item xs={12} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="userEmail">이메일</CustomFormLabel>
              </Grid>
              <Grid item xs={12}>
                <CustomOutlinedInput
                  endAdornment={
                    <InputAdornment position="end">
                      @quantum-ai.ai
                    </InputAdornment>
                  }
                  id="userEmail"
                  placeholder="sunseong.kwon"
                  disabled
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="userPhone">연락처</CustomFormLabel>
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  id="userPhone"
                  name="userPhone"
                  placeholder="010-1234-5678"
                  value="010-5029-0087"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="userCreatedAt">
                  가입 일자
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  id="userCreatedAt"
                  value={dayjs(userData.createdAt).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                  disabled
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="userRole">권한</CustomFormLabel>
              </Grid>
              <Grid item xs={12}>
                <Select
                  id="userRole"
                  name="roleId"
                  value={userData.roleId}
                  onChange={handleChangeSelect}
                  fullWidth
                  variant="outlined"
                >
                  {roles &&
                    roles.map((role) => (
                      <MenuItem key={role.roleId} value={role.roleId}>
                        {role.roleLabel}
                      </MenuItem>
                    ))}
                </Select>
              </Grid>

              <Grid item xs={12} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="userMemo">
                  사용자 메모
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  id="userMemo"
                  value="3 개월 일하다가 퇴사하기로 함 // 커피내기 2번 졌음 // 나중에 알바 형태로 도와주기로 함"
                  multiline
                  fullWidth
                />
              </Grid>

              <Grid
                item
                container
                xs={12}
                display="flex"
                alignItems="center"
                pb={3}
              >
                <Grid item xs={3}>
                  <Grid>
                    <CustomFormLabel htmlFor="userIsUse" textAlign="center">
                      승인 상태
                    </CustomFormLabel>
                  </Grid>
                  <Grid textAlign="center">
                    <Switch
                      id="userIsUse"
                      name="isUse"
                      checked={userData.isUse}
                      onChange={handleChangeSwitch}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={3}>
                  <Grid>
                    <CustomFormLabel
                      htmlFor="userIsPossAssign"
                      textAlign="center"
                    >
                      배정 상태
                    </CustomFormLabel>
                  </Grid>
                  <Grid textAlign="center">
                    <Switch
                      id="userIsPossAssign"
                      name="isPossAssign"
                      checked={userData.isPossAssign}
                      onChange={handleChangeSwitch}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
                mt={3}
                display="flex"
                justifyContent="flex-end"
                gap={2}
              >
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<IconRefresh />}
                  onClick={handleClickConfirmOpen}
                >
                  비밀번호 초기화
                </Button>

                <ConfirmDialog
                  title="비밀번호를 초기화 하시겠습니까?"
                  text="비밀번호 초기화 시 되돌릴 수 없습니다."
                  open={confirmOpen}
                  confirmFunction={handleClickResetPassword}
                  handleClose={handleClickConfirmClose}
                />

                <Button variant="contained" color="primary">
                  저장
                </Button>
              </Grid>
            </Grid>
          ) : (
            <UserDrawerSkeleton arrayLength={8} />
          )}
        </Box>
      </Scrollbar>
    </Drawer>
  );
};

export default UserDrawer;

const CustomOutlinedInput = styled((props: any) => (
  <OutlinedInput {...props} />
))(({ theme }) => ({
  "& .MuiOutlinedInput-input::-webkit-input-placeholder": {
    color: theme.palette.text.secondary,
    opacity: "0.8",
  },

  "& .MuiTypography-root": {
    color: theme.palette.text.secondary,
  },

  "& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder": {
    color: theme.palette.text.secondary,
    opacity: "1",
  },
}));

const CustomTextField = styled((props: any) => <TextField {...props} />)(
  ({ theme }) => ({
    "& .MuiOutlinedInput-input::-webkit-input-placeholder": {
      color: theme.palette.text.secondary,
      opacity: "0.8",
    },
    "& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder": {
      color: theme.palette.text.secondary,
      opacity: "1",
    },
    "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.grey[200],
    },
  })
);

const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
  boxShadow: theme.shadows[8],
  padding: "20px",
  cursor: "pointer",
  justifyContent: "center",
  display: "flex",
  transition: "0.1s ease-in",
  border: "1px solid rgba(145, 158, 171, 0.12)",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));
