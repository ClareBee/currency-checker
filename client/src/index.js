import React from "react";
import ReactDom from "react-dom";
import HelloWorld from "./components/HelloWorld";

const container = document.createElement("div");
document.body.appendChild(container);

ReactDom.render(<HelloWorld />, container);
