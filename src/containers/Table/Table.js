import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

class Table extends Component {
  state = {
    elements: {
      SpenderId: "",
      Price: 0,
      StuffName: "",
      Description: "",
      Type: []
    },
    data: null
  };

  useStyles = makeStyles(theme => ({
    root: {
      width: "100%",
      marginTop: theme.spacing(3),
      overflowX: "auto"
    },
    table: {
      minWidth: 650
    }
  }));

  componentWillMount() {
    axios
      .get("/getallcells")
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  render() {
    const classes = useStyles();
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
