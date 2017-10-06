export const TOGGLE_MENU = 'TOGGLE_MENU';
export const toggleMenu = () => ({
    type: TOGGLE_MENU
});


export const TOGGLE_LINKS = 'TOGGLE_LINKS';
export const toggleLinks = (open) => ({
    type: TOGGLE_LINKS,
    open
});
