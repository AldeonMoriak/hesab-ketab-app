import React, { useState, useEffect } from "react";
import "react-persian-calendar-date-picker/lib/DatePicker.css";
import DatePicker from "react-persian-calendar-date-picker";
import moment from "jalali-moment";
import axios from "../../axios-exp";

function Report(props) {
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null
  });

  useEffect(() => {
    props.onDateChange(selectedDayRange);
    const convertedDate = moment
      .from("1392/6/3", "fa", "YYYY/M/D")
      .format("YYYY-M-D");
    props.onConvertedDate(convertedDate);
    axios.get("api/housecost/GetReport");
  }, [selectedDayRange]);

  return (
    <DatePicker
      selectedDayRange={selectedDayRange}
      onChange={setSelectedDayRange}
      inputPlaceholder="انتخاب روزهای نمایش"
      isDayRange
    />
  );
}

export default Report;
