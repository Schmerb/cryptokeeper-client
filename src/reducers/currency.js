import { 
    ADD_CURRENCY_SUCCESS, 
    ADD_CURRENCY_ERROR,
    UPDATE_CURRENCY_SUCCESS,
    UPDATE_CURRENCY_ERROR,
    GET_CURRENCIES_SUCCESS,
    GET_CURRENCIES_ERROR,
    SET_BASE_CURRENCY_SUCCESS,
    SET_BASE_CURRENCY_ERROR, 
    GET_BASE_CURRENCY_SUCCESS,
    GET_BASE_CURRENCY_ERROR,
    DELETE_CURRENCY_SUCCESS,
    DELETE_CURRENCY_ERROR,
    CLEAR_CURRENCY_STATE 
} from 'actions/currency'

// hydrates from store.js
const initialState = {
    currencies: [],
    currency: 'USD',
    currencySym: '$',
    error: null
};

const resetState = initialState;

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
        // base currency
        case SET_BASE_CURRENCY_SUCCESS:
            return {...state, currency: action.currency,
                              currencySym: getCurrencySym(action.currency)}
        case SET_BASE_CURRENCY_ERROR:
            return {...state, error: action.error};
        case GET_BASE_CURRENCY_SUCCESS:
            return {...state, currency: action.currency,
                              currencySym: getCurrencySym(action.currency)}
        case GET_BASE_CURRENCY_ERROR:
            return {...state, error: action.error};
        // Currencies
        // ADD
        case ADD_CURRENCY_SUCCESS:
            return {...state, currencies: [...state.currencies, action.currency]};
        case ADD_CURRENCY_ERROR:
            return {...state, error: action.error};
        // UPDATE
        case UPDATE_CURRENCY_SUCCESS:
            return {...state, currencies: action.currencies};
        case UPDATE_CURRENCY_ERROR:
            return {...state, error: action.error};
        // GET
        case GET_CURRENCIES_SUCCESS:
            return {...state, currencies: action.currencies};
        case GET_CURRENCIES_ERROR:
            return {...state, error: action.error};
        // DELETE
        case DELETE_CURRENCY_SUCCESS:
            return {...state, currencies: action.currencies};
        case DELETE_CURRENCY_ERROR:
            return {...state, error: action.error};
        // RESET
        case CLEAR_CURRENCY_STATE:
            return resetState;
        default:
            return state;
    }
}
