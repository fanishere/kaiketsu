import React, {Component} from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryGroup, VictoryLegend } from 'victory';
import {connect} from "react-redux";
import './GoalDetail.css';
const axios = require('axios');


class GoalAccomplishment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }
     render() {
         return (
            <div className="goalCompletion">
                <div className="goalCompletionLegend">
                    <VictoryLegend
                        x={125} y={0}
                        title="Goal Accomplishment"
                        centerTitle
                        orientation="horizontal"
                        height={60}
                        style={{ title: {fontSize: 20 } }}
                        data={[
                            { name: "Accomplished", symbol: { fill: "orange" }},
                            { name: "Missed", symbol: { fill: "black" }}
                        ]}
                        />
                </div>
                
                <div className="goalCompletionGraph">
                    {this.props.goalCompletion
                        ?   <VictoryGroup 
                                minDomain={{x: 0, y: 0}}
                                maxDomain={{x: 30, y: 5}}
                                height={40}
                                >
                            <VictoryBar
                                style={{
                                    data: {
                                        fill: (d) => d.a === true ? "black" : "orange"
                                    }
                                }}
                                barRatio={1}
                                barWidth={8}
                                height = {10}
                                data={this.props.goalCompletion}/>
                            </VictoryGroup>
                        : ""}
                </div>
            </div>
         );
     }
}

class GoalDays extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="goalDays">
                <div className="goalDaysGraph">
                    <VictoryBar
                        horizontal
                        labels={(d) => `${d.y} Days Completed`}
                        data= {[
                            { x: 0, y: this.props.days, label: '5 Days Completed'},
                        ]}
                    />
                </div>
            </div>
        );
    }
}

class GoalDetail extends Component {
    // needs back arrow to dashboard
    
    constructor(props) {
        super(props);
        this.state = {
            goalCompletion: null,
            data: [],
        }

    }

    constructData() {
        let newData = [
        ]
        
        for (let day of this.state.data) {
            console.log(this.state.data);
            let dayLine = {
                x: day.created_at,
                y: 5,
                a: day.goal_met
            }
            newData.push(dayLine);
        }
        
        this.setState({
            goalCompletion: newData
        })
        
    }

    componentDidMount() {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": `Token ${this.props.token}`
        };
        return axios({
            url: `${process.env.REACT_APP_API_URL}/api/goals/${this.props.match.params.id}/days/`,
                method: 'GET',
                headers: headers
            }).then(res => {
            if (res.status === 200) {
                console.log(res);
                this.setState({
                    data: res.data
                })
                this.constructData();
                return res.data;
    
            } else if (res.status >= 400 && res.status < 500) {
                throw res.data;
            }
    
            });
    }


    render() {
        
        return (
            <div>
                <GoalAccomplishment
                    goalCompletion={this.state.goalCompletion}>
                </GoalAccomplishment>
                <GoalDays
                    days={this.state.data.length}
                    ></GoalDays>
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


export default connect(mapStateToProps)(GoalDetail);