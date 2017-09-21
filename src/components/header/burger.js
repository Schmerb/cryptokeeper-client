import React from 'react';
import {connect} from 'react-redux';

import {toggleMenu} from '../../actions/display';

export class Burger extends React.Component {

    // * * * * * * * * * * * * * * * * * * * *
    // Toggles side menu and prevents user 
    // scroll on body
    // * * * * * * * * * * * * * * * * * * * *
    open(e) {
        e.preventDefault();
        this.props.dispatch(toggleMenu());
    }

    render() {
        let classes = `burger ${this.props.open ? 'open': ''}`;
        return(
            <button className="burger-btn" onClick={e => this.open(e)}>
                <div className={classes}></div>
            </button>
        );
    };
}

const mapStateToProps = state => ({
    open: state.display.open
});

export default connect(mapStateToProps)(Burger);