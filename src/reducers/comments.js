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
            return findAndUpdateCommentInState(state, action);
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
            return findAndUpdateCommentInState(state, action);
        case LIKE_REPLY_COMMENT_ERROR:
            return {...state, error: action.error};
        case DISLIKE_REPLY_COMMENT_SUCCESS:
            return findAndUpdateCommentInState(state, action);
        case DISLIKE_REPLY_COMMENT_ERROR:
            return {...state, error: action.error};
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
        comments: state.comments.map(comment => 
            comment.id === action.comment.id ? 
                action.comment : 
                comment
        ),
        error: null
    };
}