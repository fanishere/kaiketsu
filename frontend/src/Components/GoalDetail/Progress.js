import React, {Component} from 'react';
import { VictoryBar, VictoryChart, VictoryPolarAxis, VictoryLegend } from 'victory';
import {connect} from "react-redux";
import HeatMap from '../HeatMap';
import './GoalDetail.css';
const axios = require('axios');

class PolarGoalCompletion extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": `Token ${this.props.token}`
        };
        return axios({
            url: `${process.env.REACT_APP_API_URL}/api/goals/`,
                method: 'GET',
                headers: headers
            }).then(res => {
                if (res.status === 200) {
                    console.log(res);
                    this.constructData(res.data);
                    return res.data;
                
                } else if (res.status >= 400 && res.status < 500) {
                    throw res.data;
                }
    
            });
    }

    constructData(data) {
        
        let newData = [];
        
        for (let goal of data) {
            console.log(goal);
            let goalLine = {
                category: goal.category,
                y: goal.days.length,
                x: goal.resolution,
            }
            newData.push(goalLine);
        }
        
        this.setState({
            data: newData
        });
    }

    render() {
        let categoryColors = {
            'HEALTH': '#c43a31',
            'PROFESSIONAL': '#000000',
            'PERSONAL': '#37a100'
        }

        return (
            <div className="PolarGoalCompletion">
                {this.state.data
                    ?   <VictoryChart
                            polar
                            height={550}
                        >
                        <VictoryLegend x={90} y={10}
                            title="Legend"
                            centerTitle
                            padding={{ top: 20, bottom: 60 }}
                            orientation="horizontal"
                            // gutter={20}
                            
                            style={{
                                // data: { fill: "blue", stroke: "navy", strokeWidth: 2 },
                                labels: { fill: "navy" },
                                border: { stroke: "black" },
                                title: {fontSize: 20 }
                            }}
                            data={[
                              { name: "Health", symbol: {
                                  fill: '#c43a31',
                                  fillOpacity: 0.7,
                                  stroke: '#c43a31',
                                  strokeWidth: 2 } },
                              { name: "Professional", symbol: {
                                  fill: '#000000',
                                  fillOpacity: 0.7,
                                  stroke: '#000000',
                                  strokeWidth: 2 } },
                              { name: "Personal", symbol: {
                                  fill: '#37a100',
                                  fillOpacity: 0.7,
                                  stroke: '#37a100',
                                  strokeWidth: 2 } },
                            ]}
                        />

                            <VictoryPolarAxis dependentAxis
                                tickFormat={() => null}
                            />
                            <VictoryPolarAxis
                                labelPlacement="perpendicular"
                                style={{ tickLabels: { fill: "none" } }}

                            />
                            <VictoryBar

                                data={this.state.data}
                                style={{
                                    data: {
                                        fill: (d) => categoryColors[d.category],
                                        stroke: (d) => categoryColors[d.category],
                                        strokeWidth: 2,
                                        fillOpacity: 0.7,
                                    }
                                }}
                            />
                        
                        </VictoryChart>
                    :   ''}
                    
            </div>

        );
    }
}
function secondsToDays(num) {
    return num / 86400;
}

class DashboardProgressDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    render() {
        
        return (
           <div className="DashBoardProgressDisplay">
                <PolarGoalCompletion token={this.props.token}></PolarGoalCompletion>
                <HeatMap></HeatMap>
    
           </div>
               
        );
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


export default connect(mapStateToProps)(DashboardProgressDisplay);