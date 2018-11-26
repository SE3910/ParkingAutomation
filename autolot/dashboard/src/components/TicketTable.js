import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import React, {Component, Resource} from "react";
import ReactDOM from "react-dom";
import TicketTableDataProvider from "./TicketTableDataProvider";


const TicketTable = () => (
  <TicketTableDataProvider endpoint="/api/gate" render={data=> data={data}}>
  </TicketTableDataProvider>

);



const wrapper = document.getElementById("ticketTable");
wrapper ? ReactDOM.render(<TicketTable />, wrapper) : null;

