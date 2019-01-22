import React, { Component } from 'react';
import './GoalCreate.css';
import { connect } from "react-redux";
import {
    Redirect
} from "react-router-dom";
import health_logo from './media/Final/health-sketch-final.png';
import personal_logo from './media/Final/balloon-sketch-final.png';
import professional_logo from './media/Final/mountain-sketch-final.png';

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
                    <div className="formBox">
                        <span>
                            <p>I want to &nbsp;<input htmlFor="resolution" type="text" name="resolution"></input> </p>
                            <p>every day for &nbsp;
                                <select htmlFor="duration" name="duration">
                                    <option value="ONE MONTH">ONE MONTH</option>
                                    <option value="THREE MONTHS">THREE MONTHS</option>
                                    <option value="ONE YEAR">ONE YEAR</option>
                                </select>

                            </p>
                            <p>because &nbsp;
                            <input htmlFor="reason" type="text" name="reason"></input>.
                            </p>

                        </span>
                    </div>
                    <button>Set Goal</button>
                </form>
                <div className="categoryImage">
                    {this.props.match.params.category === 'HEALTH'
                        ? <img src={health_logo} alt="health"></img>
                        : this.props.match.params.category === 'PERSONAL'
                            ? <div className="personal"><img src={personal_logo} alt="personal"></img>
                                <img src={personal_logo} alt="personal"></img>
                                <img src={personal_logo} alt="personal"></img></div>
                            : <img src={professional_logo} alt="professional"></img>}

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    let errors = [];
    if (state.auth.errors) {
        errors = Object.keys(state.auth.errors).map(field => {
            return { field, message: state.auth.errors[field] };
        });
    }
    return {
        errors,
        isAuthenticated: state.auth.isAuthenticated,
        token: localStorage.getItem("token"),
    };

}

export default connect(mapStateToProps)(GoalCreate);