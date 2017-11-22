import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Spinner from 'react-spinkit';

import { Chart } from 'react-google-charts';

import { getHistoData } from 'actions/crypto';


export class MarketGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            options: null,
            loading: true
        };
    }

    componentDidMount() {
        const options = {
            title: 'Price over Time',
            hAxis: {title: "Time"},
            vAxis: {title: "Price"}
        };
        this.setState({options});

        const coin         = this.props.currency;
        const baseCurrency = this.props.baseCurrency;
        this.props.dispatch(getHistoData(coin, baseCurrency));
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.currency !== this.props.currency) {
            // new currency page
            const coin         = nextProps.currency;
            const baseCurrency = nextProps.baseCurrency;
            this.setState({
                data: null,
                loading: true
            });
            this.props.dispatch(getHistoData(coin, baseCurrency)); // get new coin data
        } else if(this.props.histoData.Data !== nextProps.histoData.Data){
            let data = nextProps.histoData.Data;
            data = data.map(coin => {
                let date = new Date(coin.time*1000);
                return [date, coin.close]
            });
            data = [['Time', 'Price'], ...data];
            this.setState({data, loading: false});
        }
    }

    
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Returns Google Chart component using state for data
    // and chart options
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    drawChart = () => {
        if(this.state.loading) {
            return <Spinner className="loading-icon" name="three-bounce" color="coral"/>
        } else {
            return <Chart
                        chartType="LineChart" 
                        data={this.state.data}
                        options={this.state.options}
                        graph_id="LineChart"
                        width="100%"
                        height="300px"
                        legend_toggle
                    />;
        }
    }

    render() {
        return(
            <div className="market-graph">
                {this.drawChart()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    histoData: state.crypto.histoData,
    baseCurrency: state.currency.currency,
    currencySym: state.currency.currencySym,
    pathname: state.display.currentPath
});

export default withRouter(connect(mapStateToProps)(MarketGraph));