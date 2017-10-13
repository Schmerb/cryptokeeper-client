import { 
    TOGGLE_MENU, 
    TOGGLE_LINKS,
    SET_Y_POS, 
    SET_BASE_Y_POS, 
    SET_DOWN_BASE_Y_POS,
    SET_UP_DIRECTION, 
    SET_WIDTH,
    HAS_TOUCH,
    CONFIRM_MESSAGE,
    CONFIRM_CLASS,
    FLASH_MESSAGE,
    REMOVE_FLASH_MESSAGE,
    FLASH_MSG_CLASS,
    DASH_HOVER_VR,
    SET_BASE_CURRENCY 
} from 'actions/display'

import { loadBaseCurrency } from 'utils/local-storage';

const initialState = {
        open: false,
        openLinks: false,
        yPos: 0,
        baseYPos: 0,
        downBaseYPos: 0,
        up: false,
        width: window.innerWidth,
        hasTouch: false,
        confirmMsg: null,
        confirmClass: '',
        flashMsg: null,
        flashClass: '',
        item: '',
        currency: loadBaseCurrency() || 'USD',
        currencySym: getCurrencySym(loadBaseCurrency()) ||'$'
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Returns appropriate currency symbol
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function getCurrencySym(currency) {
    switch (currency) {
        case 'USD':
            return '$';
        case 'AUD':
            return 'A$';
        case 'EUR':
            return '\u20AC';
        case 'GBP':
            return '\xA3';
        default:
            return currency;
    }
}

//
// Display Reducer
//
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_MENU:
            document.body.classList.toggle('no-scroll', !state.open);
            document.getElementsByTagName('html')[0].classList.toggle('no-scroll', !state.open);
            return Object.assign({}, state, {
                open: !state.open
            });
        case TOGGLE_LINKS:
            return Object.assign({}, state, {
                openLinks: action.open
            });
        case SET_Y_POS:
            return Object.assign({}, state, {
                yPos: action.yPos
            });
        case SET_BASE_Y_POS:
            return Object.assign({}, state, {
                baseYPos: action.baseYPos
            });
        case SET_DOWN_BASE_Y_POS:
            return Object.assign({}, state, {
                downBaseYPos: action.downBaseYPos
            });
        case SET_UP_DIRECTION:
            return Object.assign({}, state, {
                up: action.up
            });
        case SET_WIDTH:
            return Object.assign({}, state, {
                width: action.width
            });
        case HAS_TOUCH:
            return Object.assign({}, state, {
                hasTouch: action.hasTouch
            });
        case CONFIRM_MESSAGE:
            return Object.assign({}, state, {
                confirmMsg: action.msg
            });
        case CONFIRM_CLASS:
            return Object.assign({}, state, {
                confirmClass: action.classname
            });
        case FLASH_MESSAGE:
            return Object.assign({}, state, {
                flashMsg: action.msg
            });
        case REMOVE_FLASH_MESSAGE:
            return Object.assign({}, state, {
                flashMsg: null
            });
        case FLASH_MSG_CLASS:
            return Object.assign({}, state, {
                flashClass: action.classname
            });
        case DASH_HOVER_VR:
            return Object.assign({}, state, {
                item: action.item
            });
        case SET_BASE_CURRENCY :
            return Object.assign({}, state, {
                currency: action.currency,
                currencySym: getCurrencySym(action.currency)
            });
        default:
            return state;
    }
}



