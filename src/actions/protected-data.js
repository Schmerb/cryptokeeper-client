import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const FETCH_PROTECTED_DATA_SUCCESS = 'FETCH_PROTECTED_DATA_SUCCESS';
export const fetchProtectedDataSuccess = data => ({
    type: FETCH_PROTECTED_DATA_SUCCESS,
    data
});
export const FETCH_PROTECTED_DATA_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
export const fetchProtectedDataError = error => ({
    type: FETCH_PROTECTED_DATA_ERROR,
    error
});

export const fetchProtectedData = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/protected`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({data}) => dispatch(fetchProtectedDataSuccess(data)))
        .catch(err => {
            dispatch(fetchProtectedDataError(err));
        });
};

// // // // // // // // // //
//
//  ACCOUNT SETTINGS
//
// // // // // // // // // //

//
// Updates Users email/phonenumber
//
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const updateUserSuccess = (data) => ({
    type: UPDATE_USER_SUCCESS,
    email: data.email,
    phoneNumber: data.phoneNumber
});
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';
export const updateUserError = (error) => ({
    type: UPDATE_USER_ERROR,
    error
});

export const updateUser = (updateData) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/users/me/settings`, {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => dispatch(updateUserSuccess(data)))
        .catch(err => {
            console.log('ERROR: ', err);
            dispatch(updateUserError(err));
        });
};

//
// Get User Data
//
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const getUserSuccess = (user) => ({
    type: GET_USER_SUCCESS,
    user
});
export const GET_USER_ERROR = 'GET_USER_ERROR';
export const getUserError = (error) => ({
    type: GET_USER_ERROR,
    error
});

export const getUser = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/users/me/`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => dispatch(getUserSuccess(data)))
        .catch(err => {
            console.log(err);
            // dispatch(getUserError(err));
        });
};

// // // // // // // // // // //
//
//  User Avatar
//
// // // // // // // // // // //

//
// Uploads user's image for profile avatar
//
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const updateImageSuccess = (image) => ({
    type: UPLOAD_IMAGE_SUCCESS,
    image
});
export const UPLOAD_IMAGE_ERROR = 'UPLOAD_IMAGE_ERROR';
export const updateImageError = (error) => ({
    type: UPLOAD_IMAGE_ERROR,
    error
});
export const uploadImage = (image) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/users/me/avatar`, {
        method: 'POST',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            mimeType: 'multipart/form-data'
        },
        body: image
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => {
            dispatch(getUserAvatar());
        })
        .catch(err => {
            console.log(err);
            dispatch(updateImageError(err));
        });
};

export const GET_USER_AVATAR_SUCCESS = 'GET_USER_AVATAR_SUCCESS';
export const getUserAvatarSuccess = (avatar) => ({
    type: GET_USER_AVATAR_SUCCESS,
    avatar
});
export const GET_USER_AVATAR_ERROR = 'GET_USER_AVATAR_ERROR';
export const getUserAvatarError = (error) => ({
    type: GET_USER_AVATAR_ERROR,
    error
});
export const getUserAvatar = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/users/me/avatar`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((data) => {
        dispatch(getUserAvatarSuccess(data));
    })
    .catch(err => {
        // console.log(err);
        dispatch(getUserAvatarSuccess(null));
    });
}

// For fetching all avatar images to be displayed publicly 
export const GET_AVATAR_SUCCESS = 'GET_AVATAR_SUCCESS';
export const getAvatarSuccess = (data) => ({
    type: GET_AVATAR_SUCCESS,
    data
});
export const GET_AVATAR_ERROR = 'GET_AVATAR_ERROR';
export const getAvatarError = (error) => ({
    type: GET_AVATAR_ERROR,
    error
});
export const getAvatar = (imgId) => (dispatch, getState) => {
    return fetch(`${API_BASE_URL}/users/me/avatar/${imgId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((data) => dispatch(getAvatarSuccess(data)))
    .catch(err => {
        console.log(err);
        // dispatch(getUserError(err));
    });
}

// removes avatar image from users account 
export const removeAvatar = (imgId) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/users/me/avatar/${imgId}`, {
        method: 'DELETE',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
        }
    })
    .then((res) => dispatch(getUserAvatar())) // refreshes state with users current avatar, in this case it removes it
    .catch(err => {
        console.log('ERROR:');
        console.log(err);
        // dispatch(getUserError(err));
    });
}

export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';
export const clearUserData = () => ({
    type: CLEAR_USER_DATA
});


