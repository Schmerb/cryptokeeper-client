import { 
    TOGGLE_MENU, 
    TOGGLE_LINKS, 
    SET_WIDTH,
    HAS_TOUCH,
    FLASH_MSG_CLASS,
    DASH_HOVER_VR,
    SET_BASE_CURRENCY 
} from 'actions/display'

const initialState = {
    open: false,
    openLinks: false,
    width: window.innerWidth,
    hasTouch: false,
    flashMsgClass: '',
    item: '',
    currency: 'USD',
    currencySym: '$'
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
            return '\u0024';
            // return '\u20AC';
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
        case SET_WIDTH:
            return Object.assign({}, state, {
                width: action.width
            });
        case HAS_TOUCH:
            return Object.assign({}, state, {
                hasTouch: action.hasTouch
            });
        case FLASH_MSG_CLASS:
            return Object.assign({}, state, {
                flashMsgClass: action.classname
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



