import React from 'react';
import { connect } from 'react-redux';

import { deleteEvent } from 'actions/events';

import EditIcon from 'icons/edit-icon';

export class EventBox extends React.Component {

    // * * * * * * * * * * * * * * * 
    // Opens up edit form
    // * * * * * * * * * * * * * * * 
    editEvent = (e, data) => {
        e.preventDefault();
        this.props.history.push({
            pathname: '/dashboard/events/edit-event',
            data: data
        });
    }

    // * * * * * * * * * * * * * * * 
    // Removes event from db
    // * * * * * * * * * * * * * * * 
    removeEvent = (e, id) => {
        this.props.deleteEvent(id);
    }

    render() {
        console.log('\n\nDATA: ', this.props.data);
        const data = this.props.data;
        let classes = data.successful ? 'successful': null;
        let condition = null;
        if(data.condition === 'reach') {
            condition = <li> 
                            <span className="title">Condition:</span>
                            <span>Price reaches ${data.value}</span>
                        </li>;
        } else {
            condition = <li>
                            <span className="title">Condition:</span>
                            <span>
                                Price {data.condition} by  
                                {data.valueType === '$' ? `$${data.value}`: `${data.value}%`}
                            </span>
                        </li>   
        }
        let success = null;
        if(data.successful) {
            success = <p className="success-msg">Successful Event!</p>;
        }
        return(
            <div className={`event-box ${classes}`} data-id={data._id}>
                <h2>{data.name}</h2>
                <ul>
                    <li>
                        <span className="title">Currency:</span>
                        <span>{data.currency}</span>
                    </li>
                    <li>
                        <span className="title">Type:</span>
                        <span>
                            {data.type.sms ? 'SMS Text Message' : ''}
                            {data.type.sms && data.type.email ? ' / ' : ''}
                            {data.type.email ? 'Email' : ''}
                        </span>
                    </li>
                    {condition}
                    <li>
                        <span className="title">Message:</span> 
                        <span className="event-msg">
                            {data.message}
                        </span>
                    </li>
                </ul>
                {success}    
                <button className="edit-btn" type="button" onClick={e => this.editEvent(e, data)}>
                    <EditIcon />
                </button>
                <button className="delete-btn" type="button" onClick={e => this.removeEvent(e, data._id)}>DELETE</button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    deleteEvent: (eventId) => dispatch(deleteEvent(eventId))
});

export default connect(null, mapDispatchToProps)(EventBox);

