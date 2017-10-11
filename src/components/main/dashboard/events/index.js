import React     from 'react';
import { Route } from 'react-router-dom';

import Events    from './events';
import EventForm from './event-form';
import EditEventForm from './edit-event-form';

export default class EventsPage extends React.Component {
    render() {
        const path = '/dashboard/events';
        return(
            <section className="events">
                <Route exact path={path} component={Events} />
                <Route exact path={`${path}/add-event`} component={EventForm} />
                <Route exact path={`${path}/edit-event`} component={EditEventForm} />
            </section>
        );
    }
}