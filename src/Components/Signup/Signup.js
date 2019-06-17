import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'
import authLogo from '../images/authLogo.png';
import './Signup.css';

class Signup extends Component {

    state = {
        userName : '',
        emailId : '',
        companyName : '',
        designation : '',
        password : '',
        confirmPassword : '',
        userNameError : '',
        emailIdError : '',
        companyNameError : '',
        designationError : '',
        passwordError : '',
        confirmPasswordError : '' ,
        isEntered : false
    }

    signupFormHandler = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        this.setState({
            [name] : value
        })
    }

    formValidate = (event) => {
        this.setState({
            isEntered : true
        })
        console.log(this.state.designation);
        switch(event.target.name) {
            case 'userName' :
                if(this.state.userName.length<3){
                    this.setState({
                        userNameError : "Username should be more than 3 characters"
                    })
                    toast.error("Username should be more than 3 characters", {
                        position: toast.POSITION.TOP_LEFT
                    });
                }else{
                    this.setState({
                        userNameError : ""
                    })
                }
                break;
            case 'emailId' :
                    if(!this.state.emailId.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)){
                        this.setState({
                            emailIdError : "Invalid email"
                        })
                        toast.error("Invalid email", {
                            position: toast.POSITION.TOP_LEFT
                        });
                    }else{
                        this.setState({
                            emailIdError : ""
                        })
                    }
                    break;
            case 'companyName' :
                    if(this.state.companyName.length === 0){
                        this.setState({
                            companyNameError : "Company Name should not be empty"
                        })
                        toast.error("Company Name should not be empty", {
                            position: toast.POSITION.TOP_LEFT
                        });
                    }else{
                        this.setState({
                            companyNameError : ""
                        })
                    }
                    break;
            case 'designation' :
                    if(this.state.designation.value === "Select an option" || this.state.designation.value === ""){
                        this.setState({
                            designationError : "Choose designation"
                        })
                        toast.error("Choose designation", {
                            position: toast.POSITION.TOP_LEFT
                        });
                    }else{
                        this.setState({
                            designationError : ""
                        })
                    }
                    break;
            case 'password' :
                    if(this.state.password.length < 6){
                        this.setState({
                            passwordError : "Password should be minimum 6 characters"
                        })
                        toast.error("Password should be minimum 6 characters", {
                            position: toast.POSITION.TOP_LEFT
                        });
                    }else{
                        this.setState({
                            passwordError : ""
                        })
                    }
                    break;
            case 'confirmPassword' :
                    if(this.state.password !== this.state.confirmPassword){
                        this.setState({
                            confirmPasswordError : "Password and Confirm Password does not match"
                        })
                        toast.error("Password and Confirm Password does not match", {
                            position: toast.POSITION.TOP_LEFT
                        });
                    }
                    else if(this.state.confirmPassword.length === 0){
                        this.setState({
                            confirmPasswordError : "Confirm password should not be empty"
                        })
                        toast.error("Confirm password should not be empty", {
                            position: toast.POSITION.TOP_LEFT
                        });
                    }
                    else{
                        this.setState({
                            confirmPasswordError : ""
                        })
                    }
                    break;
            default :
                    break;
        }
        console.log(this.state);
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.userNameError === "", this.state.emailIdError === "", this.state.companyNameError === "",
        this.state.designationError === "", this.state.passwordError === "", this.state.confirmPasswordError === "");
        if(this.state.userNameError === ""
            && this.state.emailIdError === ""
            && this.state.companyNameError === ""
            && this.state.designationError === ""
            && this.state.passwordError === ""
            && this.state.confirmPasswordError === "" 
            && this.state.isEntered === true){
                axios.post('/users/signup', {
                    userName: this.state.userName,
                    emailId: this.state.emailId,
                    companyName: this.state.companyName,
                    designation : this.state.designation,
                    password: this.state.password
                })
                .then(res => {
                    if(res.data.error === "exists"){
                        toast.info("User already exists", {
                            position: toast.POSITION.TOP_LEFT
                        });        
                    }else{
                        this.setState({
                            userName : "",
                            emailId : "",
                            companyName : "",
                            designation : "",
                            password : "",
                            confirmPassword : "",
                            userNameError : "",
                            emailIdError : "",
                            companyNameError : "",
                            designationError : "",
                            passwordError : "",
                            confirmPasswordError : ""
                        })
                        toast.success("Successfully registered", {
                            position: toast.POSITION.TOP_LEFT
                        });
                    }
                })
            }else{
                toast.error("Error in data please check the fields", {
                    position: toast.POSITION.TOP_LEFT
                });
            }
        }
    

    render () {

        return (
            <div className = "Banner">
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
                    <div className = "Signup">
                        <div className = "wrapper">
                            <div className = "logo">
                            <img src = {authLogo} alt = "Invoicely" />
                            </div>
                            <form onSubmit = {this.handleFormSubmit.bind(this)} >
                            <div className = "form">
                            <div className = "row">
                                <label>
                                Enter Username
                                </label>
                                <input type ="text" value = {this.state.userName} name = "userName" onChange = {this.signupFormHandler.bind(this)} onBlur = {this.formValidate.bind(this)}/>
                            </div>
                            <div className = "row">
                                <label>
                                Enter Email ID
                                </label>
                                <input type ="text" value = {this.state.emailId} name = "emailId" onChange = {this.signupFormHandler.bind(this)} onBlur = {this.formValidate.bind(this)}/>
                            </div>
                            <div className = "row">
                                <label>
                                Enter Company Name
                                </label>
                                <input type ="text" value = {this.state.companyName} name = "companyName" onChange = {this.signupFormHandler.bind(this)} onBlur = {this.formValidate.bind(this)}/>
                            </div>
                            <div className = "row">
                                <label>
                                Choose Designation
                                </label>
                                <select className="form-control" name = "designation" value ={this.state.designation} onChange = {this.signupFormHandler.bind(this)} onBlur = {this.formValidate.bind(this)}>
                                    <option>Select an option</option>
                                    <option>CEO</option>
                                    <option>CTO</option>
                                    <option>Manager</option>
                                    <option>Analyst</option>
                                    <option>Programmer</option>
                                    <option>Trainee</option>
                                </select>
                            </div>
                            <div className = "row">
                                <label>
                                Enter Password
                                </label>
                                <input type ="password" name = "password" value = {this.state.password} onChange = {this.signupFormHandler.bind(this)} onBlur = {this.formValidate.bind(this)}/>
                            </div>
                            <div className = "row">
                                <label>
                                Re-enter Password
                                </label>
                                <input type ="password" name = "confirmPassword" value = {this.state.confirmPassword} onChange = {this.signupFormHandler.bind(this)} onBlur = {this.formValidate.bind(this)}/>
                            </div>
                            <div className = "row">
                                <button className = "signup-btn" type = "submit" >Sign Up</button>
                            </div>
                            </div>
                            </form>
                            <div className = "log-in-or">
                            <hr className = "bar" />
                            <span>OR</span>
                            <hr className = "bar" />
                            </div>
                            <div className = "log-in-toggler">
                            <NavLink to = "/login">Login if already exists</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;