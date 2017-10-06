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