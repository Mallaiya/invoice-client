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
        reason : '',
        pdfSrc: '',
        subject : '',
        to : '',
        content: '',
        cc : ''   
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

    setData = (data) => {
        console.log(data);
        this.setState({
            reason : data.reason,
            pdfSrc: data.pdfSrc,
            subject : data.subject,
            to : data.to,
            content: data.content,
            cc : data.cc  
        })
        console.log(this.state);
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
                                        <td><span data-toggle="modal" data-target={data.type ==="mail" ? "#mailModal" : "#contentModal" } className = "view" onClick = {()=> this.setData(data)}>More</span></td>
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
                <div className="modal fade" id="mailModal" role="dialog">
                    <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title text-center">Mail Details</h4>
                                <p class="card-text">To  : {this.state.to}</p>
                                <p class="card-text">Cc  : {this.state.cc}</p>
                                <p class="card-text">Subject  : {this.state.subject}</p>
                                <p class="card-text">Reason  : {this.state.reason}</p>
                            </div>
                        </div>
                           <iframe src={this.state.pdfSrc} title = "mailInvoice" width="auto" height="150px"></iframe>
                        </div>
                    </div>  
                    </div>
                </div>
                <div className="modal fade" id="contentModal" role="dialog">
                    <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title text-center">Details</h4>
                                    <p class="card-text">Reason  : {this.state.reason}</p>
                                </div>
                            </div>
                            <iframe src={this.state.pdfSrc} title = "mailInvoice" width="auto" height="150px"></iframe>
                        </div>
                    </div>  
                    </div>
                </div>
            </div>
        )
    }
}

export default Action;