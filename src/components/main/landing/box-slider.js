import React from 'react';
import Slider from 'react-slick';

import Box from './box';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class BoxSlider extends React.Component {
  render () {
    var settings = {
      dots: true,
      arrows: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings}>
        <div><Box side="left" currency="Bitcoin"/></div>
        <div><Box side='right' currency="Ethereum"/></div>
        <div><Box side='left' currency="Litecoin"/></div>
        <div><Box side='right' currency="Monero"/></div>
      </Slider>
    );
  }
}

/* <div className="top row">
    <Box side='left' currency="Bitcoin"/>
    <Box side='right' currency="Ethereum"/>
</div>
<div className="bottom row">
    <Box side='left' currency="Litecoin"/>
    <Box side='right' currency="Monero"/>
</div> */

// Box currency="Bitcoin"/>