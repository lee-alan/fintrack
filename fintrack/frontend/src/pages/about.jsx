import React, { Component } from "react";

class AboutPage extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>AboutPage</h1>
        <h4>Created by:</h4>
        <div><ul>
          <li>Alan Lee</li>
          <li>Rustami Ubaydullo</li>
          <li>Ram Gurram</li>
          </ul></div>
        <h4>Made Possible by:</h4>
        <div>
          <ul>
            <li>React</li>
            <ul>
              <li>Material UI</li>
              <li>Plotly</li>
            </ul>
            <li>Backend</li>
            <ul>
              <li>Express</li>
              <li>Node Mailer</li>
              <li>Mongo DB</li>
            </ul>
            <li>API</li>
            <ul>
              <li>AlphaVantage - Stock Charts</li>
              <li>WorldTradingData - Stock Information</li>
              <li>NewAPI - Related news section</li>
            </ul>
          </ul>
              
        </div>
      </div>
    );
  }
}

export default AboutPage;
