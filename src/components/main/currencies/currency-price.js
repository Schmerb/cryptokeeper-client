import React from 'react';

export default function CurrencyPrice(props) {
    return(
        <div className="price">
            <div className="current" id="current-price">
                {props.sym}{props.data.PRICE}
            </div>
            <label htmlFor="current-price">1.00 {props.currency}</label>
        </div>
    );
}