import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CurrencyList from './currency-list';
import CurrencyPage from './currency-page';

export class Currencies extends Component {
    render() {
        
        return(
            <div className="currencies">
                <Route exact path="/currencies" component={CurrencyList}/>
                <Route exact path="/currencies/:currency" component={CurrencyPage}/>
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

export default connect(mapStateToProps)(Currencies);