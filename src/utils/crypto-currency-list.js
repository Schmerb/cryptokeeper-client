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


