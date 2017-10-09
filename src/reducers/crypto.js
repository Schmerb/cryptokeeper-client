import { 
    UPDATE_BTC_INFO,
    UPDATE_ETH_INFO,
    UPDATE_LTC_INFO,
    UPDATE_XMR_INFO,
    UPDATE_AUD_INFO
} from 'actions/crypto';

const initialState = {
    BTC: {
        price: 0
    },
    LTC: {
        price: 0
    },
    ETH: {
        price: 0
    },
    XMR: {
        price: 0
    },
    AUD: {
        price: 0
    }
};

export default function reducer(state=initialState, action) {
    switch(action.type) {
        case UPDATE_BTC_INFO:
            return Object.assign({}, state, {
                BTC: {
                    price: action.info.PRICE
                }
            }); 
        case UPDATE_ETH_INFO:
            return Object.assign({}, state, {
                ETH: {
                    price: action.info.PRICE
                }
            });
        case UPDATE_LTC_INFO:
            return Object.assign({}, state, {
                LTC: {
                    price: action.info.PRICE
                }
            }); 
        case UPDATE_XMR_INFO:
            return Object.assign({}, state, {
                XMR: {
                    price: action.info.PRICE
                }
            }); 
        case UPDATE_AUD_INFO:
            return Object.assign({}, state, {
                AUD: {
                    price: action.info.PRICE
                }
            }); 
        default:
            return state;

    }
}