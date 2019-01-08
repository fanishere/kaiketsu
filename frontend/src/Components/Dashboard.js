import React, {Component} from 'react';
import './Dashboard.css';

class DashboardDisplay extends Component {
    render() {
        return (
            <div>Dashboard</div>
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