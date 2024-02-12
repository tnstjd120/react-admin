import { CustomFormLabel } from "@/components/form/CustomFormLabel";
import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { BoxProps } from "@mui/system";
import { IconX } from "@tabler/icons-react";
import { MouseEventHandler, ReactNode } from "react";

type Props = {
  open: boolean;
  onToggle: (value: boolean) => void;
};

const UserDrawer = ({ open, onToggle }: Props) => {
  const handleClose: MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation();
    onToggle(false);
  };

  const dummyData = {
    isUse: true,
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { maxWidth: "500px" } }}
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

      <Box p={3}>
        <Grid container>
          <Grid item xs={12} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="userName" sx={{ mt: 0 }}>
              이름
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              id="userName"
              placeholder="이름을 입력해주세요"
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
              fullWidth
            />
          </Grid>

          <Grid item xs={12} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="userEmail">이메일</CustomFormLabel>
          </Grid>
          <Grid item xs={12}>
            <CustomOutlinedInput
              endAdornment={
                <InputAdornment position="end">@example.com</InputAdornment>
              }
              id="userEmail"
              placeholder="john.deo"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="userPhone">연락처</CustomFormLabel>
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              id="userPhone"
              placeholder="010-1234-5678"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="userCreateAt">가입 일자</CustomFormLabel>
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              id="userCreateAt"
              value="2024.02.13"
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
              value="0"
              // onChange={handleChange}
              fullWidth
              variant="outlined"
            >
              <MenuItem value="0">관리자</MenuItem>
              <MenuItem value="1">매니저</MenuItem>
              <MenuItem value="2">어노테이터</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="userCreateAt">승인 상태</CustomFormLabel>
          </Grid>
          <Grid item xs={12}>
            <Chip
              color={dummyData.isUse ? "success" : "error"}
              // size="small"
              label={dummyData.isUse ? "승인" : "미승인"}
              sx={{
                borderRadius: "6px",
              }}
            />
          </Grid>

          <Grid item xs={12} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="userMemo">사용자 메모</CustomFormLabel>
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              id="userMemo"
              value="6 개월 일하다가 퇴사하기로 함 // 커피내기 2번 짐"
              multiline
              fullWidth
            />
          </Grid>

          <Grid item xs={12} mt={3} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary">
              저장
            </Button>
          </Grid>
        </Grid>
      </Box>
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
