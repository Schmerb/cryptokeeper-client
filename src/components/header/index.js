import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
    setYPos,
    setBaseYPos,
    setDownBaseYPos,
    setUpDirection
} from 'actions/display';

import TopNav from './top-nav';
import Logo from './logo';



export class Header extends React.Component {
    componentDidMount() {
        this.listenForScroll();
    }

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Fixes nav bar on upwards scroll
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    listenForScroll() {
        window.addEventListener('scroll', () => {
            const { yPos, up } = this.props; //downBaseYPos
            const prevYPos = yPos;
            const current  = window.pageYOffset;
            // if current yPos is less than previous, scrolling upwards
            if(current <= prevYPos) {
                // console.log('scrolling upwards!');
                // just started going up, keep track of beginning of upwards distance
                if(up === false) {
                    this.props.dispatch(setBaseYPos(current));
                    this.props.dispatch(setUpDirection(true));
                }
            } else { // scrolling downwards
                // console.log('scrolling DOWNWARDS!');
                // just started going dowm, keep track of beginning of downwards distance
                if(up === true) {
                    this.props.dispatch(setDownBaseYPos(current))
                    this.props.dispatch(setUpDirection(false));
                }
                // this.props.dispatch(setBaseYPos(0));
            }
            this.props.dispatch(setYPos(current));
        });
    }

    render() {
        const { up, baseYPos, width, openLinks } = this.props;
        const { pathname } = this.props.location;
        let current   = window.pageYOffset;
        let fixed     = '',
            initFixed = '',
            show      = '';
        if(width < 805) {
            if(current > 150) {
                initFixed = 'initFixed';
                if(current > 200) {
                    fixed = 'fixed';
                }
            }
            if(up) {
                if(baseYPos - current >= 20) {
                    show = 'show';
                }
            }
        }
        let dash = pathname === '/dashboard' ? 'dash' : '';
        let classes = `${openLinks ? 'open':''} ${initFixed} ${fixed} ${show} ${dash}`;
        if(pathname === '/chat/room') {
            classes = `${openLinks ? 'open':''}`;
        }
        return(
            <header role="banner" className={classes}>
                <Logo path={pathname}/>
                <TopNav />
            </header>
        );
    }
}


const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    open: state.display.open,
    openLinks: state.display.openLinks,
    width: state.display.width,
    up: state.display.up,
    yPos: state.display.yPos,
    baseYPos: state.display.baseYPos,
    downBaseYPos: state.display.downBaseYPos
});

export default withRouter(connect(mapStateToProps)(Header));