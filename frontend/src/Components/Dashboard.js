import React, { Component } from 'react';
import './Dashboard.css';
import './Transitions.css';
import { connect } from "react-redux";
import {
    Route,
    NavLink,
    Link
} from "react-router-dom";
import GoalDetail from './GoalDetail/GoalDetail';
import GoalType from './GoalType';
import CheckIn from './CheckIn';
import GoalCreate from './GoalCreate';
import Trophy from './Trophy';
import GoalCompletion from './GoalDetail/GoalCompletion';
import personal_logo from './media/Final/balloon-final-100.png';
import health_logo from './media/Final/caktus-final-100.png';
import prof_logo from './media/Final/mountain-final-100.png';
import plus_logo from './media/Final/plus-icon-final-100.png';
import trophy_icon from './media/Final/trophy-final-100.png';
import dashboard_icon from './media/Final/dashboard-final-100.png';


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
                    <div className="description">
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
            <div className="GoalList">
                {goalBlocks}
            </div>
        )
    }
}
function AddGoalButton() {
    return (
        <div className="footer">
            <div className="buttonContainer">

                <Link to="/dashboard/create-goal/">
                    <div className="plusIcon">
                        <img src={plus_logo}></img>
                    </div>
                </Link>
                <Link to="/dashboard/create-goal/">
                    {/* need to create an acccurate path */}
                    <div className="trophyIcon">
                        <img src={trophy_icon}></img>
                    </div>
                </Link>
                <Link to="/dashboard/create-goal/">
                    {/* need to create an acccurate path */}
                    {/* <div className="starIcon">
                        <img src={star_icon}></img>
                    </div> */}
                </Link>
                <Link to="/dashboard/create-goal/">
                    {/* need to create an acccurate path */}
                    <div className="dashboardIcon">
                        <img src={dashboard_icon}></img>
                    </div>
                </Link>


            </div>
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

        return (
            <div className="header">
                <div className="tabs">
                    <NavLink to="/dashboard/goals/" activeClassName="selected">
                        {/* need to create an acccurate path */}
                        <div className="dashboardIcon">
                            <img src={dashboard_icon} alt="goals dashboard button"></img>
                        </div>
                    </NavLink>
                    <NavLink to="/dashboard/create-goal/" activeClassName="selected">
                        <div className="plusIcon">
                            <img src={plus_logo} alt="create goal button"></img>
                        </div>
                    </NavLink>
                    <NavLink to="/dashboard/achievements/" activeClassName="selected">
                        {/* need to create an acccurate path */}
                        <div className="trophyIcon">
                            <img src={trophy_icon} alt="achievements button"></img>
                        </div>
                    </NavLink>
                    
                    {/* <div><NavLink to="/dashboard/goals/" activeClassName="selected">Goals</NavLink></div>
                    <div><NavLink to="/dashboard/create-goal/" activeClassName="selected">Cr</NavLink></div> */}
                </div>
                {/* <AddGoalButton></AddGoalButton> */}
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
                    render={(props) => <DashboardGoalDisplay {...props} token={this.props.token} />}
                />
                <Route exact path="/dashboard/achievements/" component={Trophy} />
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