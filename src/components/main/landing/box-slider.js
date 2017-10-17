import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from 'react-slick';

import Box from './box';
import { NextArrow, PrevArrow } from './slick-arrows';



import { getCurrencies, getName } from 'utils/crypto-currency-list';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export class BoxSlider extends React.Component {

	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	// Slick-slider settings object
	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	slickSliderInit() {
		const settings = {
			dots: true,
			infinite: false,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			nextArrow: <NextArrow />,
			prevArrow: <PrevArrow />,
			responsive: [
				{
					breakpoint: 650,
					settings: {
						arrows: false
					}
				}
			]
		};
		return settings;
	}


	render() {
		const settings = this.slickSliderInit();
		const sym = this.props.currencySym;
		const currencies = getCurrencies();
		const currencySlides = currencies.map((coin, key) => (
			<div key={key}>
				<Link to={`/currencies/${coin.toLowerCase()}`}>
					<Box currency={getName(coin)} 
						price={this.props[coin].price} 
						currencySym={sym} />
				</Link>
			</div>
		));

		return (
			<Slider {...settings}>
				{currencySlides}
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
	baseCurrency: state.display.currency,
	currencySym: state.display.currencySym
});

export default connect(mapStateToProps)(BoxSlider);