export const loadAuthToken = () => {
    console.log(localStorage);
    return localStorage.getItem('authToken');
};

export const saveAuthToken = authToken => {
    localStorage.setItem('authToken', authToken);
    console.log(localStorage);
};

export const clearAuthToken = () => {
    localStorage.removeItem('authToken');
    console.log(localStorage);
};
