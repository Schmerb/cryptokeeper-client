
//
// Side Menu Actions
//
export const TOGGLE_MENU = 'TOGGLE_MENU';
export const toggleMenu = () => ({
    type: TOGGLE_MENU
});

export const TOGGLE_LINKS = 'TOGGLE_LINKS';
export const toggleLinks = (open) => ({
    type: TOGGLE_LINKS,
    open
});

// Dashboard Menu 
export const DASH_HOVER_VR = 'DASH_HOVER_VR';
export const dashHoverVr = (item) => ({
    type: DASH_HOVER_VR,
    item
});

//
// Util Actions
//
export const SET_WIDTH = 'SET_WIDTH';
export const setWidth = (width) => ({
    type: SET_WIDTH,
    width
});

export const HAS_TOUCH = 'HAS_TOUCH';
export const hasTouch = (hasTouch) => ({
    type: HAS_TOUCH,
    hasTouch
});

//
// Flash Message Action
//
export const FLASH_MSG_CLASS = 'FLASH_MSG_CLASS';
export const flashMsgClass = (classname) => ({
    type: FLASH_MSG_CLASS,
    classname
});

//
// App actions
//
export const SET_BASE_CURRENCY = 'SET_BASE_CURRENCY';
export const setBaseCurrency = (currency) => ({
    type: SET_BASE_CURRENCY,
    currency
});
