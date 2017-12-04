import React from 'react';
import { shallow, mount } from 'enzyme';
import store from 'store';

import { BaseCurrencyBox } from 'components/main/dashboard/portfolio/base-currency-box';

const mockSetBaseCurrency = {
    type: 'SET_BASE_CURRENCY'
};
jest.mock('actions/currency', () => Object.assign({},
    require.requireActual('actions/currency'),
    {
        setBaseCurrency: jest.fn().mockImplementation(() => {
            return mockSetBaseCurrency;
        })
    }
));

describe('<BaseCurrencyBox/>', () => {
    it('Renders without crashing', () => {
        shallow(<BaseCurrencyBox/>);
    });

    it('Should dispatch action to update base currency', () => {
        const dispatch = jest.fn();
        const wrapper = mount(<BaseCurrencyBox dispatch={dispatch}/>);
        const value = 'EUR';
        
        wrapper.find('select[name="baseCurrency"]').simulate('change', {target: {value:value}});
        expect(dispatch).toHaveBeenCalledWith(mockSetBaseCurrency);
    });
});
