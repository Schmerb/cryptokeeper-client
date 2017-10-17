import React from 'react';

import BtcIcon  from 'icons/currency/btc';
import EthIcon  from 'icons/currency/eth';
import LtcIcon  from 'icons/currency/ltc';
import DashIcon from 'icons/currency/dash';
import DogeIcon from 'icons/currency/doge';
import XrpIcon  from 'icons/currency/xrp';
import XmrIcon  from 'icons/currency/xmr';


// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Returns the full name of crypto currency passed in 
// as argument
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export function getName(abbrv) {
    switch (abbrv.toLowerCase()) {
        case "btc":
            return 'Bitcoin'
        case "eth":
            return 'Etheruem'
        case "ltc":
            return 'Litecoin'
        case "xmr":
            return 'Monero'
        case "dash":
            return 'Dash'
        case "doge":
            return 'Dogecoin'
        case "xrp":
            return 'Ripple'
        default:
            return ''
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Returns the corresponding SVG component for currency
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export function getIcon(abbrv) {
    switch (abbrv.toLowerCase()) {
        case "btc":
            return <BtcIcon/>
        case "eth":
            return <EthIcon className="eth"/>
        case "ltc":
            return <LtcIcon/>
        case "xmr":
            return <XmrIcon/>
        case "dash":
            return <DashIcon/>
        case "doge":
            return <DogeIcon className="doge"/>
        case "xrp":
            return <XrpIcon/>
        default:
            return ''
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Returns the abbreviations for all supported  crypto 
// currencies
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export function getCurrencies() {
    return [
        "BTC",
        "ETH",
        "LTC",
        "XMR",
        "DASH",
        "DOGE",
        "XRP"
    ];
}


