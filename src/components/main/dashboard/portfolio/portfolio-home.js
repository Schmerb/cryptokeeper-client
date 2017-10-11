import React from 'react';

import BaseCurrencyBox from './base-currency-box';
import MyCurrencies    from './my-currencies';

export default function PortfolioHome(props) {
    return(
        <div>
            <BaseCurrencyBox />
            <MyCurrencies />
        </div>
    );
}