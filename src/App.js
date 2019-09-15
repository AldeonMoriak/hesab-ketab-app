import React, { Component } from "react";
import classes from "./App.module.css";
import Expense from "./containers/Expense/Expense";
// import SignIn from "./containers/Login/SignIn";
import MyTable from "./containers/MyTable/MyTable";

class App extends Component {
  state = {
    myTableRenderer: false,
    numOfOrders: 0
  };

  handleTableRender = myTableRenderer => {
    this.setState({ myTableRenderer: !myTableRenderer });
  };

  handleNumberChange = numOfOrders => {
    this.setState({ numOfOrders });
  };

  render() {
    return (
      <div className={classes.Expense}>
        <Expense
          tableRendererState={this.state.myTableRenderer}
          onButtonClick={this.handleTableRender}
        />
        {/* <SignIn /> */}
        <MyTable />
      </div>
    );
  }
}

export default App;
