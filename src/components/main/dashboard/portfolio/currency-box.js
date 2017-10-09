import React from 'react';

import EditIcon from 'icons/edit-icon';

export default class CurrencyBox extends React.Component {
    render() {
        const { data } = this.props;
        const valued = (data.price * data.owned).toFixed(2);
        return(
            <div className="c-box">
                <h2>{data.type}</h2>
                <ul>
                    <li>
                        <span>Price:</span> $<span>{data.price}</span>
                    </li>
                    <li>
                        <span>Owned:</span> <span>{data.owned}</span>
                    </li>
                    <li>
                        <span>Valued:</span> $<span>{valued}</span>
                    </li>
                </ul>
                <button className="edit-btn">
                    <EditIcon />
                </button>
            </div>
        );
    }
}

