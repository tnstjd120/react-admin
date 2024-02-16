import { Card, FormControlLabel, Input, Switch } from "@mui/material";
import { useQaWorkContext } from "../QaWorkContext";

const TopBar = () => {
  const { withImage, handleChangeWithImage } = useQaWorkContext();

  return (
    <Card
      sx={{
        maxHeight: "60px",
        minHeight: "60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Input type="date" />

      <FormControlLabel
        control={
          <Switch
            checked={withImage}
            onChange={() => handleChangeWithImage(!withImage)}
          />
        }
        label="With image"
        labelPlacement="start"
      />
    </Card>
  );
};

export default TopBar;
