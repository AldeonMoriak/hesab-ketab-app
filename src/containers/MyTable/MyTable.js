import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import axios from "../../axios-exp";
import moment from "jalali-moment";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#ccc"
    }
  }
}))(TableRow);

const switchHandler = condition => {
  let persons = "";
  // eslint-disable-next-line
  switch (condition) {
    case 1:
      persons = "Ashkan, Amin, Mehran";
      break;
    case 2:
      persons = "Amin, Mehran";
      break;
    case 3:
      persons = "Amin, Ashkan";
      break;
    case 4:
      persons = "Ashkan, Mehran";
      break;
    case 5:
      persons = "Amin";
      break;
    case 6:
      persons = "Ashkan";
      break;
    case 7:
      persons = "Mehran";
      break;
  }
  // console.log('swirchHandler')
  return persons;
};

const spenderIdHandler = id => {
  let spender = "";
  // eslint-disable-next-line
  switch (id) {
    case 1:
      spender = "Amin";
      break;
    case 2:
      spender = "Ashkan";
      break;
    case 3:
      spender = "Mehran";
      break;
  }
  // console.log('spenderIdHandler')
  return spender;
};

const MyTable = props => {
  const [reports, setReports] = useState([]);
  const [cells, setCells] = useState([]);
  const [columnNames, setColumnNames] = useState([]);

  const reportsHandler = data => {
    setReports(reports => reports.push(...data));
  };

  // AldeonMoriak/jsonApi/0
  // /api/housecost/getallsells

  const fetchedReports = [];
  const toGetAllSells = () => {
    axios
      .get("/api/housecost/getallsells")
      .then(response => {
        // eslint-disable-next-line
        // change in to of
        // eslint-disable-next-line
        for (let key in response.data) {
          fetchedReports.push({
            No: +key + 1,
            ...response.data[key]
          });
        }
        // eslint-disable-next-line

        fetchedReports.forEach((report, index) => {
          fetchedReports[index].Type = switchHandler(report.Type);
          fetchedReports[index].SpenderId = spenderIdHandler(report.SpenderId);
        });
        reportsHandler(fetchedReports);
        cellMaker();
      })
      .catch(error => {
        console.log(`Error message2: ${error.message}`);
      });
  };

  useEffect(() => {
    toGetAllSells();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.myTableRenderer]);
  // , [props.myTableRenderer]
  const cellMaker = () => {
    const columnName = [];
    const reportsHook = reports;
    let cellsHook = [];
    // eslint-disable-next-line
    for (let key in reportsHook[0]) {
      columnName.push(key);
    }
    // eslint-disable-next-line
    for (let key of reportsHook) {
      let elements = [];
      // eslint-disable-next-line
      for (let element in key) {
        if (element === "CreateDateTime") {
          elements.push(
            moment(`${key[element]}`, "DD-MM-YYYY")
              .locale("fa")
              .format("YYYY/M/D")
          );
        } else {
          elements.push(key[element]);
        }
      }
      cellsHook.push(elements);
    }

    setCells(cellsHook);
    setColumnNames(columnName);
  };

  const cellHolder = () => {
    const columnNamesHook = [...columnNames];
    console.log(columnNamesHook);
    return columnNamesHook.map((key, index) => (
      <StyledTableCell align="center" key={index}>
        {key}
      </StyledTableCell>
    ));
  };

  const cellsHooks = cells;
  let content = [];

  content.push(
    cellsHooks.map((key, indexRow) => (
      <StyledTableRow key={indexRow}>
        {key.map((element, index) => (
          <StyledTableCell
            key={index}
            align="center"
            component="th"
            scope="row"
          >
            {element}
          </StyledTableCell>
        ))}
      </StyledTableRow>
    ))
  );

  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>{cellHolder()}</TableRow>
        </TableHead>
        <TableBody>{content[0].map(key => key)}</TableBody>
      </Table>
    </Paper>
  );
};

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

export default function CustomizedTable(props) {
  return (
    <ThemeProvider theme={theme}>
      <MyTable myTableRenderer={props.myTableRen} />
    </ThemeProvider>
  );
}

// export default MyTable;
