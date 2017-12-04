
// * * * * * * * * * * * * * * * 
//      Authentication
// * * * * * * * * * * * * * * * 


export const loadAuthToken = () => {
    return localStorage.getItem('authToken');
};

export const saveAuthToken = authToken => {
    localStorage.setItem('authToken', authToken);
};

export const clearAuthToken = () => {
    localStorage.removeItem('authToken');
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