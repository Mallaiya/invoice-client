import React, {Component} from 'react';

import './ImageUpload.css';
import defaultProfile from '../../images/defaultProfile.jpg';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {toast} from 'react-toastify';

class ImageUploads extends Component {
    
    state = {
        emailId : '',
        file : '',
        imagePreviewUrl : '',
        photoRef : ''
    }
    
    componentDidMount = () => {
        const token = localStorage.userToken;
        if(token !== undefined && token !== null){
            const decoded = jwt_decode(token);
            this.setState({
                emailId : decoded.emailId
            });
        }
    }

    componentDidUpdate = () => {
       
    }

    onChangeImage = (event) => {
        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
        this.setState({
            file: file,
            imagePreviewUrl: reader.result
        });
        }
        reader.readAsDataURL(file);  
        if(this.state.photoRefs === ''){
            const token = localStorage.userToken;
            if(token !== undefined && token !== null){
                const decoded = jwt_decode(token);
                axios.post('/users/getphoto', {
                    emailId : decoded.emailId
                })
                .then(res => {
                    if(res){
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
    } 

    
    onFormSubmit = (event) => {
        event.preventDefault();
        if(this.state.file !== ''){
            axios.put('/users/uploadphoto', {
                emailId : this.state.emailId,
                photo : this.state.imagePreviewUrl
            })
            .then(res => {
                console.log(res);
                if(res.data.n>0){
                    toast.success("Image uploaded successfully", {
                        position: toast.POSITION.TOP_LEFT
                    });
                    this.setState({
                        imagePreviewUrl : '',
                        file : ''
                    })
                }else{
                    toast.error("Failed to upload image | Try another", {
                        position: toast.POSITION.TOP_LEFT
                    });
                }
            })
            if(this.state.photoRefs === ''){
                const token = localStorage.userToken;
                if(token !== undefined && token !== null){
                    const decoded = jwt_decode(token);
                    axios.post('/users/getphoto', {
                        emailId : decoded.emailId
                    })
                    .then(res => {
                        if(res){
                            this.setState({
                                photo : res.data.photo,
                            })
                        }
                    })
                    .catch(err => {
                        console.log("error" + err);
                    })
                }   
            }
        }else{
            toast.error("Image should not be empty", {
                position: toast.POSITION.TOP_LEFT
            });
        }
        this.props.updatePhoto();      
    }
    
    render () {
        
        return (
            <div className = "imageUpload">
                     <form onSubmit = {this.onFormSubmit.bind(this)}>
                     <div className="custom-file">
                        <input type="file" className="custom-file-input" ref = "file" onChange = {this.onChangeImage.bind(this)} />
                        <label className="custom-file-label" htmlFor="customFile"></label>
                        <input type = "submit" value ="upload" className = "btn btn-custom"/>
                    </div>
                    <div className ="imagePreview">
                    <img src = {this.state.imagePreviewUrl === '' ? defaultProfile : this.state.imagePreviewUrl} alt="Preview"/>
                    <p>Preview</p>
                </div>
                     </form>
         
                
            </div>
        )
    }
    
}

export default ImageUploads;