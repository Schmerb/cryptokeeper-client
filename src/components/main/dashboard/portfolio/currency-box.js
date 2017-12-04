import React from 'react';

import EditIcon from 'icons/edit-icon';

export default class CurrencyBox extends React.Component {
    
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Opens currency edit form passing in the current field
    // values to fill in
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    editForm = e => {
        e.preventDefault();
        const { data } = this.props;
        this.props.history.push({
            pathname: "/dashboard/portfolio/edit-currency-form",
            state: {
                type: data.type,
                amount: data.amount,
                buyPrice: data.buyPrice,
                id: data._id
            }
        });
    }
    
    render() {
        const { data } = this.props;
        const valued = (data.price * data.amount).toFixed(2);
        const profit = (valued - data.buyPrice * data.amount).toFixed(2);
        return(
            <div className="c-box" data-id={data._id}>
                <h2>{data.type}</h2>
                <ul>
                    <li>
                        <span className="type">Price:</span> 
                        <span className="value">{this.props.currencySym}{data.price}</span>
                    </li>
                    <li>
                        <span className="type">Buy Price:</span> 
                        <span className="value">{this.props.currencySym}{data.buyPrice}</span>
                    </li>
                    <li>
                        <span className="type">amount:</span> 
                        <span className="value">{data.amount}</span>
                    </li>
                    <li>
                        <span className="type">Valued:</span> 
                        <span className="value">{this.props.currencySym}{valued}</span>
                    </li>
                    <li>
                        <span className="type">Profit:</span> 
                        <span className="value">{this.props.currencySym}{profit}</span>
                    </li>
                </ul>
                <button className="edit-btn" onClick={this.editForm}>
                    <EditIcon />
                </button>
            </div>
        );
    }
}

