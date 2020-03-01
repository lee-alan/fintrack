import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";

import HomePage from "./pages/home";
import ExpensesPage from "./pages/expenses";
import InvestmentsPage from "./pages/investments";
import AboutPage from "./pages/about";
import ErrorPage from "./pages/error";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/expenses" component={ExpensesPage} />
          <Route exact path="/investments" component={InvestmentsPage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/error" component={ErrorPage} />
          <Redirect to="/error" />
        </Switch>
      </div>
    );
  }
}

export default App;
