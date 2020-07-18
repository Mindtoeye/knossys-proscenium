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

import "../styles/wmgr/darktheme.css";
import "../styles/main.css";
import "../styles/wmgr/button.css";
import "../styles/wmgr/buttonlarge.css";
import "../styles/wmgr/windefs.css";
import "../styles/wmgr/elements.css";

import DataTools from './tools/datatools';

import Window from "./window";
import WindowApplication from "./windowapp";
import WindowContent from "./windowcontent";
import Dialog from "./dialog";
import DesktopWidget from "./desktopwidget";

/**
 *
 */
class WindowManager extends React.Component {
  
  /**
   *
   */
  constructor () {
    super();

    this.dataTools=new DataTools ();

    this.state = {
      pop: 0
    };
  }

  /**
   *
   */
  deleteWindow (aWindow) {
    console.log ("deleteWindow ("+aWindow+")");

    if (this.props.deleteWindow) {
      this.props.deleteWindow (aWindow);
    }
  }  

  /**
   *
   */
  addWindow (aContent,anIcon,aLabel,aShown) {
    console.log ("addWindow ()");

    if (this.props.addWindow) {
      this.props.addWindow (aContent,anIcon,aLabel,aShown);
    }
  }

  /**
   *
   */
  addDialog (aContent) {
    console.log ("addDialog ()");

    if (this.props.addDialog) {
      this.props.addDialog (aContent);
    }
  }  

  /**
   *
   */
  addModal (aContent) {
    console.log ("addModal ()");

    if (this.props.addModel) {
      this.props.addModel (aContent);
    }
  }   

  /**
   *
   */
  addDesktopWidget (aContent) {
    console.log ("addDesktopWidget ()");

    if (this.props.addDesktopWidget) {
      this.props.addDesktopWidget (aContent);
    }
  }    

  /**
   *
   */
  popWindow (targetWindow) {
    //console.log ("popWindow("+targetWindow+")");

    let updatedWindows=this.dataTools.deepCopy (this.props.windows);

    for (let i=0;i<updatedWindows.length;i++) {
      let win=updatedWindows [i];
      if (win.id==targetWindow) {
        let updated=this.dataTools.deleteElement (updatedWindows,win);
        updated.push (win);
        if (this.props.updateWindows) {
          this.props.updateWindows (updated);
          return;
        }
      }
    }
  }

  /**
   *
   */
  render() {
    let windows=[];
    let zIndex=1;

    for (var i=0;i<this.props.windows.length;i++) {
      let aTemplate=this.props.windows [i];

      if (aTemplate.type=="window") {
        if (aTemplate.content) {
          if (aTemplate.shown==true) {
            let reference="win"+aTemplate.index;      
            windows.push (<WindowApplication settings={this.props.settings} ref={reference} id={aTemplate.id} key={aTemplate.index} title={aTemplate.title} xPos={aTemplate.x} yPos={aTemplate.y} width={"320px"} height={"320px"} popWindow={this.popWindow.bind(this)} deleteWindow={this.deleteWindow.bind(this)}>{aTemplate.content}</WindowApplication>);      

            zIndex++;
          }            
        }
      }  
    }

    for (var j=0;j<this.props.windows.length;j++) {
      let aTemplate=this.props.windows [j];

      if (aTemplate.type=="dialog") {
        windows.push (<Dialog ref={"win"+aTemplate.index} id={aTemplate.id} key={aTemplate.index} zIndex={zIndex*10} xPos={aTemplate.x} yPos={aTemplate.y} width={"320px"} height={"320px"} popWindow={this.popWindow.bind(this)} deleteWindow={this.deleteWindow.bind(this)}>{aTemplate.content}</Dialog>);
      }

      if (aTemplate.type=="modal") {
        windows.push (<Dialog ref={"win"+aTemplate.index} id={aTemplate.id} key={aTemplate.index} zIndex={zIndex*10} xPos={aTemplate.x} yPos={aTemplate.y} width={"320px"} height={"320px"} popWindow={this.popWindow.bind(this)} deleteWindow={this.deleteWindow.bind(this)}>{aTemplate.content}</Dialog>);
      }     
      
      zIndex++; 
    }    

    let windowClass="desktopContent";

    if (this.props.settings.showGrid==true) {
      windowClass="desktopContent gridDots"
    }

    return (<div className={windowClass}>
      {this.props.children}
      {windows}
    </div>);
  }
}

export default WindowManager;
