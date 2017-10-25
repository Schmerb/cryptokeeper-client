import store from 'store';

import { clearState } from 'services/hydrate-state';
import { clearAuthToken } from 'utils/local-storage';
import { 
    setCurrentUser, 
    setAuthToken 
} from 'actions/auth';
import { flashMessage } from 'actions/display';


export function logUserOut() {
    store.dispatch(setCurrentUser(null));
    store.dispatch(setAuthToken(null));
    store.dispatch(flashMessage('Successfully logged out!'));
    clearAuthToken();
    clearState();
}