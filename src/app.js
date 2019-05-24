/**
 * Useful references:
 * 
 * https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
 * https://www.robinwieruch.de/react-state-array-add-update-remove/
 * https://reactjs.org/docs/faq-functions.html
 * https://harlemsquirrel.github.io/css/javascript/2017/01/31/dark-light-mode-switcher.html
 */

import React from "react";
import ReactDOM from "react-dom";

import MainWindow from "./main";
import LoginDialog from "./login";
import ConnectionDialog from "./connect";

import "../styles/wmgr/darktheme.css";

/**
 * appState is one of:
 *  0: not connected to enough services
 *  1: connected but not logged in
 *  2: connected and logged in
 */
class WindowedApp extends React.Component {
  
  /**
   *
   */
  constructor () {
    super();

    this.state={
      appState: 1
    }
  }

  /**
   *
   */
  onLogin () {
    console.log ("onLogin ()");
    this.setState ({appState: 2});
  }

  /**
   *
   */
  onLogout () {
    console.log ("onLogin ()");
    this.setState ({appState: 1});
  }  

  /**
   *
   */
  render() {

    if (this.state.appState==0) {
      return (<ConnectionDialog />);
    }    

    if (this.state.appState==1) {
      return (<LoginDialog onLogin={this.onLogin.bind(this)} />);
    }    

    return (<MainWindow onLogout={this.onLogout.bind(this)} />);
  }
}

export default WindowedApp;
