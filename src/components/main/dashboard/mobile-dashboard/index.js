import React from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PortfolioBag from 'icons/portfolio-bag';
import TieAvatar from 'icons/tie-avatar';
import Events from 'icons/event-graph';
import GearWheel from 'icons/gear-wheel';

export default function MobileDashboard(props){
    return(
        <div className="mobile-dashboard">
            <ul className="mobile-links">
                <li>
                    <Link to={'/dashboard/portfolio'}>
                        <div>
                            <PortfolioBag />
                            <span>My Portfolio</span> 
                        </div> 
                    </Link>
                </li>
                <li>
                    <Link to={'/dashboard/events'}>
                        <div>
                            <Events />
                            <span>Events</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to={'/dashboard/avatar'}>
                        <div>
                            <TieAvatar />
                            <span>Avatar</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to={'/dashboard/settings'}>
                        <div>
                            <GearWheel />
                            <span>Settings</span>
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    );
}