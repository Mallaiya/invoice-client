import React, {Component} from 'react';
import ImageUpload from './ImageUpload';
import jwt_decode from 'jwt-decode';
import './Profile.css';
import userLogo from '../../images/defaultProfile.jpg';
import axios from 'axios';

class Profile extends Component {
    state = {
        userName : '',
        emailId : '',
        companyName : '',
        designation : '',
        photo : ''
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
                }
            })
            .catch(err => {
                console.log("error" + err);
            })
        
        }
    }
    componentDidUpdate = () => {
        
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
                </div>
            </div>
        )
    }
}

export default Profile; 