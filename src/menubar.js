import React from "react";
import ReactDOM from "react-dom";

import { default as Dropdown, DropdownContent, DropdownTrigger } from "react-simple-dropdown";

import Version from "./version";
import Label from "./widgets/label";

import knossys from '../styles/images/knossys.png';
import settings from '../styles/images/icons/settings-icon.png';
import fullscreen from '../styles/images/icons/fullscreen.png';

import '../styles/wmgr/dropdown.css';
import '../styles/wmgr/menubar.css';

/**
 *
 */
export default class MenuBar extends React.Component {

  /**
   *
   */
  constructor(props) {
    super(props);

    this.state = {};

    this.showAbout = this.showAbout.bind(this);
    this.showStatus = this.showStatus.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleFullscreen = this.handleFullscreen.bind(this);    
    //this.showGrid = this.showGrid.bind(this);  
  }

  /**
   * 
   */
  showAbout (e) {
	  console.log ("showAbout ()");
	
	  this.refs.dropdown.hide();
  }  
  
  /**
   * 
   */
  showStatus () {
	  console.log ("showStatus ()");
	
	  this.refs.dropdown.hide();

    if (typeof this.props.onShowStatus === 'function') {
      this.props.onShowStatus();
    }    
  }

  /**
   * 
   */
  showGrid () {
    console.log ("showGrid ()");
  
    this.refs.dropdown.hide();

    if (typeof this.props.showGrid === 'function') {
      this.props.showGrid();
    } else {
      console.log ("Error: no show/hide grid method provided");
    }
  }  
  
  /**
   * 
   */  
  handleLogout (e) {
	  console.log ("handleLogout ()");
	
    this.refs.dropdown.hide();
    
    if (typeof this.props.onLogout === 'function') {
      this.props.onLogout(e.target.value);
    }    
  }	
  
  /**
   * 
   */
  requestFullScreen(element) {
    // Supports most browsers and their versions.
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
  }  

  /**
   * 
   */
  handleFullscreen (e) {
  	console.log ("handleFullscreen ()");
	
	  var elem = document.body; // Make the body go full screen.
	  this.requestFullScreen(elem); 	
  }

  /**
   *
   */
  render() {
  	let username="anonymous";
 
    if (this.props.username) {
      username=this.props.username;
    }

    const versionInfo=new Version ().toString();

    return (
      <div className="menubar">
        <div className="menuMain">
          <img src={knossys} />
        </div>
        <div className="menuMain">
          <Label>Knossys Proscenium version: {versionInfo}</Label>
        </div>        
        <div className="menuInfo">
        logged in as: {username}
        </div>        
        <div className="menuSettings">
          <Dropdown ref="dropdown">
            <DropdownTrigger><img src={settings} /> </DropdownTrigger>
            <DropdownContent>
              <ul>
                  <li>
                      <a href="#" onClick={this.showAbout}>About</a>
                  </li>
                  <li>
                      <a href="#" onClick={this.showStatus}>System Status</a>
                  </li>
                  <li>
                      <a href="#" onClick={this.showGrid.bind(this)}>Show Hide Grid</a>
                  </li>
                  <li>
                      <a href="#" onClick={this.handleLogout}>Log Out</a>
                  </li>
              </ul>
            </DropdownContent>
          </Dropdown>          
        </div>
        <div className="menuSettings" onClick={this.handleFullscreen}>
          <img src={fullscreen} />
        </div>      
      </div>     
    );
  }
}
