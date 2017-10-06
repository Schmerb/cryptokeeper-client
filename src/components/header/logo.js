import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo(props) {
    return (
        <div className={`logo ${props.location === 'dash' ? 'dash' : ''}`}>
            <Link to="/">
                CRYPTOKEEP
                <i className="fa fa-btc" aria-hidden="true"></i>
                R
            </Link>
        </div>
    );   
}