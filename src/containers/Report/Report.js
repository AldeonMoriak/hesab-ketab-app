import TextField from '@material-ui/core/TextField';
import moment from "jalali-moment";
import React, { useEffect, useState } from "react";
import DatePicker from "react-persian-calendar-date-picker";
import "react-persian-calendar-date-picker/lib/DatePicker.css";
import axios from "../../axios-exp";
import URLGenerator from "../../components/URLGenerator/URLGenerator";
import classes from "./Report.module.css";

function Report(props) {
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null
  });

  let convertDateHandler = updatedDateRange => {
    // eslint-disable-next-line
    for (let date in updatedDateRange) {
      updatedDateRange[date] = moment
        .from(
          `${updatedDateRange[date].year}/${updatedDateRange[date].month}/${updatedDateRange[date].day}`,
          "fa",
          "YYYY/M/D"
        )
        .format("YYYY-M-D");
      console.log(updatedDateRange[date]);
    }
    return updatedDateRange;
  };
  let fetchedReports = [];
  let report = [];

  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      props.onDateChange(selectedDayRange);
      let updatedDateRange = { startTime: null, EndTime: null };
      updatedDateRange.startTime = selectedDayRange.from;
      updatedDateRange.EndTime = selectedDayRange.to;
      updatedDateRange = convertDateHandler(updatedDateRange);
      console.log(updatedDateRange);
      const url = URLGenerator(updatedDateRange);
      console.log(`api/housecost/GetReport${url}`);
      axios.get(`api/housecost/GetReport${url}`).then(response => {
        console.log(response.data.ObjList[0]);
        for (let key in response.data.ObjList[0]) {
          fetchedReports.push({
            ...response.data.ObjList[0][key]
          });
        }
        for (let data of fetchedReports) {
          if (Object.keys(data).length > 0) {
            for (let key in data) {
              report.push(`${data[key].Name}: ${data[key].Price}`);
            }
          }
        }
        console.log(report);
      });
    } // eslint-disable-next-line
  }, [selectedDayRange]);
  const renderCustomInput = ({ ref, onFocus, onBlur }) => (
    <TextField
      dir='rtl'
      readOnly
      ref={ref} // necessary
      onFocus={onFocus} // necessary
      isDayRange
      onBlur={onBlur} // necessary
      placeholder="انتخاب روزهای گزارش"
      value={selectedDayRange.from && selectedDayRange.to ? `از ${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day} تا ${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}` : ''}
      style={{
        textAlign: 'center',
        padding: '.1em',
        color: '#ccc',
        fontFamily: 'inherit'
      }}
      className="my-custom-input-class" // a styling class
    />
  )

  return (
    <div className={classes.Input}>
      <DatePicker
        selectedDayRange={selectedDayRange}
        onChange={setSelectedDayRange}
        isDayRange
        renderInput={renderCustomInput}
      />
      <div className={classes.Report}>
        {report.map((key, index) => (
          <div>
            <p key={index}>
              {index}: {key}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Report;
