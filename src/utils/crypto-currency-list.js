export default function(abbrv) {
    switch (abbrv) {
        case "BTC":
            return 'Bitcoin'
        
        case "ETH":
            return 'Etheruem'
        
        case "LTC":
            return 'Litecoin'
        
        case "XMR":
            return 'Monero'
        default:
            return ''
    }
}


