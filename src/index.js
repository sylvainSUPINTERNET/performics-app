import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Route, BrowserRouter as Router} from 'react-router-dom';

import App from './App';
import {FormNewUser, ShowUser} from "./services/User";
import Menu from "./partials/Menu";

ReactDOM.render((
    <Router>
        <div>
            {/* Partial menu */}
            <Menu/>

            {/* Routes */}
            <Route exact path="/" component={App}/>
            <Route exact path="/user/add" component={FormNewUser}/>
            <Route exact path="/users/:id" component={ShowUser}/>
        </div>
    </Router>
), document.getElementById('root'));

serviceWorker.unregister();
