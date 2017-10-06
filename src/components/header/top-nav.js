import React from 'react';
import {connect} from 'react-redux';

import { WindowResizeListener } from 'react-window-resize-listener';
import { toggleMenu } from 'actions/display';

import Burger from './burger';
import Dim from '../dim';
import TopNavMenu from './top-nav-menu';

export class TopNav extends React.Component {

    // * * * * * * * * * * * * * * * * * * * *
    // Checks window on resize and hides 
    // sidemenu if currently opened
    // * * * * * * * * * * * * * * * * * * * *
    resize(windowSize) {
        let width  = windowSize.windowWidth;
        if(width >= 500 && this.props.open) {
                // this.props.toggleTheMenu();
                this.props.dispatch(toggleMenu());
        }
    }

    render() {
        return (
                <nav className="m-nav">
                    <WindowResizeListener onResize={windowSize => this.resize(windowSize)}/>
                    <Burger />
                    <Dim />
                    <TopNavMenu open={this.props.open} 
                                openLinks={this.props.openLinks}/>
                </nav>
        );
    }
}

const mapStateToProps = state => ({
    open: state.display.open,
    openLinks: state.display.openLinks
});

// const mapDispatchToProps = dispatch => ({
//     toggleTheMenu: () => dispatch(toggleMenu())
// });

export default connect(mapStateToProps)(TopNav);