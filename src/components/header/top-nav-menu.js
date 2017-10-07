import React from 'react';
// import { connect } from 'react-redux';

import TopNavLinks from './top-nav-links';


export default function TopNavMenu(props)  {
    let classes = '';
    if(props.openLinks) {
        classes = 'openLinks';
    }
    return (   
            <ul className={`${classes} ${props.open ? 'open': ''}`}>
                <TopNavLinks />
            </ul>
    );
}
