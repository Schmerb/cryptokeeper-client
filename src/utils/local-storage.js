
// * * * * * * * * * * * * * * * 
//      Authentication
// * * * * * * * * * * * * * * * 


export const loadAuthToken = () => {
    // console.log(localStorage);
    return localStorage.getItem('authToken');
};

export const saveAuthToken = authToken => {
    localStorage.setItem('authToken', authToken);
    // console.log(localStorage);
};

export const clearAuthToken = () => {
    localStorage.removeItem('authToken');
    // console.log(localStorage);
};

// * * * * * * * * * * * * * * * 
//      Events
// * * * * * * * * * * * * * * * 
export const saveEvents = eventData => {
    localStorage.setItem('eventData', JSON.stringify(eventData));
};

export const loadEvents = eventData => {
    return JSON.parse(localStorage.getItem('eventData'));
};

// * * * * * * * * * * * * * * * 
//      Currency State
// * * * * * * * * * * * * * * * 

export const storeBaseCurrency = currency => {
    localStorage.setItem('displayState', currency);
};

export const loadBaseCurrency = () => {
    return localStorage.getItem('displayState');
};

// * * * * * * * * * * * * * * * 
//      Currencies
// * * * * * * * * * * * * * * * 
export const storeCurrencies = currency => {
    // console.log(currency);
    localStorage.setItem('currencies', JSON.stringify(currency));
};

export const loadCurrencies = () => {
    const c = localStorage.getItem('currencies');
    // console.log(c);
    return c;
};

// * * * * * * * * * * * * * * * 
//      URL History
// * * * * * * * * * * * * * * * 


// stores current url pathname
export const storeURLPath = pathname => {
    localStorage.setItem('pathname', pathname);
};

// returns previous url pathname
export const getURLPath = pathname => {
    return localStorage.getItem('pathname');
};