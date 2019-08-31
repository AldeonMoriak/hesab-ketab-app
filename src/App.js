import React, { Component } from "react";
import classes from "./App.module.css";
import Expense from "./containers/Expense/Expense";
// import SignIn from "./containers/Login/SignIn";

class App extends Component {
  render() {
    return (
      <div className={classes.Expense}>
        <Expense />
        {/* <SignIn /> */}
      </div>
    );
  }
}

export default App;
