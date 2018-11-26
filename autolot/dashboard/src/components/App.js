import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import React, {Component, Resource} from "react";
import ReactDOM from "react-dom";
import GateDataProvider from "./GateDataProvider";


const GateData = () =>(
  <GateDataProvider endpoint="/api/gate?tickets" render={data=> data={data}}>
  </GateDataProvider>

);

const App = () => (
     <GateData />
);



const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;

