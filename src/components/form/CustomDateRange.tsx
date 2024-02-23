import { Box, Button, Stack, Typography, styled } from "@mui/material";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import { useEffect, useRef, useState } from "react";
import { CalendarMonthOutlined } from "@mui/icons-material";
import { ko } from "date-fns/locale";
import dayjs from "dayjs";

type TCustomDateRange = {
  onChangeDateRange?: (dateRange: Range) => void;
  onChangeEndDateRange?: (dateRange: Range) => void;
};

const CustomDateRange = ({
  onChangeDateRange,
  onChangeEndDateRange,
}: TCustomDateRange) => {
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [minDate, setMinDate] = useState<Date | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickedOutside = (e: MouseEvent) => {
      if (isOpen && ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", clickedOutside);

    return () => {
      document.removeEventListener("mousedown", clickedOutside);
    };
  }, [isOpen]);

  const handleChange = (newDateRange: RangeKeyDict) => {
    if (
      dateRange.startDate !== newDateRange.selection.startDate &&
      dateRange.endDate !== newDateRange.selection.endDate
    ) {
      setMinDate(newDateRange.selection.startDate);
    } else if (dateRange.endDate !== newDateRange.selection.endDate) {
      if (onChangeEndDateRange) onChangeEndDateRange(newDateRange.selection);
      setMinDate(undefined);
    }

    if (onChangeDateRange) onChangeDateRange(dateRange);

    setDateRange(newDateRange.selection);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <CustomDateRangeContainer>
      <Stack direction="row">
        <Button
          variant="text"
          startIcon={<CalendarMonthOutlined />}
          onClick={handleOpen}
          color={isOpen ? "primary" : "inherit"}
        >
          {dateRange.startDate
            ? dayjs(dateRange.startDate).format("YYYY. MM. DD")
            : "YYYY. MM. DD"}

          <Typography px={1} fontWeight="bold" color="black">
            ~
          </Typography>

          {dateRange.endDate
            ? dayjs(dateRange.endDate).format("YYYY. MM. DD")
            : "YYYY. MM. DD"}
        </Button>
      </Stack>

      {isOpen && (
        <Box ref={ref}>
          <DateRange
            onChange={handleChange}
            ranges={[dateRange]}
            minDate={minDate}
            locale={ko}
            showDateDisplay={false}
          />
        </Box>
      )}
    </CustomDateRangeContainer>
  );
};

export default CustomDateRange;

const CustomDateRangeContainer = styled(Stack)(({ theme }) => ({
  position: "relative",
  zIndex: 1000,

  "& > .MuiBox-root": {
    position: "absolute",
    left: 0,
    top: "calc(100% + 4px)",
    backgroundColor: theme.palette.primary.light,

    "& .rdrCalendarWrapper": {
      position: "fixed",
      boxShadow: theme.shadows[20],
      borderRadius: "8px",

      //   ".rdrStartEdge, .rdrDayStartOfWeek .rdrInRange,": {
      //     borderTopLeftRadius: "4px",
      //     borderBottomLeftRadius: "4px",
      //   },

      //   ".rdrEndEdge, .rdrDayEndOfWeek .rdrInRange": {
      //     borderTopRightRadius: "4px",
      //     borderBottomRightRadius: "4px",
      //   },

      //   ".rdrDayHovered .rdrDayNumber:after": {
      //     borderRadius: "4px !important",
      //   },
    },
  },
}));
