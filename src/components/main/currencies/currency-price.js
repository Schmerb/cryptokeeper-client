import React, { Component } from 'react';

export default class CurrencyPrice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            incDecrClass: ''
        };
    }


    componentWillReceiveProps(nextProps) {
        let currentPrice = this.props.data.PRICE;
        let nextPrice    = nextProps.data.PRICE;
        if(nextPrice > currentPrice) {
            // increase --> green
            this.setPriceClass('increase');
        } else if (nextPrice < currentPrice) {
            // decrease --> red
            this.setPriceClass('decrease');
        } else {
            this.setState({
                incDecrClass: ''
            });
        }
    }

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Updates state with className passed in, waits 2s then 
    // removes the class from state
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    setPriceClass(className) {
        this.setState({
            incDecrClass: className
        });
        setTimeout(() => {
            this.setState({
                incDecrClass: ''
            });
        }, 2000);
    }

    render() {
        return(
            <div className="price">
                <div className={`current ${this.state.incDecrClass}`}  id="current-price">
                    {this.props.sym}{this.props.data.PRICE}
                </div>
                <label htmlFor="current-price">1.00 {this.props.currency}</label>
            </div>
        );
    }
}