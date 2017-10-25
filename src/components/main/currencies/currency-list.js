import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getCurrencies } from 'utils/crypto-currency-list';

import Box from 'components/main/landing/box';

export class CurrencyList extends React.Component {
    render() {
        const sym = this.props.currencySym;
        const currencies = getCurrencies();
        let currencyList = currencies.map((currency, key) => (
            <li key={key}>
                <Link to={`/currencies/${currency.toLowerCase()}`}>
                    <Box currency={currency} currencySym={sym} 
                         fullData={this.props[currency].info} price={this.props[currency].price}/>
                </Link>
            </li>
        ));
        return (
            <div className="currency-list">
                <h2>Currencies</h2>
                <ul>
                    {currencyList}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    BTC: state.crypto.BTC,
    ETH: state.crypto.ETH,
    LTC: state.crypto.LTC,
    XMR: state.crypto.XMR,
    DASH: state.crypto.DASH,
    DOGE: state.crypto.DOGE,
    XRP: state.crypto.XRP,
    currencySym: state.currency.currencySym
});

export default connect(mapStateToProps)(CurrencyList);