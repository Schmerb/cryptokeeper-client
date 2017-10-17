import { 
    createStore, 
    applyMiddleware, 
    combineReducers 
} from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';

import { setAuthToken }  from 'actions/auth';
import { loadAuthToken } from 'utils/local-storage';

import authReducer          from 'reducers/auth';
import protectedDataReducer from 'reducers/protected-data';
import displayReducer       from 'reducers/display';
import chatReducer          from 'reducers/chat';
import cryptoReducer        from 'reducers/crypto';
import currencyReducer      from 'reducers/currency';
import eventsReducer        from 'reducers/events';

import cryptoService from 'services/crypto-stream';
import chatService   from 'services/chat-stream';
import persistState  from 'services/persist-state';

const store = createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer,
        protectedData: protectedDataReducer,
        display: displayReducer,
        chat: chatReducer,
        crypto: cryptoReducer,
        currency: currencyReducer,
        events: eventsReducer   
    }),
    applyMiddleware(thunk)
);

// Opens socket.IO connection and updates store
// on data received
cryptoService(store);

// Opens Socket.IO connection and updates store
// when messages sent/received
chatService(store);

// Subscribes to store and saves updated state in localStorage
persistState(store);

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    // console.log('setting auth token');
    store.dispatch(setAuthToken(token));
}

// FETCH PREV STATE FROM LocalStorage

// Eventually, hydrate state based off of user account MongoDB data!!!!

export default store;