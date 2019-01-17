import React, {Component} from 'react';
import { VictoryBar, VictoryGroup, VictoryLegend, VictoryLabel, VictoryStack } from 'victory';
import {connect} from "react-redux";
import './GoalDetail.css';
import {
    Redirect,
    Link
} from "react-router-dom";
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
                        x={75} y={0}
                        title="Goal Accomplishment"
                        centerTitle
                        gutter={30}
                        orientation="horizontal"
                        height={80}
                        style={{ 
                            title: {fontSize: 30 },
                            labels: {fontSize: 20}
                            }}
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
                                barWidth={10}
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
                <h2>Days Completed</h2>
                <div className="goalDaysGraph">
                   
                    <VictoryStack
                        horizontal
                        height={70}
                        colorScale={["orange", "gold"]}
                        
                    > 
                        <VictoryBar
                            minDomain={{x: 0, y: 0}}
                            barWidth={40}
                            style={{ labels: { fill: "white" } }}
                            labelComponent={<VictoryLabel dx={-50}/>}
                            maxDomain={45}
                            
                            labels={`${this.props.days} Days`}
                            data= {[
                                { x: 0, y: this.props.days},
                            ]}
                        />

                        <VictoryBar
                            barWidth={40}
                            labelComponent={<VictoryLabel dx={-60}/>}
                            maxDomain={45}
                            labels={(d) => `${d.y} Days`}
                            data= {[
                                { x: 0, y: secondsToDays(this.props.duration)},
                            ]}
                        />
                            
                    

                    </VictoryStack>
                    
                </div>
            </div>
        );
    }
}
function secondsToDays(num) {
    return num / 86400;
}


class GoalButton extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="GoalButton">
                <Link to={`/dashboard/goals/${this.props.id}/check-in`}>
                    <button>Check In</button>
                </Link>
                
                
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
            days: null,
            data: null,
        }

    }

    constructData() {
        let newData = [];
        
        for (let day of this.state.data.days) {
            let dayLine = {
                x: day.created_at,
                y: 5,
                a: day.goal_met
            }
            newData.push(dayLine);
        }
        
        this.setState({
            goalCompletion: newData
        });
        
    }

    componentDidMount() {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": `Token ${this.props.token}`
        };
        return axios({
            url: `${process.env.REACT_APP_API_URL}/api/goals/${this.props.match.params.id}/`,
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
                {this.state.data
                    ? <GoalDays
                        days={this.state.data.days.length}
                        duration={this.state.data.duration}
                        ></GoalDays>
                    : ""}
                <GoalButton id={this.props.match.params.id}></GoalButton>
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