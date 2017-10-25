import {
	updateBTCInfo,
	updateETHInfo,
	updateLTCInfo,
	updateXMRInfo,
	updateDASHInfo,
	updateDOGEInfo,
	updateXRPInfo
} from 'actions/crypto';


const { CCC } = require('utils/ccc-streamer-utilities');
const socket  = require('socket.io-client')('https://streamer.cryptocompare.com/');


let store = null;
let currency = 'USD';

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Event Listener callback for redux state change
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function handleChange() {
    const state = store.getState();
    const newCurrency = state.currency.currency;
    // console.log('currency: ', currency);
    // console.log('newCurrency: ', newCurrency);
    if(newCurrency !== currency) {
        emitSubscription('SubAdd', newCurrency);
        emitSubscription('SubRemove', currency);
        currency = newCurrency;
    }
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Emits socketIO event to subscribe to stream
// for given currencies
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function emitSubscription(type, currency) {
    let subscription = [
        `5~CCCAGG~BTC~${currency}`,
        `5~CCCAGG~ETH~${currency}`,
        `5~CCCAGG~XMR~${currency}`,
        `5~CCCAGG~LTC~${currency}`,
        `5~CCCAGG~DASH~${currency}`,
        `5~CCCAGG~DOGE~${currency}`,
        `5~CCCAGG~XRP~${currency}`
    ];
    socket.emit(type, { subs: subscription });
}

export default function(storeObj) {
    store = storeObj;
    store.subscribe(handleChange);

    emitSubscription('SubAdd', currency);
    socket.on('m', message => {
        const messageType = message.substring(0, message.indexOf("~"));

        const currencies = {
            BTC: updateBTCInfo,
            ETH: updateETHInfo,
            LTC: updateLTCInfo,
            XMR: updateXMRInfo,
            DASH: updateDASHInfo,
            DOGE: updateDOGEInfo,
            XRP: updateXRPInfo
        };

        let res = {};
        if (messageType === CCC.STATIC.TYPE.CURRENTAGG) {
            res = CCC.CURRENT.unpack(message);
            if(res.PRICE !== undefined) {
                store.dispatch(currencies[res.FROMSYMBOL](res));
            }
        }
    });
}