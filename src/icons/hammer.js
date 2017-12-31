import React from 'react';

export default function HammerIcon(props) {
    return(
        <svg className={props.className} onClick={props.onClick} role="img" aria-label="A hammer icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M46.6 34.7c-.4-3.6-.6-7.4 2.4-9.9 2.4-2 5.8-3.4 9-3.3 3.2 0 6 .2 6.9-1.2.9-1.3-.9-4.4-5.2-6.1-7.4-2.9-16.1-2-23.3 2.5-1.6 1-3.2 2.3-4.6 3.7-.5 0-1 .1-1.4.5l-6.8 6.8c-.6.6-.7 1.5-.3 2.2.7 2.7-.3 4.9-2.1 6.8-.8.8-2.7.7-3.8.9-.8.1-1.6.5-2.1 1.1l-4.6 4.6c-.7.7-.7 1.8.1 2.6L21.9 57c.7.7 1.9.8 2.6.1l4.6-4.6c.6-.6 1-1.3 1.1-2.1.1-1 .1-2.4.5-3.3 1-2 5-3.9 7.1-2.7.7.4 1.6.3 2.2-.3l6.8-6.8c.4-.8.5-1.9-.2-2.6zM87.7 76.1L47.8 38.4l-6.9 6.9 37.7 39.9c2.7 2.8 7 3.1 9.6.5 2.6-2.6 2.4-6.9-.5-9.6z"/></svg>
    );
}