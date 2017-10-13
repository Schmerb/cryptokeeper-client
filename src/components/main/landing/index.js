import React from 'react';
import {connect} from 'react-redux';

import BoxSlider from './box-slider';
// import Box from './box';




export function Landing(props) {
    return (
        <section id="landing">
            {/* <h2>Currencies</h2> */}
            {/* <div className="landing-img"></div> */}
            <BoxSlider />
        </section>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Landing);



/* <section id="landing">
<h2>Currencies</h2>
<div className="top row">
    <Box side='left' currency="Bitcoin"/>
    <Box side='right' currency="Ethereum"/>
</div>
<div className="bottom row">
    <Box side='left' currency="Litecoin"/>
    <Box side='right' currency="Monero"/>
</div>
</section> */