import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { addCurrency, getCurrencies } from 'actions/currency';

import BackBtn from 'icons/back-btn';

export class CurrencyForm extends React.Component {
    // * * * * * * * * * * * * * * * 
    // Handles form submit and adds 
    // card with input data
    // * * * * * * * * * * * * * * * 
    handleSubmit(e) {
        e.preventDefault();
        let currency = e.target.selectCurrency.value,
            buyPrice = parseFloat(e.target.buyPrice.value),
            quantity = parseFloat(e.target.coins.value);
        let data = {
            type: currency,
            amount: quantity,
            buyPrice
        };
        this.props.addCurrency(data);
        this.props.history.push({
            pathname: "/dashboard/portfolio"
        });
    }

    render() {
        return(
            <div className="currency-form-container">
                <Link to={"/dashboard/portfolio"}>
                    <BackBtn />
                </Link>
                <form action="#!" className="add-currency-form" 
                      onSubmit={e => this.handleSubmit(e)}>
                    <h2>Add Your Currency</h2>
                    <select name="selectCurrency">
                        <option value="BTC">Bitcoin (BTC)</option>
                        <option value="ETH">Ethereum (ETH)</option>
                        <option value="LTC">Litecoin (LTC)</option>
                        <option value="XMR">Monero (XMR)</option>
                        <option value="XRP">Ripple (XRP)</option>
                        <option value="DASH">DASH (DASH)</option>
                        <option value="DOGE">Dogecoin (DOGE)</option>
                    </select>
                    <input type="number" name="coins" required min="0"
                           placeholder="How many coins do you hold?"/>
                    <input type="number" name="buyPrice" required min="0"
                           placeholder="How much was a coin worth at the time?"/>
                    <button type="submit">ADD</button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addCurrency: data => dispatch(addCurrency(data)),
    getCurrencies: () => dispatch(getCurrencies())
});

export default connect(null, mapDispatchToProps)(CurrencyForm);