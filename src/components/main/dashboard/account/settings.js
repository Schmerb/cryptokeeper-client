import React from 'react';
import { connect } from 'react-redux';

import { updateUser, getUser } from 'actions/protected-data';

import EditIcon from 'icons/edit-icon';

export class Settings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tel: {
                disabled: true,
                value: props.phoneNumber
            }, 
            email: {
                disabled: true,
                value: props.email
            }
        };
    }

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // sets the local state when receiving non-empty email
    // and phoneNumber props
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    componentWillReceiveProps(nextProps) {
        if(nextProps.email !== '') {
            this.setState({
                email: {
                    disabled: true,
                    value: nextProps.email
                }
            });
        }
        if(nextProps.phoneNumber !== '' ) {
            this.setState({
                tel: {
                    disabled: true,
                    value: nextProps.phoneNumber
                }
            });
        } 
    }

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Updates input vlaues as user types
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    handleChange(e, input) {
        this.setState({
            [input]: {
                value: e.target.value
            }
        });
    }

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Handles form submittal to server
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    handleSubmit = (e) => {
        e.preventDefault();
        const email       = this.refs.email.value,
              phoneNumber = this.refs.tel.value;
        this.props.dispatch(updateUser({email, phoneNumber}));
    }

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Disables / enables inputs
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    handleClick(e, input) {
        this.setState({
            [input]: {
                disabled: !this.state[input].disabled
            }
        });
        const $this = this;
        setTimeout(function() {
            $this.refs[input].focus();
        }, 100);
    }

    render() {
        return(
            <div className="settings">
                <h2>Account Settings</h2>
                <div className="settings-box">
                    <div className="inner-container">
                        <form action="#!" onSubmit={this.handleSubmit}>

                            <label htmlFor="">
                                <span>My Number: </span>
                                <input type="tel" ref="tel" value={this.state.tel.value} disabled={this.state.tel.disabled}
                                        onChange={e => this.handleChange(e, 'tel')} />
                                <button type="button" className="edit-btn" onClick={e => this.handleClick(e, 'tel')}>
                                    <EditIcon /> 
                                </button>
                            </label>
                            <hr/>
                            <label htmlFor="">
                                <span>Email: </span>
                                <input type="email" ref="email" value={this.state.email.value} disabled={this.state.email.disabled}
                                        onChange={e => this.handleChange(e, 'email')}/>
                                <button type="button" className="edit-btn" onClick={e => this.handleClick(e, 'email')}>
                                    <EditIcon /> 
                                </button>
                            </label>

                            <button className="confirm-btn" type="submit">Confirm Changes</button>
                        </form>

                        <button className="delete-btn" type="button">Delete Account</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    email: state.protectedData.email,
    phoneNumber: state.protectedData.phoneNumber
});

export default connect(mapStateToProps)(Settings);