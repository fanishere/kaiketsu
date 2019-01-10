import React, {Component} from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryGroup } from 'victory';
import {connect} from "react-redux";
const axios = require('axios');

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
                {this.state.goalCompletion
                    ?   <VictoryGroup
                            domain={[0, 30]}
                            >
                        <VictoryBar
                        style={{
                            data: {
                                fill: (d) => d.a === true ? "#000000" : "#c43a31"
                            }
                        }}
                        barRatio={1}
                        barWidth={5}
                        height = {50}
                        data={this.state.goalCompletion}/>
                        </VictoryGroup>
                    : ""}

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