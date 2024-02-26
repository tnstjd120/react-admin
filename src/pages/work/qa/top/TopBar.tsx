import { Card, FormControlLabel, Switch } from "@mui/material";
import CustomDateRange from "@/components/form/CustomDateRange";
import { useQaWorkStore } from "@/store/qaWork/useQaWorkStore";

const TopBar = () => {
  const { withImage, setWithImage, dateRange, setDateRange } = useQaWorkStore(
    (state) => state
  );

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
      <CustomDateRange
        defaultDateRange={dateRange}
        onChangeEndDateRange={(dateRange) => setDateRange(dateRange)}
      />

      <FormControlLabel
        control={
          <Switch
            checked={withImage}
            onChange={() => setWithImage(!withImage)}
          />
        }
        label="With image"
        labelPlacement="start"
      />
    </Card>
  );
};

export default TopBar;
