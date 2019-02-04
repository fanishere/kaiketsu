import React, { Component } from "react";
import './Components/Transitions.css';
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import Welcome from './Components/Registration/Welcome';
import Register from './Components/Registration/Register';
import Loading from './Components/Loading';
import Login from "./Components/Registration/Login";
import Dashboard from './Components/Dashboard';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import kaiApp from "./reducers";
import { CSSTransitionGroup } from "react-transition-group";


let store = createStore(kaiApp, applyMiddleware(thunk));

class Main extends Component {

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
                                transitionAppearTimeout={40}
                                transitionEnterTimeout={40}
                                transitionLeaveTimeout={40}
                                transitionName={'SlideIn'}
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