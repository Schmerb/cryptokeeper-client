import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo() {
    return (
        <div className="logo">
            <Link to="/">
                CRYPTOKEEP
                <i className="fa fa-btc" aria-hidden="true"></i>
                R
            </Link>
        </div>
    );
}