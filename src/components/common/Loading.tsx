import { Box, CircularProgress } from "@mui/material";

type Props = {
  fixed?: boolean;
};

const Loading = ({ fixed }: Props) => {
  const fixedStyle = fixed
    ? {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
      }
    : {};

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        backdropFilter: "blur(2px)",
        ...fixedStyle,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
