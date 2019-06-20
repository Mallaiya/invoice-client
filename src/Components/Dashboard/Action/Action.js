import React, {Component} from 'react';
import './Action.css';

import axios from 'axios';
//import {toast} from 'react-toastify';
import jwt_decode from 'jwt-decode';
const $ = require('jquery');

class Action extends Component {

    state = {
        data : [],
        emailId : '',
        userName : '',
        companyName : '',
    }


    componentDidMount = () => {
        $(document).ready(function(){
            $("#myInput").on("keyup", function() {
              var value = $(this).val().toLowerCase();
              $("#myTable tr").filter(function() {
                return (
                      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                )
              });
            });
          });
        const token = localStorage.userToken;
        const decoded = jwt_decode(token);
        if(token !== undefined && token !== null){
          this.setState({
            emailId : decoded.emailId,
            companyName : decoded.companyName,
            userName : decoded.userName
          })
        }
        axios.get('/users/invoice-action' ,{
            params : {
                companyName : decoded.companyName
            }
        }).then(res => {
            console.log(res);
            if(res.data !== "error"){
                this.setState({
                    data : res.data
                })
            }
                console.log(this.state);
                console.log(res.data);
        })
    }
    

    render () {
        return (
            <div className = "Action">
                <div className = "table-container">
                <input className="form-control" id="myInput" type="text" placeholder="Search.." />
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Sl No.</th>
                        <th>Invoice Name</th>
                        <th>Action Username</th>
                        <th>Action Email ID</th>
                        <th>Action Type</th>
                        <th>Action Date</th>
                        <th>Action Time</th>
                        <th>More</th>
                    </tr>
                    </thead>
                    <tbody id="myTable">
                        {
                            this.state.data.length !== 0 ? 
                            this.state.data.map((data, index) => {
                                return (
                                    <tr key = {index}>
                                        <td>{index+1}</td>
                                        <td>{data.invoiceName}</td>
                                        <td>{data.userName}</td>
                                        <td>{data.emailId}</td>
                                        <td className ="text-capitalize">{data.type}</td>
                                        <td>{data.createdDate}</td>
                                        <td>{data.createdTime}</td>
                                        <td><span data-toggle="modal" data-target="#myModal" className = "view">More</span></td>
                                    </tr>
                                )
                            }) : 
                            <tr>
                                <td colSpan = "8" className = "text-center">No Data</td>
                            </tr>
                        }      
                    </tbody>
                </table>
                </div>
            </div>
        )
    }
}

export default Action;