import React, {Component} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
// import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css'


import authLogo from '../images/authLogo.png';
import './Login.css';
import {ScaleLoader} from 'react-spinners';
import { css } from '@emotion/core';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    position: fixed;
    left: 50%;
    top : 50%;
    z-index : 9999;
    transform : translate(-50px, -50px);
`;

class Login extends Component {
    
    state = {
        emailId : '',
        password : '',
        loginState : false,
        loading : false
    }

    componentDidMount = () => {
        console.log(localStorage.loginState);
        if(localStorage.loginState){
            this.setState({
                loginState : true
            })
        }
    }

    loginHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        axios.post('/users/login', {
            emailId : this.state.emailId,
            password : this.state.password
        })
        .then(res => {
            if(res.data.error === "failure"){
                toast.error("User not exists", {
                    position: toast.POSITION.TOP_LEFT
                });
            }else if(res.data.error === "invalid"){
                toast.error("Invalid email and password", {
                    position: toast.POSITION.TOP_LEFT
                });
            }else{
                
                localStorage.setItem("userToken", res.data);                          
                localStorage.setItem('loginState', true);
                this.setState ({
                    loginState : true
                })
                toast.success("Successfully Logged In", {
                    position: toast.POSITION.TOP_LEFT
                });

                // this.getUserData();
                // return res.data;
            }
            this.setState({ loading: false })
        })
        .catch(err => {
            console.log(err);
        })
    }

    // getUserData = () => {
    //     axios.get('/users/getuser', {
            
    //     })
    // }

    render () {
        if((localStorage.userToken !== undefined || localStorage.userToken !== null) && this.state.loginState){
            return <Redirect to = "/dashboard" />
        }
        return (
            <div className = "Banner">
                {/* <Loading show = {this.state.show} color = "red"/> */}
                <div className = {this.state.loading ? "show-overlay" : "hide-overlay"}>
                <ScaleLoader
                css  = {override}
                sizeUnit={"px"}
                size={150}
                color={'#123abc'}
                loading={this.state.loading}
                />
                </div>
                <div className = "left">
                    <div className = "banner-content">
                        <div className = "banner-content-text">
                            <h2>Create free invoice and make work easy</h2>
                            <NavLink to ="/signup">
                            Get Account Now
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className = "right">
                    <div className = "Login">
                        <div className = "wrapper">
                            <div className = "logo">
                            <img src = {authLogo} alt = "Invoicely" />
                            </div>
                            <form onSubmit = {this.loginHandler.bind(this)}>
                            <div className = "form">
                            <div className = "row">
                                <label>
                                Email ID
                                </label>
                                <input type ="text" value = {this.state.emailId} onChange = {(event)=> {this.setState({emailId : event.target.value})}}/>
                            </div>
                            <div className = "row">
                                <label>
                                Password
                                </label>
                                <input type ="password" value = {this.state.password} onChange = {(event)=> {this.setState({password : event.target.value})}}/>
                            </div>
                            <div className = "row">
                                <button className = "login-btn" type="submit">Sign In</button>
                            </div>
                            </div>
                            </form>
                            <div className = "sign-up-or">
                            <hr className = "bar" />
                            <span>OR</span>
                            <hr className = "bar" />
                            </div>
                            <div className = "sign-up-toggler">
                            <NavLink to = "/signup">Create an account</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;