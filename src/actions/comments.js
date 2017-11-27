// // // // // // // // // // // // // // 
// 
//  Comments ACTIONS
//
// // // // // // // // // // // // // // 

import { API_BASE_URL } from 'config';
import { normalizeResponseErrors } from './utils';

//
// GET comments
//
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
        .then(res => dispatch(getCommentsSuccess(res.comments)))
        .catch(err => console.log({message: 'Internal server error', err}));
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
    console.log('Inside Action');
    console.log({content, currency});
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
        comment.avatarUrl = getState().protectedData.avatar.url;
        console.log('\n\nAction RES', comment);
        dispatch(addCommentSuccess(comment));
    });
};

//
// ADD REPLY COMMENT
//
export const ADD_REPLY_COMMENT_SUCCESS = 'ADD_REPLY_COMMENT_SUCCESS';
export const addReplyCommentSuccess = (comment) => ({
    type: ADD_REPLY_COMMENT_SUCCESS,
    comment
});
export const ADD_REPLY_COMMENT_ERROR = 'ADD_REPLY_COMMENT_ERROR';
export const addReplyCommentError = error => ({
    type: ADD_REPLY_COMMENT_ERROR,
    error
});
export const addReplyComment = (content, commentID, currency) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    // console.log({content, commentID, currency});
    const commentObj = {
        content,
        currency,
        parentComment: commentID
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
    .then(comment => {
        const currentUser = getState().auth.currentUser;
        const avatarUrl   = getState().protectedData.avatar.url;
        comment = {
            ...comment,
            replyComments: comment.replyComments.map(replyComment => {
                if(replyComment.author.id === currentUser.id) {
                    replyComment.avatarUrl = avatarUrl;
                }
                return replyComment;
            })
        };
        dispatch(addReplyCommentSuccess(comment));
    });
};


//
//  LIKE COMMENTS
//
export const LIKE_COMMENT_SUCCESS =  'LIKE_COMMENT_SUCCESS';
export const likeCommentSuccess = (comment) => ({
    type: LIKE_COMMENT_SUCCESS,
    comment
});
export const LIKE_COMMENT_ERROR = 'LIKE_COMMENT_ERROR';
export const likeCommentError = error => ({
    type: LIKE_COMMENT_ERROR,
    error
});
export const likeComment = (commentID) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/comments/${commentID}/likes`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(comment => dispatch(likeCommentSuccess(comment)));
};
//
// DISLIKE COMMENTS
//
export const DISLIKE_COMMENT_SUCCESS =  'DISLIKE_COMMENT_SUCCESS';
export const dislikeCommentSuccess = (comment) => ({
    type: DISLIKE_COMMENT_SUCCESS,
    comment
});
export const DISLIKE_COMMENT_ERROR = 'DISLIKE_COMMENT_ERROR';
export const dislikeCommentError = error => ({
    type: DISLIKE_COMMENT_ERROR,
    error
});
export const dislikeComment = (commentID) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/comments/${commentID}/dislikes`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(comment => dispatch(dislikeCommentSuccess(comment)));
};

//
//  LIKE  ~ REPLY ~ COMMENTS
//
export const LIKE_REPLY_COMMENT_SUCCESS =  'LIKE_REPLY_COMMENT_SUCCESS';
export const likeReplyCommentSuccess = (comment) => ({
    type: LIKE_REPLY_COMMENT_SUCCESS,
    comment
});
export const LIKE_REPLY_COMMENT_ERROR = 'LIKE_REPLY_COMMENT_ERROR';
export const likeReplyCommentError = error => ({
    type: LIKE_REPLY_COMMENT_ERROR,
    error
});
export const likeReplyComment = (commentID, replyCommentID) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/comments/${commentID}/comments/${replyCommentID}/likes`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(comment => dispatch(likeReplyCommentSuccess(comment)));
};
//
//  DISLIKE  ~ REPLY ~ COMMENTS
//
export const DISLIKE_REPLY_COMMENT_SUCCESS =  'DISLIKE_REPLY_COMMENT_SUCCESS';
export const dislikeReplyCommentSuccess = (comment) => ({
    type: DISLIKE_REPLY_COMMENT_SUCCESS,
    comment
});
export const DISLIKE_REPLY_COMMENT_ERROR = 'DISLIKE_REPLY_COMMENT_ERROR';
export const dislikeReplyCommentError = error => ({
    type: DISLIKE_REPLY_COMMENT_ERROR,
    error
});
export const dislikeReplyComment = (commentID, replyCommentID) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/comments/${commentID}/comments/${replyCommentID}/dislikes`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(comment => dispatch(dislikeReplyCommentSuccess(comment)));
};


