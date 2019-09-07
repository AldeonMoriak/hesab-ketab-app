import React, { Component } from "react";
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
    minWidth: 650
  }
});
class MyTable extends Component {
  state = {
    reports: [],
    error: false,
    cells: []
  };

  componentDidMount() {
    const fetchedReports = [];
    axios
      .get("aldeonmoriak/jsonApi/0")
      .then(response => {
        // eslint-disable-next-line
        for (let key in response.data) {
          fetchedReports.push({
            ...response.data[key],
            id: +key + 1
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
        // console.log("State: ", this.state.reports);

        const cellMaker = () => {
          const reports = [...this.state.reports];
          let cells = [];

          // eslint-disable-next-line
          for (let key of Object.keys(reports[0])) {
            cells.push([key]);
          }

          // going through every member of reports array
          // eslint-disable-next-line
          for (let el of reports) {
            //assigning element to array version of every object in reports
            const element = Object.keys(el);
            // going through every member of element array
            for (let i = 0; i < element.length; i++) {
              // going throught every element of cell array
              for (let j = 0; j < cells.length; j++) {
                // checking if the first member of the inner array of rowArray is equal to the value of current element member
                if (cells[j][0] === element[i]) {
                  cells[j].push(el[element[i]]);
                }
              }
            }
          }
          console.log(cells);
          this.setState({cells: cells});
        };
        cellMaker();
      })
      .catch(error => {
        this.setState({ error: true });
      });
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
    let content = [];
    
    for (let i = 1; i < cells.length-1; i++ ) {
      content.push(cells.map(key => (
        <TableRow key={key['id']}>
          <TableCell component='th' scope='row'>
            {key[i]}
          </TableCell>
        </TableRow>
      )))
    }
    console.log(content);
    
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>{cells.map(key => (
              <TableCell align="center" key={key[0]}>{key[0]}</TableCell>
            ))}</TableRow>
          </TableHead>
          <TableBody>
            {content.map(key => (key))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(MyTable);
