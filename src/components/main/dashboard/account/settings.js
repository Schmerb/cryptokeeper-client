import React from 'react';

import EditIcon from 'icons/edit-icon';

export default class Settings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tel: {
                disabled: true,
                value: "267-227-8357"
            },
            email: {
                disabled: true,
                value: "mikeschmerbeck@gmail.com"
            }
        };
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
                        <form action="#!">

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

                        </form>

                        <button className="confirm-btn" type="button">Confirm Changes</button>
                        <button className="delete-btn" type="button">Delete Account</button>
                    </div>
                </div>
            </div>
        );
    }
}