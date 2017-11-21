import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { updateUser } from 'actions/protected-data';
import { flashMessage } from 'actions/display';

import { verifyCode, requestVerificationCode } from 'actions/twilio';

import BackBtn from 'icons/back-btn';


export class VerifyCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Dispatches action to verify code
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    handleSubmit = (e) => {
        e.preventDefault();
        // verify code
        const { _1, _2, _3, _4 } = this.refs;
        let code = `${_1.value}${_2.value}${_3.value}${_4.value}`;
        const { phoneNumber, email } = this.props.location.state;
        console.log(code, phoneNumber, email);
        this.props.verifyCode(phoneNumber, code, email)
            .then(res => {
                if(res.success) {
                    this.props.updateUser(phoneNumber, email);
                    this.props.history.push({
                        pathname: '/dashboard/settings'
                    });
                    this.props.flashMessage('Your phone number is now verified!');
                } else {
                    this.setState({
                        error: res.message
                    });
                }
            });
    }

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Dispatches action to resend verification code    
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    resendCode = e => {
        e.preventDefault();
        // get a new code
        const { phoneNumber } = this.props.location.state;
        this.props.requestVerificationCode(phoneNumber);
    };

    render() {
        console.log(this.props);
        
        return(
            <div className="code-verification-page">
                <Link className="back-btn" to={"/dashboard/settings"}>
                    <BackBtn />
                </Link>
                <div className="code-verification-modal">
                    <form action="" onSubmit={this.handleSubmit}>
                        <label className="confirm-codes">
                            <p>Enter Verification Code</p>
                            <input ref="_1" className="confirm-code" type="number" min={0} max={9} required/>
                            <input ref="_2" className="confirm-code" type="number" min={0} max={9} required/>
                            <input ref="_3" className="confirm-code" type="number" min={0} max={9} required/>
                            <input ref="_4" className="confirm-code" type="number" min={0} max={9} required/>
                        </label>
                        {this.state.error}
                        <div>
                            <button type="submit">Verify</button>
                            <button className="resend-code-btn" type="button" onClick={this.resendCode}>Resend Code</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    verifyCode: (phoneNumber, code, email) => dispatch(verifyCode(phoneNumber, code, email)),
    requestVerificationCode: (phoneNumber) => dispatch(requestVerificationCode(phoneNumber)),
    updateUser: (phoneNumber, email) => dispatch(updateUser({email, phoneNumber})),
    flashMessage: msg => dispatch(flashMessage(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyCode);