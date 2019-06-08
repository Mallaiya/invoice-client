import React, {Component} from "react";

import './Invoice.css';

import InvoiceList from '../InvoiceList/InvoiceList';

class Invoice extends Component {

    componentDidMount() {
        
    }

    addRow = () => {
        this.child.addRow();
    }

    deleteRow = () => {
        this.child.deleteRow();
    }

    getPDF = () => {
        alert("Under Development");
    }
    render() {
        
       return (
            <div className = "container">
                <div className = "invoiceWidget">
                    <div className = "widget invoiceWidgetRow1">
                        <p>invoiceto.me</p>
                        <p>Edit the template to make invoice →</p>
                    </div>
                    <div className = "widget invoiceWidgetRow2">
                        <p>Generate invoice</p>
                        <button onClick = {this.getPDF.bind(this)}>Get PDF</button>
                    </div>
                    <div className = "widget invoiceWidgetRow3">
                        <p>Resize Table</p>
                        <p className = "addRow" onClick = {this.addRow}>+ Add row</p>
                        <p className = "deleteRow" onClick = {this.deleteRow}>– Delete row</p>
                    </div>
                </div>
                <div className = "invoiceForm">
                    <div className = "row invoiceFormRow1">
                        <div>
                            <input type="text" className="companyName left-align" value={this.props.data.companyName} name = "companyName" onChange = {this.props.changeEventHandler}/>
                        </div>
                        <div>
                            <input type="text" className="invoiceName right-align" value={this.props.data.invoiceName} name = "invoiceName" onChange = {this.props.changeEventHandler}/>
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
                            <input type="text" className="invoiceNumber right-align" value={this.props.data.invoiceNumber} name = "invoiceNumber" onChange = {this.props.changeEventHandler}/>
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
            </div>        
       ); 
    }
}

export default Invoice;