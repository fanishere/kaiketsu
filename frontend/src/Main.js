import React, { Component } from "react";
import {
    BrowserRouter,
    Route
} from "react-router-dom";
import Register from './Register';
import Loading from './Loading';
import Login from "./Login";
import {Provider, connect} from 'react-redux';
 
class Main extends Component {
    render() {
        return (
           
            <BrowserRouter>
                <div>
                    <div className="content">
                        <Route exact path="/" component={Loading}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        
                        <Route exact path="/loading" component={Loading}/>

                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
 
export default Main;