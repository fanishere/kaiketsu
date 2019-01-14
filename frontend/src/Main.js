import React, { Component } from "react";
import {
    BrowserRouter,
    Route
} from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import Welcome from './Components/Welcome';
import Register from './Components/Register';
import Loading from './Components/Loading';
import Login from "./Components/Login";
import Dashboard from './Components/Dashboard';
import { Provider, connect } from 'react-redux';
import thunk from "redux-thunk";
import kaiApp from "./reducers";

let store = createStore(kaiApp, applyMiddleware(thunk));

class Main extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <div className="content">
                            <Route exact path="/welcome" component={Welcome} />
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            <Route path="/dashboard/" component={Dashboard} />
                            <Route exact path="/loading" component={Loading} />

                        </div>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default Main;