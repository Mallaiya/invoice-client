import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Components/Dashboard/Dashboard'
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';


class App extends Component {



  state = {
    loginState : false
  } 

  updateLoginStateHandler = () => {
    console.log(!this.state.loginState);
    this.setState({
      loginState : !this.state.loginState
    }) 
    return this.state.loginState;
  }

  render () { 
       return (
      <Router >
      <div className = "App">
          <Switch >
          <Route path = "/" exact  render = {() => <Redirect to ="/login" />}/>
          <Route path = "/login" exact render = {() => <Login />} />
          <Route path = "/signup" exact render = {()=> <Signup/>}/>
          <Route  path = "/dashboard" exact render = {() => <Dashboard />} />
          <Route  path = "/dashboard/profile" exact render = {() => <Dashboard />} />
          <Route  path = "/dashboard/create" exact render = {() => <Dashboard />} />
          <Route  path = "/dashboard/personal" exact render = {() => <Dashboard />} />
          <Route  path = "/dashboard/company" exact render = {() => <Dashboard />} />
          <Route  path = "/dashboard/action" exact render = {() => <Dashboard />} />
          </Switch>
        <ToastContainer />
      </div>
      </Router>
    );
  }
}

export default App;