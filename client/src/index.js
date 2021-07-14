import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login'
import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Route exact path="/" component={App}></Route>
    <Route exact path="/Login" component={Login}></Route>
  </Router>,
  document.getElementById('root')
);
