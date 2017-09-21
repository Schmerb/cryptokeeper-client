import React from 'react';
import {connect} from 'react-redux';

import TopNav from './top-nav';
import Logo from './logo';

export class Header extends React.Component {


    render() {
        return(
            <header role="banner">
                <Logo />
                <TopNav />
            </header>
        );
    }
}


const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    open: state.display.open
});

export default connect(mapStateToProps)(Header);