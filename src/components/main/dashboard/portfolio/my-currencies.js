import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CurrencyBox from './currency-box';

import CirclePlus from 'icons/circle-plus';





export class MyCurrencies extends React.Component {
  
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Display add currency form
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    openForm(e) {
        this.props.history.push({
            pathname: '/dashboard/portfolio/currency-form'
        });
    }

    render() {
        const c_data = this.props.currencies;
        let boxes = null;
        if(c_data && c_data.length > 0) {
            boxes = c_data.map((data, index) => {
                data.price = this.props[data.type].price;
                return <CurrencyBox key={index} history={this.props.history}
                                    data={data} currencySym={this.props.currencySym}/>
            });
        }
        return(
            <section className="my-currencies">
                <h2>My Currencies</h2>
                {boxes}
                <button className="add-currency-btn" onClick={e => this.openForm()}>
                    <CirclePlus />
                </button>
            </section>
        );
    }
}

const mapStateToProps = state => ({
    BTC: state.crypto.BTC,
    ETH: state.crypto.ETH,
    LTC: state.crypto.LTC,
    XMR: state.crypto.XMR,
    currencySym: state.display.currencySym,
    currencies: state.currency.currencies
});

export default withRouter(connect(mapStateToProps)(MyCurrencies));