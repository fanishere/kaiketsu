import React, {Component} from 'react';
import { Group } from '@vx/group';
import {connect} from "react-redux";
import { scaleLinear } from '@vx/scale';
import { HeatmapCircle } from '@vx/heatmap';
import './HeatMap.css';
const axios = require('axios');

const hot1 = '#77312f';
const hot2 = '#f33d15';
const bg = '#ffffff';

const width = window.innerWidth;
const height = window.innerWidth;
const separation = 10;
let margin = {
    top: 10,
    left: 20,
    right: 20,
    bottom: 80
}

// utils
const max = (data, value = d => d) => Math.max(...data.map(value));
const min = (data, value = d => d) => Math.min(...data.map(value));

 // accessors
const bins = d => d.bins;
const count = d => d.count;


class HeatMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            
        }
    }
    componentDidMount() {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": `Token ${this.props.token}`
        };
        return axios({
            url: `${process.env.REACT_APP_API_URL}/api/goals/days/`,
                method: 'GET',
                headers: headers
            }).then(res => {
                if (res.status === 200) {
                    console.log(res);
                    this.constructData(res.data)
                    return res.data;
                
                } else if (res.status >= 400 && res.status < 500) {
                    throw res.data;
                }
    
            });
    }
    constructData(data) {
        /*
            - takes api data and splits it into columns and rows for the heatmap
            - flips the data so it displays in rows, and not columns
        */

        let heatmap_data = [];
        let width = Math.ceil(Math.sqrt(Object.keys(data).length));

        for (let i=0; i<=width; i++) {
            let circle = {
                bin: i,
                count: .5,
                bins: []
            }
            heatmap_data.push(circle);
        }

        let row = 0;
        let column = 0;

        for (let item in data) {

            let bin = {
                        date: item,
                        count: data[item]['true'] / data[item]['total']
                    }
            
            heatmap_data[row]['bins'].push(bin);
            
            column ++ ;
            if (column === width) {
                row ++;
                column = 0;
            }
            
        }

       
        
        this.setState({
            data: heatmap_data
        })
    }


    render() {
        if (this.state.data) {

            const colorMax = max(this.state.data, count);
            const bucketSizeMax = max(this.state.data, d => bins(d).length);
            // scales
            const maxDomain = this.state.data.length > 5 ? this.state.data.length : 5;
            const xScale = scaleLinear({
                domain: [0, maxDomain]
            });

            const maxBucket = bucketSizeMax > 4 ? bucketSizeMax : 4;
            const yScale = scaleLinear({
                domain: [0, maxBucket]
            });
            const circleColorScale = scaleLinear({
                range: [hot1, hot2],
                domain: [0, colorMax]
            });
            const opacityScale = scaleLinear({
                range: [0.1, 1],
                domain: [0, colorMax]
            });

            let size = width;
            if (size > margin.left + margin.right) {
              size = width - margin.left - margin.right - separation;
            }
            const xMax = size;
            const yMax = height - margin.bottom - margin.top;
           
            const binWidth = xMax / maxDomain;
            const binHeight = yMax / bucketSizeMax;
           
            const radius = min([binWidth, binHeight]) / 2;
            xScale.range([0, xMax]);
            yScale.range([yMax, 0]);

            return (
                <svg width={width} height={height} className="goalHeatMap">
                    <rect x={0} y={0} width={width} height={height} rx={0} fill={bg} />
                        <Group top={margin.top} left={margin.left}>
                            <HeatmapCircle
                              data={this.state.data}
                              xScale={xScale}
                              yScale={yScale}
                              colorScale={circleColorScale}
                              opacityScale={opacityScale}
                              radius={radius}
                              gap={2}
                            >   
                                {heatmap => {
                                    return heatmap.map(bins => {
                                        return bins.map(bin => {
                                      
                                            return (
                                                <circle
                                                    key={`heatmap-circle-${bin.row}-${bin.column}`}
                                                    className="vx-heatmap-circle"
                                                    cx={bin.cx}
                                                    cy={bin.cy}
                                                    r={bin.r}
                                                    fill={bin.color}
                                                    fillOpacity={bin.opacity}
                                                    onMouseEnter={event => {
                                                    
                                                      console.log(bin);
                                                      alert( `Date: ${bin.bin.date}` );
                                                    }}
                                                />
                                            );
                                        });
                                    });
                                }}
                            </HeatmapCircle>
                        </Group>
                </svg>
            );
        } else {
            return (
                <div></div>
            );
        }
    }
}

const mapStateToProps = state => {
    let errors = [];
    if (state.auth.errors) {
        errors = Object.keys(state.auth.errors).map(field => {
            return {field, message:state.auth.errors[field]};
        });
    }
    return {
        errors,
        isAuthenticated: state.auth.isAuthenticated,
        token: localStorage.getItem("token"),
    };
    
}


export default connect(mapStateToProps)(HeatMap);