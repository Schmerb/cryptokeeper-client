// // // // // // // // // // // // // // 
// 
//  Comments ACTIONS
//
// // // // // // // // // // // // // // 

import { API_BASE_URL } from 'config';
import { normalizeResponseErrors } from './utils';


export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const getCommentsSuccess = comments => ({
    type: GET_COMMENTS_SUCCESS,
    comments
});
export const GET_COMMENTS_ERROR = 'GET_COMMENTS_ERROR';
export const getCommentsError = error => ({
    type: GET_COMMENTS_ERROR,
    error
});
export const getComments = (currency) => (dispatch, getState) => {
    currency = currency.toLowerCase();
    return fetch(`${API_BASE_URL}/comments/currency/${currency}?full=true`, {
        method: 'GET'
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(res => dispatch(getCommentsSuccess(res.comments)));
};



//
// ADD COMMENT
//
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const addCommentSuccess = comment => ({
    type: ADD_COMMENT_SUCCESS,
    comment
});
export const ADD_COMMENT_ERROR = 'ADD_COMMENT_ERROR';
export const addCommentError = error => ({
    type: ADD_COMMENT_ERROR,
    error
});
export const addComment = (content, currency) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    console.log(content, currency);
    const commentObj = {
        currency,
        content,
        created: Date.now()
    };
    return fetch(`${API_BASE_URL}/comments/currency/${currency}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(commentObj)
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(comment => {
        comment.author = getState().auth.currentUser;
        console.log(comment);
        dispatch(addCommentSuccess(comment));
    });
};

//
// ADD REPLY COMMENT
//
export const ADD_REPLY_COMMENT_SUCCESS = 'ADD_REPLY_COMMENT_SUCCESS';
export const addReplyCommentSuccess = replyComment => ({
    type: ADD_REPLY_COMMENT_SUCCESS,
    replyComment
});
export const ADD_REPLY_COMMENT_ERROR = 'ADD_REPLY_COMMENT_ERROR';
export const addReplyCommentError = error => ({
    type: ADD_REPLY_COMMENT_ERROR,
    error
});
export const addReplyComment = (content, commentID, currency) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    console.log(content, commentID, currency);
    const commentObj = {
        content,
        currency
    };
    return fetch(`${API_BASE_URL}/comments/${commentID}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(commentObj)
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(replyComment => {
        replyComment.author = getState().auth.currentUser;
        console.log(replyComment);
        dispatch(addReplyCommentSuccess(replyComment));
    });
};


