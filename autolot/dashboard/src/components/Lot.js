import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import React, {Component, Resource} from "react";
import ReactDOM from "react-dom";
import LotDataProvider from "./LotDataProvider";


const Lot = () => (
  <LotDataProvider endpoint="/api/gate?tickets" render={data=> data={data}}>
  </LotDataProvider>


);


const wrapper = document.getElementById("lotData");
wrapper ? ReactDOM.render(<Lot />, wrapper) : null;

