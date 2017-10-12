import React from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CurrencyList from './currency-list';
import BTC from './pages/btc';

export class Currencies extends React.Component {
    render() {
        
        return(
            <div className="currency-page">
                <Route exact path="/currencies" component={CurrencyList}/>
                <Route exact path="/currencies/btc" component={BTC}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    BTC: state.crypto["BTC"],
	ETH: state.crypto["ETH"],
	LTC: state.crypto["LTC"],
	XMR: state.crypto["XMR"],
	DASH: state.crypto["DASH"],
	DOGE: state.crypto["DOGE"],
	XRP: state.crypto["XRP"],
    currencySym: state.display.currencySym
});

export default connect(mapStateToProps)(Currencies);