import { 
    ADD_EVENT
} from 'actions/events'

import { 
    loadEvents
 } from 'utils/local-storage';

const initialState = {
    events: loadEvents() || []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_EVENT:
            return Object.assign({}, state, {
                events: [...state.events, action.data]
            });
        default:
            return state;
    }
}