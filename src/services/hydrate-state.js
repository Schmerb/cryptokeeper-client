import { 
    getBaseCurrency, 
    getCurrencies,
    clearCurrencyState
} from 'actions/currency';
import{ 
    clearEventState,
    getEvents
} from 'actions/events';
import { getUser, getUserAvatar } from 'actions/protected-data';

let store;

// Clear sensitive info from state

// Hydrate with current user whenb logged in


export function clearState() {
    store.dispatch(clearCurrencyState());
    store.dispatch(clearEventState());
};

export function hydrateState() {
    store.dispatch(getBaseCurrency());
    store.dispatch(getCurrencies());
    store.dispatch(getEvents());
    store.dispatch(getUser());
    store.dispatch(getUserAvatar());
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