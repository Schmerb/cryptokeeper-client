import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo(props) {
    return (
        <div className={`logo ${props.path.includes('dashboard') ? 'dash' : ''}`}>
            <Link to="/">
                CRYPTOKEEP
                <i className="fa fa-btc" aria-hidden="true"></i>
                R
            </Link>
        </div>
    );   
}