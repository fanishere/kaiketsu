import React, {Component} from 'react';
import './Dashboard.css';
import {connect} from "react-redux";
import {
    BrowserRouter,
    Route,
    Link,
    NavLink
} from "react-router-dom";
import Loading from './Loading';
const axios = require('axios');

class GoalBlock extends Component {
    render() {
        return (
            <div className="GoalBlock">
                <div className="resolution">
                    <div className="goalblock-title">
                        <h2>RESOLUTION</h2>
                    </div>
                    
                    <p>{ this.props.resolution }</p>
                </div>
                
                <div className="category">
                    <div className="goalblock-title">
                        <h2>CATEGORY</h2>
                    </div>
                    
                    <p>{ this.props.category }</p>
                </div>
                <div className="reason">
                    <div className="goalblock-title">
                        <h2>REASON</h2>
                    </div>
                    
                    <p>{ this.props.reason }</p>

                </div>
                
            </div>
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

class DashboardHeader extends Component {
    render() {
        return (
            <div className="header">
                <div className="tabs">
                    <div><NavLink to="/dashboard/goals" activeClassName="selected">Goals</NavLink></div>
                    <div><NavLink to="/dashboard/progress" activeClassName="selected">Progress</NavLink></div>
                </div>
            </div>
        )
    }
}

class Dashboard extends Component {
    render() {
        return (
            <div className="Dashboard">
                <DashboardHeader token={this.props.token}></DashboardHeader>


            
            
            <Route
                                path="/dashboard/goals"
                                render={(props) => <DashboardGoalDisplay {...props} token={this.props.token}/>}
                            />
                            <Route exact path="/dashboard/progress" component={Loading}/>
                {/* <BrowserRouter>
                    <div>
                        <div className="content">
                            <Route
                                path="/dashboard/goals"
                                render={(props) => <DashboardGoalDisplay {...props} token={this.props.token}/>}
                            />
                            <Route exact path="/dashboard/progress" component={Loading}/>

                        </div>
                    </div>
                </BrowserRouter> */}
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