import React from 'react';

import EditIcon from 'icons/edit-icon';

export default class CurrencyBox extends React.Component {
    
    editForm(e, data) {
        e.preventDefault();
        this.props.history.push({
            pathname: "/dashboard/portfolio/edit-currency-form",
            state: {
                type: data.type,
                owned: data.owned
            }
        });
    }
    
    render() {
        const { data } = this.props;
        const valued = (data.price * data.owned).toFixed(2);
        return(
            <div className="c-box">
                <h2>{data.type}</h2>
                <ul>
                    <li>
                        <span className="type">Price:</span> 
                        <span className="value">{this.props.currencySym}{data.price}</span>
                    </li>
                    <li>
                        <span className="type">Owned:</span> 
                        <span className="value">{data.owned}</span>
                    </li>
                    <li>
                        <span className="type">Valued:</span> 
                        <span className="value">{this.props.currencySym}{valued}</span>
                    </li>
                </ul>
                <button className="edit-btn" onClick={e => this.editForm(e, data)}>
                    <EditIcon />
                </button>
            </div>
        );
    }
}

