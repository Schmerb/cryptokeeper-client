import React from 'react';

import { getName, getIcon } from 'utils/crypto-currency-list';

export default function CurrencyTitle(props) {
    return(
        <div className="title">
            {getIcon(props.currency)}
            <h2>{getName(props.currency)} ({props.currency})</h2>
        </div>
    );
}