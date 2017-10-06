import React from 'react';
import { connect } from 'react-redux';

export class Dim extends React.Component {

    render() {
        let classes = `${this.props.open ? 'open': ''}`;
        return (
            <div className={`dim ${classes}`} ref="dim"></div>
        );
    };
}

const mapStateToProps = state => ({
    open: state.display.open
});

export default connect(mapStateToProps)(Dim);