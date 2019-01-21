import React, {Component} from 'react';
import { VictoryBar, VictoryGroup, VictoryLegend, VictoryLabel, VictoryTooltip } from 'victory';
import {connect} from "react-redux";
import './GoalDetail.css';
import {
    Link
} from "react-router-dom";
import { Redirect } from 'react-router-dom';
import ButtonInteraction from './SuccessButton';
import CircleDrag from './CircleDrag';
import GoalCompletion from './GoalCompletion';
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
                                labelComponent={<VictoryTooltip
                                    flyoutStyle={{
                                        stroke: "tomato",
                                        fontSize: 50
                                    }}

                                />}
                                style={{
                                    data: {
                                        fill: (d) => d.a === true ? "black" : "orange",
                                    },
                                    
                                }}
                                barWidth={10}
                                height = {10}
                                data={this.props.goalCompletion}
                                
                                />
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
                   
                   
                        <VictoryBar
                            horizontal
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
                            horizontal
                            barWidth={40}
                            labelComponent={<VictoryLabel dx={-60}/>}
                            maxDomain={45}
                            labels={(d) => `${d.y} Days`}
                            data= {[
                                { x: 0, y: secondsToDays(this.props.duration)},
                            ]}
                        />
                            
                </div>
            </div>
        );
    }
}
function secondsToDays(num) {
    return num / 86400;
}

class GoalStats extends Component {
    render() {
        return (
            <div>
                <h1>stats</h1>
            </div>
        );
    }
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
                    <button>Success</button>
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
                a: day.goal_met,
                label: day.created_at
            }
            newData.push(dayLine);
        }
        
        this.setState({
            goalCompletion: newData
        });
        
    }

    componentDidMount() {
        this.loadGoalData()
    }

    loadGoalData() {
        console.log('sdfsdf');
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
        let interaction = Math.random();
        let completedToday = false;
        if (this.state.data) {
            if (this.state.data.days[this.state.data.days.length -1]['created_at']) {
                completedToday = true;
            }
        }
        if (this.state.data && this.state.data.days.length > secondsToDays(this.state.data.duration)) {
            return <Redirect to={`/dashboard/goal-accomplished/${this.props.match.params.id}/`} />
        }
        return (
            <div>
                <GoalAccomplishment
                    goalCompletion={this.state.goalCompletion}>
                </GoalAccomplishment>
                {this.state.data
                    ? <GoalStats
                        days={this.state.data.days.length}
                        duration={this.state.data.duration}
                        ></GoalStats>
                    : ""}
                    
                <GoalButton id={this.props.match.params.id}></GoalButton>
                {interaction > .50 
                    ? <ButtonInteraction
                        goal={this.props.match.params.id}
                        disabled={completedToday}
                        reload={this.loadGoalData}
                        ></ButtonInteraction>
                    : <CircleDrag
                        goal={this.props.match.params.id}
                        disabled={completedToday}
                        reload={this.loadGoalData}
                        ></CircleDrag>}
                
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