import React, { Component } from 'react';
import './GoalCreate.css';
import { connect } from "react-redux";
import {
    Redirect
} from "react-router-dom";
import health_logo from './media/Final/health-sketch-final.png';
import personal_logo from './media/Final/balloon-sketch-final.png';
import professional_logo from './media/Final/mountain-sketch-final.png';
import CategoryImage from './CategoryImage';


const axios = require('axios');

class GoalCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            toGoalDetail: false,
            resolution: null,
            reason: null
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
                    "resolution": this.state.resolution,
                    "reason": this.state.reason,
                    "duration": formData.get('duration'),
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

    handleFormChange(event) {
        if (event.target.attributes['data-field'].value === 'resolution') {
            this.setState({
                resolution: event.target.innerText
            })
        }
        if (event.target.attributes['data-field'].value === 'reason') {
            this.setState({
                reason: event.target.innerText
            })
        }
        
        
    }
    
    clearField(event) {
        console.log(event);
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
                            <p>I want to &nbsp;</p>
                            {/* <div className="jankyInput"> */}
                            <div className="inputBackground">
                                <span
                                    onInput={this.handleFormChange.bind(this)}
                                    // onClick={}
                                    className="resolution editableDiv"
                                    data-field="resolution"
                                    contentEditable="true"
                                ></span></div>
                            <p className="selectField">every day for &nbsp;
                                <div className="styledSelect styled-select blue semi-square">
                                <select htmlFor="duration" name="duration">
                                    <option value="10 Days">10 Days</option>
                                    <option value="30 Days" selected="selected">30 Days</option>
                                    <option value="60 Days">60 Days</option>
                                    <option value="90 Days">90 Days</option>
                                </select>
                                </div>

                            </p>
                            <p>because &nbsp;</p>
                            <div className="inputBackground">
                                <span
                                    onInput={this.handleFormChange.bind(this)}
                                    className="resolution editableDiv"
                                    data-field="reason"
                                    contentEditable="true"
                                ></span></div>
                            
                        </span>
                    </div>
                    <button>Set Goal</button>
                </form>
                <CategoryImage category={this.props.match.params.category} ></CategoryImage>

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