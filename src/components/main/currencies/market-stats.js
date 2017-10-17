import React, { Component } from 'react';

export default class MarketStats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            VOL24TO: 0,
            VOLHRTO: 0,
            HIGH24: 0,
            LOW24: 0,
            OPEN24: 0
        };
    }

    componentDidMount() {
        const VOL24TO = this.props.data.VOLUME24HOURTO,
              VOLHRTO = this.props.data.VOLUMEHOURTO,
              HIGH24 = this.props.data.HIGH24HOUR,
              LOW24 = this.props.data.LOW24HOUR,
              OPEN24 = this.props.data.OPEN24HOUR;
        this.setState({
            VOL24TO:  VOL24TO ? VOL24TO.toFixed(2) : null,
            VOLHRTO:  VOLHRTO ? VOLHRTO.toFixed(2) : null,
            HIGH24: HIGH24 ? HIGH24.toFixed(2) : null,
            LOW24:  LOW24 ? LOW24.toFixed(2) : null,
            OPEN24: OPEN24 ? OPEN24.toFixed(2) : null,
        });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.data.VOLUME24HOURTO) {
            this.setState({
                VOL24TO:  nextProps.data.VOLUME24HOURTO.toFixed(2),
            });
        }
        if(nextProps.data.VOLUMEHOURTO) {
            this.setState({
                VOLHRTO:  nextProps.data.VOLUMEHOURTO.toFixed(2),
            });
        }
        if(nextProps.data.HIGH24HOUR) {
            this.setState({
                HIGH24:  nextProps.data.HIGH24HOUR.toFixed(2),
            });
        }
        if(nextProps.data.LOW24HOUR) {
            this.setState({
                LOW24:  nextProps.data.LOW24HOUR.toFixed(2),
            });
        }
        if(nextProps.data.OPEN24HOUR) {
            this.setState({
                OPEN24:  nextProps.data.OPEN24HOUR.toFixed(2),
            });
        }
    }

    render() {
        console.log(this.props.data);
        return(
            <div className="market-stats">
                <ul>
                    <li>
                        <label htmlFor="VOL24TO"> Volume (24HR) </label>
                        <span id="VOL24TO">{this.props.sym}{this.state.VOL24TO} </span>
                    </li>
                    <li>
                        <label htmlFor="VOLHRTO"> Volume (HR) </label>
                        <span id="VOLHRTO">{this.props.sym}{this.state.VOLHRTO} </span>
                    </li>
                    <li>
                        <label htmlFor="HIGH24">High (24HR)</label>
                        <span id="HIGH24">{this.props.sym}{this.state.HIGH24}</span>
                    </li>
                    <li>
                        <label htmlFor="LOW24">Low (24HR)</label>
                        <span id="LOW24">{this.props.sym}{this.state.LOW24}</span>
                    </li>
                    <li>
                        <label htmlFor="OPEN24">Open (24HR)</label>
                        <span id="OPEN24">{this.props.sym}{this.state.OPEN24}</span>
                    </li>
                </ul>
            </div>
        );
    }
}