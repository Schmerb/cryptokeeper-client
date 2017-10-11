import { 
    storeBaseCurrency,
    loadBaseCurrency,
    storeCurrencies,
    loadCurrencies,
    saveEvents,
    loadEvents
 } from 'utils/local-storage';

let store = null;
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Saves display state in localStorage
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function handleStateChange() {
    handleBaseCurrency();
    handleCurrencies();
    handleEvents();
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Updates currencies if any added
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function handleCurrencies() {
    let currencies     = store.getState().currency.currencies,
        prevCurrencies = loadCurrencies();
    if(JSON.stringify(currencies) !== prevCurrencies) {
        storeCurrencies(currencies);
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Handles currency changes
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function handleBaseCurrency() {
    let displayState     = store.getState().display,
        currency         = displayState.currency,
        prevBaseCurrency = loadBaseCurrency();

    if(currency !== prevBaseCurrency) {
        storeBaseCurrency(currency);
    }
}

let prevEvents = loadEvents() || [];
// console.log(loadEvents());
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Listens for events added to state to save in lcoalStorage
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function handleEvents() {
    let events = store.getState().events.events;
    if(prevEvents.length === 0 || events.length !== prevEvents.length) {
        saveEvents(events);
        prevEvents = events;
    }
}


export default function persistState(storeObj) {
    store = storeObj;
    store.subscribe(handleStateChange);
}   