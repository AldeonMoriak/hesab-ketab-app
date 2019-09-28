import React, { PureComponent } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import axios from "../../axios-exp";
import moment from "jalali-moment";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },

  table: {
    minWidth: 700
  }
});

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

class MyTable extends PureComponent {
  state = {
    reports: [],
    error: false,
    cells: [],
    columnNames: []
  };

  cellMaker = () => {
    const reports = [...this.state.reports];
    console.log(reports);
    let cells = [];
    const columnNames = [];
    // eslint-disable-next-line
    // FIXME: use Object.entries() to simplify the code

    // TODO: and then change the logic to make the right array
    for (let key in reports[0]) {
      columnNames.push(key);
    }
    // eslint-disable-next-line
    for (let key of reports) {
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
        console.log(element, key[element]);
      }
      cells.push(elements);
    }
    console.log(cells);
    this.setState({
      cells: cells,
      columnNames: columnNames
    });
  };
  // AldeonMoriak/jsonApi/0
  // /api/housecost/getallsells
  toGetAllSells = () => {
    const fetchedReports = [];
    axios
      .get("AldeonMoriak/jsonApi/0")
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
        // console.log(fetchedReports);
        // eslint-disable-next-line
        for (let report in fetchedReports) {
          // console.log(fetchedReports[report].Type);
          fetchedReports[report].Type = this.switchHandler(
            fetchedReports[report].Type
          );
          // console.log("report type: ", fetchedReports[report].Type);
          fetchedReports[report].SpenderId = this.spenderIdHandler(
            fetchedReports[report].SpenderId
          );
          // console.log("report[spenderId] ", fetchedReports[report].SpenderId);
        }
        this.setState({ reports: fetchedReports });

        this.cellMaker();
      })
      .catch(error => {
        this.setState({ error: true });
      });
  };

  componentDidMount() {
    this.toGetAllSells();
  }

  componentDidUpdate(prevProps) {
    if (this.props.myTableRenderer !== prevProps.myTableRenderer) {
      this.toGetAllSells();
    }
  }

  switchHandler = condition => {
    let persons = [];
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
    return persons;
  };
  spenderIdHandler = id => {
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
    return spender;
  };

  cellHolder = () => {
    const columnNames = this.state.columnNames;
    return (columnNames.map((key, index) => (
      <StyledTableCell align="center" key={index}>
        {key}
      </StyledTableCell>
    ))
    );
  }

  render() {
    const cells = this.state.cells;
    let content = [];

    content.push(
      cells.map((key, indexRow) => (
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

    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {this.cellHolder()}
            </TableRow>
          </TableHead>
          <TableBody>{content[0].map(key => key)}</TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(MyTable);
