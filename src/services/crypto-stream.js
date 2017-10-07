import {
	updateBTCInfo,
	updateETHInfo,
	updateLTCInfo,
	updateXMRInfo,
} from 'actions/crypto';

const { CCC } = require('utils/ccc-streamer-utilities');
const socket  = require('socket.io-client')('https://streamer.cryptocompare.com/');
const subscription = [
	'5~CCCAGG~BTC~USD',
	'5~CCCAGG~ETH~USD',
	'5~CCCAGG~XMR~USD',
	'5~CCCAGG~LTC~USD'
];

export default function(store) {
    socket.emit('SubAdd', { subs: subscription });
    socket.on('m', message => {
        const messageType = message.substring(0, message.indexOf("~"));

        const currencies = {
            BTC: updateBTCInfo,
            ETH: updateETHInfo,
            LTC: updateLTCInfo,
            XMR: updateXMRInfo
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