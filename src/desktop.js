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

import MainWindow from "./mainwindow";
import LoginDialog from "./login";
import ConnectionDialog from "./connect";

import "../styles/wmgr/darktheme.css";

var tId=-1;

/**
 * appState is one of:
 *  0: not connected to enough services
 *  1: connected but not logged in
 *  2: connected and logged in
 */
class Desktop extends React.Component {
  
  /**
   *
   */
  constructor () {
    super();

    this.state={
      appState: 0,
      appTimeout: 0,
      serviceState : {
        prosceniumEnabled: false,
        chaperoneEnabled: false,
        dbEnabled: false,
        mainEnabled: false,
        sparkEnabled: false
      }
    }

    tId=setInterval (() => {
      let t=this.state.appTimeout;
      let s=this.state.appState;
      t++;

      let prosceniumEnabled = false;
      let chaperoneEnabled = false;
      let dbEnabled = false;
      let mainEnabled = false;
      let sparkEnabled = false;

      if (t>1) {
        prosceniumEnabled = true;
      }

      if (t>2) {
        chaperoneEnabled = true;
      }    
      
      if (t>3) {
        dbEnabled = true;
      } 
      
      if (t>4) {
        mainEnabled = true;
      } 
      
      if (t>5) {
        sparkEnabled = true;
      }                     

      if (t>7) {     
        s=1;
        clearInterval (tId);
      }

      this.setState ({
        appState: s,
        appTimeout: t,
        serviceState : {
          prosceniumEnabled: prosceniumEnabled,
          chaperoneEnabled: chaperoneEnabled,
          dbEnabled: dbEnabled,
          mainEnabled: mainEnabled,
          sparkEnabled: sparkEnabled
        }            
      });
    },1000);
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
      return (<ConnectionDialog timeout={7-this.state.appTimeout} state={this.state.serviceState} />);
    }    

    if (this.state.appState==1) {
      return (<LoginDialog onLogin={this.onLogin.bind(this)} />);
    }    

    return (<MainWindow apps={this.props.apps} onLogout={this.onLogout.bind(this)} />);
  }
}

export default Desktop;
