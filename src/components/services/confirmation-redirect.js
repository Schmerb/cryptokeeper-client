import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { confirmClass, confirmRedirect } from 'actions/display';

export class ConfirmRedirect extends React.Component {
    
    componentDidMount() {
        // console.log('componentDidMount');
        const $this = this;
        setTimeout(function() {
            $this.props.dispatch(confirmClass('fadeIn'));
        }, 10);
    }

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Cancels logout, returns to dashboard
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    handleWindowClick(e) {
        const $this = this;
        if(e.target.id === 'confirm-window') {
            $this.cancel();
        }
    }

    cancel() {
        let $this = this;
        this.props.dispatch(confirmClass(''));
        setTimeout(function() {
            $this.props.dispatch(confirmRedirect(null));
        }, 300);
    }
    
    confirm() {
        let $this = this;
        this.props.dispatch(confirmClass(''));
        setTimeout(function() {
            $this.props.history.push({
                pathname: $this.props.confirmPath
            });
            $this.props.dispatch(confirmRedirect(null));
        }, 500);
    }
    
    render() {
        // console.log(this.props);
        return(
            <div id="confirm-window" className={`confirmation ${this.props.confirmClass}`} onClick={e => this.handleWindowClick(e)}>
                <div className="confirmation-modal redirect-modal">
                    <h2>{this.props.confirmPathMsg}</h2>
                    <div className="btn-group">
                        <button type="button" onClick={() => this.confirm()}>{this.props.confirmActionMsg}</button>
                        <button type="button" onClick={() => this.cancel()}>I'll do it later</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    confirmClass: state.display.confirmClass,
    confirmPath: state.display.confirmPath,
    confirmPathMsg: state.display.confirmPathMsg,
    confirmActionMsg: state.display.confirmActionMsg
    // confirmAction: state.display.confirmAction,
});

export default withRouter(connect(mapStateToProps)(ConfirmRedirect));

