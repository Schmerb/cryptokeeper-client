// import { API_BASE_URL } from 'config';
import { normalizeResponseErrors } from './utils';

export const UPDATE_BTC_INFO = 'UPDATE_BTC_INFO';
export const updateBTCInfo = (info) => ({
    type: UPDATE_BTC_INFO,
    info 
});

export const UPDATE_ETH_INFO = 'UPDATE_ETH_INFO';
export const updateETHInfo = (info) => ({
    type: UPDATE_ETH_INFO,
    info 
});

export const UPDATE_LTC_INFO = 'UPDATE_LTC_INFO';
export const updateLTCInfo = (info) => ({
    type: UPDATE_LTC_INFO,
    info 
});

export const UPDATE_XMR_INFO = 'UPDATE_XMR_INFO';
export const updateXMRInfo = (info) => ({
    type: UPDATE_XMR_INFO,
    info 
});

export const UPDATE_DASH_INFO = 'UPDATE_DASH_INFO';
export const updateDASHInfo = (info) => ({
    type: UPDATE_DASH_INFO,
    info 
});

export const UPDATE_DOGE_INFO = 'UPDATE_DOGE_INFO';
export const updateDOGEInfo = (info) => ({
    type: UPDATE_DOGE_INFO,
    info 
});

export const UPDATE_XRP_INFO = 'UPDATE_XRP_INFO';
export const updateXRPInfo = (info) => ({
    type: UPDATE_XRP_INFO,
    info 
});

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Gets data for use in google chart
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export const GET_HISTO_DATA_SUCCESS = 'GET_HISTO_DATA_SUCCESS';
export const getHistoDataSuccess = data => ({
    type: GET_HISTO_DATA_SUCCESS,
    data
});
export const GET_HISTO_DATA_ERROR = 'GET_HISTO_DATA_ERROR';
export const getHistoDataError = error => ({
    type: GET_HISTO_DATA_ERROR,
    error
});
export const getHistoData = (currency, baseCurrency) => (dispatch, getState) => {
    const url = `https://min-api.cryptocompare.com/data/histoday?fsym=${currency}&tsym=${baseCurrency}&limit=80&aggregate=3&e=CCCAGG`;
    // console.log('MAKING REQUEST');
    return fetch(url)
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(data => dispatch(getHistoDataSuccess(data)))
        .catch(err => console.log({message: 'Internal server error', err}));
};