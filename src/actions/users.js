import { SubmissionError } from 'redux-form';

import { API_BASE_URL } from 'config';
import { normalizeResponseErrors } from './utils';

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Registers a new user
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export const registerUser = user => dispatch => {
    return fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
        });
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Deletes user's account
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export const deleteUser = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/users/me`, {
        method: 'DELETE',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            'content-type': 'application/json'
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .catch(err => {
        const {reason} = err;
        if (reason === 'ValidationError') {
            console.log(err);
        }
    });
};

