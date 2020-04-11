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
            <li><a href="https://reactjs.org/">React</a></li>
            <ul>
              <li><a href="https://material-ui.com/">Material UI</a></li>
              <li><a href="https://plotly.com/javascript/react/">Plotly</a></li>
            </ul>
            <li>Backend</li>
            <ul>
              <li><a href="https://expressjs.com/">Express</a></li>
              <li><a href="https://nodemailer.com/about/">Node Mailer</a></li>
              <li><a href="https://www.mongodb.com/">MongoDB</a></li>
            </ul>
            <li>API</li>
            <ul>
              <li><a href="https://www.alphavantage.co/">AlphaVantage</a> - Stock Charts</li>
              <li><a href="https://www.worldtradingdata.com/">WorldTradingData</a> - Stock Information</li>
              <li><a href="https://newsapi.org/">NewsAPI</a> - Related news section</li>
            </ul>
          </ul>
              
        </div>
      </div>
    );
  }
}

export default AboutPage;
