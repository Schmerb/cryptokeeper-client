import React from 'react';
import { shallow } from 'enzyme';

import App from 'components/app';


describe('<App/>', () => {
    it('Renders without crashing', () => {
        shallow(<App/>);
    });
});

