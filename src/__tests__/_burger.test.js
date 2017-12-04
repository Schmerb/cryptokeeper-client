import React from 'react';
import { shallow, mount } from 'enzyme';

import { Burger } from 'components/header/burger';

const mockToggleMenu = {
    type: 'TOGGLE_MENU'
};
jest.mock('actions/currency', () => Object.assign({},
    require.requireActual('actions/currency'),
    {
        toggleMenu: jest.fn().mockImplementation(() => {
            return mockToggleMenu;
        })
    }
));

describe('<Burger/>', () => {
    it('Renders without crashing', () => {
        shallow(<Burger/>);
    });

    it('Should toggle the menu', () => {
        const dispatch = jest.fn();
        const wrapper = shallow(<Burger dispatch={dispatch}/>);
        wrapper.simulate('click');
        expect(dispatch).toHaveBeenCalledWith(mockToggleMenu);
    });
});
