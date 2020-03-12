/* jshint esversion: 6 */
import React, { Component } from 'react'

class SearchTicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
          ticker: ""
        };
    }
    /*
    handlerChange(event) {
       this.setState({
            ticker: event.target.value
       });
    }   
    */
    handlerFormSubmit(event) {
        event.preventDefault();
        this.props.onSearch(this.state.ticker); // do search
        this.setState({ticker: ""}); // reset
    }

    render() {
        return (
        <form className='search_bar' onSubmit={this.handlerFormSubmit.bind(this)}>
            <input
                name='ticker'
                type='text'
                className='search_ticker'
                value={this.state.ticker}
                onChange={event => this.setState({ticker: event.target.value})}
                placeholder='Enter ticker'
            />
            <span className="search_btn">
                <button type='submit' className='btn_search'>+</button>
            </span>
        </form>
        );
    }
}
 
export default SearchTicker;