import React from 'react';
import { connect } from 'react-redux';

import { setBaseCurrency } from 'actions/display';

import BtcDollar  from 'icons/currency/btc-dollar';
import BtcEuro    from 'icons/currency/btc-euro';
import BtcPound   from 'icons/currency/btc-pound';
import DollarSign from 'icons/currency/dollar-sign';
import EuroSign   from 'icons/currency/euro-sign';
import PoundSign  from 'icons/currency/pound-sign';

import ArrowDown from 'icons/arrow-down';

export class BaseCurrencyBox extends React.Component {

    setCurrency(e) {
        // console.log(e.target.value);
        this.props.dispatch(setBaseCurrency(e.target.value));
    }

    getCurrencySyms() {
        switch(this.props.currency) {
            case 'EUR':
                return {
                    conversionSym: <BtcEuro />,
                    currencySym: <EuroSign />
                }
            case 'GBP':
                return {
                    conversionSym: <BtcPound />,
                    currencySym: <PoundSign />
                }
            default:
                return {
                    conversionSym: <BtcDollar />,
                    currencySym: <DollarSign />
                }
        }
    }
    

    render() {
        const { conversionSym, currencySym } = this.getCurrencySyms();

        return(
            <div className="base-currency-box">
                <h2>Base Currency</h2>
                {conversionSym}
                <form action="#!">
                    {currencySym}
                    <select name="base-currency" 
                            value={this.props.currency}
                            onChange={e => this.setCurrency(e)}>
                        <option value="USD">Dollar</option>
                        <option value="EUR">Euro</option>
                        <option value="GBP">Pound</option>
                        <option value="AUD">Australian</option>
                        {/* <option value="canadian">Canadian</option> */}
                    </select>
                    <ArrowDown />
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currency: state.display.currency
});

export default connect(mapStateToProps)(BaseCurrencyBox);


