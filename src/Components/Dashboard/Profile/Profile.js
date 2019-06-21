import React, {Component} from 'react';
import ImageUpload from './ImageUpload';
import jwt_decode from 'jwt-decode';
import './Profile.css';
import userLogo from '../../images/defaultProfile.jpg';
import axios from 'axios';
import {toast} from 'react-toastify';
//import {Redirect} from 'react-router-dom';

class Profile extends Component {
    state = {
        userName : '',
        emailId : '',
        companyName : '',
        designation : '',
        photo : '',
        newUserName : '',
        oldPassword : '',
        newPassword : '',
        confirmPassword : ''
      }

    componentDidMount = () => { 
        this.updatePhoto();
    }

    updatePhoto = () => {
        console.log("Triggered");
        const token = localStorage.userToken;
        const decoded = jwt_decode(token);
        if(token !== undefined && token !== null){
            this.setState({
            userName : decoded.userName,
            emailId : decoded.emailId,
            companyName : decoded.companyName,
            designation : decoded.designation
            })
        
            console.log("Get Photo");
            axios.post('/users/getphoto', {
                emailId : decoded.emailId
            })
            .then(res => {
                if(res){
                    console.log("Get res");
                    this.setState({
                        photo : res.data.photo
                    })
                    this.render();
                    this.forceUpdate();
                }
            })
            .catch(err => {
                console.log("error" + err);
            })
            console.log(this.state);
        }
    }
    componentDidUpdate = () => {
        
    }

    userHandler = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    onPasswordSubmit = () => {

    }

    onUsernameSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        if(this.state.userName !== this.state.newUserName){
            axios.post('/users/change-username',{
                emailId : this.state.emailId,
                newUserName : this.state.newUserName
            })
            .then(res => {
                if(res.data === "success"){
                    this.setState({
                        userName : this.state.newUserName
                    })
                    toast.info("Successfully username changed login in to continue", {
                        position: toast.POSITION.TOP_LEFT
                    });
                    // localStorage.clear();        
                    
                }else{
                    console.log(res);
                    toast.error("Username available give another name", {
                        position: toast.POSITION.TOP_LEFT
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
        }else{
            toast.error("Don't enter same username", {
                position: toast.POSITION.TOP_LEFT
            });
        }
    }

    render () {
        
        return (
            <div className = "Profile">
                <div className = "container-fluid">
                    <div className = "profile-content">
                        <ImageUpload updatePhoto = {this.updatePhoto.bind(this) }/>
                        <div className = 'setting-card'>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Profile</td>
                                    <td><img className = "user-logo" src = {this.state.photo==="null" ? userLogo : this.state.photo} alt ="Profile" /></td>
                                </tr>
                                <tr>
                                    <td>Username</td>
                                    <td>{this.state.userName}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{this.state.emailId}</td>
                                </tr>
                                <tr>
                                    <td>Company Name</td>
                                    <td>{this.state.companyName}</td>
                                </tr>
                                <tr>
                                    <td>Designation</td>
                                    <td>{this.state.designation}</td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        
                    </div>


                    <div className = "profile-content">
                        {/* <div className ="setting-card">
                            <div className = "form-change">
                                <form onSubmit = {this.onUsernameSubmit.bind(this)}>
                                    <h5 className = "text-center text-uppercase mb-3">Change Username</h5>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text">Username</span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Enter new Username" name ="newUserName" onChange = {this.userHandler.bind(this)}/>
                                    </div>
                                    <button className = "btn btn-primary">Change Username</button>
                                </form>
                            </div>    
                        </div> */}
                        {/* <div className = 'setting-card'>
                            <div className = "form-change">
                                <form onSubmit = {this.onPasswordSubmit.bind(this)}>
                                <h5 className = "text-center text-uppercase mb-3">Change Password</h5>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text">Old Password </span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Enter old password" name ="oldPassword" onChange = {this.userHandler.bind(this)}/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text">New Password</span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Enter new password" name ="newPassword" onChange = {this.userHandler.bind(this)}/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text">Confirm Password</span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Reenter new password" name ="confirmPassword" onChange = {this.userHandler.bind(this)}/>
                                    </div>
                                    <button className = "btn btn-primary">Change Password</button>
                                </form>
                            </div>
                        </div> */}
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile; 