import React from "react";
import ReactDom from "react-dom";
import App from "./components/App";
import "./styles/main.scss";

const container = document.createElement("div");
document.body.appendChild(container);

ReactDom.render(<App />, container);
