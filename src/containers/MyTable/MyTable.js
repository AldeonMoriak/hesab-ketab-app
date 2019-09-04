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
    error: false
  };

  componentDidMount() {
    const fetchedReports = [];
    axios
      .get("/api/housecost/getallsells")
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
          console.log(this.state.reports);
          let cells = [];
          for (let i = 0; i <= this.state.reports.length; i++) {
            let cell = [];
            const length = Object.keys(this.state.reports[i]).length;
            for (let j = 0; j < length; j++) {
              console.log(this.state.reports[j]);
              const el = this.state.reports[j];
              cell = el[i];
              console.log(cell);
              cells.push(cell);
            }
          }
          console.log(`Cells: ${cells}`);
          return cells;
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
    const cells = null;
    // this.state.reports.map(row => {
    //   <TableRow>
    //     {this.state.reports[row].map(cell => {
    //       <TableCell align="left">{}</TableCell>;
    //     })}
    //   </TableRow>;
    // });
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>{cells}</TableRow>
          </TableHead>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(MyTable);
