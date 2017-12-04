import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CurrencyBox from './currency-box';

import CirclePlus from 'icons/circle-plus';


export class MyCurrencies extends React.Component {
  
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Display add currency form
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    openForm = () => {
        this.props.history.push({
            pathname: '/dashboard/portfolio/currency-form'
        });
    }

    render() {
        const coins = this.props.currencies;
        let boxes = null;
        let center = '';
        if(coins && coins.length > 0) {
            boxes = coins.map((data, index) => {
                data.price = this.props[data.type].price;
                return <CurrencyBox key={index} history={this.props.history}
                                    data={data} currencySym={this.props.currencySym}/>
            });
        } 
        if(coins.length <= 1) {
            center = 'center';
        }
        return(
            <section className={`my-currencies ${center}`}>
                <h2>My Currencies</h2>
                {boxes}
                <button className="add-currency-btn" onClick={this.openForm}>
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
    DASH: state.crypto.DASH,
    DOGE: state.crypto.DOGE,
    XRP: state.crypto.XRP,
    currencySym: state.currency.currencySym,
    currencies: state.currency.currencies
});

export default withRouter(connect(mapStateToProps)(MyCurrencies));