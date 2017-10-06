import React from 'react';
import { connect } from 'react-redux';

import {
	updateBTCInfo,
	updateETHInfo,
	updateLTCInfo,
	updateXMRInfo,
} from 'actions/crypto';

const { CCC } = require('utils/ccc-streamer-utilities');
const socket  = require('socket.io-client')('https://streamer.cryptocompare.com/');
const subscription = [
	'5~CCCAGG~BTC~USD',
	'5~CCCAGG~ETH~USD',
	'5~CCCAGG~XMR~USD',
	'5~CCCAGG~LTC~USD'
];

// Monero   -- XMR
// Litecoin -- LTC

export class CryptoStream extends React.Component {
    componentDidMount() {
		this.socketIO();
	}

	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	// SocketIO event-listener / emitter, updates current
	// currency prices in state
	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	socketIO() {
		socket.emit('SubAdd', { subs: subscription });
		socket.on('m', message => {
			const messageType = message.substring(0, message.indexOf("~"));

			const currencies = {
				BTC: updateBTCInfo,
				ETH: updateETHInfo,
				LTC: updateLTCInfo,
				XMR: updateXMRInfo
			};

			let res = {};
			if (messageType === CCC.STATIC.TYPE.CURRENTAGG) {
				res = CCC.CURRENT.unpack(message);
				if(res.PRICE !== undefined) {
					this.props.dispatch(currencies[res.FROMSYMBOL](res));
				}
			}
		});
    }
    
    render() {
        return(
            <div></div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    BTC: state.crypto.BTC,
	ETH: state.crypto.ETH,
	LTC: state.crypto.LTC,
	XMR: state.crypto.XMR
});

export default connect(mapStateToProps)(CryptoStream);