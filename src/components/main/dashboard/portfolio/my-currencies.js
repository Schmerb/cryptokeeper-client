import React from 'react';
import { connect } from 'react-redux';

import CurrencyBox from './currency-box';

import CirclePlus from 'icons/circle-plus';





export class MyCurrencies extends React.Component {
    getData() {
        const props = this.props;
        return  [
            {
                type: "BTC",
                name: "Bitcoin",
                price: props.BTC.price.toFixed(2),
                owned: 0.34092
            },
            {
                type: "ETH",
                name: "Ethereum",
                price: props.ETH.price.toFixed(2),
                owned: 11.23
            },
            {
                type: "LTC",
                name: "Litecoin",
                price: props.LTC.price.toFixed(2),
                owned: 5.6
            },
            {
                type: "LTC",
                name: "Litecoin",
                price: props.LTC.price.toFixed(2),
                owned: 5.6
            },
            {
                type: "LTC",
                name: "Litecoin",
                price: props.LTC.price.toFixed(2),
                owned: 5.6
            },
            {
                type: "LTC",
                name: "Litecoin",
                price: props.LTC.price.toFixed(2),
                owned: 5.6
            },
            {
                type: "LTC",
                name: "Litecoin",
                price: props.LTC.price.toFixed(2),
                owned: 5.6
            },
        ];
    }

    render() {
        const c_data = this.getData();
        const boxes = c_data.map((data, index) => <CurrencyBox key={index} data={data}/>);
        return(
            <section className="my-currencies">
                <h2>My Currencies</h2>
                {boxes}
                <button className="add-currency-btn">
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
    XMR: state.crypto.XMR
});

export default connect(mapStateToProps)(MyCurrencies);