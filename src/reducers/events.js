import { 
    GET_EVENTS_SUCCESS,
    GET_EVENTS_ERROR,
    ADD_EVENT_SUCCESS,
    ADD_EVENT_ERROR,
    UPDATE_EVENT_SUCCESS,
    UPDATE_EVENT_ERROR,
    DELETE_EVENT_SUCCESS,
    DELETE_EVENT_ERROR,
    CLEAR_EVENTS_STATE
} from 'actions/events'


const initialState = {
    events: [],
    error: null
};

const resetState = initialState;

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_EVENTS_SUCCESS:
            return {...state, events: action.event};
        case GET_EVENTS_ERROR:
            return {...state, error: action.error}
        case ADD_EVENT_SUCCESS:
            return {...state, events: [...state.events, action.event]};
        case ADD_EVENT_ERROR:
            return {...state, error: action.error}
        case UPDATE_EVENT_SUCCESS:
            return {...state, events: action.events};
        case UPDATE_EVENT_ERROR:
            return {...state, error: action.error}
        case DELETE_EVENT_SUCCESS:
            return {...state, events: action.events};
        case DELETE_EVENT_ERROR:
            return {...state, error: action.error}
        case CLEAR_EVENTS_STATE:
            return resetState;
        default:
            return state;
    }
}