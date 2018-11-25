import React, {Component} from "react";
import ReactDOM from "react-dom";
import GateDataProvider from "./GateDataProvider";

const App = () => (
//    render() {
//        return (
//            <Header />
//        )
//    }
//  <GateDataProvider endpoint="/api/gate/"
//                render={data => <Table data={data} />} />
);

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;
