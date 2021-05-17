import React, {Fragment} from 'react';
import LandingPage from './components/LandingPage'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';

import './css/App.css';
import './css/media.css';
import './css/landing.css';
import './css/utilities.css';
import './css/navbar.css';
import './css/auth.css';

const  App = () => {
    return (
    <Fragment>
    <Navbar/>
    <Route exact path='/' component={LandingPage} />
    <section className="">
        <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login}/>
        </Switch>
    </section>
    </Fragment>
    )
}

export default App;
