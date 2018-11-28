import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import React, {Component, Resource} from "react";
import ReactDOM from "react-dom";
import PaidTicketDataProvider from "./PaidTicketDataProvider";


const PaidTicketTable = () => (
  <PaidTicketDataProvider endpoint="/api/paid" render={data=> data={data}}>
  </PaidTicketDataProvider>

);



const wrapper = document.getElementById("paidTicketTable");
wrapper ? ReactDOM.render(<PaidTicketTable />, wrapper) : null;

