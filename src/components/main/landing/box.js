import React from 'react';

export default function Box(props) {
    return(
        <div className={`box ${props.side}-col`}>
            <h3>{props.currency}</h3>
            <p>This is a box on the {props.side} side</p>
        </div>
    );
}