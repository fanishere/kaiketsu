import React, { Component } from 'react';
import './GoalCreate.css';
import {connect} from "react-redux";
import {
    Redirect
} from "react-router-dom";
const axios = require('axios');

class GoalCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            toGoalDetail: false,
        }
        this.successMessage = this.successMessage.bind(this);
    }

    createGoal(event) {
        event.preventDefault();
        let headers = {
            "Content-Type": "application/json",
            "Authorization": `Token ${this.props.token}`
        };
        
        let formData = new FormData(event.target);

        return axios({
            url: `${process.env.REACT_APP_API_URL}/api/goals/`,
                method: 'POST',
                data: {
                    "resolution": formData.get('resolution'),
                    "reason": formData.get('reason'),
                    "duration": 'ONE MONTH',
                    "category": this.props.match.params.category
                },
                headers: headers
            }).then(res => {
                console.log(res);
                this.setState({
                    data: res.data
                });
                this.successMessage();
            
                
    
            }).catch(error => {
                console.log(error);
            });
    }

    successMessage() {
        console.log("successful!");
        this.setState({
           toGoalDetail: true 
        });
        
    }


    render() {
        if (this.state.toGoalDetail === true) {
            return <Redirect to={`/dashboard/goals/${this.state.data.pk}`} />;
        }
        return (
            <div className="GoalCreate">
                <form onSubmit={this.createGoal.bind(this)}>
                    <span>
                        I want to &nbsp;
                        <input htmlFor="resolution" type="text" name="resolution"></input>
                        every day for &nbsp;

                        <select htmlFor="duration" name="duration">
                            <option value="ONE MONTH">ONE MONTH</option>
                            <option value="THREE MONTHS">THREE MONTHS</option>
                            <option value="ONE YEAR">ONE YEAR</option>
                        </select>
                        &nbsp; because
                        <input htmlFor="reason" type="text" name="reason"></input>
                        .
                    </span>
                    <button>Set Goal</button>
                </form>

            </div>
        )
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

export default connect(mapStateToProps)(GoalCreate);