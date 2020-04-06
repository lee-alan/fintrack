/* jshint esversion: 6 */
import React, { Component } from 'react';
import { STOCK1, STOCK2, STOCK3, STOCK4, STOCK5, STOCK6, STOCK7 } from './StockValidationList';

class SearchTicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
          ticker: "",
          qty: "",
        };
    }
    
    handlerFormSubmit(event) {
        event.preventDefault();
        this.props.onSearch(this.state.ticker, this.state.qty); // do search
        this.setState({ticker: ""}); // reset
        this.setState({qty: ""}); // reset
    }

    render() { 
        let filteredTickers = [];
        if (this.state.ticker !== "") {
            let count = 0;
            let filteredTickersList1 = STOCK1.filter((stock) => {
                if (count < 5 && stock.includes(this.state.ticker.toUpperCase())) {
                    count++;
                    return true;
                }
                return false;
            });
            count = 0;
            let filteredTickersList2 = STOCK2.filter((stock) => {
                if (count < 5 && stock.includes(this.state.ticker.toUpperCase())) {
                    count++;
                    return true;
                }
                return false;
            });
            count = 0;
            let filteredTickersList3 = STOCK3.filter((stock) => {
                if (count < 5 && stock.includes(this.state.ticker.toUpperCase())) {
                    count++;
                    return true;
                }
                return false;
            });
            count = 0;
            let filteredTickersList4 = STOCK4.filter((stock) => {
                if (count < 5 && stock.includes(this.state.ticker.toUpperCase())) {
                    count++;
                    return true;
                }
                return false;
            });
            count = 0;
            let filteredTickersList5 = STOCK5.filter((stock) => {
                if (count < 5 && stock.includes(this.state.ticker.toUpperCase())) {
                    count++;
                    return true;
                }
                return false;
            });
            count = 0; 
            let filteredTickersList6 = STOCK6.filter((stock) => {
                if (count < 5 && stock.includes(this.state.ticker.toUpperCase())) {
                    count++;
                    return true;
                }
                return false;
            });
            count = 0;
            let filteredTickersList7 = STOCK7.filter((stock) => {
                if (count < 5 && stock.includes(this.state.ticker.toUpperCase())) {
                    count++;
                    return true;
                }
                return false;
            });

            filteredTickers = filteredTickersList1.concat(filteredTickersList2,filteredTickersList3,filteredTickersList4,
                filteredTickersList5,filteredTickersList6,filteredTickersList7);
        }
        
        return (
        <form className='search_bar' onSubmit={this.handlerFormSubmit.bind(this)}>
            <input
                name='ticker'
                type='text'
                className='search_ticker'
                value={this.state.ticker}
                onChange={event => this.setState({ticker: event.target.value})}
                placeholder='Enter Ticker'
            />
            <input
                name='qty'
                type='number'
                min="0"
                className='search_ticker'
                value={this.state.qty}
                onChange={event => this.setState({qty: event.target.value})}
                placeholder='Qty'
            />
            <span className="search_btn">
                <button type='submit' id='btn_search' className='btn_search'>Buy</button>
            </span>
            <div id="filtered_tickers">
                {filteredTickers.map((ticker,i) => <li key={i}>{ticker}</li>)}
            </div>
        </form>
        );
    }
}

export default SearchTicker;