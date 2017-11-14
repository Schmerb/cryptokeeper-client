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
    GET_COMMENTS_ERROR
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
        case ADD_REPLY_COMMENT_SUCCESS: {
            return {
                ...state,
                comments: [...state.comments, action.replyComment],
                error: null
            };
        }
        case ADD_REPLY_COMMENT_ERROR:
            return {...state, error: action.error};
        case GET_COMMENTS_SUCCESS:
            return {...state, comments: action.comments, error: null}
        case GET_COMMENTS_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
};