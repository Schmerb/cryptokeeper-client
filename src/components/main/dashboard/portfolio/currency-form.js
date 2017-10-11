import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { addCurrency } from 'actions/currency';

import BackBtn from 'icons/back-btn';

export class CurrencyForm extends React.Component {
    // * * * * * * * * * * * * * * * 
    // Handles form submit and adds 
    // card with input data
    // * * * * * * * * * * * * * * * 
    handleSubmit(e) {
        e.preventDefault();
        let currency = e.target.selectCurrency.value;
        let quantity = e.target.coins.value;
        let data = {
            type: currency,
            name: 'BTC',
            // name: this.getName(currency),
            owned: quantity
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
                        <option value="ETH">Etheruem (ETH)</option>
                        <option value="LTC">Litecoin (LTC)</option>
                        <option value="XMR">Monero (XMR)</option>
                    </select>
                    <input type="number" name="coins" required
                           placeholder="How many coins do you hold?"/>
                    <button type="submit">ADD</button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addCurrency: data => dispatch(addCurrency(data))
});

export default connect(null, mapDispatchToProps)(CurrencyForm);