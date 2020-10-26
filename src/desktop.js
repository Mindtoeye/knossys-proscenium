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

import DataTools from "./tools/datatools";
import ApplicationManager from "./applicationmanager";

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
  constructor (props) {
    super(props);

    this.state={
      apps: [],
      drivers: [],
      appState: 0,
      appTimeout: 0,
      serviceState : {
        prosceniumEnabled: false,
        chaperoneEnabled: false,
        dbEnabled: false,
        mainEnabled: false,
        sparkEnabled: false
      }
    };

    this.setDriverData=this.setDriverData.bind(this);
    this.getDriverData=this.getDriverData.bind(this);
    this.getDriverReference=this.getDriverReference.bind(this);
    this.setAppData=this.setAppData.bind(this);
    this.getAppData=this.getAppData.bind(this);
    this.getAppReference=this.getAppReference.bind(this);

    this.dataTools = new DataTools ();
    window.appManager = new ApplicationManager (this.setDriverData,this.getDriverData,this.getDriverReference,this.setAppData,this.getAppData,this.getAppReference);

    /*
    if (this.state.appManager) {
      console.log ("Initializing application manager ...");
      this.state.appManager.build();
    }
    */

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
  componentDidMount () {
    console.log ("componentDidMount");

    window.appManager.build();
  }  

  /**
   *
   */
  setDriverData (newData, aCallback) {
    this.setState ({drivers: newData},() => {
      if(aCallback) {
        aCallback();
      }
    });
  }

  /**
   *
   */
  getDriverData () {
    return (this.dataTools.deepCopy (this.state.drivers));
  }

  /**
   *
   */
  getDriverReference () {
    return (this.state.drivers);
  }  

  /**
   *
   */
  setAppData (newData, aCallback) {
    this.setState ({apps: newData}, () => {
      if (aCallback) {
        aCallback ();
      }
    });
  }

  /**
   *
   */
  getAppData () {
    return (this.dataTools.deepCopy (this.state.apps));
  }

  /**
   *
   */
  getAppReference () {
    return (this.state.apps);
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

    return (<MainWindow appmanager={window.appManager} onLogout={this.onLogout.bind(this)} />);
  }
}

export default Desktop;
