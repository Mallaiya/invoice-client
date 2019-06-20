import React, {Component} from 'react';

import Invoice from '../Invoice/Invoice';
// import htmlcanvas from 'html2canvas';
// import PdfContainer from '../PdfContainer';
// import Doc from '../DocService';

class InvoiceView extends Component {
    state = {
        companyName : 'Your Company Name',
        invoiceName : 'INVOICE',
        addressLine : ['123 Your Street','Your Town','Address Line 3'],
        invoiceDate : '6-June-2019',
        invoiceNumber : 'Invoice #2334889',
        poNumber : 'PO 456001200',
        phoneNumber : '(123) 456 789',
        mailId : 'email@yourcompany.com',
        clientName : 'Att: Ms. Jane Doe',
        clientCompanyName : 'Client Company Name',
        invoiceContent : 'Dear Ms. Jane Doe,\nPlease find below a cost-breakdown for the recent work completed. Please make payment at your earliest convenience, and do not hesitate to contact me with any questions\n\nMany thanks,\nYour Name',
        invoiceGreetingContent : 'Many thanks for your custom! I look forward to doing business with you again in due course.\n\nPayment terms: to be received within 60 days.'
      }
      
        setAddressLine = (addressLineRef)=> {
          this.setState({
            addressLine : addressLineRef
          });
        }
    
        OnChangeEventHandler = (event) => {
          let name = event.target.name;
          let value = event.target.value;
          // console.log(name);
    
          if(name.includes("addressLine")){
            let addressLineRef = this.state.addressLine;
            if(name.includes("1")){
              addressLineRef[0] = value;
              this.setAddressLine(addressLineRef);
            }else if(name.includes("2")){
              addressLineRef[1] = value;
              this.setAddressLine(addressLineRef);
            }else{
              this.setAddressLine(addressLineRef);
              addressLineRef[2] = value;
              this.setAddressLine(addressLineRef);
            }
            
            // console.log(this.state);
          }else{
            this.setState({
              [name] : value
            });
            console.log(this.state);
          }
        }
        
        render () {
            return (
                
                  <Invoice 
            data = {this.state}
            changeEventHandler = {this.OnChangeEventHandler.bind(this)}
            />
                
            )
        }
}

export default InvoiceView;