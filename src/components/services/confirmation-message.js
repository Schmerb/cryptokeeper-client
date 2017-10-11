import React from 'react'
import { connect } from 'react-redux';

import { confirmMessage, confirmClass } from 'actions/display';

import { logUserOut } from 'services/user';

export class ConfirmMessage extends React.Component {

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

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Cancels logout, returns to dashboard
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    cancel() {
        let $this = this;
        this.props.dispatch(confirmClass(''));
        setTimeout(function() {
            $this.props.dispatch(confirmMessage(null));
        }, 300);
    }

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // dispatches action to close modal and log user out
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    confirm() {
        let $this = this;
        this.props.dispatch(confirmClass(''));
        setTimeout(function() {
            $this.props.dispatch(confirmMessage(null));
            logUserOut();
        }, 500);
    }

    render() {
        return(
            <div id="confirm-window" className={`confirmation ${this.props.confirmClass}`} onClick={e => this.handleWindowClick(e)}>
                <div className="confirmation-modal">
                    <h2>{this.props.question}</h2>
                    <div className="btn-group">
                        <button type="button" onClick={() => this.confirm()}>LogOut</button>
                        <button type="button" onClick={() => this.cancel()}>Nevermind</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
        confirmClass: state.display.confirmClass
});

export default connect(mapStateToProps)(ConfirmMessage);