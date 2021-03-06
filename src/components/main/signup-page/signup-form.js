import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';

import { registerUser } from 'actions/users';
import { login }        from 'actions/auth';
import { flashMessage, confirmRedirect } from 'actions/display';
import Input from '../input';
import { required, nonEmpty, matches, length, isTrimmed, email } from 'utils/validators';


export class SignupForm extends React.Component {

    componentDidMount() {
    }

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Dispatches action to reigster user, log user in, and
    // then flash success message
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    onSubmit(values) {
        const {email, username, password, firstName, lastName} = values;
        const user = {email, username, password, firstName, lastName};
        const confirmMsg = 'Would you like to enter your phone number in order to receive text notifications?';
        const confirmActionMsg = 'Go to Settings';
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)))
            .then(() => this.props.dispatch(flashMessage('Successfully registered!')))
            .then(() => this.props.dispatch(confirmRedirect('/dashboard/settings', confirmMsg, confirmActionMsg)));
    }
    
    
    render() {
        return (
            <form
                className="signup-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                {/* <label htmlFor="firstName">First name</label> */}
                <Field component={Input} type="text" 
                        name="firstName" placeholder="First Name" autoFocus/>
                {/* <label htmlFor="lastName">Last name</label> */}
                <Field component={Input} type="text" 
                        name="lastName" placeholder="Last Name"/>

                {/* <label htmlFor="email">Email</label> */}
                <Field
                    component={Input}
                    type="text"
                    name="email"
                    placeholder="Your Email"
                    
                    validate={[required, nonEmpty, email]}
                />

                {/* <label htmlFor="username">Username</label> */}
                <Field
                    component={Input}
                    type="text"
                    name="username"
                    placeholder="A username"
                    className=""
                    validate={[required, nonEmpty, isTrimmed]}
                />

                {/* <label htmlFor="password">Password</label> */}
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    placeholder="A password"
                    validate={[required, length({min: 10, max: 72}), isTrimmed]}
                />

                {/* <label htmlFor="passwordConfirm">Confirm password</label> */}
                <Field
                    component={Input}
                    type="password"
                    name="passwordConfirm"
                    placeholder="Re-type password"
                    validate={[required, nonEmpty, matches('password')]}
                />

                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Get Started
                </button>
            </form>
        );
    };
}

export default reduxForm({
    form: 'signup',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('signup', Object.keys(errors)[0]))
})(SignupForm);
