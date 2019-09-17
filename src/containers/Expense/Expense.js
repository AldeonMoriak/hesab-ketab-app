import React, { PureComponent } from "react";
import classes from "./Expense.module.css";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import axios from "../../axios-exp";
import URLGenerator from "../components/URLGenerator/URLGenerator";

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

  // sending the url to the server
  clickHandler = () => {
    this.toGet();
    axios
      .get(`/api/HouseCost/InsertSell${this.url}`)
      .then(response => {
        const { onButtonClick, tableRendererState } = this.props;
        onButtonClick(tableRendererState);
      })
      .catch(error => console.log(error));

    // axios
    //   .post("/api/HouseCost/InsertSell", expense, config)
    //   .then(response => console.log("response: ", response.data))
    //   .catch(error => console.log("error:", error));
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

    return (
      <div className={classes.Expense}>
        <form name="expense" action="post">
          <span>
            Spender:
            <Select
              className={classes.Select}
              value={this.state.elements.SpenderId}
              name="SpenderId"
              onChange={this.changeHandler}
            >
              {items}
            </Select>
          </span>
          <span>
            Stuff:{" "}
            <Input
              className={classes.Input}
              name="StuffName"
              type="text"
              onChange={this.changeHandler}
            />
          </span>
          <span>
            Price:{" "}
            <Input
              className={classes.Input}
              name="Price"
              type="number"
              onChange={this.changeHandler}
            />
          </span>
          <span>
            Description:{" "}
            <Input
              className={classes.Input}
              name="Description"
              type="text"
              onChange={this.changeHandler}
            />
          </span>
          <span>
            Participants:{" "}
            <Select
              className={classes.Select}
              value={this.state.elements.Type}
              name="Type"
              multiple
              onChange={this.changeHandler}
            >
              {items}
            </Select>
          </span>
          <span className={classes.Button}>
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

export default Expense;
