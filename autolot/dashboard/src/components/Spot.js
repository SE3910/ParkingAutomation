import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import React, {Component, Resource} from "react";
import ReactDOM from "react-dom";
import SpotDataProvider from "./SpotDataProvider";


const Spot = () => (
  <SpotDataProvider endpoint="/api/gate?tickets" render={data=> data={data}}>
  </SpotDataProvider>


);


const wrapper = document.getElementById("availableSpots");
wrapper ? ReactDOM.render(<Spot />, wrapper) : null;

