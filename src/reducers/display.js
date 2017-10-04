import { TOGGLE_MENU } from 'actions/display'

const initialState = {
    open: false
};


export default function reducer(state = initialState, action) {
    if(action.type === TOGGLE_MENU) {
        document.body.classList.toggle('no-scroll', !state.open);
        document.getElementsByTagName('html')[0].classList.toggle('no-scroll', !state.open);
        return Object.assign({}, state, {
            open: !state.open
        });
    } 
    return state;
}



