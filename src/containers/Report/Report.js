import { createMuiTheme } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider } from '@material-ui/styles';
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
  const [data, setData] = useState(null);

  const [Ashkan, setAshkan] = useState({
    Name: 'اشکان دلیری',
    Price: 0
  });
  const [Mehran, setMehran] = useState({
    Name: 'مهران میرشکاران',
    Price: 0
  });
  const [Amin, setAmin] = useState({
    Name: 'امین زارع',
    Price: 0
  });

  const ashkanHandler = (price) => setAshkan(prevAshkan => {
    return { ...prevAshkan, Price: prevAshkan.Price + price }
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

  // `api/housecost/GetReport${url}`
  // AldeonMoriak/jsonApi/ObjList


  useEffect(() => {
    if (selectedDayRange.from && selectedDayRange.to) {
      props.onDateChange(setSelectedDayRange);
      let updatedDateRange = { startTime: null, EndTime: null };
      updatedDateRange.startTime = selectedDayRange.from;
      updatedDateRange.EndTime = selectedDayRange.to;
      updatedDateRange = convertDateHandler(updatedDateRange);
      console.log(updatedDateRange);
      const url = URLGenerator(updatedDateRange);
      // console.log(`api/housecost/GetReport${url}`);
      axios.get('AldeonMoriak/jsonApi/ObjList').then(response => {
        // console.log(response.data[0]);
        // eslint-disable-next-line
        for (let key of response.data) {
          // console.log(response.data[key].Price);
          console.log(key);
          for (let element in key) {
            for (let el of key[element]) {
              // console.log(el)

              if (el.Name === Ashkan.Name) {

                ashkanHandler(el.Price);
                console.log(Ashkan)
              } else if (element.Name === Mehran.Name) {

              } else {

              }
            }
          }
          // fetchedReports.push({
          //   ...response.data[0][key]
          // });

        }
        console.log(...fetchedReports)
        // eslint-disable-next-line
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

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "B Koodak",
      "IRANSans",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  }
});

export default function CustomizedReport(props) {
  return (
    <ThemeProvider theme={theme} >
      <Report onDateChange={props.onDateChange} />
    </ThemeProvider>
  )
}