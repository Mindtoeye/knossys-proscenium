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

import Window from "./window";
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
    console.log ("popWindow("+targetWindow+")");

    let indexSpread=this.props.windows.length;

    let originalList=[];

    for (let i=0;i<indexSpread;i++) {
      let oldIndex=this.refs ["win"+i].getIndex ();
      originalList.push ({
        index: i,
        zIndex: oldIndex
      });
    }

    let reworkedList=[];
    let target=null;

    for (let j=0;j<originalList.length;j++) {
      let reference=originalList [j];

      if (reference.index!=targetWindow) {
        reworkedList.push(reference);
      } else {
        target=reference;
      }
    }

    reworkedList.push (target);
    let zIndex=0;
 
    for (let k=0;k<reworkedList.length;k++) {
      let test=reworkedList [k];
      this.refs ["win"+test.index].reIndex (zIndex);
      zIndex+=1000;
    }    
  }

  /**
   *
   */
  render() {
    let windows=[];

    for (var i=0;i<this.props.windows.length;i++) {
      let aTemplate=this.props.windows [i];

      if (aTemplate.type=="window") {
        //console.log ("Window: " + aTemplate.shown);

        if (aTemplate.content) {
          if (aTemplate.shown==true) {
            windows.push (<Window settings={this.props.settings} ref={"win"+aTemplate.index} id={aTemplate.id} key={aTemplate.index} title={aTemplate.title} zIndex={i*10} xPos={aTemplate.x} yPos={aTemplate.y} width={"320px"} height={"320px"} popWindow={this.popWindow.bind(this)} deleteWindow={this.deleteWindow.bind(this)}>{aTemplate.content}</Window>);      
          }  
        }
      }

      if (aTemplate.type=="dialog") {
        windows.push (<Dialog ref={"win"+aTemplate.index} id={aTemplate.id} key={aTemplate.index} zIndex={i*10} xPos={aTemplate.x} yPos={aTemplate.y} width={"320px"} height={"320px"} popWindow={this.popWindow.bind(this)} deleteWindow={this.deleteWindow.bind(this)}>{aTemplate.content}</Dialog>);
      }

      if (aTemplate.type=="modal") {
        windows.push (<Dialog ref={"win"+aTemplate.index} id={aTemplate.id} key={aTemplate.index} zIndex={i*10} xPos={aTemplate.x} yPos={aTemplate.y} width={"320px"} height={"320px"} popWindow={this.popWindow.bind(this)} deleteWindow={this.deleteWindow.bind(this)}>{aTemplate.content}</Dialog>);
      }      
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
