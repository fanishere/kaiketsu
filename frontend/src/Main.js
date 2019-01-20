import React, { Component } from "react";
import './Components/Transitions.css';
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import Welcome from './Components/Welcome';
import Register from './Components/Register';
import Loading from './Components/Loading';
import Login from "./Components/Login";
import Dashboard from './Components/Dashboard';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import kaiApp from "./reducers";
import { CSSTransitionGroup } from "react-transition-group";


let store = createStore(kaiApp, applyMiddleware(thunk));

class Main extends Component {
    transitionNamePicker(location) {
        if (location.includes('/dashboard/')) {
            return 'SlaAAAAAAAAAA';
        }
        return 'SlideIn';
    }
    render() {

        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Route render={({ location }) => (            
                        <div className="content">                
                            <CSSTransitionGroup
                                transitionAppear={true}
                                transitionEnter={true}
                                transitionLeave={true}
                                transitionAppearTimeout={400}
                                transitionEnterTimeout={400}
                                transitionLeaveTimeout={400}
                                transitionName={this.transitionNamePicker(location.pathname)}
                            >
                                <Switch location={ location } key={ location.key }>
                                    <Route exact path="/" component={Welcome} />
                                    <Route path="/login/" component={Login}/>
                                    <Route path="/register/" component={Register}/>
                                    <Route path="/dashboard/" component={Dashboard}/>
                                    <Route exact path="/loading/" component={Loading}/>
                                </Switch>
                            </CSSTransitionGroup>
                            
                        </div>
                    )}/>

                </BrowserRouter>
            </Provider>
        );
    }
}

export default Main;