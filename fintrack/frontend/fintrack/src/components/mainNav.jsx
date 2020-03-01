import React, { Component } from "react";
import "../style/mainNav.css";

class NavigationBar extends Component {
  state = {};

  log() {
    console.log("logging");
  }

  render() {
    //let logo = <div className="signin_button"></div>;
    return (
      <div id="nav">
        <a href="/">
          <div className="fintrack_logo"></div>
        </a>
      </div>
    );
  }
}

export default NavigationBar;
