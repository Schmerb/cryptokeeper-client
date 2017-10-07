import { 
    TOGGLE_MENU, 
    TOGGLE_LINKS, 
    SET_WIDTH,
    FLASH_MSG_CLASS,
    DASH_HOVER_VR 
} from 'actions/display'

const initialState = {
    open: false,
    openLinks: false,
    width: window.innerWidth,
    flashMsgClass: '',
    item: ''
};

//
// Display Reducer
//
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_MENU:
            document.body.classList.toggle('no-scroll', !state.open);
            document.getElementsByTagName('html')[0].classList.toggle('no-scroll', !state.open);
            return Object.assign({}, state, {
                open: !state.open
            });
        case TOGGLE_LINKS:
            return Object.assign({}, state, {
                openLinks: action.open
            });
        case SET_WIDTH:
            return Object.assign({}, state, {
                width: action.width
            });
        case FLASH_MSG_CLASS:
            return Object.assign({}, state, {
                flashMsgClass: action.classname
            });
        case DASH_HOVER_VR:
            return Object.assign({}, state, {
                item: action.item
            });
        default:
            return state;
    }
}



