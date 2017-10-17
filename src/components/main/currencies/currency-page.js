import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import MarketStats   from './market-stats';
import MarketGraph   from './market-graph';
import CurrencyTitle from './currency-title';
import CurrencyPrice from './currency-price';
import CurrencyNav   from './currency-nav';

export class CurrencyPage extends Component {
    componentDidMount() {

    }


    render() {
        let abbrv = this.props.match.params.currency.toUpperCase();
        const sym  = this.props.currencySym;
        const data = this.props[abbrv];
        return(
            <section className="currency-page">
                <CurrencyNav />
                <div className="container">
                    <CurrencyTitle currency={abbrv} />
                    <CurrencyPrice sym={sym} currency={abbrv} data={data.info}/>
                    <MarketStats sym={sym} data={data.info}/>
                    <MarketGraph sym={sym} currency={abbrv} data={data.info}/>
                </div>
            </section>
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
    currency: state.display.currency,
    currencySym: state.display.currencySym
});

export default connect(mapStateToProps)(CurrencyPage);