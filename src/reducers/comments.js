// // // // // // // // // // // // // // 
// 
//  Comments REDUCER
//
// // // // // // // // // // // // // // 

import { 
    ADD_COMMENT_SUCCESS, 
    ADD_COMMENT_ERROR,
    ADD_REPLY_COMMENT_SUCCESS,
    ADD_REPLY_COMMENT_ERROR,
    GET_COMMENTS_SUCCESS, 
    GET_COMMENTS_ERROR,
    LIKE_COMMENT_SUCCESS,
    LIKE_COMMENT_ERROR,
    DISLIKE_COMMENT_SUCCESS,
    DISLIKE_COMMENT_ERROR,
    LIKE_REPLY_COMMENT_SUCCESS,
    LIKE_REPLY_COMMENT_ERROR,
    DISLIKE_REPLY_COMMENT_SUCCESS,
    DISLIKE_REPLY_COMMENT_ERROR
} from 'actions/comments';

import {
    GET_AVATAR_SUCCESS
} from 'actions/protected-data'

const initialState = {
    comments: [],
    error: null
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case ADD_COMMENT_SUCCESS: {
            return {
                ...state,
                comments: [...state.comments, action.comment],
                error: null
            };
        }
        case ADD_COMMENT_ERROR:
            return {...state, error: action.error};
        case ADD_REPLY_COMMENT_SUCCESS: 
            return findCommentAndAddReplyComment(state, action);
        case ADD_REPLY_COMMENT_ERROR:
            return {...state, error: action.error};
        case GET_COMMENTS_SUCCESS:
            return {...state, comments: action.comments, error: null}
        case GET_COMMENTS_ERROR:
            return {...state, error: action.error};
        case LIKE_COMMENT_SUCCESS:
            return findAndUpdateCommentInState(state, action);
        case LIKE_COMMENT_ERROR:
            return {...state, error: action.error};
        case DISLIKE_COMMENT_SUCCESS:
            return findAndUpdateCommentInState(state, action);
        case DISLIKE_COMMENT_ERROR:
            return {...state, error: action.error};
        case LIKE_REPLY_COMMENT_SUCCESS:
            return findAndUpdateReplyCommentInState(state, action);
        case LIKE_REPLY_COMMENT_ERROR:
            return {...state, error: action.error};
        case DISLIKE_REPLY_COMMENT_SUCCESS:
            return findAndUpdateReplyCommentInState(state, action);
        case DISLIKE_REPLY_COMMENT_ERROR:
            return {...state, error: action.error};
        case GET_AVATAR_SUCCESS:
            return findAndUpdateCommentWithAvatar(state, action);
        default:
            return state;
    }
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Takes in state and action as args.
// loops through comments to find the comment that needs to
// be updated / replaced.
// returns a new object containing the state with the
// appropriate comment updated
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function findAndUpdateCommentInState(state, action) {
    return {
        ...state,
        comments: state.comments.map(comment => {
            if(comment.id === action.comment.id ) {
                if(comment.avatarUrl) {
                    action.comment.avatarUrl = comment.avatarUrl; // apply avatarUrl from state to updated comment
                    action.comment.replyComments = comment.replyComments; // use state data with avatarUrls
                }
                return action.comment;
            } 
            return comment;
        }),
        error: null
    };
}

function findCommentAndAddReplyComment(state, action) {
    // 1) Grab the last comment in the replycomments array
    // 2) Add the avatarUrl to it
    // 3) append it to the current state 
    //      a) use commentID to find the correct comment
    //      b) append replyComment to end of this comment's replyComments array
    const { comment, getState } = action;
    const commentID = comment.id;
    const replyComments = comment.replyComments;
    const newReplyComment = replyComments[replyComments.length - 1]; // grab newest replyComment
    const avatar = getState().protectedData.avatar;
    const avatarUrl = avatar ? avatar.url : null;
    newReplyComment.avatarUrl = avatarUrl; // add avatarUrl to new reply comment
    return {
        ...state,
        error: null,
        comments: state.comments.map(comment => {
            if(comment.id === commentID) {
                return {
                    ...comment,
                    replyComments: [...comment.replyComments, newReplyComment]
                };
            }
            return comment;
        })
    };
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Loops through to find the correct reply comment
// that needs to update
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function findAndUpdateReplyCommentInState(state, action) {
    // 1) loop through api comment res to find the updated replyComment
    // 2) loop through state and find old replyComment 
    //              a) add old replyComment avatarUrl to new replyComment
    //              b) swap new replyComment with old replyComment
    // 3) return new state
    let { comment, commentID, replyCommentID } = action;
    let updatedReplyComment = comment.replyComments.find(replyComment => {
        return replyComment.id === replyCommentID;
    });
    return {
        ...state,
        error: null,
        comments: state.comments.map(comment => {
            if(comment.id === commentID) {
                return {
                    ...comment,
                    replyComments: comment.replyComments.map(replyComment => {
                        if(replyComment.id === replyCommentID) {
                            updatedReplyComment.avatarUrl = replyComment.avatarUrl;
                            return updatedReplyComment;
                        }
                        return replyComment;
                    })
                };   
            }
            return comment;
        })
    };
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Finds the comment the avatar image belongs to and adds
// the avatarUrl to that comment/replyComment
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function findAndUpdateCommentWithAvatar(state, action) {
    return {
            ...state,
            error: null,
            comments: state.comments.map(comment => {
                if(comment.author.avatar === action.data.avatarId) {
                    comment = {
                        ...comment,
                        avatarUrl: action.data.url
                    };
                } 
                comment = {
                    ...comment,
                    replyComments: comment.replyComments.map(replyComment => {
                        if(replyComment.author.avatar === action.data.avatarId) {
                            replyComment = {
                                ...replyComment,
                                avatarUrl: action.data.url
                            };
                        }
                        return replyComment;
                    })
                };
                return comment;
            })
        };
}