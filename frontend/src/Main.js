import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter,
  Redirect
} from "react-router-dom";
import Register from './Register';
import Loading from './Loading';
 
class Main extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <div className="content">
                        <Route exact path="/" component={Loading}/>
                        <Route path="/register" component={Register}/>
                        
                        <Route exact path="/loading" component={Loading}/>

                    </div>
                </div>
            </HashRouter>
        );
    }
}
 
export default Main;