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
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
      windowTemplates: [],
      pop: 0,
      windowIndex: 0
    };
  }

  /**
   *
   */
  getWindowIndex () {
  	return (this.state.windowIndex);
  }

  /**
   *
   */
  popWindow (targetWindow) {
    console.log ("popWindow("+targetWindow+")");

    let indexSpread=this.state.windowTemplates.length;

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
  deleteWindow (targetWindow) {
    console.log ("deleteWindow ("+targetWindow+")");

    let tempIndex=this.state.windowIndex;
    let newList=this.state.windowTemplates.filter (aWindow => {
      if (aWindow.index==targetWindow) {
        return (false);
      }

      return (true);
    });

    tempIndex--;

    this.setState((state, props) => {
      return {
        windowTemplates: newList,
        windowIndex: tempIndex,
      };
    });      
  }  

  /**
   *
   */
  addAnonymousWindow () {
    console.log ("addAnonymousWindow ()");
    this.addWindow (<WindowContent label={"Window: [" + this.state.windowIndex +"]"} />);
  }

  /**
   *
   */
  addAnonymousDialog () {
    console.log ("addAnonymousDialog ()");
    this.addDialog (<WindowContent label={"Window: [" + this.state.windowIndex +"]"} />);
  }  

  /**
   *
   */
  addWindow (aContent) {
    console.log ("addWindow ()");

    let windowObject={
      type: "window",
      index: this.state.windowIndex,
      x: getRandomInt (10,500),
      y: getRandomInt (10,500),
      content: aContent
    };

    this.setState(state => {
      let tempIndex=this.state.windowIndex;

      let list = state.windowTemplates.concat(windowObject);

      tempIndex++;

      return {
        windowTemplates: list,
        windowIndex: tempIndex
      };
    });    
  }

  /**
   *
   */
  addDialog (aContent) {
    console.log ("addDialog ()");

    let windowObject={
      type: "dialog",
      index: this.state.windowIndex,
      x: getRandomInt (10,500),
      y: getRandomInt (10,500),
      content: aContent
    };

    this.setState(state => {
      let tempIndex=this.state.windowIndex;

      let list = state.windowTemplates.concat(windowObject);

      tempIndex++;

      return {
        windowTemplates: list,
        windowIndex: tempIndex
      };
    });    
  }  

  /**
   *
   */
  addModal (aContent) {
    console.log ("addModal ()");

    let windowObject={
      type: "modal",
      index: this.state.windowIndex,
      x: getRandomInt (10,500),
      y: getRandomInt (10,500),
      content: aContent
    };

    this.setState(state => {
      let tempIndex=this.state.windowIndex;

      let list = state.windowTemplates.concat(windowObject);

      tempIndex++;

      return {
        windowTemplates: list,
        windowIndex: tempIndex
      };
    });    
  }   

  /**
   *
   */
  addDesktopWidget (aContent) {
    console.log ("addDesktopWidget ()");

    let windowObject={
      type: "desktop",
      index: this.state.windowIndex,
      x: getRandomInt (10,500),
      y: getRandomInt (10,500),
      content: aContent
    };

    this.setState(state => {
      let tempIndex=this.state.windowIndex;

      let list = state.windowTemplates.concat(windowObject);

      tempIndex++;

      return {
        windowTemplates: list,
        windowIndex: tempIndex
      };
    });    
  }  

  /**
   *
   */
  render() {
    let windows=[];

    for (var i=0;i<this.state.windowTemplates.length;i++) {
      let aTemplate=this.state.windowTemplates [i];

      if (aTemplate.type=="window") {
        windows.push (<Window settings={this.props.settings} ref={"win"+aTemplate.index} id={aTemplate.index} key={aTemplate.index} zIndex={i*10} xPos={aTemplate.x} yPos={aTemplate.y} width={"320px"} height={"320px"} popWindow={this.popWindow.bind(this)} deleteWindow={this.deleteWindow.bind(this)}>{aTemplate.content}</Window>);      
      }

      if (aTemplate.type=="dialog") {
        windows.push (<Dialog ref={"win"+aTemplate.index} id={aTemplate.index} key={aTemplate.index} zIndex={i*10} xPos={aTemplate.x} yPos={aTemplate.y} width={"320px"} height={"320px"} popWindow={this.popWindow.bind(this)} deleteWindow={this.deleteWindow.bind(this)}>{aTemplate.content}</Dialog>);
      }

      if (aTemplate.type=="modal") {
        windows.push (<Dialog ref={"win"+aTemplate.index} id={aTemplate.index} key={aTemplate.index} zIndex={i*10} xPos={aTemplate.x} yPos={aTemplate.y} width={"320px"} height={"320px"} popWindow={this.popWindow.bind(this)} deleteWindow={this.deleteWindow.bind(this)}>{aTemplate.content}</Dialog>);
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
