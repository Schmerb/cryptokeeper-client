import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';


// // // // // // // // // // //
//
//  Twilio Phone Verification
//
// // // // // // // // // // //

export const REQUEST_VERIFICATION_CODE_SUCCESS = 'REQUEST_VERIFICATION_CODE_SUCCESS';
export const requestVerificationCodeSuccess = () => ({
    type: REQUEST_VERIFICATION_CODE_SUCCESS
});
export const REQUEST_VERIFICATION_CODE_ERROR = 'REQUEST_VERIFICATION_CODE_ERROR';
export const requestVerificationCodeError = (error) => ({
    type: REQUEST_VERIFICATION_CODE_ERROR,
    error
});
// 
// Requests a verification code / resends code
//
export const requestVerificationCode = (phoneNumber) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/twilio/verify-phone/start/${phoneNumber}`, {
        method: 'POST',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        // .then(res => {
        //     console.log('RES: ', res);
        //     if(res.success) {
        //         console.log('Success');
        //     } else {
        //         console.log(res.message);
        //     }
        //     return res;
        // })
        .catch(err => {
            dispatch(requestVerificationCodeError(err));
            console.log({message: 'Internal server error', err})
        });
};

//
// Verifies users code
//
export const verifyCode = (phoneNumber, code, email) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/twilio/verify-phone/check/${phoneNumber}/${code}`, {
        method: 'POST',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        // .then(res => {
        //     console.log('RES: ', res);
        //     if(res.success) {
        //         console.log('Success');
        //     } else {
        //         console.log(res.message);
        //     }
        //     return res;
        // })
        .catch(err => console.log({message: 'Internal server error', err}));
};