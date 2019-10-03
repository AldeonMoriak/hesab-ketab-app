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

  console.log(reports)
  const reportsHandler = data => {
    setReports(reports => [...data]);
    console.log(reports)
  };

  // AldeonMoriak/jsonApi/0
  // /api/housecost/getallsells

  const fetchedReports = [];
  const toGetAllSells = () => {
    axios
      .get("AldeonMoriak/jsonApi/0")
      .then(response => {
        console.log(reports)
        // eslint-disable-next-line
        // change in to of
        // eslint-disable-next-line
        let id = 0
        const idGenerator = () => { id = id + 1; return id; }
        for (let key of response.data) {
          // console.log(key)
          fetchedReports.push({
            No: idGenerator(),
            ...key
          });
        }
        // eslint-disable-next-line

        fetchedReports.forEach((report, index) => {
          console.log(reports)
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
    console.log(reports)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.myTableRenderer]);
  // , [props.myTableRenderer]
  const cellMaker = () => {
    console.log(reports)
    const columnName = [];
    let cellsHook = [];
    const reportsHook = reports;
    // eslint-disable-next-line
    // for (let key of reportsHook) {
    for (let el in reportsHook[0]) {
      console.log(el);
      columnName.push(el);
    }
    // }
    console.log(columnName)
    // eslint-disable-next-line
    for (let key of reportsHook) {
      console.log(key)
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

    setCells(cells => [...cellsHook]);
    console.log(columnName)
    setColumnNames(columnName);
  };

  const cellHolder = () => {
    console.log(reports)
    const columnNamesHook = [...columnNames];
    console.log(columnNamesHook)
    // console.log(columnNamesHook);
    return columnNamesHook.map((key, index) => (
      <StyledTableCell align="center" key={index}>
        {key}
      </StyledTableCell>
    ));
  };

  const cellsHooks = cells;
  // console.log(cells)
  let content = [];
  // console.log(reports)

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
  // console.log(reports)
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
      <MyTable myTableRenderer={props.myTableRenderer} />
    </ThemeProvider>
  );
}

// export default MyTable;
