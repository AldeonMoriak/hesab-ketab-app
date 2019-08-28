<<<<<<< HEAD
import React from "react";
import logo from "../src/assets/images/logo.png";
import "./App.css";
=======
import React, { Component } from 'react';
import classes from './App.module.css';
>>>>>>> 6e9379ef12a56851692dceae40fce50b021714f1

class App extends Component {
  render() {

    return(
      <div className={classes} dir='rtl'>
        <form name='kharj' action='get'>
          مادرخرج: <select form='kharj' name='madar-kharj'>
          <option value='ashkan'>اشکان</option>
          <option value='ashkan'>امین</option>
          <option value='ashkan'>مهران</option>
          </select>
          جنس: <input type='text'/>
          قیمت: <input type='number'/>
          شرح: <input type='text' />
        خورنده ها: 
        <select form='kharj' name='khorandeha' multiple size='3'>
          <option value='ashkan'>اشکان</option>
          <option value='ashkan'>امین</option>
          <option value='ashkan'>مهران</option>
        </select>
        <input type='submit' value='ثبت'/>
        </form>
      </div>
    );
  }
}

export default App;
