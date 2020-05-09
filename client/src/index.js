import React from "react";
import ReactDom from "react-dom";
import App from "./components/App";
import "./styles/main.scss";

const container = document.getElementById("root");
ReactDom.render(<App />, container);
