import React, {Component} from "react";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
// import * as jsPDF from 'jspdf'
// import * as html2canvas from 'html2canvas';
import FileSaver from 'file-saver';
import $ from 'jquery';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './Invoice.css';
import PdfContainer from '../PdfContainer';
import Doc from '../DocService';

import InvoiceList from '../InvoiceList/InvoiceList';

class Invoice extends Component {
    state = {
        invoiceName : '',
        userName : '',
        emailId : '',
        companyName : '',
        designation : '',
        file : '',
        pdfSrc : '',
        pdfBlob : '',
        isGenerated : false    
    }

    componentDidMount = () => {
        
        const token = localStorage.userToken;
      if(token !== undefined && token !== null){
        const decoded = jwt_decode(token);
        this.setState({
          userName : decoded.userName,
          emailId : decoded.emailId,
          companyName : decoded.companyName,
          designation : decoded.designation
        })
      }
    }
    componentDidUpdate = () => {
        console.log(this.state);
    }

    addRow = () => {
        this.child.addRow();
    }

    deleteRow = () => {
        this.child.deleteRow();
    }

    

    changeInvoiceName = (event) => {
        console.log(event.target.value);
        this.setState({
            invoiceName : event.target.value
        })
    }
    
    generatePDF = () => {
        // console.log(this.props.data);
        // this.setState({
        //     list : this.child.state,
        //     propsData : this.props.data
        // });

        let dataObj = Object.assign(this.props.data, this.child.state);
        console.log(dataObj);
        console.log(this.state);
        if(this.state.invoiceName !== ""){
            console.log(this.state);
            axios.post('/users/create-pdf', dataObj)
        .then(() => axios.get('/users/fetch-pdf', {responseType : 'blob'}))
        .then((res) => {
            console.log(res);
            console.log(res.data);
            const pdfBlob = new Blob([res.data], {type : 'application/pdf'})
            this.setState({
                pdfBlob : pdfBlob
            })
            console.log(this.state);
            let reader = new FileReader();
            console.log(pdfBlob);
            reader.onloadend = () => {
                this.setState({
                    file: pdfBlob,
                    pdfSrc: reader.result
                });
                
                //Generate data in the database 
                console.log("--------------------------");
                console.log(this.state);
                console.log("--------------------------");
                
                axios.post('/users/invoice-add', {
                    invoiceName : this.state.invoiceName,
                    userName : this.state.userName,
                    emailId : this.state.emailId,
                    designation : this.state.designation,
                    companyName : this.state.companyName,
                    pdfSrc : this.state.pdfSrc    
                })
                .then(res => {
                    console.log(res);
                    if(res.data.status === "success"){
                        toast.success("Invoice generated - View List to see options", {
                            position: toast.POSITION.TOP_LEFT
                        });
                        this.setState({
                            isGenerated : true
                        })
                        
                    }else{
                        toast.error("Invoice generated failed", {
                            position: toast.POSITION.TOP_LEFT
                        });
                    }
                })
                .catch(err => {
                    console.log("err" + err);
                })
            }
                console.log("outside");
            reader.readAsDataURL(pdfBlob);  
            //var url = URL.createObjectURL(pdfBlob);
            // console.log(url);
            // saveAs(pdfBlob, 'newPdf.pdf')
            // console.log(reader.result);
            // console.log("Out");

            
        })
        .catch(err => {
            console.log("error" + err);
        })


        }else{
            toast.error("Change invoice number", {
                position: toast.POSITION.TOP_LEFT
            });
        }
        
        
    }
      createPdf = (html) => Doc.createPdf(html);
    render() {
       return (
            <div className = "Invoice" >
                <div className = "container">
                <div className = "invoiceWidget">
                    <div className = "widget invoiceWidgetRow1">
                        <p>invoiceto.me</p>
                        <p>Edit the template to make invoice →</p>
                    </div>
                    <div className = "widget invoiceWidgetRow2">
                        <p>Generate invoice</p>
                        <button onClick = {this.generatePDF.bind(this)}>Generate</button>
                        {/* <button >Direct Download</button> */}
                    </div>
                    <div className = "widget invoiceWidgetRow3">
                        <p>Resize Table</p>
                        <p className = "addRow" onClick = {this.addRow}>+ Add row</p>
                        <p className = "deleteRow" onClick = {this.deleteRow}>– Delete row</p>
                    </div>
                </div>
                <PdfContainer createPdf={this.createPdf}>
                <div className = "invoiceForm" id="invoiceGenerate">
                    <div className = "row invoiceFormRow1">
                        <div>
                            <input type="text" className="companyName left-align" value={this.props.data.companyName} name = "companyName" onChange = {this.props.changeEventHandler}/>
                        </div>
                        <div>
                            <input type="text" className="invoiceName right-align" value={this.props.data.invoiceName} name = "invoiceName" onChange = {this.props.changeEventHandler} />
                        </div>
                    </div>
                    <div className = "row invoiceFormRow2">
                        <div>
                            <input type="text" className="addressLine left-align" value={this.props.data.addressLine[0]} name = "addressLine1" onChange = {this.props.changeEventHandler}/>
                        </div>
                        <div>
                            <input type="text" className="invoiceDate right-align" value={this.props.data.invoiceDate} name = "invoiceDate" onChange = {this.props.changeEventHandler}/>
                        </div>
                    </div>
                    <div className = "row invoiceFormRow3">
                        <div>
                            <input type="text" className="addressLine left-align" value={this.props.data.addressLine[1]} name = "addressLine2" onChange = {this.props.changeEventHandler}/>
                        </div>
                        <div>
                            <input type="text" className="invoiceNumber right-align" value={this.props.data.invoiceNumber} name = "invoiceNumber" onChange = {this.props.changeEventHandler} onBlur = {this.changeInvoiceName.bind(this)}/>
                        </div>
                    </div>
                    <div className = "row invoiceFormRow4">
                        <div>
                            <input type="text" className="addressLine left-align" value={this.props.data.addressLine[2]} name = "addressLine3" onChange = {this.props.changeEventHandler}/>
                        </div>
                        <div>
                        <input type="text" className="poNumber right-align" value={this.props.data.poNumber} name = "poNumber" onChange = {this.props.changeEventHandler}/>
                        </div>
                    </div>
                    <div className = "row invoiceFormRow5">
                        <div>
                            <input type="text" className="phoneNumber left-align" value={this.props.data.phoneNumber} name = "phoneNumber" onChange = {this.props.changeEventHandler}/>
                        </div>
                        <div>
                            <input type="text" className="clientName right-align" value={this.props.data.clientName} name = "clientName" onChange = {this.props.changeEventHandler}/>
                        </div>
                    </div>
                    <div className = "row invoiceFormRow6">
                        <div>
                            <input type="text" className="mailId left-align" value={this.props.data.mailId} name = "mailId" onChange = {this.props.changeEventHandler}/>
                        </div>
                        <div>
                            <input type="text" className="clientCompanyName right-align" value={this.props.data.clientCompanyName} name = "clientCompanyName" onChange = {this.props.changeEventHandler}/>
                        </div>
                    </div>
                    <hr />
                    <div className = "row invoiceFormRow7">
                        <textarea className="growfield invoiceContent" value={this.props.data.invoiceContent} name = "invoiceContent" onChange = {this.props.changeEventHandler}></textarea>
                    </div>
                    <InvoiceList onRef = {ref => (this.child = ref)}/>
                    <div className = "row invoiceFormRow9">
                        <textarea className="growfield invoiceContent greeting" value={this.props.data.invoiceGreetingContent} name = "invoiceGreetingContent" onChange = {this.props.changeEventHandler}></textarea>
                    </div>
                    
                </div>
                </PdfContainer>
            </div>
            <div id="canvasImg" className="thumbnail"></div>
            </div>       
       ); 
    }
}

export default Invoice;