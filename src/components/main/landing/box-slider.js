import React from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';

import {
	updateBTCInfo,
	updateETHInfo,
	updateLTCInfo,
	updateXMRInfo,
} from 'actions/crypto';

import Box from './box';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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


export class BoxSlider extends React.Component {

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

	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	// Slick-slider settings object
	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	slickSliderInit() {
		const settings = {
			dots: true,
			arrows: true,
			infinite: false,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 500,
					settings: {
						arrows: false
					}
				}
			]
		};
		return settings;
	}

	render() {
		let settings = this.slickSliderInit();
		return (
			<Slider {...settings}>
				<div><Box currency="Bitcoin" price={this.props.BTC.price} /></div>
				<div><Box currency="Ethereum" price={this.props.ETH.price} /></div>
				<div><Box currency="Litecoin" price={this.props.LTC.price} /></div>
				<div><Box currency="Monero" price={this.props.XMR.price} /></div>
			</Slider>
		);
	}
}


const mapStateToProps = state => ({
	BTC: state.crypto.BTC,
	ETH: state.crypto.ETH,
	LTC: state.crypto.LTC,
	XMR: state.crypto.XMR
});

export default connect(mapStateToProps)(BoxSlider);