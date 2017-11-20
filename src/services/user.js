import store from 'store';

import { clearState } from 'services/hydrate-state';
import { clearAuthToken } from 'utils/local-storage';
import { 
    setCurrentUser, 
    setAuthToken 
} from 'actions/auth';
import { flashMessage } from 'actions/display';
import { deleteUser } from 'actions/users';
import { clearUserData } from 'actions/protected-data';

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Logs current user out and removes auth token from 
// localStorage and store
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export function logUserOut(msg = 'Successfully logged out!') {
    store.dispatch(setCurrentUser(null));
    store.dispatch(setAuthToken(null));
    store.dispatch(flashMessage(msg));
    store.dispatch(clearUserData());
    clearAuthToken();
    clearState();
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// dispatches action to remove user from db and also
// clears auth token from store/localStorage
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export function deleteCurrentUser() {
    store.dispatch(deleteUser());
    logUserOut('Successfully closed your account. Come back soon!');
}
