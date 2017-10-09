import React from 'react';
import { connect } from 'react-redux';

export class Currencies extends React.Component {
    render() {
        let sym = this.props.currencySym;
        return(
            <div>
                <h2>Currencies</h2>
                <ul>
                    <li>BTC: {sym}{this.props.BTC.price}</li>
                    <li>ETH: {sym}{this.props.ETH.price}</li>
                    <li>LTC: {sym}{this.props.LTC.price}</li>
                    <li>XMR: {sym}{this.props.XMR.price}</li>
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
    currencySym: state.display.currencySym
});

export default connect(mapStateToProps)(Currencies);