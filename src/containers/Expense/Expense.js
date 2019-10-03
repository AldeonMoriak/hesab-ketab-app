import React, { PureComponent } from "react";
import myClasses from "./Expense.module.css";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import axios from "../../axios-exp";
import { withStyles } from "@material-ui/core/styles";
import URLGenerator from "../../components/URLGenerator/URLGenerator";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  }
});

class Expense extends PureComponent {
  state = {
    elements: {
      SpenderId: "",
      Price: 0,
      StuffName: "",
      Description: "",
      Type: []
    }
  };

  names = ["Askan", "Amin", "Mehiran"];
  url = "";
  // returning the needed url
  toGet = () => {
    // using typeGenerator version of state
    const updatedState = this.typeGenerator();
    this.url = URLGenerator(updatedState);
  };

  // returning the updated state where type and spenderId are of int to send to the backend
  typeGenerator = () => {
    let updatedState = { ...this.state.elements };
    switch (this.state.elements.Type.join(" ").length) {
      case 18:
        updatedState.Type = 1;
        break;
      case 12:
        updatedState.Type = 2;
        break;
      case 10:
        updatedState.Type = 3;
        break;
      case 13:
        updatedState.Type = 4;
        break;
      case 4:
        updatedState.Type = 5;
        break;
      case 5:
        updatedState.Type = 6;
        break;
      case 7:
        updatedState.Type = 7;
        break;
      default:
        updatedState.Type = "Error Occurrd";
    }
    switch (this.state.elements.SpenderId.length) {
      case 4:
        updatedState.SpenderId = 1;
        break;
      case 5:
        updatedState.SpenderId = 2;
        break;
      case 7:
        updatedState.SpenderId = 3;
        break;
      default:
        updatedState.SpenderId = "Error Occurred!";
    }
    return updatedState;
  };

  // `/api/HouseCost/InsertSell${this.url}`
  // sending the url to the server
  clickHandler = () => {
    this.toGet();
    axios
      .get("AldeonMoriak/jsonApi/ObjList")
      .then(response => {
        const { onButtonClick, tableRendererState } = this.props;
        onButtonClick(tableRendererState);
      })
      .catch(error => console.log(error));
  };

  // to handle the changes made to the fields
  changeHandler = event => {
    const element = event.target.name;
    const updatedState = { ...this.state.elements };
    updatedState[element] = event.target.value;
    this.setState({ elements: updatedState });
  };

  render() {
    // seperating the code from select in order to use it elsewhere
    const items = this.names.map(name => (
      <MenuItem key={name} value={name}>
        {name}
      </MenuItem>
    ));

    const { classes } = this.props;
    return (
      <div className={myClasses.Expense}>
        <form name="expense" action="post">
          <span>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="SpenderId">Spender</InputLabel>
              <Select
                inputProps={{
                  name: "SpenderId",
                  id: "Spender"
                }}
                className={myClasses.Select}
                name="SpenderId"
                value={this.state.elements.SpenderId}
                onChange={this.changeHandler}
              >
                {items}
              </Select>
            </FormControl>
          </span>
          <span>
            <FormControl className={classes.formControl}>
              <TextField
                label="Stuff"
                className={myClasses.Input}
                name="StuffName"
                type="text"
                onChange={this.changeHandler}
              />
            </FormControl>
          </span>
          <span>
            <FormControl className={classes.formControl}>
              <TextField
                label="Price"
                className={myClasses.Input}
                name="Price"
                type="number"
                onChange={this.changeHandler}
              />
            </FormControl>
          </span>
          <span>
            <FormControl className={classes.formControl}>
              <TextField
                label="Description"
                className={myClasses.Input}
                name="Description"
                type="text"
                onChange={this.changeHandler}
              />
            </FormControl>
          </span>
          <span>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="Participants">Participants</InputLabel>
              <Select
                placeholder="Participants"
                className={myClasses.Select}
                value={this.state.elements.Type}
                name="Type"
                multiple
                onChange={this.changeHandler}
              >
                {items}
              </Select>
            </FormControl>
          </span>
          <span className={myClasses.Button}>
            <Button
              size="small"
              variant="contained"
              onClick={this.clickHandler}
            >
              ok
            </Button>
          </span>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(Expense);
