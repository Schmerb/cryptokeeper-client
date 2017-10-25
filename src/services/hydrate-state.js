import { 
    getBaseCurrency, 
    getCurrencies,
    clearCurrencyState
} from 'actions/currency';
import{ 
    clearEventState,
    getEvents
} from 'actions/events';
import { getUser } from 'actions/protected-data';

let store;

// Clear sensitive info from state

// Hydrate with current user whenb logged in


export function clearState() {
    store.dispatch(clearCurrencyState());
    store.dispatch(clearEventState());
};

export function hydrateState() {
    console.log('hydrating state');
    store.dispatch(getBaseCurrency());
    store.dispatch(getCurrencies());
    store.dispatch(getEvents());
    store.dispatch(getUser());
}

export default function(storeObj, authToken) {
    store = storeObj;

    store.subscribe(() => {
        // let state = store.getState();
        // console.log(state.protectedData);
    });
    if(authToken) {
        hydrateState();
    }
}