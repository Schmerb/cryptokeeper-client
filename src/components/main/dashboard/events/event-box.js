import React from 'react';

import EditIcon from 'icons/edit-icon';

export default class EventBox extends React.Component {

    editEvent(e, data) {
        e.preventDefault();
        this.props.history.push({
            pathname: '/dashboard/events/edit-event',
            data: data
        });
    }

    render() {
        const data = this.props.data;
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
        return(
            <div className="event-box">
                <h2>{data.name}</h2>
                <ul>
                    <li>
                        <span className="title">Type:</span>
                        {data.sms ? 'SMS Text Message' : ''}
                        {data.sms && data.email ? ' / ' : ''}
                        {data.email ? 'Email' : ''}
                    </li>
                    {condition}
                    <li className="title">Message: {data.message}</li>
                </ul>
                
                <button className="edit-btn" type="button" onClick={e => this.editEvent(e, data)}>
                    <EditIcon />
                </button>
                <button className="delete-btn" type="button">DELETE</button>
            </div>
        );
    }
}