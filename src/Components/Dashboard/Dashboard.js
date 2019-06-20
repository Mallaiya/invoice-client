import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect, NavLink} from 'react-router-dom';

import InvoiceView from './InvoiceView/InvoiceView';
import Profile from './Profile/Profile'
import jwt_decode from 'jwt-decode';
import './Dashboard.css';
import dashLogo from '../images/dashLogo.png'
import PersonalList from './PersonalList/PersonalList';
import CompanyList from './CompanyList/CompanyList';
import Action from './Action/Action';
class Dashboard extends Component {  
    
    state = {
      loginState : false,
      designation : ''
    }

    componentDidMount = () => {
      if(localStorage.loginState){
        this.setState({
          loginState : true
        })
      }
      const token = localStorage.userToken;
      if(token !== undefined && token !== null){
        const decoded = jwt_decode(token);
        this.setState({
          designation : decoded.designation
        })
      }
    }

    logoutHandler = () => {
      localStorage.clear();
      this.setState({
        loginState : false
      })
    }

    render () {
        if((localStorage.userToken === undefined || localStorage.userToken === null) && this.state.loginState === false){
          return <Redirect to = "/" />
        }
        return (
          <Router>
            <div className = "Dashboard">
                <div className = "sideNav">
                    <div className = "headerLogo">
                        <img src = {dashLogo} alt ="Invoicely" />
                    </div>
                    <hr className = "logoBreak"/>
                    <div className = "menuItem">
                      <ul>
                        <NavLink to = "/dashboard">
                        <li className = "listItem">
                          Profile
                        </li>
                        </NavLink>
                        <NavLink to = "/dashboard/create">
                        <li className = "listItem">
                          Create Invoice
                        </li>
                        </NavLink>
                        <NavLink to = "/dashboard/personal">
                        <li className = "listItem">
                          Personal Invoice
                        </li>
                        </NavLink>
                        {this.state.designation === "CEO" || this.state.designation === "CTO" ? 
                          <NavLink to = "/dashboard/company">
                          <li className = "listItem">
                            Company Invoice
                          </li>
                          </NavLink> :
                          null
                        }
                        {this.state.designation === "CEO" || this.state.designation === "CTO" ? 
                          <NavLink to = "/dashboard/action">
                          <li className = "listItem">
                            Invoice Action
                          </li>
                          </NavLink> :
                          null
                        }
                      </ul>
                    </div>
                    <div className = "logout">
                      <ul>
                          <li onClick = {this.logoutHandler} className = "listItem">Logout
                        </li>
                      </ul>
                    </div>
                </div>
                <div className = "content">
                  {/* <InvoiceView /> */}
                  {/* <Redirect  strict from = "/dashboard/" to = "/dashboard/profile" /> */}
                  <Route exact path = "/dashboard" render = {() => <Profile />} />
                  <Route exact path = "/dashboard/create" render = {() => <InvoiceView />} />
                  <Route exact path = "/dashboard/personal" render = {() => <PersonalList />} />
                  <Route exact path = "/dashboard/company" render = {() => <CompanyList />} />
                  <Route exact path = "/dashboard/action" render = {() => <Action />} />
                </div>
            </div>
            </Router>
        )
    }
}

export default Dashboard;