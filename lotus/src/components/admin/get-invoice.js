import React from 'react';
import './invoice.css';
import {useSelector} from 'react-redux';
import {selectuserType} from '../../store/reducers/bookingSlice'

function GetInvoice(){

     const state = useSelector(selectuserType);
     console.log(state);
    return(<div>
        <div class="receipt-content">
        <div class="container bootstrap snippets bootdey">
            <div class="row">
                <div class="col-md-12">
                    <div class="invoice-wrapper">
                        <div class="intro">
                            Hi <strong></strong>, 
                            <br/>
                            This is the receipt for a payment of <strong>R1750.00</strong> 
                        </div>

                        <div class="payment-info">
                            <div class="row">
                                <div class="col-sm-6">
                                    <span>Payment No.</span>
                                    <strong>434334343</strong>
                                </div>
                                <div class="col-sm-6 text-right">
                                    <span>Payment Date</span>
                                    <strong>{state.checkOut}</strong>
                                </div>
                            </div>
                        </div>

                        <div class="payment-details">
                            <div class="row">
                                <div class="col-sm-6">
                                    <span>Client</span>
                                    <strong>
                                        Andres felipe posada
                                    </strong>
                                    <p>
                                        <a href="#">
                                            {state.Customer}
                                        </a>
                                    </p>
                                </div>
                                <div class="col-sm-6 text-right">
                                    <span>Payment To</span>
                                    <strong>
                                        Juan fernando arias
                                    </strong>
                                    <p>
                                        <a href="#">
                                            lotus.co.za
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="line-items">
                            <div class="headers clearfix">
                                <div class="row">
                                    <div class="col-xs-4">Description</div>
                                    <div class="col-xs-3">Quantity</div>
                                    <div class="col-xs-5 text-right">Amount</div>
                                </div>
                            </div>
                            <div class="items">
                                <div class="row item">
                                    <div class="col-xs-4 desc">
                                        Hotel Stay
                                    </div>
                                    <div class="col-xs-3 qty">
                                        {state.numberOfGuests}
                                    </div>
                                    <div class="col-xs-5 amount text-right">
                                        R1750.00
                                    </div>
                                </div>
                            </div>
                            <div class="total text-right">
                                <p class="extra-notes">
                                    <strong>Extra Notes</strong>
                                    Thanks a lot.
                                </p>
                                <div class="field">
                                    Subtotal <span>R{parseInt(state.numberOfGuests) * 1750}</span>
                                </div>
                                
                                <div class="field">
                                    Discount <span>0.0%</span>
                                </div>
                                <div class="field grand-total">
                                    Total <span>R{parseInt(state.numberOfGuests) * 1750}</span>
                                </div>
                            </div>

                            <div class="print">
                                <a href="#">
                                    <i class="fa fa-print"></i>
                                    Print this receipt
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="footer">
                        Copyright © 2020. lotushotel
                    </div>
                </div>
            </div>
        </div>
</div>
    </div>)
}

export default GetInvoice;