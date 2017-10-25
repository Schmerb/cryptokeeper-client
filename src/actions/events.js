import { API_BASE_URL } from 'config';
import { normalizeResponseErrors } from './utils';

export const CLEAR_EVENTS_STATE = 'CLEAR_EVENTS_STATE';
export const clearEventState = () => ({
    type: CLEAR_EVENTS_STATE
});


// // // // // // // // // //
//
//  GET EVENTS
//
// // // // // // // // // //
export const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS';
export const getEventsSuccess = event => ({
    type: GET_EVENTS_SUCCESS,
    event
});

export const GET_EVENTS_ERROR = 'GET_EVENTS_ERROR';
export const getEventsError = error => ({
    type: GET_EVENTS_ERROR,
    error
});

export const getEvents = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/events/`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => dispatch(getEventsSuccess(data)))
        .catch(err => {
            dispatch(getEventsError(err));
        });
};



// // // // // // // // // //
//
//  ADD EVENTS
//
// // // // // // // // // //
export const ADD_EVENT_SUCCESS = 'ADD_EVENT_SUCCESS';
export const addEventSuccess = event => ({
    type: ADD_EVENT_SUCCESS,
    event
});

export const ADD_EVENT_ERROR = 'ADD_EVENT_ERROR';
export const addEventError = error => ({
    type: ADD_EVENT_ERROR,
    error
});

export const addEvent = (event) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/events/`, {
        method: 'POST',
        body: JSON.stringify(event),
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => dispatch(addEventSuccess(data)))
        .catch(err => {
            dispatch(addEventError(err));
        });
};


// // // // // // // // // //
//
//  UPDATE EVENT
//
// // // // // // // // // //
export const UPDATE_EVENT_SUCCESS = 'UPDATE_EVENT_SUCCESS';
export const updateEventSuccess = events => ({
    type: UPDATE_EVENT_SUCCESS,
    events
});

export const UPDATE_EVENT_ERROR = 'UPDATE_EVENT_ERROR';
export const updateEventError = error => ({
    type: UPDATE_EVENT_ERROR,
    error
});

export const updateEvent = (event) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/events/${event.id}`, {
        method: 'PUT',
        body: JSON.stringify(event),
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => dispatch(updateEventSuccess(data)))
        .catch(err => {
            dispatch(updateEventError(err));
        });
};

// // // // // // // // // //
//
//  DELETE EVENT
//
// // // // // // // // // //
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
export const deleteEventSuccess = events => ({
    type: DELETE_EVENT_SUCCESS,
    events
});

export const DELETE_EVENT_ERROR = 'DELETE_EVENT_ERROR';
export const deleteEventError = error => ({
    type: DELETE_EVENT_ERROR,
    error
});

export const deleteEvent = (eventId) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/events/${eventId}`, {
        method: 'DELETE',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => dispatch(deleteEventSuccess(data)))
        .catch(err => {
            dispatch(deleteEventError(err));
        });
};



