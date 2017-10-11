import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { addCurrency } from 'actions/currency';

import BackBtn from 'icons/back-btn';

export class EditCurrencyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {
                select: '',
                input: ''
            }
        };
    }
    componentDidMount() {
        const location = this.props.location;
        // console.log(location);
        const kind   = location.state.type;
        const amount = location.state.owned;
        this.setState({
            value: {
                select: kind,
                input: amount
            }
        });
    }
    // * * * * * * * * * * * * * * * * * * * *
    // Handles form submit and adds 
    // card with input data
    // * * * * * * * * * * * * * * * * * * * *
    handleSubmit(e) {
        e.preventDefault();
        let currency = this.refs.select.value;
        let quantity = this.refs.input.value;
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

    // * * * * * * * * * * * * * * * * * * * *
    // Updates changes in form fields
    // * * * * * * * * * * * * * * * * * * * *
    handleChange(e) {
        this.setState({
            value: {
                select: this.refs.select.value,
                input: this.refs.input.value
            }
        });
    }

    render() {
        return(
            <div className="currency-form-container">
                <Link to={"/dashboard/portfolio"}>
                    <BackBtn />
                </Link>
                <form action="#!" className="edit-currency-form" 
                      onSubmit={e => this.handleSubmit(e)}>
                    <h2>Edit Your Currency</h2>
                    <select ref="select" value={this.state.value.select} onChange={e => this.handleChange(e)}>
                        <option value="BTC">Bitcoin (BTC)</option>
                        <option value="ETH">Etheruem (ETH)</option>
                        <option value="LTC">Litecoin (LTC)</option>
                        <option value="XMR">Monero (XMR)</option>
                    </select>
                    <input type="number" ref="input" value={this.state.value.input} onChange={e => this.handleChange(e)} required
                           placeholder="How many coins do you hold?"/>
                    <div className="edit-btns">
                        <button type="submit">Update</button>
                        <button type="button">Remove</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addCurrency: data => dispatch(addCurrency(data))
});

export default connect(null, mapDispatchToProps)(EditCurrencyForm);