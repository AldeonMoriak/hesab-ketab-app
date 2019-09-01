import React, { Component } from "react";
import classes from "./Expense.module.css";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import axios from "../../axios-exp";

class Expense extends Component {
  state = {
    elements: {
      ID: 0,
      Spender: "",
      Price: 0,
      StuffName: "",
      Description: "",
      Participant: []
    }
  };

  names = ["Ashkan", "Amin", "Mehran"];

  clickHandler = () => {
    // console.log(this.state.elements);
    const expense = this.state.elements;
    const config = {
      method: "get, post, options",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
      // data: expense
    };

    // axios
    //   .get("/api/test", expense)
    //   .then(response => console.log(response.data))
    //   .catch(error => console.log(error));

    axios
      .post("/api/HouseCost/InsertSell", expense, config)
      .then(response => console.log("response: ", response.data))
      .catch(error => console.log("error:", error));
  };

  changeHandler = event => {
    const element = event.target.name;
    const updatedState = { ...this.state.elements };
    updatedState[element] = event.target.value;
    this.setState({ elements: updatedState });
  };

  render() {
    const items = this.names.map(name => (
      <MenuItem key={name} value={name}>
        {name}
      </MenuItem>
    ));
    return (
      <div className={classes.Expense}>
        <form name="expense" action="post">
          Spender:
          <Select
            className={classes.Select}
            value={this.state.elements.Spender}
            name="Spender"
            onChange={this.changeHandler}
          >
            {items}
          </Select>
          Stuff:{" "}
          <Input
            className={classes.Input}
            name="StuffName"
            type="text"
            onChange={this.changeHandler}
          />
          Price:{" "}
          <Input
            className={classes.Input}
            name="Price"
            type="number"
            onChange={this.changeHandler}
          />
          Description:{" "}
          <Input
            className={classes.Input}
            name="Description"
            type="text"
            onChange={this.changeHandler}
          />
          Participants:{" "}
          <Select
            className={classes.Select}
            value={this.state.elements.Participant}
            name="Participant"
            multiple
            onChange={this.changeHandler}
          >
            {items}
          </Select>
          <Button size="small" variant="contained" onClick={this.clickHandler}>
            ok
          </Button>
        </form>
      </div>
    );
  }
}

export default Expense;
