import React from 'react';
import {connect} from 'react-redux';

import { toggleMenu } from 'actions/display';

import Burger from './burger';
import Dim from '../dim';
import TopNavMenu from './top-nav-menu';



export class TopNav extends React.Component {

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Fires when component is about to receive new props
    // i.e. variable in state has been updated 
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    componentWillReceiveProps(nextProps) {
        if(nextProps.width !== this.props.width && nextProps.width >= 700 && this.props.open) {
            // this.props.toggleTheMenu();
            this.props.dispatch(toggleMenu());
        }
    }

    render() {
        let dim = this.props.open ? <Dim /> : null;
        return (
                <nav className="m-nav">
                    <Burger />
                    {dim}
                    <TopNavMenu open={this.props.open} 
                                openLinks={this.props.openLinks}/>
                </nav>
        );
    }
}

const mapStateToProps = state => ({
    open: state.display.open,
    openLinks: state.display.openLinks,
    width: state.display.width
});

// const mapDispatchToProps = dispatch => ({
//     toggleTheMenu: () => dispatch(toggleMenu())
// });

export default connect(mapStateToProps)(TopNav);