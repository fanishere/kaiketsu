import React, {Component} from 'react';
import './Dashboard.css';
import {connect} from "react-redux";
const axios = require('axios');

class GoalBlock extends Component {
    render() {
        return (
            <div className="GoalBlock">
                
            </div>
        )
    }
}

class DashboardDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goals: [],
        }
    }

    componentDidMount() {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": `Token ${this.props.token}`
        };
        return axios({
            url: 'http://localhost:8000/api/goals/',
                method: 'GET',
                headers: headers
            }).then(res => {
            if (res.status === 200) {
                console.log(res);
                this.setState({
                    goals: res.data
                })
                return res.data;
    
            } else if (res.status >= 400 && res.status < 500) {
                throw res.data;
            }
    
            });
    }


    render() {
        let goalBlocks = [];
        if (this.state.goals) {
            let goals = this.state.goals;
            for (let i = 0; i < goals.length; i ++) {
                goalBlocks.push(
                    <GoalBlock
                        resolution={ goals[i].resolution }
                        reason={ goals[i].reason}
                        duration={ goals[i].duration }
                        category={ goals[i].duration }
                        key={i}
                        >
                    </GoalBlock>
                );
            }
            console.log(goalBlocks);

        }

        return (
            <div>
                {goalBlocks}
            </div>
        )
    }
}

class DashboardHeader extends Component {
    render() {
        return (
            <div className="header">
                <div className="tabs">
                    <div><span>Goals</span></div>
                    <div><span>Progress</span></div>
                </div>
            </div>
        )
    }
}

class Dashboard extends Component {
    render() {
        return (
            <div className="Dashboard">
                <DashboardHeader></DashboardHeader>
                <DashboardDisplay token={this.props.token}></DashboardDisplay>
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


export default connect(mapStateToProps)(Dashboard);