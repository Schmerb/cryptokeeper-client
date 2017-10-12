import React from 'react';

import BtcIcon from 'icons/currency/btc';

export default class BTC extends React.Component {
    render() {
        return(
            <section>
                <h2>Bitcoin (BTC)</h2>
                <BtcIcon />
            </section>
        );
    }
}