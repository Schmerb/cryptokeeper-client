import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TopNav from './top-nav';
import Logo from './logo';



export class Header extends React.Component {


    render() {
        let classes = '';
        let path = this.props.location.pathname;
        if(path === '/dashboard') {
            classes = 'dash';
        }
        return(
            <header role="banner" className={classes}>
                <Logo path={path}/>
                <TopNav />
            </header>
        );
    }
}


const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    open: state.display.open
});

export default withRouter(connect(mapStateToProps)(Header));