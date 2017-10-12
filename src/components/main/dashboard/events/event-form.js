import React       from 'react';
import { connect } from 'react-redux';
import { Link }    from 'react-router-dom';

import { addEvent } from 'actions/events';

import ArrowDown from 'icons/arrow-down';
import BackBtn   from 'icons/back-btn';

export class EventForm extends React.Component {
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
            message   = this.refs.message.value;
        let data = {name, currency, sms, email, condition, value, valueType, message};
        this.props.addEvent(data);
        this.props.history.push({
            pathname: '/dashboard/events'
        });
    }
    
    render() {
        return(
            <div className="event-form-container">
                <Link to={"/dashboard/events"}>
                    <BackBtn />
                </Link>
                <form action="#!" onSubmit={e => this.handleSubmit(e)}>
                <h2>Add Event</h2>
                
                    <label htmlFor="event-name">
                        Event Name:
                        <input id="event-name" type="text" ref="name"/>
                    </label>

                    <label htmlFor="event-currency">
                        Currency:
                        <select name="" id="event-currency" ref="currency">
                            <option value="BTC">BTC (Bitcoin)</option>
                            <option value="ETH">ETH (Ethereum)</option>
                            <option value="LTC">LTC (Litecoin)</option>
                            <option value="XMR">XMR (Monero)</option>
                        </select>
                        <ArrowDown />
                    </label>
                
                    <label htmlFor="event-type-field">
                        Type:
                        <fieldset id="event-type-field">

                            <label htmlFor="sms-checkbox">
                                <div className="switch">
                                    <input type="checkbox" name="" id="sms-checkbox" ref="sms"/>
                                    <span className="input-slider round"></span>
                                </div>
                                <span className="type-title">SMS Text Message</span>
                            </label>
                            <br />
                            <label htmlFor="email-checkbox">
                                <div className="switch">
                                    <input type="checkbox" name="" id="email-checkbox" ref="email"/>
                                    <span className="input-slider round"></span>
                                </div>
                                <span className="type-title">Email</span>
                            </label>

                        </fieldset>
                    </label>

                    <label htmlFor="condition">
                        Condition:
                        <div className="cond-select-wrap">
                            <select name="" id="condition" ref="condition">
                                <option value="reach">Reached value</option>
                                <option value="increase">Increased By</option>
                                <option value="decrease">Decreased By</option>
                            </select>
                            <ArrowDown />
                        </div>
                        <div className="cond-value-type">
                            <input type="number" id="condition-value" min="0" placeholder="value" ref="value"/>
                            <select name="" id="value-type" ref="valueType">
                                <option value="$">$</option>
                                <option value="%">%</option>
                            </select>
                        </div>
                    </label>

                    <label htmlFor="event-message">
                        Message:
                        <textarea ref="message" id="event-message" placeholder="Enter a message to notify yourself with when this event occurs..."></textarea>
                    </label>
                
                    <button type="submit">ADD</button>

                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addEvent: (data) => dispatch(addEvent(data))
});

export default connect(null, mapDispatchToProps)(EventForm);