import React from 'react';

export default function Box(props) {
    return(
        <div className={`box`}>
            <h2>{props.currency}</h2>
            <p>Price: {props.currencySym}{props.price}</p>
        </div>
    );
}