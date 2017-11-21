import { 
    TOGGLE_MENU, 
    TOGGLE_LINKS,
    SET_Y_POS, 
    SET_BASE_Y_POS, 
    SET_DOWN_BASE_Y_POS,
    SET_UP_DIRECTION, 
    SET_CURRENT_PATH,
    SET_WIDTH,
    SET_HEIGHT,
    HAS_TOUCH,
    CONFIRM_MESSAGE,
    CONFIRM_CLASS,
    CONFIRM_REDIRECT,
    FLASH_MESSAGE,
    REMOVE_FLASH_MESSAGE,
    FLASH_MSG_CLASS,
    DASH_HOVER_VR
} from 'actions/display'

const initialState = {
        open: false,
        openLinks: false,
        yPos: 0,
        baseYPos: 0,
        downBaseYPos: 0,
        up: false,
        currentPath: '/',
        width: window.innerWidth,
        height: window.innerHeight,
        hasTouch: false,
        confirmMsg: null,
        confirmAction: null,
        confirmActionMsg: null,
        confirmClass: '',
        confirmPath: null,
        confirmPathMsg: null,
        flashMsg: null,
        flashClass: '',
        item: ''
};

//
// Display Reducer
//
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_MENU:
            document.body.classList.toggle('no-scroll', !state.open);
            document.getElementsByTagName('html')[0].classList.toggle('no-scroll-html', !state.open);
            return {...state, open: !state.open}
        case TOGGLE_LINKS:
            return {...state, openLinks: action.open};
        case SET_Y_POS:
            return {...state, yPos: action.yPos};
        case SET_BASE_Y_POS:
            return {...state, baseYPos: action.baseYPos};
        case SET_DOWN_BASE_Y_POS:
            return {...state, downBaseYPos: action.downBaseYPos};
        case SET_UP_DIRECTION:
            return {...state, up: action.up};
        case SET_WIDTH:
            return {...state, width: action.width};
        case SET_HEIGHT:
            return {...state, height: action.height};
        case SET_CURRENT_PATH:
            return {...state, currentPath: action.path};
        case HAS_TOUCH:
            return {...state, hasTouch: action.hasTouch};
        case CONFIRM_MESSAGE:
            return {
                ...state,
                confirmMsg: action.msg,
                confirmAction: action.action,
                confirmActionMsg: action.actionMsg
            };
        case CONFIRM_CLASS:
            return {...state, confirmClass: action.classname};
        case CONFIRM_REDIRECT:
            return {
                ...state, 
                confirmPath: action.path,
                confirmPathMsg: action.msg,
                confirmActionMsg: action.confirmActionMsg,
            };
        case FLASH_MESSAGE:
            return {...state, flashMsg: action.msg};
        case REMOVE_FLASH_MESSAGE:
            return {...state, flashMsg: null};
        case FLASH_MSG_CLASS:
            return {...state, flashClass: action.classname};
        case DASH_HOVER_VR:
            return {...state, item: action.item};
        default:
            return state;
    }
}



