import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


import Box from 'components/main/landing/box';

export class CurrencyList extends React.Component {
    render() {
        let sym = this.props.currencySym;
        console.log(this.props.BTC.info);
        return (
            <div>
                <h2>Currencies</h2>
                    <ul>
                        <li>
                            <Link to={'/currencies/btc'}>
                                <Box currency="BTC" currencySym={sym} price={this.props.BTC.price}/>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/currencies/eth'}>
                                <Box currency="ETH" currencySym={sym} price={this.props.ETH.price}/>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/currencies/ltc'}>
                                <Box currency="LTC" currencySym={sym} price={this.props.LTC.price}/>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/currencies/xmr'}>
                                <Box currency="XMR" currencySym={sym} price={this.props.XMR.price}/>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/currencies/dash'}>
                                <Box currency="DASH" currencySym={sym} price={this.props.DASH.price}/>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/currencies/doge'}>
                                <Box currency="DOGE" currencySym={sym} price={this.props.DOGE.price}/>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/currencies/ripple'}>
                                <Box currency="XRP" currencySym={sym} price={this.props.XRP.price}/>
                            </Link>
                        </li>
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
    currencySym: state.display.currencySym
});

export default connect(mapStateToProps)(CurrencyList);