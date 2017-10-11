import { ADD_CURRENCY } from 'actions/currency'

import { loadCurrencies } from 'utils/local-storage';

const currencies = JSON.parse(loadCurrencies());
const initialState = {
    currencies: currencies ? currencies : []
                // [
                //     {
                //         type: "BTC",
                //         owned: 0.34092
                //     },
                //     {
                //         type: "ETH",
                //         owned: 11.23
                //     },
                //     {
                //         type: "LTC",
                //         owned: 5.6
                //     }
                // ]
};

//
// Display Reducer
//
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_CURRENCY:
            return Object.assign({}, state, {
                currencies: [...state.currencies, action.currency]
            });
        default:
            return state;
    }
}
