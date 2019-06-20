import React, {Component} from 'react';

import './CompanyList.css';
import axios from 'axios';
import {toast} from 'react-toastify';
import jwt_decode from 'jwt-decode';
const $ = require('jquery');
$.DataTable = require('datatables.net');

class CompanyList extends Component {
   
    state = {
        emailId : '',
        userName : '',
        isData : false,
        data : [],
        pdfSrc : '',
        companyName : '',
        receiversMailId : '',
        mailSubject : '',
        mailContent : '',
        mailCc : '',
        reason : ''
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
        axios.get('/users/invoice-get-company' ,{
            params : {
                companyName : decoded.companyName
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
    
    
    invoiceHandler = (invoiceName, pdfSrc) => {

        this.setState({
            invoiceName : invoiceName,
            pdfSrc : pdfSrc
        })
    }

    printHandler = (pdfSrc) => {
        this.setState({
            pdfSrc : pdfSrc
        })
    }
    
    outHandler = () => {

        var printContents = document.getElementById("printableArea");
        
        
        printContents.contentWindow.focus();
        console.log(printContents.contentWindow);
   
        
    }

    stateHandler = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    sendMail = () => {
        console.log(this.state);
        if(this.state.reason !== "") {
            axios.post('/users/send-mail', {
                receiversMailId : this.state.receiversMailId,
                mailSubject : this.state.mailSubject,
                mailContent : this.state.mailContent,
                invoiceName : this.state.invoiceName,
                mailCc : this.state.mailCc
            }).then(res => {
                alert("Mail sending please wait....");
                console.log(res);
                if(res.data === "success"){
                    toast.success("Mail send Successfully", {
                        position: toast.POSITION.TOP_LEFT
                    });
                    this.saveActions("mail");
                    this.setState({
                        receiversMailId : "",
                        mailSubject : "",
                        mailContent : "",
                        invoiceName : "",
                        mailCc : "",
                        reason : ""
                    })
    
                }else{
                    toast.error("Mail not send again later", {
                        position: toast.POSITION.TOP_LEFT
                    });
                    this.setState({
                        receiversMailId : "",
                        mailSubject : "",
                        mailContent : "",
                        invoiceName : "",
                        mailCc : "",
                        reason : ""
                    })
                    
                }
            })
        }else{
            toast.error("Reason should not be empty", {
                position: toast.POSITION.TOP_LEFT
            });
        }
    }

    saveActions = (type) => {
        console.log(this.state.pdfSrc);
        if(this.state.reason !== ""){
            if(type === "mail"){
                axios.post('/users/save-actions',{
                    emailId : this.state.emailId,
                    userName : this.state.userName,
                    companyName : this.state.companyName,
                    pdfSrc : this.state.pdfSrc,
                    receiversMailId : this.state.receiversMailId,
                    mailSubject : this.state.mailSubject,
                    mailContent : this.state.mailContent,
                    invoiceName : this.state.invoiceName,
                    mailCc : this.state.mailCc,
                    reason : this.state.reason,
                    type : type
                }).then(res => {
                    console.log(res);
                    if(res.data === "success"){
                        toast.success("Actions saved successfully", {
                            position: toast.POSITION.TOP_LEFT
                        });    
                    }else{
                        toast.error("OOPS!!! Action problem, retry", {
                            position: toast.POSITION.TOP_LEFT
                        });    
                    }
                })
            }else if(type === "download"){
                axios.post('/users/save-actions',{
                    emailId : this.state.emailId,
                    userName : this.state.userName,
                    companyName : this.state.companyName,
                    pdfSrc : this.state.pdfSrc,
                    invoiceName : this.state.invoiceName,
                    reason : this.state.reason,
                    type : type
                }).then(res => {
                    console.log(res);
                    if(res.data === "success"){
                        toast.success("Actions saved successfully", {
                            position: toast.POSITION.TOP_LEFT
                        });    
                    }else{
                        toast.error("OOPS!!! Action problem, retry", {
                            position: toast.POSITION.TOP_LEFT
                        });    
                    }
                    this.setState({
                        reason : ''
                    })
                })
            }
        }else{
            toast.error("Reason should not be empty", {
                position: toast.POSITION.TOP_LEFT
            });    
        }
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
                        <th>Created Username</th>
                        <th>Created Email ID</th>
                        <th>View</th>
                        <th>Print</th>
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
                                        <td>{data.userName}</td>
                                        <td>{data.emailId}</td>
                                        <td><a href = {data.pdfSrc} data-toggle="modal" data-target="#myModal" className = "view" onClick = {() => this.pdfHandler(data.pdfSrc)}>View</a></td>
                                        <td><span className = "view" onClick = {() => this.printHandler(data.pdfSrc)}>Print</span></td>
                                        <td><span className = "download" data-toggle="modal" data-target="#downloadModal" onClick = {() => this.invoiceHandler(data.invoiceName, data.pdfSrc)}>Download</span></td>
                                        <td><span className = "view" data-toggle="modal" data-target="#mailModal" onClick = {() => this.invoiceHandler(data.invoiceName, data.pdfSrc)}>Send Mail</span></td>
                                        <td><span className = "delete" onClick = {(event) => this.deleteHandler(data._id)}>Delete</span></td>
                                    </tr>
                                )
                            }) : 
                            <tr>
                                <td colSpan = "11" className = "text-center">No Data</td>
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
                            <iframe title ="pdfView" type="application/pdf" src = {this.state.pdfSrc}></iframe>
                        </div>
                    </div>  
                    </div>
                </div>
                <div className="modal fade" id="downloadModal" role="dialog">
                    <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className = "modal-body">
                        <div className="form-group row">
                            <label  className="col-sm-2 col-form-label">Reason for downloading</label>
                                <div className="col-sm-10">
                                    <textarea className="form-control" rows="5" id="comment" name = "reason" value ={this.state.reason} onChange = {this.stateHandler.bind(this)}></textarea>
                                    <a href = {this.state.reason ==="" ?`javascript:void(0)`:this.state.pdfSrc} download  className = "btn download" onClick = {() => this.saveActions("download")}>Download</a>

                            </div>
                        </div>
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
                                    <input type="text" className="form-control" placeholder = "Receiver Mail" name = "receiversMailId" value ={this.state.receiversMailId} onChange = {this.stateHandler.bind(this)}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className ="col-sm-2 col-form-label">Cc</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" placeholder = "Cc Mail" name = "mailCc" value ={this.state.mailCc} onChange = {this.stateHandler.bind(this)}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label  className="col-sm-2 col-form-label">Subject</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" placeholder="Subject" name = "mailSubject" value ={this.state.mailSubject} onChange = {this.stateHandler.bind(this)}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label  className="col-sm-2 col-form-label">Content</label>
                                <div className="col-sm-10">
                                    <textarea className="form-control" rows="5" id="comment" name = "mailContent" value ={this.state.mailContent} onChange = {this.stateHandler.bind(this)}></textarea>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label  className="col-sm-2 col-form-label">Reason for sending mail</label>
                                <div className="col-sm-10">
                                    <textarea className="form-control" rows="5" id="comment" name = "reason" value ={this.state.reason} onChange = {this.stateHandler.bind(this)}></textarea>
                                </div>
                            </div>
                        </div>
                            <button type="button" className="btn btn-success" data-dismiss="modal"  onClick = {this.sendMail.bind(this)}>Send</button>
                    </div>  
                    </div>
                </div>
                {/* <iframe src = {this.state.pdfSrc} id="myFrame" width="550" height="550"/>  */}
                {/* <object type="application/pdf" id="myFrame" data={this.state.pdfSrc} width="600px" height="400px" VIEWASTEXT><p>It appears you don't have a PDF plugin for your browser. <a target="_blank" href="myDoc.pdf">Click here to download the PDF file.</a></p></object> */}
                
                    
                {/* +<iframe id ="printableArea" top-level-url="http://localhost:3000" type="application/pdf" src={this.state.pdfSrc} height="400px" width="800px">Hiiii</iframe> */}
                

            </div>
        )
    }

}

export default CompanyList; 