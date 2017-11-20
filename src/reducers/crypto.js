import { 
    UPDATE_BTC_INFO,
    UPDATE_ETH_INFO,
    UPDATE_LTC_INFO,
    UPDATE_XMR_INFO,
    UPDATE_DASH_INFO,
    UPDATE_DOGE_INFO,
    UPDATE_XRP_INFO,
    GET_HISTO_DATA_SUCCESS
} from 'actions/crypto';

const initialState = {
    BTC: {
        price: 0,
        info: {}
    },
    LTC: {
        price: 0,
        info: {}
    },
    ETH: {
        price: 0,
        info: {}
    },
    XMR: {
        price: 0,
        info: {}
    },
    DASH: {
        price: 0,
        info: {}
    },
    DOGE: {
        price: 0,
        info: {}
    },
    XRP: {
        price: 0,
        info: {}
    },
    histoData: []
};

export default function reducer(state=initialState, action) {
    switch(action.type) {
        case UPDATE_BTC_INFO:
            return {...state, BTC: {
                price: action.info.PRICE,
                info: action.info
            }};
        case UPDATE_ETH_INFO:
            return {...state, ETH: {
                price: action.info.PRICE,
                info: action.info
            }};
        case UPDATE_LTC_INFO:
            return {...state, LTC: {
                price: action.info.PRICE,
                info: action.info
            }};
        case UPDATE_XMR_INFO:
            return {...state, XMR: {
                price: action.info.PRICE,
                info: action.info
            }};
        case UPDATE_DASH_INFO:
            return {...state, DASH: {
                price: action.info.PRICE,
                info: action.info
            }};
        case UPDATE_DOGE_INFO:
            return {...state, DOGE: {
                price: action.info.PRICE,
                info: action.info
            }};
        case UPDATE_XRP_INFO:
            return {...state, XRP: {
                price: action.info.PRICE,
                info: action.info
            }};
        case GET_HISTO_DATA_SUCCESS:
            return {...state, histoData: action.data};
        default:
            return state;

    }
}