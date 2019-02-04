import React, {Component} from 'react';
import {secondsToDays} from '../utility';
import { VictoryBar, VictoryGroup, VictoryLegend, VictoryTooltip } from 'victory';
import {connect} from "react-redux";
import './GoalDetail.css';
import { Redirect } from 'react-router-dom';
import ButtonInteraction from './SuccessButton';
import CategoryImage from '../CategoryImage';
const axios = require('axios');

/*
    GoalAccomplishment is Bar Graph that shows daily goal
    achievement(whether a user accomplished a goal or not)
*/
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
                <h2>30 Day Status</h2>
                <div className="goalCompletionLegend">
                    <VictoryLegend
                        x={75} y={0}
                        gutter={30}
                        orientation="horizontal"
                        height={40}
                        responsive={false}
                        style={{ 
                            title: {fontSize: 30 },
                            labels: {fontSize: 20}
                            }}
                        data={[
                            { name: "Accomplished", symbol: { fill: "#814fe7" }},
                            { name: "Missed", symbol: { fill: "#b5e74f" }}
                        ]}
                        />
                </div>
                
                <div className="goalCompletionGraph">
                    {this.props.goalCompletion
                        ?   <VictoryGroup 
                                minDomain={{x: 0, y: 0}}
                                maxDomain={{x: 30, y: 5}}
                                height={55}
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
                                        fill: (d) => d.a === true ? "#814fe7" : "#b5e74f",
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

// class GoalDays extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {

//         }
//     }


//     render() {
        
//         return (
//             <div className="goalDays">
//                 <h2>Days Completed</h2>
//                 <div className="goalDaysGraph">
                   
                   
//                         <VictoryBar
//                             horizontal
//                             minDomain={{x: 0, y: 0}}
//                             barWidth={40}
//                             style={{ labels: { fill: "white" } }}
//                             labelComponent={<VictoryLabel dx={-50}/>}
//                             maxDomain={45}
                            
//                             labels={`${this.props.days} Days`}
//                             data= {[
//                                 { x: 0, y: this.props.days},
//                             ]}
//                         />

//                         <VictoryBar
//                             horizontal
//                             barWidth={40}
//                             labelComponent={<VictoryLabel dx={-60}/>}
//                             maxDomain={45}
//                             labels={(d) => `${d.y} Days`}
//                             data= {[
//                                 { x: 0, y: secondsToDays(this.props.duration)},
//                             ]}
//                         />
                            
//                 </div>
//             </div>
//         );
//     }
// }



/*
    GoalStats shows a users Days to Completion and Engagement Level
*/
class GoalStats extends Component {

    getDaysToCompletion() {
        return secondsToDays(this.props.duration) - this.props.days.length
    }

    getPercentCompleted() {
        let completed = 0;
        if (this.props.days.length === 0) {
            return '0 %';
        }
        for (let day of this.props.days) {
            if (day.goal_met) {
                completed ++;
            }
        }

        return `${(completed/this.props.days.length * 100).toString().slice(0,4)}%`

    }

    render() {
        return (
            <div className="GoalStats">
                <div className="days">
                    <h2>Days to Completion</h2>
                    <h3>{this.getDaysToCompletion()}</h3>
                </div>

                <div className="percent">
                    <h2>Engagement</h2>
                    <h3>{this.getPercentCompleted()}</h3>
                </div>
                
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

                <ButtonInteraction
                    goal={this.props.goal}
                    disabled={this.props.disabled}
                    reload={this.props.reload}
                    accomplished={this.props.completedToday}
                ></ButtonInteraction>
                
                
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
            gameShowing:  false,
            interaction: Math.random(),
            today: new Date().toISOString().slice(0,10),
            completedToday: false
        }

    }

    constructData() {
        let newData = [];
        let completedToday = false;
        let days = this.state.data.days;
        if (this.state.data.days.length > 30) {
            days = this.state.data.days.slice(Math.max(this.state.data.days.length - 30, 1));
        }
        
        for (let day of days) {
            let dayLine = {
                x: day.created_at,
                y: 5,
                a: day.goal_met,
                label: day.created_at
            }
            newData.push(dayLine);
        }

        if (this.state.data.days.length > 0 && this.state.today === this.state.data.days[this.state.data.days.length - 1].created_at) {
            completedToday = true;
        }
        
        this.setState({
            goalCompletion: newData,
            completedToday: completedToday
        });
        
    }

    componentDidMount() {
        this.loadGoalData();
        
    }

    loadGoalData() {

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
                });
                this.constructData();
                return res.data;
    
            } else if (res.status >= 400 && res.status < 500) {
                throw res.data;
            }
    
            });
    }

    showGame() {
        this.setState({
            gameShowing: true
        });
    }


    render() {
  
        if (this.state.data && this.state.data.days.length === secondsToDays(this.state.data.duration)) {
            return <Redirect to={`/dashboard/goal-accomplished/${this.props.match.params.id}/`} />
        }
        if (this.state.data) {

            return (
                <div className="GoalDetail">
                    <div className="title">
                        <h1>Your Progress</h1>
                    </div>
    
                    {this.state.data
                        ? <GoalStats
                            days={this.state.data.days}
                            duration={this.state.data.duration}></GoalStats>
                        : ''}
                    
                    <GoalAccomplishment
                        goalCompletion={this.state.goalCompletion}>
                    </GoalAccomplishment>
                    {/* {this.state.data
                        ? <GoalStats
                            days={this.state.data.days.length}
                            duration={this.state.data.duration}
                            ></GoalStats>
                        : ""} */}
    
                    <GoalButton
                        id={this.props.match.params.id}
                        completedToday={this.state.completedToday}
                        showGame={this.showGame.bind(this)}
                        goal={this.props.match.params.id}
                        disabled={this.state.completedToday}
                        reload={this.loadGoalData.bind(this)}>
                    </GoalButton>
                    
    
                    {this.state.data
                        ? <CategoryImage category={this.state.data.category}></CategoryImage>
                        : ''}
                    
                    
                </div>
            );
            
        } else {
            return <div className="GoalDetail"></div>
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


export default connect(mapStateToProps)(GoalDetail);