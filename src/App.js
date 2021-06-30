import React, {Component} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './Home'

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <section>
                        <Switch>
                            <Route exact path='/' component={Home}/>
                        </Switch>
                    </section>
                </div>
            </Router>
        );
    };
}

export default App;
