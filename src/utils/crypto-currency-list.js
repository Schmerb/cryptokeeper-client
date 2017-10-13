
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Returns the full name of crypto currency passed in 
// as argument
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export function getName(abbrv) {
    switch (abbrv) {
        case "BTC":
            return 'Bitcoin'
        case "ETH":
            return 'Etheruem'
        case "LTC":
            return 'Litecoin'
        case "XMR":
            return 'Monero'
        case "DASH":
            return 'Dash'
        case "DOGE":
            return 'Dogecoin'
        case "XRP":
            return 'Ripple'
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


