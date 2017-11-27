import React from 'react';
import { Route } from 'react-router-dom';

// import ProtectedData from './protected-data';
import PortfolioHome    from './portfolio-home';
import CurrencyForm     from './currency-form';
import EditCurrencyForm from './edit-currency-form';

export default class Portfolio extends React.Component {
    render() {
        const path = '/dashboard/portfolio';
        return(
            <div className="portfolio">
                {/* <h2>My Currencies</h2> */}
                <div className="portfolio-container">
                    <Route exact path={path} component={PortfolioHome} />
                    <Route exact path={`${path}/currency-form`} component={CurrencyForm} />
                    <Route exact path={`${path}/edit-currency-form`} component={EditCurrencyForm} />
                </div>
                {/* <ProtectedData /> */}
            </div>
        );
    }
}

