import { createMuiTheme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider } from '@material-ui/styles';
import moment from "jalali-moment";
import React, { useEffect, useState } from "react";
import DatePicker from "react-persian-calendar-date-picker";
import "react-persian-calendar-date-picker/lib/DatePicker.css";
import axios from "../../axios-exp";
import URLGenerator from "../../components/URLGenerator/URLGenerator";
import classes from "./Report.module.css";
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  grid: {
    margin: '1em'
  }
}));

const INITIAL_ASHKAN = {
  Name: "اشکان دلیری",
  Price: 0
};
function Report(props) {
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null
  });
  const [show, setShow] = useState(false);

  const [Ashkan, setAshkan] = useState(INITIAL_ASHKAN);
  const [Mehran, setMehran] = useState({
    Name: "مهران میرشکاران",
    Price: 0
  });
  const [Amin, setAmin] = useState({
    Name: "امین زارع",
    Price: 0
  });

  const ashkanHandler = price => {
    setAshkan(Ashkan => ({ ...Ashkan, Price: price }));
    console.log(Ashkan);
  };
  const mehranHandler = price => {
    setAshkan(Mehran => ({ ...Mehran, Price: price }));
    console.log(Mehran);
  };
  const aminHandler = price => {
    setAshkan(Amin => ({ ...Amin, Price: price }));
    console.log(Amin);
  };

  //   });

  const mehranHandler = price => {
    setMehran(Mehran => ({ ...Mehran, Price: Mehran.Price + price }));
    console.log(Mehran);
  };
  const aminHandler = price => {
    setAmin(Amin => ({ ...Amin, Price: Amin.Price + price }));
    console.log(Amin);
  };

  const stateResetHandler = () => {
    setAshkan(Ashkan => ({ ...Ashkan, Price: 0 }));
    setMehran(Mehran => ({ ...Mehran, Price: 0 }));
    setAmin(Amin => ({ ...Amin, Price: 0 }));
  };

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
      setShow(false);
      stateResetHandler();
      props.onDateChange(setSelectedDayRange);
      let updatedDateRange = { startTime: null, EndTime: null };
      updatedDateRange.startTime = selectedDayRange.from;
      updatedDateRange.EndTime = selectedDayRange.to;
      updatedDateRange = convertDateHandler(updatedDateRange);
      console.log(updatedDateRange);
      const url = URLGenerator(updatedDateRange);
      // console.log(`api/housecost/GetReport${url}`);
      axios.get("AldeonMoriak/jsonApi/ObjList").then(response => {
        // console.log(response.data[0]);
        // eslint-disable-next-line
        for (let key of response.data) {
          // console.log(response.data[key].Price);
          console.log(key);
          for (let element in key) {
            for (let el of key[element]) {
              // console.log(el)
              switch (el.Name) {
                case Ashkan.Name:
                  ashkanHandler(el.Price);
                  break;
                case Mehran.Name:
                  mehranHandler(el.Price);
                  break;
                case Amin.Name:
                  aminHandler(el.Price);
                  console.log(el.Price);
                  break;
                default:
                  console.log("error");
              }
            }
          }
        }
        setShow(true);
      });
    } // eslint-disable-next-line
  }, [selectedDayRange]);

  const classes = useStyles();

  const renderCustomInput = ({ ref, onFocus, onBlur }) => (
    <TextField
      dir="rtl"
      readOnly
      ref={ref} // necessary
      onFocus={onFocus} // necessary
      onBlur={onBlur} // necessary
      placeholder="انتخاب روزهای گزارش"
      value={
        selectedDayRange.from && selectedDayRange.to
          ? `از ${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day} تا ${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`
          : ""
      }
      style={{
        textAlign: "center",
        padding: ".1em",
        color: "#ccc",
        fontFamily: "inherit"
      }}
    />
  );

  const showHandler = () => {
    return show ? (
      <Grid container direction='row' justify='center' alignItems='center' spacing={3} className={classes.root}>
        <Grid item xs={12}>
          <Grid spacing={3} container >
            <Grid item>
              <Paper className={classes.paper}> <Typography variant='h5' component='h2'>{Ashkan.Name}</Typography><Typography component='h2'>{`${Ashkan.Price} تومن`}</Typography></Paper></Grid>
            <Grid item>
              <Paper className={classes.paper}><Typography variant='h5' component='h2'>{Mehran.Name}</Typography><Typography component='h2'>{`${Mehran.Price} تومن`}</Typography></Paper></Grid>
            <Grid item>
              <Paper className={classes.paper}><Typography variant='h5' component='h2'>{Amin.Name}</Typography><Typography component='h2'>{`${Amin.Price} تومن`}</Typography></Paper>
            </Grid>
          </Grid >
        </Grid>
      </Grid>
    ) : null;
  }

  return (
    <div>
      <Grid container>
        <Grid container direction='row' justify='flex-end' alignItems='center' spacing={2} className={classes.grid}>
          <Grid item >
            <DatePicker
              selectedDayRange={selectedDayRange}
              onChange={setSelectedDayRange}
              isDayRange
              renderInput={renderCustomInput}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        {showHandler()}
      </Grid>
      {/* // </Grid> */}
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
    <ThemeProvider theme={theme}>
      <Report onDateChange={props.onDateChange} />
    </ThemeProvider>
  );
}
