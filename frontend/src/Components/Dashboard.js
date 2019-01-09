import React, {Component} from 'react';
import './Dashboard.css';

class GoalBlock extends Component {
    render() {
        return (
            <div className="GoalBlock">
                
            </div>
        )
    }
}

class DashboardDisplay extends Component {
    // componentwillmount of api calls to goals
    render() {
        return (
            <div>
                <GoalBlock></GoalBlock>
                <GoalBlock></GoalBlock>
                <GoalBlock></GoalBlock>
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
                <DashboardDisplay></DashboardDisplay>
            </div>
            
        )
    }
}

export default Dashboard;