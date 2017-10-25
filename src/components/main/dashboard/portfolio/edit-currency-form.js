import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { updateCurrency, deleteCurrency } from 'actions/currency';

import BackBtn from 'icons/back-btn';

export class EditCurrencyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {
                select: '',
                input: '',
                buyInput: '',
                id: ''
            }
        };
    }
    componentDidMount() {
        const location  = this.props.location,
               kind     = location.state.type,
               amount   = location.state.amount,
               buyPrice = location.state.buyPrice,
               id       = location.state.id;
        this.setState({
            select: kind,
            input: amount,
            buyInput: buyPrice,
            id
        });
    }
    // * * * * * * * * * * * * * * * * * * * *
    // Handles form submit and adds 
    // card with input data
    // * * * * * * * * * * * * * * * * * * * *
    handleSubmit = (e) => {
        e.preventDefault();
        let currency = this.refs.select.value,
            quantity = this.refs.input.value,
            buyPrice = this.refs.buyInput.value,
            id       = this.state.id;
        let data = {
            buyPrice,
            type: currency,
            amount: quantity,
            id
        };
        this.props.updateCurrency(data);
        this.props.history.push({
            pathname: "/dashboard/portfolio"
        });
    }

    // * * * * * * * * * * * * * * * * * * * *
    // Deletes currency
    // * * * * * * * * * * * * * * * * * * * *
    deleteCurrency = () => {
        let id = this.state.id;
        this.props.deleteCurrency(id);
        this.props.history.push({
            pathname: "/dashboard/portfolio"
        });
    };


    // * * * * * * * * * * * * * * * * * * * *
    // Updates changes in form fields
    // * * * * * * * * * * * * * * * * * * * *
    handleChange = (e) => {
        this.setState({
            select: this.refs.select.value,
            input: this.refs.input.value,
            buyInput: this.refs.buyInput.value
        });
    }

    render() {
        return(
            <div className="currency-form-container">
                <Link to={"/dashboard/portfolio"}>
                    <BackBtn />
                </Link>
                <form action="#!" className="edit-currency-form" 
                      onSubmit={this.handleSubmit}>
                    <h2>Edit Your Currency</h2>

                    <select ref="select" value={this.state.select} onChange={this.handleChange}>
                        <option value="BTC">Bitcoin (BTC)</option>
                        <option value="ETH">Etheruem (ETH)</option>
                        <option value="LTC">Litecoin (LTC)</option>
                        <option value="XMR">Monero (XMR)</option>
                    </select>

                    <input type="number" ref="input" min="0" required 
                           value={this.state.input} onChange={this.handleChange}
                           placeholder="How many coins do you hold?"/>
                    <input type="number" ref="buyInput" name="buyPrice" min="0" required
                           value={this.state.buyInput} onChange={this.handleChange}
                           placeholder="How much was a coin worth at the time?"/>

                    <div className="edit-btns">
                        <button type="submit">Update</button>
                        <button type="button" onClick={this.deleteCurrency}>Remove</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCurrency: data => dispatch(updateCurrency(data)),
    deleteCurrency: currencyId => dispatch(deleteCurrency(currencyId))
});

export default connect(null, mapDispatchToProps)(EditCurrencyForm);