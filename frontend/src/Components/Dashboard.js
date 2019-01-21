import React, {Component} from 'react';
import './Dashboard.css';
import './Transitions.css';
import {connect} from "react-redux";
import {
    Route,
    NavLink,
    Link
} from "react-router-dom";
import GoalDetail from './GoalDetail/GoalDetail';
import GoalType from './GoalType';
import CheckIn from './CheckIn';
import GoalCreate from './GoalCreate';
import GoalCompletion from './GoalDetail/GoalCompletion';
import personal_logo from './media/Monday/Balloon_logo.png';
import health_logo from './media/Monday/Cactus_logo.png';
import prof_logo from './media/Monday/Geo_logo.png';
const axios = require('axios');

class GoalBlock extends Component {

    render() {
        let categoryIcon;
        if (this.props.category === "HEALTH") {
            categoryIcon = health_logo;
        } else if (this.props.category === "PERSONAL") {
            categoryIcon = personal_logo;
        } else {
            categoryIcon = prof_logo;
        }
        return (
            <Link to={`/dashboard/goals/${this.props.pk}`} className="goal-block-links">
            <div className="GoalBlock">
                 <div className="category">
                    
                    <img src={categoryIcon} alt="health_logo"></img>

                </div>
                
                <div className="resolution">
                    <div className="goalblock-title">
                        <h2>ASPIRATION</h2>
                    </div>
                    
                    <p>{ this.props.resolution }</p>
                </div>
                
                
                <div className="reason">
                    <div className="goalblock-title">
                        <h2>PURPOSE</h2>
                    </div>
                    
                    <p>{ this.props.reason }</p>

                </div>
                
            </div>
            </Link>
        )
    }
}

class DashboardGoalDisplay extends Component {
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
            url: `${process.env.REACT_APP_API_URL}/api/goals/`,
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
                        category={ goals[i].category }
                        pk={ goals[i].pk }
                        key={i}
                        >
                    </GoalBlock>
                );
            }

        }

        return (
            <div>
                {goalBlocks}
            </div>
        )
    }
}
function AddGoalButton() {
    return (
        <div className="AddGoalButton">
            <Link to="/dashboard/create-goal/"><button>+</button></Link>

        </div>
    );
}


class DashboardHeader extends Component {
    render() {
        
            return (
                <div className="header">
                    <div className="tabs">
                        <div><NavLink to="/dashboard/goals/" activeClassName="selected">Goals</NavLink></div>
                        <div><NavLink to="/dashboard/create-goal/" activeClassName="selected">Cr</NavLink></div>

                    </div>
                    <AddGoalButton></AddGoalButton>
                </div>
            );
        
    }
}

class Dashboard extends Component {
    render() {
        return (
                <div className="Dashboard">

                    <DashboardHeader goBack={this.props.history.goBack} url={this.props.location.pathname} token={this.props.token}></DashboardHeader>
                        <Route
                            exact path="/dashboard/goals/"
                            render={(props) => <DashboardGoalDisplay {...props} token={this.props.token}/>}
                            />
                        <Route exact path="/dashboard/create-goal/" component={GoalType} />
                        <Route exact path="/dashboard/create-goal/:category/" component={GoalCreate} />
                        <Route exact path="/dashboard/goals/:id/" component={GoalDetail} />
                        <Route exact path="/dashboard/goal-accomplished/:id/" component={GoalCompletion} />
                        <Route path="/dashboard/goals/:id/check-in/" component={CheckIn} />
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


export default connect(mapStateToProps)(Dashboard);