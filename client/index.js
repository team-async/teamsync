import React from 'react';
import {render} from 'react-dom';
import App from './components/app.jsx';
import {Route, Link, BrowserRouter as Router, IndexRoute, Switch} from 'react-router-dom';
import Home from './components/home.jsx'

import './style/styles.css';

render(
    <Router>
        <Switch>
        <Route exact path="/" component={App}/>
        <Route path='/home' component={Home}/>
        </Switch>
     </Router>,
     document.getElementById('root')
);