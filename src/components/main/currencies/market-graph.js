import React, { Component } from 'react';

import { Chart } from 'react-google-charts';
import { GoogleCharts } from 'google-charts';
// import ReactFauxDOM from 'react-faux-dom';
// import * as d3 from "d3";

export default class MarketGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 300,
            height: 300
        };
    }

    componentDidMount() {
        GoogleCharts.load(this.drawChart);
        // this.updateDimensions();
        // window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        // window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions = () => {
        // const el = this.refs.chart;
        // this.setState({
        //     width: el.offsetWidth,
        //     height: el.offsetHeight
        // });
    }

    drawLineChart = () => {

        // console.log("d3: ", d3);

        // const margin = {top: 20, right: 20, bottom: 30, left: 50},
        //       width  = 600 - margin.left - margin.right,
        //       height = 400 - margin.top - margin.bottom;

        // // dates      
        // const parseDate = d3.timeFormat("%d-%b-%y").parse;

        // // set scales
        // const x = d3.scaleTime()
        //     .range([0, width]);
        // const y = d3.scaleLinear()
        //     .range([height, 0]);

        // // create axes
        // const xAxis = d3.axisBottom()
        //     .scale(x)
        //     .orient('bottom');
        // const yAxis = d3.axisLeft()
        //     .scale(y)
        //     .orient('left');
        
        // const line = d3.line()
        //     .x(function(d) { return x(d.date); })
        //     .y(function(d) { return y(d.price) });
        
        // // we create the faux element
        // let el = new ReactFauxDOM.Element('div');
        // // we set ref on our newly created element
        // el.setAttribute("ref", "chart");
        
        // // we attach the width and the height to our svg
        // let svg = d3.select(el).append('svg')
        //             .attr("width", width + margin.left + margin.right)
        //             .attr("height", height + margin.top + margin.bottom)
        //         .append("g")
        //             .attr("transform", `translate(${margin.left}, ${margin.top})`);
        // d3.tsv("data.tsv", function(error, data) {
        //     if (error) throw error;
        //     //traverse through the data 
        //     data.forEach(function(d) {
        //         d.date = parseDate(d.date);
        //         d.users = +d.users;
        //     });
        //     //establish the domain for x and y axes
        //     x.domain(d3.extent(data, function(d) { return d.date; }));
        //     y.domain(d3.extent(data, function(d) { return d.users; }));
            
        //     //add "groups" 
        //     svg.append("g")
        //         .attr("class", "x axis")
        //         .attr("transform", "translate(0," + height + ")")
        //         .call(xAxis);
            
        //     svg.append("g")
        //         .attr("class", "y axis")
        //         .call(yAxis)
        //         .append("text")
        //         .attr("transform", "rotate(-90)")
        //         .attr("y", 6)
        //         .attr("dy", ".71em")
        //         .style("text-anchor", "end")
        //         .text("Users (unique)");
            
        //     svg.append("path")
        //         .datum(data)
        //         .attr("class", "line")
        //         .attr("d", line);
        //     });

        //     return el.toReact();
    }


    drawChart = () => {
        // Standard google charts functionality is available as GoogleCharts.api after load
        const data = GoogleCharts.api.visualization.arrayToDataTable([
            ['Chart thing', 'Chart amount'],
            ['Lorem ipsum', 60],
            ['Dolor sit', 22],
            ['Sit amet', 18]
        ]);
        const pie_1_chart = new GoogleCharts.api.visualization.PieChart(document.getElementById('chart1'));
        pie_1_chart.draw(data);
    }

    render() {
        console.log('D3 data --> ', this.props.data);
        return(
            <div className="market-graph">
                <p>D3 Chart</p>
                <div id="chart"></div>
                <Chart
                    chartType="ScatterChart" 
                    data={[['Age', 'Weight'], [8, 12], [4, 5.5]]}
                    options={{}}
                    graph_id="ScatterChart"
                    width="100%"
                    height="300px"
                    legend_toggle
                />
            </div>
        );
    }
}