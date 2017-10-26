import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';

import { login }        from 'actions/auth';
import { flashMessage } from 'actions/display';

import { required, nonEmpty } from 'utils/validators';
import Input from '../input';

import PersonIcon from 'icons/person';
import LockIcon from 'icons/lock';


export class LoginForm extends React.Component {

    componentDidMount() {
    }

    onSubmit(values) {
        return this.props
            .dispatch(login(values.username, values.password))
            .then(() => this.props.dispatch(flashMessage('Successfully logged in!')));
    }

    render() {
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }

        return (
            <form
                autoComplete="off"
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                {error}
                {/* <label htmlFor="username">Username</label> */}
                <div className="login-field">
                    <PersonIcon className="person-icon"/>
                    <Field
                        component={Input}
                        type="text"
                        name="username"
                        placeholder="Your username"
                        autoFocus
                        validate={[required, nonEmpty]}
                    />
                </div>
                {/* <label htmlFor="password">Password</label> */}
                <div className="login-field">
                    <LockIcon className="lock-icon"/>
                    <Field
                        component={Input}
                        type="password"
                        name="password"
                        placeholder="Your password"
                        validate={[required, nonEmpty]}
                    />
                </div>
                <button disabled={this.props.pristine || this.props.submitting}>
                    Log in
                </button>
            </form>
        );
    };
}


export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);