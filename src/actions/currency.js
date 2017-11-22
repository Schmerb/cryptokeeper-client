import { API_BASE_URL } from 'config';
import { normalizeResponseErrors } from './utils';


export const CLEAR_CURRENCY_STATE = 'CLEAR_CURRENCY_STATE';
export const clearCurrencyState = () => ({
    type: CLEAR_CURRENCY_STATE
});


// // // // // // // // // //
//
// Base Currency actions
//
// // // // // // // // // //
export const SET_BASE_CURRENCY_SUCCESS = 'SET_BASE_CURRENCY_SUCCESS';
export const setBaseCurrencySuccess = (currency) => ({
    type: SET_BASE_CURRENCY_SUCCESS,
    currency
});
export const SET_BASE_CURRENCY_ERROR = 'SET_BASE_CURRENCY_ERROR';
export const setBaseCurrencyError = (error) => ({
    type: SET_BASE_CURRENCY_ERROR,
    error
});
//
// SET base currency
//
export const setBaseCurrency = (baseCurrency) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/users/me/base-currency/`, {
        method: 'PUT',
        body: JSON.stringify({baseCurrency}),
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => dispatch(setBaseCurrencySuccess(baseCurrency)))
        .catch(err => {
            dispatch(setBaseCurrencyError(err));
        });
};

//
// GET base currency success/fail
//
export const GET_BASE_CURRENCY_SUCCESS = 'GET_BASE_CURRENCY_SUCCESS';
export const getBaseCurrencySuccess = (currency) => ({
    type: GET_BASE_CURRENCY_SUCCESS,
    currency
});
export const GET_BASE_CURRENCY_ERROR = 'GET_BASE_CURRENCY_ERROR';
export const getBaseCurrencyError = (error) => ({
    type: GET_BASE_CURRENCY_ERROR,
    error
});
//
// GET base currency
//
export const getBaseCurrency = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => dispatch(getBaseCurrencySuccess(data.baseCurrency)))
        .catch(err => {
            dispatch(setBaseCurrencyError(err));
        });
};


// // // // // // // // // //
//
//  CURRENCIES ACTIONS
//
// // // // // // // // // //

//
// GET currencies success/fail
//
export const GET_CURRENCIES_SUCCESS = 'GET_CURRENCIES_SUCCESS';
export const getCurrenciesSuccess = currencies => ({
    type: GET_CURRENCIES_SUCCESS,
    currencies
});

export const GET_CURRENCIES_ERROR = 'GET_CURRENCIES_ERROR';
export const getCurrenciesError = error => ({
    type: GET_CURRENCIES_ERROR,
    error
});

// 
// Gets current user's currencies from db
//
export const getCurrencies = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/currencies/`, {
        method: 'GET',
        headers: { 
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
        },
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => dispatch(getCurrenciesSuccess(data)))
        .catch(err => {
            dispatch(getCurrenciesError(err));
        });
};


// // // // // // // // // //
//
//  ADD CURRENCIES 
//
// // // // // // // // // //

// ADDs currencies success/fail
export const ADD_CURRENCY_SUCCESS = 'ADD_CURRENCY_SUCCESS';
export const addCurrencySuccess = currency => ({
    type: ADD_CURRENCY_SUCCESS,
    currency
});

export const ADD_CURRENCY_ERROR = 'ADD_CURRENCY_ERROR';
export const addCurrencyError = error => ({
    type: ADD_CURRENCY_ERROR,
    error
});

// ADDs currencies
export const addCurrency = (currency) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/currencies/`, {
        method: 'POST',
        body: JSON.stringify(currency),
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => {
            dispatch(addCurrencySuccess(data));
        })
        .catch(err => {
            dispatch(addCurrencyError(err));
        });
};


// // // // // // // // // //
//
//  UPDATE CURRENCY 
//
// // // // // // // // // //

// Receives ALL of the currencies back, so replace entire state
export const UPDATE_CURRENCY_SUCCESS = 'UPDATE_CURRENCY_SUCCESS';
export const updateCurrencySuccess = currencies => ({
    type: UPDATE_CURRENCY_SUCCESS,
    currencies
});

export const UPDATE_CURRENCY_ERROR = 'UPDATE_CURRENCY_ERROR';
export const updateCurrencyError = error => ({
    type: UPDATE_CURRENCY_ERROR,
    error
});

export const updateCurrency = (currency) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/currencies/${currency.id}`, {
        method: 'PUT',
        body: JSON.stringify(currency),
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => dispatch(updateCurrencySuccess(data)))
        .catch(err => {
            dispatch(addCurrencyError(err));
        });
};

// // // // // // // // // //
//
//  DELETE CURRENCY 
//
// // // // // // // // // //

// Receives ALL of the currencies back, so replace entire state
export const DELETE_CURRENCY_SUCCESS = 'DELETE_CURRENCY_SUCCESS';
export const deleteCurrencySuccess = currencies => ({
    type: DELETE_CURRENCY_SUCCESS,
    currencies
});

export const DELETE_CURRENCY_ERROR = 'DELETE_CURRENCY_ERROR';
export const deleteCurrencyError = error => ({
    type: DELETE_CURRENCY_ERROR,
    error
});

export const deleteCurrency = (currencyId) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/currencies/${currencyId}`, {
        method: 'DELETE',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => {
            dispatch(deleteCurrencySuccess(data));
        })
        .catch(err => {
            dispatch(deleteCurrencyError(err));
        });
};

