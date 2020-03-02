import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";

import HomePage from "./pages/home";
import ExpensesPage from "./pages/expenses";
import InvestmentsPage from "./pages/investments";
import AboutPage from "./pages/about";
import ErrorPage from "./pages/error";

import NavigationBar from "./components/mainNav";
import SideNavigation from "./components/sideNav";
//import DashBoard from "./pages/dashboard2";

import axios from "axios";
import SignupPage from "./pages/signup";
//import DashBoard from "./pages/dashboard";

class App extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = { isauth: false, user: null };
  }

  checkAuth() {
    axios
      .get("/isauthenticated")
      .then(response => {
        console.log(response);
        if (
          this.state.isauth !== response.data.isauth ||
          this.state.user !== response.data.username
        ) {
          this.setState({
            isauth: response.data.isauth,
            user: response.data.username
          });
        }
      })
      .catch(error => {
        console.log("error", error);
      });
  }

  componentDidMount() {
    //this.checkAuth();
  }
  /**
   * <div class='flex'>
   *  <div>chart</div>
   * <div></div>
   * </div>
   */
  render() {
    //if (!this.state.isauth) return <h1>ERROR</h1>;
    /*
    let sideNav = this.state.isauth ? <SideNavigation /> : "";
    // Determine swtich rules if authenticated or not
    let switchRule = (
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/signup">
          <SignupPage />
        </Route>
        <Route exact path="/error">
          <ErrorPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
    if (this.state.isauth) {
      switchRule = (
        <Switch>
          <Route exact path="/dashboard">
            <DashBoard isauth={this.state.isauth} user={this.state.user} />
          </Route>
          <Route exact path="/expenses">
            <ExpensesPage isauth={this.state.isauth} user={this.state.user} />
          </Route>
          <Route exact path="/investments">
            <InvestmentsPage
              isauth={this.state.isauth}
              user={this.state.user}
            />
          </Route>
          <Route exact path="/about">
            <AboutPage isauth={this.state.isauth} user={this.state.user} />
          </Route>
          <Route exact path="/error">
            <ErrorPage />
          </Route>
          <Redirect to="/dashboard" />
        </Switch>
      );
    }*/
    return (
      <div>
        <NavigationBar isauth={true} user="Ram" />
      </div>
    );

    /**
     *     return (
      <div>
        <NavigationBar isauth={this.state.isauth} user={this.state.user} />
        {sideNav}
        <div className="App">{switchRule}</div>
      </div>
    );
     */
  }
}

export default App;
