import React, { PureComponent } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import axios from "../../axios-exp";

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
    for (let key in reports[0]) {
      columnNames.push(key);
    }
    for (let key of reports) {
      let elements = [];
      for (let element in key) {
        if (element === "Type") {
          elements.push(key[element].join(", "));
        } else {
          elements.push(key[element]);
        }
      }
      cells.push(elements);
    }
    console.log(cells);
    this.setState({
      cells: cells,
      columnNames: columnNames
    });
  };

  toGetAllSells = () => {
    const fetchedReports = [];
    axios
      .get("AldeonMoriak/jsonApi/0")
      .then(response => {
        // eslint-disable-next-line
        // change in to of
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
        // const cellMaker = () => {
        //   const reports = [...this.state.reports];
        //   let cells = [];

        //   for (let key of Object.keys(reports[0])) {
        //     cells.push([key]);
        //   }

        //   // going through every member of reports array
        //   for (let el of reports) {
        //     //assigning element to array version of every object in reports
        //     const element = Object.keys(el);
        //     // going through every member of element array
        //     for (let i = 0; i < element.length; i++) {
        //       // going throught every element of cell array
        //       for (let j = 0; j < cells.length; j++) {
        //         // checking if the first member of the inner array of rowArray is equal to the value of current element member
        //         const condition = cells[j][0] === element[i];
        //         if (condition && element[i] !== "Type") {
        //           cells[j].push(el[element[i]]);
        //         } else if (condition && el[element[i]].length > 1) {
        //           cells[j].push(el[element[i]].join(", "));
        //         }
        //       }
        //     }
        //   }
        //   this.setState({ cells: cells });
        // };

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
        persons = ["Ashkan", "Amin", "Mehran"];
        break;
      case 2:
        persons = ["Amin", "Mehran"];
        break;
      case 3:
        persons = ["Amin", "Ashkan"];
        break;
      case 4:
        persons = ["Ashkan", "Mehran"];
        break;
      case 5:
        persons = ["Amin"];
        break;
      case 6:
        persons = ["Ashkan"];
        break;
      case 7:
        persons = ["Mehran"];
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

  render() {
    const cells = this.state.cells;
    const columnNames = this.state.columnNames;
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
              {columnNames.map((key, index) => (
                <StyledTableCell align="center" key={index}>
                  {key}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{content[0].map(key => key)}</TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(MyTable);
