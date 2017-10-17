import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getCurrencies } from 'utils/crypto-currency-list';

export default class CurrencyNav extends Component {
    render() {
        const currencies = getCurrencies().map((coin, key) => (
            <li key={key}>
                <Link to={`/currencies/${coin.toLowerCase()}`}>
                    {coin}
                </Link>
            </li>
        ));
        return(
            <nav className="currency-nav">
                <ul>
                    {currencies}
                </ul>
            </nav>
        );
    }
}