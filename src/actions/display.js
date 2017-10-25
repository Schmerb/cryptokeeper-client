
// // // // // // // // // //
//
// Banner actions
//
// // // // // // // // // //
export const SET_Y_POS = 'SET_Y_POS';
export const setYPos = yPos => ({
    type: SET_Y_POS,
    yPos
});
export const SET_BASE_Y_POS = 'SET_BASE_Y_POS';
export const setBaseYPos = baseYPos => ({
    type: SET_BASE_Y_POS,
    baseYPos
});
export const SET_DOWN_BASE_Y_POS = 'SET_DOWN_BASE_Y_POS';
export const setDownBaseYPos = downBaseYPos => ({
    type: SET_DOWN_BASE_Y_POS,
    downBaseYPos
});
export const SET_UP_DIRECTION = 'SET_UP_DIRECTION';
export const setUpDirection = up => ({
    type: SET_UP_DIRECTION,
    up
});


// // // // // // // // // //
//
// Side Menu Actions
//
// // // // // // // // // //
export const TOGGLE_MENU = 'TOGGLE_MENU';
export const toggleMenu = () => ({
    type: TOGGLE_MENU
});
export const TOGGLE_LINKS = 'TOGGLE_LINKS';
export const toggleLinks = (open) => ({
    type: TOGGLE_LINKS,
    open
});


// // // // // // // // // //
//
// Dashboard
//
// // // // // // // // // //
export const DASH_HOVER_VR = 'DASH_HOVER_VR';
export const dashHoverVr = (item) => ({
    type: DASH_HOVER_VR,
    item
});


// // // // // // // // // //
//
// Util Actions
//
// // // // // // // // // //
export const SET_CURRENT_PATH = 'SET_CURRENT_PATH';
export const setCurrentPath = (path) => ({
    type: SET_CURRENT_PATH,
    path
});
export const SET_WIDTH = 'SET_WIDTH';
export const setWidth = (width) => ({
    type: SET_WIDTH,
    width
});
export const SET_HEIGHT = 'SET_HEIGHT';
export const setHeight = (height) => ({
    type: SET_HEIGHT,
    height
});
export const HAS_TOUCH = 'HAS_TOUCH';
export const hasTouch = (hasTouch) => ({
    type: HAS_TOUCH,
    hasTouch
});


// // // // // // // // // //
//
// Flash Message Action
//
// // // // // // // // // //
export const FLASH_MESSAGE = 'FLASH_MESSAGE';
export const flashMessage = msg => ({
    type: FLASH_MESSAGE,
    msg: msg
});
export const REMOVE_FLASH_MESSAGE = 'REMOVE_FLASH_MESSAGE';
export const removeFlashMessage = () => ({
    type: REMOVE_FLASH_MESSAGE
});
export const FLASH_MSG_CLASS = 'FLASH_MSG_CLASS';
export const flashMsgClass = (classname) => ({
    type: FLASH_MSG_CLASS,
    classname
});
export const CONFIRM_MESSAGE = 'CONFIRM_MESSAGE';
export const confirmMessage = msg => ({
    type: CONFIRM_MESSAGE,
    msg
});
export const CONFIRM_CLASS = 'CONFIRM_CLASS';
export const confirmClass = classname => ({
    type: CONFIRM_CLASS,
    classname
});


