import React, { Component } from "react";
import classes from "./App.module.css";
import Expense from "./containers/Expense/Expense";
import MyTable from "./containers/MyTable/MyTable";
import Report from "./containers/Report/Report";

class App extends Component {
  state = {
    myTableRenderer: false,
    numOfOrders: 0,
    date: {
      from: null,
      to: null
    }
  };

  handleTableRender = myTableRenderer => {
    this.setState({ myTableRenderer: !myTableRenderer });
  };

  handleNumberChange = numOfOrders => {
    this.setState({ numOfOrders });
  };

  dateHandler = date => {
    this.setState({ date });
  };

  render() {
    // const date = this.state.date
    //   ? null
    //   : `${this.state.date.from} till ${this.state.date.to}`;
    return (
      <div className={classes.App}>
        <Expense
          tableRendererState={this.state.myTableRenderer}
          onButtonClick={this.handleTableRender}
        />
        <Report onDateChange={this.dateHandler} />
        {console.log(this.state.date)}
        {/* <SignIn /> */}
        <MyTable myTableRenderer={this.state.myTableRenderer} />
      </div>
    );
  }
}

export default App;
