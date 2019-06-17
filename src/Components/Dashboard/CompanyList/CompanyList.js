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
        isData : false,
        data : [],
        pdfSrc : '',
        companyName : ''
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
            emailId : decoded.emailId,
            companyName : decoded.companyName
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
                        <th>View / Print</th>
                        <th>Download</th>
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
                                        <td><a href = {data.pdfSrc} data-toggle="modal" data-target="#myModal" className = "view" onClick = {() => this.pdfHandler(data.pdfSrc)}>View / Print</a></td>
                                        <td><a href = {data.pdfSrc} className = "download" download>Download</a></td>
                                        <td><span className = "delete" onClick = {(event) => this.deleteHandler(data._id)}>Delete</span></td>
                                    </tr>
                                )
                            }) : 
                            <tr>
                                <td colSpan = "9" className = "text-center">No Data</td>
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
            </div>
        )
    }

}

export default CompanyList; 