import { Button, ButtonGroup } from "@mui/material";

import WbSunnyTwoToneIcon from "@mui/icons-material/WbSunnyTwoTone";
import DarkModeTwoToneIcon from "@mui/icons-material/DarkModeTwoTone";
import { ActiveModeType, useStylesState } from "@/store/useStylesStore";

const ThemeToggle = () => {
  const { activeMode, setActiveMode } = useStylesState((state) => state);
  const handleClick = (mode: ActiveModeType) => setActiveMode(mode);

  return (
    <ButtonGroup
      size="large"
      sx={{ color: activeMode === "light" ? "#ddd" : "#555" }}
    >
      <Button
        onClick={() => handleClick("light")}
        color={activeMode === "light" ? "primary" : "inherit"}
      >
        <WbSunnyTwoToneIcon color="inherit" />
      </Button>
      <Button
        onClick={() => handleClick("dark")}
        color={activeMode === "dark" ? "primary" : "inherit"}
      >
        <DarkModeTwoToneIcon color="inherit" />
      </Button>
    </ButtonGroup>
  );
};

export default ThemeToggle;
