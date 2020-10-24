import React from "react";
import ReactDOM from "react-dom";

import ApplicationManager from "./applicationmanager";
import Desktop from "./desktop";

window.apps=[];
window.drivers=[];

const config = {};
const appManager = new ApplicationManager ();

ReactDOM.render(<Desktop appmanager={appManager} config={config} />, document.getElementById("app"));
