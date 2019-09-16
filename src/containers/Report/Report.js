import React, { useState, useEffect } from "react";
import "react-persian-calendar-date-picker/lib/DatePicker.css";
import DatePicker from "react-persian-calendar-date-picker";
import { getThemeProps } from "@material-ui/styles";

const Report = props => {
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null
  });

  useEffect(() => {
    props.onDateChange(selectedDayRange);
  }, [selectedDayRange]);

  return (
    <DatePicker
      selectedDayRange={selectedDayRange}
      onChange={setSelectedDayRange}
      inputPlaceholder="انتخاب روزهای نمایش"
      isDayRange
    />
  );
};

export default Report;
