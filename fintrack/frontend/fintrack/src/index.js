import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import NavigationBar from "./components/mainNav";
import SideNavigation from "./components/sideNav";
import "./index.css";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(<NavigationBar />, document.getElementById("top_nav"));
//ReactDOM.render(<SideNavigation />, document.getElementById("side_nav"));
ReactDOM.render(
  <Router>
    <SideNavigation />
    <App />
  </Router>,
  document.getElementById("root")
);
