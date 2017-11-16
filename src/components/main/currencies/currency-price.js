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
        let nextPrice = nextProps.data.PRICE;
        console.log(currentPrice);
        console.log(nextPrice);
        if(nextPrice > currentPrice) {
            // increase --> green
            this.setState({
                incDecrClass: 'increase'
            });
            setTimeout(() => {
                this.setState({
                    incDecrClass: ''
                });
            }, 2000);
        } else if (nextPrice < currentPrice) {
            // decrease --> red
            this.setState({
                incDecrClass: 'decrease'
            });
            setTimeout(() => {
                this.setState({
                    incDecrClass: ''
                });
            }, 2000);
        } else {
            this.setState({
                incDecrClass: ''
            });
        }
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