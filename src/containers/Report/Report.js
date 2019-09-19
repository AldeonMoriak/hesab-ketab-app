import React, { useState, useEffect } from "react";
import "react-persian-calendar-date-picker/lib/DatePicker.css";
import DatePicker from "react-persian-calendar-date-picker";
import moment from "jalali-moment";
import axios from "../../axios-exp";
import URLGenerator from "../components/URLGenerator/URLGenerator";
import classes from "./Report.module.css";

function Report(props) {
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null
  });

  let convertDateHandler = updatedDateRange => {
    for (let date in updatedDateRange) {
      // "1392/6/3"
      // convertedDate.push(
      updatedDateRange[date] = moment
        .from(
          `${updatedDateRange[date].year}/${updatedDateRange[date].month}/${updatedDateRange[date].day}`,
          "fa",
          "YYYY/M/D"
        )
        .format("YYYY-M-D");
      console.log(updatedDateRange[date]);
      // );
    }
    return updatedDateRange;
  };

  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      props.onDateChange(selectedDayRange);
      let updatedDateRange = { startTime: null, EndTime: null };
      updatedDateRange.startTime = selectedDayRange.from;
      updatedDateRange.EndTime = selectedDayRange.to;
      updatedDateRange = convertDateHandler(updatedDateRange);
      console.log(updatedDateRange);
      const url = URLGenerator(updatedDateRange);
      // props.onConvertedDate(convertedDate);
      axios.get(`api/housecost/GetReport${url}`).then(response => {});
    }
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
