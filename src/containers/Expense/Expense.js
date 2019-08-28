import React, { Component } from "react";
import classes from "./Expense.module.css";

class Expense extends Component {
  render() {
    return (
      <div className={classes.Expense}>
        <form name="kharj" action="get">
          مادرخرج:{" "}
          <select form="kharj" name="madar-kharj">
            <option value="ashkan">اشکان</option>
            <option value="ashkan">امین</option>
            <option value="ashkan">مهران</option>
          </select>
          جنس: <input type="text" />
          قیمت: <input type="number" />
          شرح: <input type="text" />
          خورنده ها:
          <select form="kharj" name="khorandeha" multiple size="3">
            <option value="ashkan">اشکان</option>
            <option value="ashkan">امین</option>
            <option value="ashkan">مهران</option>
          </select>
          <input type="submit" value="ثبت" />
        </form>
      </div>
    );
  }
}

export default Expense;
