import React, {Fragment} from 'react';
import LandingPage from './components/LandingPage'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
//redux 

//this line that connects react and redux
import {Provider} from 'react-redux'; 
import store from './components/store';

import './css/App.css';
import './css/media.css';
import './css/landing.css';
import './css/utilities.css';
import './css/navbar.css';
import './css/auth.css';

const  App = () => {
    return (

        <Provider store={store}>
        <Route exact path='/' component={LandingPage} />
 
        <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login}/>
        </Switch>

 
  </Provider>
    )
}

export default App;
