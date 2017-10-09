import React from 'react';

// import ProtectedData from './protected-data';
import BaseCurrencyBox from './base-currency-box';
import MyCurrencies from './my-currencies';

export default class Portfolio extends React.Component {
    render() {
        return(
            <div className="portfolio">
                {/* <h2>My Currencies</h2> */}
                <div className="portfolio-container">
                    <BaseCurrencyBox />
                    <MyCurrencies />
                </div>
                {/* <ProtectedData /> */}
            </div>
        );
    }
}