import React from 'react';
import { connect } from 'react-redux';

export class Currencies extends React.Component {
    render() {
        return(
            <div>
                <h2>Currencies</h2>
                <ul>
                    <li>BTC: ${this.props.BTC.price}</li>
                    <li>ETH: ${this.props.ETH.price}</li>
                    <li>LTC: ${this.props.LTC.price}</li>
                    <li>XMR: ${this.props.XMR.price}</li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    BTC: state.crypto.BTC,
    ETH: state.crypto.ETH,
    LTC: state.crypto.LTC,
    XMR: state.crypto.XMR
});

export default connect(mapStateToProps)(Currencies);