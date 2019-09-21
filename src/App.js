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
    },
    convertedDate: ""
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

  convertDateHandler = convertedDate => {
    this.setState({ convertedDate });
  };

  render() {
    // const date = this.state.date
    //   ? null
    //   : `${this.state.date.from} till ${this.state.date.to}`;
    return (
      <div className={classes.Child}>
        <Expense
          tableRendererState={this.state.myTableRenderer}
          onButtonClick={this.handleTableRender}
        />

        <div className={classes.Report}>
          <Report
            onConvertedDate={this.convertDateHandler}
            onDateChange={this.dateHandler}
          />
        </div>
        {console.log(this.state.convertedDate)}
        {/* <SignIn /> */}
        <MyTable myTableRenderer={this.state.myTableRenderer} />
      </div>
    );
  }
}

export default App;
