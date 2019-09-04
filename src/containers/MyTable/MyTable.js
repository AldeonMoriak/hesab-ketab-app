import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import axios from "../../axios-exp";

const styles = {
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
};
class MyTable extends Component {
  state = {
    reports: [],
    error: false
  };

  componentWillMount() {
    axios
      .get("/api/housecost/getallsells")
      .then(response => {
        const fetchedReports = [];
        for (let key in response.data) {
          fetchedReports.push({
            ...response.data[key],
            id: key
          });
        }
        this.setState({ reports: fetchedReports });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  switchHandler = condition => {
    const persons = [];
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
      // eslint-disable-next-line
    }
    return persons;
  };
  spenderIdHandler = id => {
    const spender = "";
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
      // eslint-disable-next-line
    }
    return spender;
  };

  render() {
    const fetchedReports = [...this.state.reports];
    console.log(fetchedReports);
    for (let report in fetchedReports) {
      console.log(report.Type);
      fetchedReports.report.Type = this.switchHandler(report[Type]);
      fetchedReports.report.SpenderId = this.spenderIdHandler(
        report[SpenderId]
      );
    }
    this.setState({ reports: fetchedReports });
    const cells = null;

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
