import React from 'react';
import {connect} from 'react-redux';

import BoxSlider from './box-slider';
// import Box from './box';




export function Landing(props) {
    return (
        <section id="landing">
            <BoxSlider />
        </section>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Landing);
