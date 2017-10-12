import React from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';

import Box from './box';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export class BoxSlider extends React.Component {

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
		const sym = this.props.currencySym;
		return (
			<Slider {...settings}>
				<div>
					<Box currency="Bitcoin" 
						price={this.props.BTC.price} 
						currencySym={sym} />
				</div>
				<div>
					<Box currency="Ethereum" 
						price={this.props.ETH.price} 
						currencySym={sym} />
				</div>
				<div>
					<Box currency="Litecoin" 
						price={this.props.LTC.price} 
						currencySym={sym} />
				</div>
				<div>
					<Box currency="Monero" 
						price={this.props.XMR.price} 
						currencySym={sym} />
				</div>
				<div>
					<Box currency="Dash" 
						price={this.props.DASH.price} 
						currencySym={sym} />
				</div>
				<div>
					<Box currency="Dogecoin" 
						price={this.props.DOGE.price} 
						currencySym={sym} />
				</div>
				<div>
					<Box currency="Ripple" 
						price={this.props.XRP.price} 
						currencySym={sym} />
				</div>
			</Slider>
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

export default connect(mapStateToProps)(BoxSlider);