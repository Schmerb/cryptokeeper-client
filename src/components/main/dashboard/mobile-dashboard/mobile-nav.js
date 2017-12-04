import React from 'react';
import { Link } from 'react-router-dom';


import PortfolioBag from 'icons/portfolio-bag';
import TieAvatar from 'icons/tie-avatar';
import Events from 'icons/event-graph';
import GearWheel from 'icons/gear-wheel';

export default function MobileNav(props){
    return(
        <div className="mobile-nav">
            <ul className="mobile-nav-links">
                <li className={props.path.includes('portfolio') ? 'current' : ''}>
                    <Link to={'/dashboard/portfolio'}>
                        <div>
                            <PortfolioBag />
                        </div> 
                    </Link>
                </li>
                <li className={props.path.includes('events') ? 'current' : ''}>
                    <Link to={'/dashboard/events'}>
                        <div>
                            <Events />
                        </div>
                    </Link>
                </li>
                <li className={props.path.includes('avatar') ? 'current' : ''}>
                    <Link to={'/dashboard/avatar'}>
                        <div>
                            <TieAvatar />
                        </div>
                    </Link>
                </li>
                <li className={props.path.includes('settings') ? 'current' : ''}>
                    <Link to={'/dashboard/settings'}>
                        <div>
                            <GearWheel />
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    );
}