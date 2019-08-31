import React, { Component } from "react";
import classes from "./Expense.module.css";
import Button from "@material-ui/core/Button";
import axios from "../../axios-exp";

class Expense extends Component {
  state = {
    elements: {
      ID: 0,
      SpenderId: 1,
      Price: 0,
      StuffName: "",
      Description: "",
      type: 0
    }
  };

  clickHandler = () => {
    console.log(this.state.elements);
    const expense = this.state.elements;
    const config = {
      method: "get, post, options",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
      // data: expense
    };

    axios
      .post("/api/HouseCost/InsertSell", expense, config)
      .then(response => console.log("response: ", response.data))
      .catch(error => console.log("error:", error));
  };

  changeHandler = event => {
    const element = event.target.name;
    const updatedState = { ...this.state.elements };
    // if (element === "type") {
    //   updatedState[element].push(event.target.value);
    // } else {
    updatedState[element] = event.target.value;
    // }
    this.setState({ elements: updatedState });
  };

  render() {
    return (
      <div className={classes.Expense}>
        <form name="expense" action="post">
          Spender:{" "}
          <select form="expense" name="SpenderId" onChange={this.changeHandler}>
            <option value="1">امین</option>
            <option value="2">اشکان</option>
            <option value="3">مهران</option>
          </select>
          Stuff:{" "}
          <input name="StuffName" type="text" onChange={this.changeHandler} />
          Price:{" "}
          <input name="Price" type="number" onChange={this.changeHandler} />
          Description:{" "}
          <input name="Description" type="text" onChange={this.changeHandler} />
          Participants:{" "}
          <select
            form="expense"
            name="type"
            multiple
            size="3"
            onChange={this.changeHandler}
          >
            <option value="1">امین</option>
            <option value="2">اشکان</option>
            <option value="3">مهران</option>
          </select>
          <Button
            size="large"
            variant="contained"
            onClick={this.clickHandler}
          />
        </form>
      </div>
    );
  }
}

export default Expense;
