import React from 'react';
import { shallow } from 'enzyme';

import Main from 'components/main';


describe('<Main/>', () => {
    it('Renders without crashing', () => {
        shallow(<Main/>);
    });
});
