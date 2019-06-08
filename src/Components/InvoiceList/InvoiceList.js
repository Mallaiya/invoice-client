import React, {Component} from 'react';

import './InvoiceList.css';

class InvoiceList extends Component {
    
    state = {
        slNo : '#',
        description : 'Item Description',
        quantity : 'Quantity',
        unitPrice : 'Unit price (€)',
        total : 'Total (€)',
        invoiceDataItem : 
            [
                {
                    description : 'Supporting of in-house project (hours worked)',
                    quantity : 40,
                    unitPrice : 125.00.toFixed(2),
                    total : 5000.00.toFixed(2)
                },
                {
                    description : '',
                    quantity : '',
                    unitPrice : '',
                    total : ''
                },
                { description : '', quantity : '', unitPrice : '', total : '' },
                { description : '', quantity : '', unitPrice : '', total : '' },
                { description : '', quantity : '', unitPrice : '', total : '' },
                { description : '', quantity : '', unitPrice : '', total : '' },
                { description : '', quantity : '', unitPrice : '', total : '' },
                { description : '', quantity : '', unitPrice : '', total : '' }
            ],
        subTotal : 'Subtotal',
        salesTax : 'Sales Tax (20%)',
        totalAmount : 'Total',
        subTotalValue : 5000.00.toFixed(2),
        salesTaxValue : 1000.00.toFixed(2),
        totalAmountValue : 6000.00.toFixed(2)
    }

    componentDidMount() {
        this.props.onRef(this);
    }
    
    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    addRow = () => {
      let addData = { description : '', quantity : '', unitPrice : '', total : '' };
      let invoiceDataAddItem = this.state.invoiceDataItem;
      invoiceDataAddItem.push(addData);
      this.setState({
          invoiceDataItem : invoiceDataAddItem
      });
    }

    deleteRow = () => {
        let invoiceDataRemoveItem = this.state.invoiceDataItem;
        console.log(invoiceDataRemoveItem[invoiceDataRemoveItem.length-1]);
        console.log(invoiceDataRemoveItem[invoiceDataRemoveItem.length-1].description !== "");
        
        if(invoiceDataRemoveItem[invoiceDataRemoveItem.length-1].description === ""
            && invoiceDataRemoveItem[invoiceDataRemoveItem.length-1].quantity === "" 
            && invoiceDataRemoveItem[invoiceDataRemoveItem.length-1].unitPrice === "" ){
                invoiceDataRemoveItem.pop();
                this.setState({
                    invoiceDataItem : invoiceDataRemoveItem
                });
        }
    }

    myMethod = () => {
        console.log("My");
    }

    inv = () => {
        console.log("Call");
    }

    changeEventHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        console.log(name, value)
        this.setState({
            [name] : value
        });
        let salexTaxAmount = 0;
        if(name === 'salesTax'){
            if(value.includes("(")&&value.includes("%)")){
                let indexOfFirst = value.indexOf("(");
                let indexOfLast = value.indexOf("%");
                console.log(indexOfFirst);
                console.log(indexOfLast);
                let salesTaxData = value.substring(indexOfFirst+1, indexOfLast);
                if(!isNaN(salesTaxData) && (salesTaxData>=0&&salesTaxData<=100)){
                    salexTaxAmount = (salesTaxData / 100) * this.state.subTotalValue;

                    console.log(salexTaxAmount);
                   this.setState({
                       salesTaxValue : salexTaxAmount.toFixed(2)
                   })
                }else{
                    this.setState({
                        salesTaxValue : 0.00.toFixed(2)
                    });    
                }   
            }else{
                this.setState({
                    salesTaxValue : 0.00.toFixed(2)
                });    
            }
            let totalAmountValue =  (Number(this.state.subTotalValue) + Number(salexTaxAmount)).toFixed(2);
            this.setState({
                totalAmountValue : totalAmountValue
            });  
        }
        
    }

    changeDataHandler = (event) => { 
        let name = event.target.name;       
        let value = event.target.value;
        let invoiceData = this.state.invoiceDataItem;
        if(name === "description"){
            invoiceData[event.target.id].description = value;
        }else if(name === "quantity" && !isNaN(value)){
            invoiceData[event.target.id].quantity = value;
        }else if(name === "unitPrice" && !isNaN(value)){
            invoiceData[event.target.id].unitPrice = value;
        }
        this.setState({
            invoiceDataItem : invoiceData
        })
        let quantity = this.state.invoiceDataItem[event.target.id].quantity;
        let unitPrice = this.state.invoiceDataItem[event.target.id].unitPrice;
        let total = quantity * unitPrice;
        if(!isNaN(total)){
            invoiceData[event.target.id].total = total.toFixed(2);
        }
        let subTotal = 0;
        for(let i = 0; i < this.state.invoiceDataItem.length;i++){
               subTotal = (Number(subTotal) + Number(this.state.invoiceDataItem[i].total)).toFixed(2);
        }
        this.setState({
            invoiceDataItem : invoiceData,
            subTotalValue : subTotal
        })
        let salexTaxRef = document.querySelector('.salesTax').value;
        console.log(salexTaxRef);
        let salexTaxAmount = 0;        
        if(salexTaxRef.includes("(")&&salexTaxRef.includes("%)")){
            let indexOfFirst = salexTaxRef.indexOf("(");
            let indexOfLast = salexTaxRef.indexOf("%");
            console.log(indexOfFirst);
            console.log(indexOfLast);
            let salesTaxData = salexTaxRef.substring(indexOfFirst+1, indexOfLast);
            console.log(salesTaxData);
            if(!isNaN(salesTaxData) && (salesTaxData>=0&&salesTaxData<=100)){
                salexTaxAmount = (salesTaxData / 100) * subTotal;
               this.setState({
                   salesTaxValue : salexTaxAmount.toFixed(2)
               })
            }else{
                this.setState({
                    salesTaxValue : 0.00.toFixed(2)
                });    
            }   
        }else{
            this.setState({
                salesTaxValue : 0.00.toFixed(2)
            });    
        }
        let totalAmountValue =  (Number(subTotal) + Number(salexTaxAmount)).toFixed(2);
        this.setState({
            totalAmountValue : totalAmountValue
        })
    }

    render () {
        return (
                <div className = "row invoiceFormRow8">
                            <table>
                                <thead>
                                    <tr>
                                        <th className = "tab-col-1">
                                            <input type ="text" className = "inp-col-head" name = "slNo" value = {this.state.slNo} onChange = {this.changeEventHandler.bind(this)} />
                                        </th>
                                        <th className="tab-col-2">
                                            <input type ="text" className = "inp-col-head" name = "description" name = "invoiceDataItem[index].slNo"value = {this.state.description} onChange = {this.changeEventHandler.bind(this)} />    
                                        </th>
                                        <th className = "tab-col-3" >
                                            <input type ="text" className = "inp-col-head" name = "quantity" value = {this.state.quantity} onChange = {this.changeEventHandler.bind(this)} />
                                        </th>
                                        <th className = "tab-col-4">
                                            <input type ="text" className = "inp-col-head" name = "unitPrice" value = {this.state.unitPrice} onChange = {this.changeEventHandler.bind(this)} />
                                        </th>
                                        <th className = "tab-col-5">
                                            <input type ="text" className = "inp-col-head" name = "total" value = {this.state.total} onChange = {this.changeEventHandler.bind(this)} />
                                        </th>
                                    </tr>
                                </thead>    
                                <tbody>
                                    {
                                        this.state.invoiceDataItem.map((data, index) => {
                                            return <tr key = {index}>
                                                <td className = "tab-col-1">
                                                    <input type ="text" className = "inp-col not-allowed" name = "slNo" disabled value = {index+1} id = {index} />
                                                </td>
                                                <td className="tab-col-2">
                                                    <input type ="text" className = "inp-col" name = "description" value = {data.description} id = {index} onChange = {this.changeDataHandler.bind(this)} />    
                                                </td>
                                                <td className = "tab-col-3" >
                                                    <input type ="text" className = "inp-col" name = "quantity" value = {data.quantity} id = {index} onChange = {this.changeDataHandler.bind(this)} />
                                                </td>
                                                <td className = "tab-col-4">
                                                    <input type ="text" className = "inp-col" name = "unitPrice" value = {data.unitPrice} id = {index} onChange = {this.changeDataHandler.bind(this)} />
                                                </td>
                                                <td className = "tab-col-5">
                                                    {
                                                        <input type ="text" className = "inp-col not-allowed" name = "total" disabled value = {data.total === "" ? '-': data.total} id = {index} onChange = {this.changeDataHandler.bind(this, index)} />
                                                    }
                                                </td>    
                                            </tr>
                                        })
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="4">
                                            <input type ="text" className = "inp-col" name = "subTotal" value = {this.state.subTotal} onChange = {this.changeEventHandler.bind(this)} />
                                        </td>
                                        <td colSpan="1">
                                            <input type ="text" className = "inp-col not-allowed" disabled name = "subTotalValue" value = {this.state.subTotalValue} onChange = {this.changeEventHandler.bind(this)} />    
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4">
                                            <input type ="text" className = "inp-col salesTax" name = "salesTax" value = {this.state.salesTax} onChange = {this.changeEventHandler.bind(this)} />
                                        </td>
                                        <td colSpan="1">
                                            <input type ="text" className = "inp-col salesTaxValue not-allowed" disabled name = "salesTaxValue" value = {this.state.salesTaxValue} onChange = {this.changeEventHandler.bind(this)} />    
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4">
                                            <input type ="text" className = "inp-col" name = "totalAmount" value = {this.state.totalAmount} onChange = {this.changeEventHandler.bind(this)} />
                                        </td>
                                        <td colSpan="1">
                                            <input type ="text" className = "inp-col not-allowed" disabled name = "totalAmountValue" value = {this.state.totalAmountValue} onChange = {this.changeEventHandler.bind(this)} />    
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>       
        );
    }
}

export default InvoiceList;