/* jshint esversion: 6 */
import React, { Component } from "react";
import SearchTicker from "../components/investments/SearchTicker";
import Loading from "../components/utilities/loading";

import '../style/investments.css';
import axios from "axios";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import { connect } from "mongodb";


const Plot = createPlotlyComponent(Plotly);

class InvestmentsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_tickers: [],
      user_tickers_data: {'data': []}, // from wtd api
      chart_x_val: [],
      chart_y_val: [],
      current_chart: "",
      adding_ticker: false
    };
  }
  
  /* TODO
    // beta
    => display first ticker chart ---- _/
    => display list of tickers and data ---- _/
    => add & remove tickers ---- o
    => display chart for specific ticker ---- o
    // final
    => auto update tickers ---- o
    => implement caching of charts ---- o
    => add machine learning model to offer prediction ---- o
  */

  componentDidMount() {
    this.getTicker(); // get tickers from user profile
  }
  
  getTicker() {
    try {
      // update later to be for any general username
      axios.get('/api/investments/getTickers/' + this.props.user + '/').then(response => {
        
        if (response !== "no tickers") {
          const This = this;
          let first_ticker = response.data[0].tickers[0];
         
          This.setState({
            user_tickers: response.data[0].tickers,
            current_chart: first_ticker
          });
      
          this.getChartingDataSingleTicker(first_ticker);
          this.getChartingDataBatch();
        }
      });
    } catch (e) {
      console.error(e);
    }
  }
  
  getChartingDataBatch() {
    const This = this;
    let tickers = this.state.user_tickers.join(',');
    console.log(tickers);
    axios.get('/api/investments/daily/batch/' + tickers + '/').then(response => {
      let data = response.data;
      
      This.setState({
        user_tickers_data: data // list of dictionaries
      });
      console.log(this.state.user_tickers_data.data);
    })
  }

  getChartingDataSingleTicker(ticker) {
    const This = this;
  
    let x_vals = [], y_vals = [];

    try {
        axios.get('/api/investments/daily/'+ ticker + '/').then(response => {
    
        let data = response.data;

        for (let date_entry in data['Time Series (Daily)']) {
          x_vals.push(date_entry);
          y_vals.push(data['Time Series (Daily)'][date_entry]['1. open']);
        }

        This.setState({
          chart_x_val: x_vals,
          chart_y_val: y_vals
        });
      });
    } catch (e) {
      console.error(e);
    }
  }
  
  addTicker(ticker) {
    const This = this;

    try { // /addticker/:username/:ticker/
      This.setState({
        adding_ticker: true,
      });
      axios.post('/api/investments/addticker/' + this.props.user + '/' + ticker + '/').then(response => {
        let usertickers = this.state.user_tickers.slice();
        usertickers.push(ticker);
        console.log(ticker);
        This.setState({
          user_tickers: usertickers
        });

        // fetch new data for all tickers and update state
        this.getChartingDataBatch(ticker);
        
        This.setState({
          adding_ticker: false
        });
      });
    } catch (e) {
      console.error(e, "error adding ticker");
    }
  }

  handleSearch(ticker) {
    let t = ticker.toUpperCase();
    
    // validate ticker
    // add ticker to user database
    this.addTicker(t);
    // update state
    // get ticker data
    //this.getChartingDataBatch(ticker);
  }

  render() {
    return (
      //<h1>InvestmentsPage</h1>
      <div className="flex-container">
        <div id="chart_component">
          <Plot
            data={[
              {
                x: this.state.chart_x_val,
                y: this.state.chart_y_val,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'blue'},
              }
            ]}
            style={{ width: '100%', height: '100%' }}
            layout={ {autosize: true, title: 'Daily Time Series ' + this.state.current_chart} }
          />
        </div>
        
        <div id="ticker_component">
          <SearchTicker onSearch={this.handleSearch.bind(this)} />
          <Loading loading={this.state.adding_ticker}/>
          {this.state.user_tickers_data.data.map((dict) => 
            <div id={"ticker_container_" + dict.symbol} className="ticker_container" key={dict.symbol}>
              <span className="left">{dict.symbol}</span>
              <span className="right">{dict.price}</span>
            </div>
          )}

        </div>
      </div>
    );
  }
}
 
export default InvestmentsPage;
