import React, {Component} from 'react';

import './PersonalList.css';
import axios from 'axios';
import {toast} from 'react-toastify';
import jwt_decode from 'jwt-decode';
import DownloadLink from "react-download-link";
import { saveAs } from 'file-saver';

// import ReactTable from "react-table";
// import "react-table/react-table.css";
// import matchSorter from 'match-sorter'

//import $ from 'jquery'

const $ = require('jquery');
$.DataTable = require('datatables.net');

class PersonalList extends Component {

    state = {
        emailId : '',
        isData : false,
        data : [],
        pdfSrc : '',
        invoiceName : '',
        receiversMailId : '',
        mailSubject : '',
        mailContent : ''
    }

    componentDidMount = () => {
        $(document).ready(function(){
            $("#myInput").on("keyup", function() {
              var value = $(this).val().toLowerCase();
              $("#myTable tr").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
              });
            });
          });
        const token = localStorage.userToken;
        const decoded = jwt_decode(token);
        if(token !== undefined && token !== null){
          this.setState({
            emailId : decoded.emailId
          })
        }
        // axios.post('/users/getphoto', {
        //     emailId : decoded.emailId
        // })
        // .then(res => {
        //     if(res){
        //         console.log("Get res");
        //         this.setState({
        //             photo : res.data.photo
        //         })
        //     }
        // })
        axios.get('/users/invoice-get' ,{
            params : {
                emailId : decoded.emailId
            }
        }).then(res => {
            console.log(res);
            if(res.data !== "error"){
                this.setState({
                    isData : true,
                    data : res.data
                })
            }
            console.log(this.state);
                console.log(res.data);
        })

    }

    deleteHandler = (id) => {
        console.log(id);
        axios.post('/users/invoice-remove', {
            _id : id
        }).then(res => {
            console.log(res);
            if(res.data.deletedCount === 1){
                toast.success("Successfully Deleted", {
                    position: toast.POSITION.TOP_LEFT
                });
                this.componentDidMount();
            }else{
                toast.error("Error in deleting", {
                    position: toast.POSITION.TOP_LEFT
                });
            }
        })
    }

    pdfHandler = (pdfSrc) => {
        this.setState({
            pdfSrc : pdfSrc
        })
    }    

    invoiceHandler = (invoiceName) => {

        this.setState({
            invoiceName : invoiceName
        })
    }

    printHandler = (pdfSrc) => {
        this.setState({
            pdfSrc : pdfSrc
        })
        var objFra = document.getElementById('myFrame');
        objFra.contentWindow.focus();
        objFra.contentWindow.print();
    }   
    
    mailHandler = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    sendMail = () => {
        console.log(this.state);
        axios.post('/users/send-mail', {
            receiversMailId : this.state.receiversMailId,
            mailSubject : this.state.mailSubject,
            mailContent : this.state.mailContent,
            invoiceName : this.state.invoiceName
        }).then(res => {
            console.log(res);
        })
    }

    // generatePDF = (pdfSrc) => { 
    //         const pdfBlob = new Blob([pdfSrc], {type : 'application/pdf'})
    //         const blobURL = URL.createObjectURL(pdfBlob)
    //         console.log(blobURL);
    //         saveAs(blobURL, 'newPdf.pdf')

    // }

    render () {      
        return (
            <div>
                <div className = "table-container">
                <input className="form-control" id="myInput" type="text" placeholder="Search.." />
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Sl No.</th>
                        <th>Invoice Name</th>
                        <th>Date Created</th>
                        <th>Date Time</th>
                        <th>View / Print</th>
                        <th>Download</th>
                        <th>Send Mail</th>
                        <th>Delete</th>
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
                                        <td>{data.createdDate}</td>
                                        <td>{data.createdTime}</td>
                                        <td><a href = {data.pdfSrc} data-toggle="modal" data-target="#myModal" className = "view" onClick = {() => this.pdfHandler(data.pdfSrc)}>View / Print</a></td>
                                        <td><a href = {data.pdfSrc} className = "download" download>Download</a></td>
                                        <td><span className = "" data-toggle="modal" data-target="#mailModal" className = "view" onClick = {() => this.invoiceHandler(data.invoiceName)}>Send Mail</span></td>
                                        <td><span className = "delete" onClick = {(event) => this.deleteHandler(data._id)}>Delete</span></td>
                                        {/* onClick = {() => this.mailHandler(data.invoiceName)} */}
                                    </tr>
                                )
                            }) : 
                            <tr>
                                <td colSpan = "7" className = "text-center">No Data</td>
                            </tr>
                        }      
                    </tbody>
                </table>
                </div>
                <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <iframe src = {this.state.pdfSrc}></iframe>
                        </div>
                    </div>  
                    </div>
                </div>
                <div className="modal fade" id="mailModal" role="dialog">
                    <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body mail">
                            <div className="form-group row">
                                <label className ="col-sm-2 col-form-label">To</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" placeholder = "Receiver Mail" name = "receiversMailId" onChange = {this.mailHandler.bind(this)}/>
                                </div>
                                </div>
                            <div className="form-group row">
                                <label  className="col-sm-2 col-form-label">Subject</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" placeholder="Subject" name = "mailSubject" onChange = {this.mailHandler.bind(this)}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label  className="col-sm-2 col-form-label">Content</label>
                                <div className="col-sm-10">
                                    <textarea className="form-control" rows="5" id="comment" name="text" name = "mailContent" onChange = {this.mailHandler.bind(this)}></textarea>
                                </div>
                            </div>
                            <button type="button" className="btn btn-success" onClick = {this.sendMail.bind(this)}>Send</button>
                        </div>
                    </div>  
                    </div>
                </div>
                <iframe target = "_self" src = {this.state.pdfSrc} id="myFrame" style = {{display : "none"}}></iframe>
            </div>
        )
    }
}

export default PersonalList; 