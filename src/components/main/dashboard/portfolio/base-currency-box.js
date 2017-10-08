import React from 'react';

import BtcDollar from 'icons/btc-dollar';
import ArrowDown from 'icons/arrow-down';

export default class BaseCurrencyBox extends React.Component {
    render() {
        return(
            <div className="base-currency-box">
                <h2>Base Currency</h2>
                <BtcDollar />
                <form action="">
                    <select name="" id="">
                        <option value="dollar">Dollar</option>
                        <option value="euro">Euro</option>
                        <option value="pound">Pound</option>
                        <option value="canadian">Canadian</option>
                    </select>
                    <ArrowDown />
                </form>
            </div>
        );
    }
}


