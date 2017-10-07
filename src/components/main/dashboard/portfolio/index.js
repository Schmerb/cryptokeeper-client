import React from 'react';

import ProtectedData from '../protected-data';

export default class Portfolio extends React.Component {
    render() {
        return(
            <div className="portfolio">
                <h2>My Currencies</h2>
                <div className="portfolio-container">
                    <ProtectedData />
                </div>
            </div>
        );
    }
}