import React from 'react';

import { getName } from 'utils/crypto-currency-list';

export default class Box extends React.Component {
    render() {
        const fullData = this.props.fullData,
              sym      = this.props.currencySym,
              price    = this.props.price,
              currency = this.props.currency;
        if(fullData) {
            return(
                <div className="box full-currency-data">
                    <h2>{getName(currency)} ({currency})</h2>
                    <ul>
                        <li>
                            <label>
                                Price:
                                <span className="value">{sym}{price}</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                Volume (HR)
                                <span className="value">{sym}{parseFloat(fullData.VOLUMEHOURTO).toFixed(2)}</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                Volume Total (24HR)
                                <span className="value">{sym}{parseFloat(fullData.VOLUME24HOURTO).toFixed(2)}</span>
                            </label>
                        </li>
                    </ul>
                </div>
            );
        }
        return(
            <div className="box">
                <h2>{currency}</h2>
                <p>Price: {sym}{price}</p>
            </div>
        );
    }
}