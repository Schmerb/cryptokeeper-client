import React       from 'react';
import { connect } from 'react-redux';
import { Link }    from 'react-router-dom';

import { updateEvent } from 'actions/events';

import ArrowDown from 'icons/arrow-down';
import BackBtn   from 'icons/back-btn';

export class EditEventForm extends React.Component {
    constructor(props) {
        super(props);
        const { name, currency, type, condition, value, valueType, message, _id: id } = props.location.data;
        this.state = {
            name,   
            currency,
            condition,
            sms: type.sms,
            email: type.email,
            value,    
            valueType,
            message,
            id  
        };
    }

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Handles input changes
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    handleChange(e, field) {
        if(field === 'sms' || field === 'email') {
            this.setState({
                [field]: e.target.checked
            });
        } else {
            this.setState({
                [field]: e.target.value
            });
        }
    }

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Handles form submit
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    handleSubmit(e) {
        e.preventDefault();
        let name      = this.refs.name.value,
            currency  = this.refs.currency.value,
            sms       = this.refs.sms.checked,
            email     = this.refs.email.checked,
            condition = this.refs.condition.value,
            value     = this.refs.value.value,
            valueType = this.refs.valueType.value,
            message   = this.refs.message.value,
            id        = this.state.id;
        let data = {name, currency, type: {sms, email}, condition, value, valueType, message, id};
        if(!sms && !email) {
            // alert must pick either sms or email
            alert('You must choose an event type, SMS and/or Email');
        } else {
            this.props.addEvent(data);
            this.props.history.push({
                pathname: '/dashboard/events'
            });
        }
    }

    render() {
        return(
            <div className="event-form-container">
                <Link to={"/dashboard/events"}>
                    <BackBtn />
                </Link>
                <form action="#!" onSubmit={e => this.handleSubmit(e)}>
                <h2>Edit Event</h2>
                
                    <label htmlFor="event-name">
                        Event Name:
                        <input id="event-name" type="text" ref="name" required 
                               value={this.state.name} onChange={e => this.handleChange(e, 'name')}/>
                    </label>

                    <label htmlFor="event-currency">
                        Currency:
                        <select name="" id="event-currency" ref="currency"  
                                value={this.state.currency} onChange={e => this.handleChange(e, 'currency')}>
                            <option value="BTC">BTC (Bitcoin)</option>
                            <option value="ETH">ETH (Ethereum)</option>
                            <option value="LTC">LTC (Litecoin)</option>
                            <option value="XMR">XMR (Monero)</option>
                            <option value="XRP">XRP (Ripple)</option>
                            <option value="DASH">DASH (DASH)</option>
                            <option value="DOGE">DOGE (Dogecoin)</option>
                        </select>
                        <ArrowDown />
                    </label>
                
                    <label htmlFor="event-type-field">
                        Type:
                        <fieldset id="event-type-field">

                            <label htmlFor="sms-checkbox">
                                <div className="switch">
                                    <input type="checkbox" name="" id="sms-checkbox" ref="sms" 
                                           checked={this.state.sms} onChange={e => this.handleChange(e, 'sms')}/>
                                    <span className="input-slider round"></span>
                                </div>
                                <span className="type-title">SMS Text Message</span>
                            </label>
                            <br />
                            <label htmlFor="email-checkbox">
                                <div className="switch">
                                    <input type="checkbox" name="" id="email-checkbox" ref="email"
                                           checked={this.state.email} onChange={e => this.handleChange(e, 'email')}/>
                                    <span className="input-slider round"></span>
                                </div>
                                <span className="type-title">Email</span>
                            </label>

                        </fieldset>
                    </label>

                    <label htmlFor="condition">
                        Condition:
                        <div className="cond-select-wrap">
                            <select name="" id="condition" ref="condition"
                                    value={this.state.condition} onChange={e => this.handleChange(e, 'condition')}>
                                <option value="reach">Reached value</option>
                                <option value="dropTo">Dropped to value</option>
                                <option value="increase">Increased By</option>
                                <option value="decrease">Decreased By</option>
                            </select>
                            <ArrowDown />
                        </div>
                        <div className="cond-value-type">
                            <input type="number" id="condition-value" ref="value" min="0" placeholder="value" 
                                   value={this.state.value} onChange={e => this.handleChange(e, 'value')} required/>
                            <select name="" id="value-type" ref="valueType"
                                    value={this.state.valueType} onChange={e => this.handleChange(e, 'valueType')}>
                                <option value="$">$</option>
                                <option value="%">%</option>
                            </select>
                        </div>
                    </label>

                    <label htmlFor="event-message">
                        Message:
                        <textarea ref="message" id="event-message" placeholder="Enter a message to notify yourself with when this event occurs..."
                                 value={this.state.message} onChange={e => this.handleChange(e, 'message')} required
                        ></textarea>
                    </label>
                
                    <button type="submit">UPDATE</button>

                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateEvent: (data) => dispatch(updateEvent(data))
});

export default connect(null, mapDispatchToProps)(EditEventForm);