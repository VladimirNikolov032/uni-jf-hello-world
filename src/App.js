import React from 'react';
import './App.css';
import Layout from  './components/layout/Layout';
import { Switch } from 'react-router-dom';
import { Login } from './components/authenticateUser/loginUser/Login';
import { AuthenticatedGuardRoute } from './core/vanGuards/AuthenticationGuardRoute';
import { UnAuthenticatedGuardRoute } from './core/vanGuards/UnAuthenticatedGuardRoute';
import { Register } from './components/authenticateUser/registerUser/Register';


function App() {
  return (
    <div className="App">
      <Switch>
        <UnAuthenticatedGuardRoute exact path="/loginUser" component={Login} />
        <UnAuthenticatedGuardRoute exact path="/registerUser" component={Register}/> 
        <AuthenticatedGuardRoute path="/" component={Layout} />
      </Switch> 
    </div>
  );
}

export default App;
