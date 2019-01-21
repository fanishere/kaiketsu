import React, { Component } from 'react';
import './Dashboard.css';
import { connect } from "react-redux";
import {
    Route,
    NavLink,
    Link
} from "react-router-dom";
import GoalDetail from './GoalDetail';
import GoalType from './GoalType';
import CheckIn from './CheckIn';
import GoalCreate from './GoalCreate';
import DashboardProgressDisplay from './Progress';
import personal_logo from './media/Monday/Balloon_logo.png';
import health_logo from './media/Monday/Cactus_logo.png';
import prof_logo from './media/Monday/Geo_logo.png';
import plus_logo from './media/Logo/plus-icon-white.png';
import trophy_icon from './media/Icons/trophy-icon.png';
import star_icon from './media/Icons/star-icon.png'
import dashboard_icon from './media/Icons/dashboard-icon.png'

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

                        <p>{this.props.resolution}</p>
                    </div>


                    <div className="reason">
                        <div className="goalblock-title">
                            <h2>PURPOSE</h2>
                        </div>

                        <p>{this.props.reason}</p>

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
            for (let i = 0; i < goals.length; i++) {
                goalBlocks.push(
                    <GoalBlock
                        resolution={goals[i].resolution}
                        reason={goals[i].reason}
                        duration={goals[i].duration}
                        category={goals[i].category}
                        pk={goals[i].pk}
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
        <div className="buttonContainer">
            <div className="AddGoalButton">
                <Link to="/dashboard/create-goal/">
                    <div id="plusIcon">
                        <img src={plus_logo}></img>
                    </div>
                </Link>
                <Link to="/dashboard/create-goal/">
                    {/* need to create an acccurate path */}
                    <div id="trophyIcon">
                        <img src={trophy_icon}></img>
                    </div>
                </Link>
                <Link to="/dashboard/create-goal/">
                    {/* need to create an acccurate path */}
                    <div id="starIcon">
                        <img src={star_icon}></img>
                    </div>
                </Link>
                <Link to="/dashboard/create-goal/">
                    {/* need to create an acccurate path */}
                    <div id="dashboardIcon">
                        <img src={dashboard_icon}></img>
                    </div>
                </Link>

            </div >
        </div>

    );
}

// function AddGoalButton() {
//     return (
//         <div className="AddTrophyButton">
//             <Link to="/dashboard/create-goal/">
//                 {/* need to create an acccurate path */}
//                 <div className="trophyIcon">
//                     <img src={trophy_icon}></img>
//                 </div>
//             </Link>
//         </div>
//     )
// }






class DashboardHeader extends Component {
    render() {
        if ((this.props.url === "/dashboard/goals/") || (this.props.url === "/dashboard/progress/")) {
            return (
                <div className="header">
                    <div className="tabs">
                        <div><NavLink to="/dashboard/goals/" activeClassName="selected">Goals</NavLink></div>
                        <div><NavLink to="/dashboard/progress/" activeClassName="selected">Progress</NavLink></div>
                    </div>
                    <AddGoalButton></AddGoalButton>
                </div>
            );
        }
        return (
            <div className="header back">
                <Link to="/dashboard/goals/">to Dashboard</Link>
                {/* <div onClick={this.props.goBack}> Back </div> */}
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
                    exact path="/dashboard/goals"
                    render={(props) => <DashboardGoalDisplay {...props} token={this.props.token} />}
                />
                <Route exact path="/dashboard/progress/" component={DashboardProgressDisplay} />
                <Route exact path="/dashboard/create-goal/" component={GoalType} />
                <Route exact path="/dashboard/create-goal/:category/" component={GoalCreate} />
                <Route exact path="/dashboard/goals/:id/" component={GoalDetail} />
                <Route path="/dashboard/goals/:id/check-in/" component={CheckIn} />
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


export default connect(mapStateToProps)(Dashboard);