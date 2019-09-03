import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import axios from "../../axios-exp";

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: "100%",
//     marginTop: theme.spacing(3),
//     overflowX: "auto"
//   },
//   table: {
//     minWidth: 650
//   }
// }));
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
            ...response.data[key]
          });
        }
        this.setState({ reports: fetchedReports });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  render() {
    const fetchedReports = [...this.state.reports];
    console.log(fetchedReports);
    for (let report in fetchedReports) {
      console.log(report);
    }
    const cells = null;

    const classes = null;
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>{cells}</TableRow>
          </TableHead>
        </Table>
      </Paper>
    );
  }
}

export default MyTable;
