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
import "../styles/wmgr/desktop.css";
import "../styles/wmgr/menubar.css";
import "../styles/wmgr/taskbar.css";
import "../styles/wmgr/widgets/switch.css";
import "../styles/wmgr/widgets/togglebutton.css";
import "../styles/wmgr/widgets/radiobutton.css";

import "../styles/clock.scss";

import { getRandomArbitrary, getRandomInt } from './tools/random.js';
import { uuidv4 } from './tools/uuid.js';

import iconTaskmanager from '../styles/images/taskmanager.png';
import iconCassandra from '../styles/images/cassandra.png';
import iconSpark from '../styles/images/spark.png';
import iconJob from '../styles/images/jobmanager.png';
import iconAnalyze from '../styles/images/analyze.png';
import iconCloudUpload from '../styles/images/cloudupload.png';
import iconLogging from '../styles/images/logging.png';
import iconWorkflow from '../styles/images/workflow.png';

import Version from "./version";
import Window from "./window";
import WindowContent from "./windowcontent";
import Dialog from "./dialog";
import DesktopWidget from "./desktopwidget";
import DesktopPanel from "./desktoppanel";
import Switch from "./widgets/switch";
import ToggleButton from "./widgets/togglebutton";
import RadioButton from "./widgets/radiobutton";
import WindowManager from "./windowmanager";
import MenuBar from "./menubar";
import TaskBar from "./taskbar";

import Label from "./widgets/label";

//https://whoisandy.github.io/react-rangeslider/
import Slider from 'react-rangeslider'
import "../styles/wmgr/widgets/rangeslider.scss";

import DataTools from './tools/datatools';

// https://github.com/zcreativelabs/react-simple-maps
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"

/**
 *
 */
class MainWindow extends React.Component {
  
  /**
   *
   */
  constructor () {
    super();

    this.dataTools=new DataTools ();

    this.state={
      windowTemplates: [],
      popupDialog: null,
      windowIndex: 0,  
      globalSettings: {
        showGrid: false
      }
    };

    this.hasMaximized = this.hasMaximized.bind(this);
  }

  /**
  *
  */
  componentDidMount () {
    console.log ("componentDidMount");

    setTimeout (() => {
      if (this.props.apps) {
        for (var i=0;i<this.props.apps.length;i++) {
          var anApp=this.props.apps [i];
          if (anApp.type=="window") {
            this.addWindow (anApp.window,anApp.icon,anApp.name,anApp.shown);
          }
        }
      }
    },500);
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
  popupDialog (aContent) {
    this.setState (
      <div id="scrim" className="scrim">
        <Dialog ref={"dialog"} width={"320px"} height={"320px"} centered="true">
        {aContent}
        </Dialog>
      </div>);
  }

  /**
   *
   */
  deleteWindow (targetWindow) {
    console.log ("deleteWindow ("+targetWindow+")");
    this.toggleWindow (targetWindow);
  }  

  /**
   *
   */
  addWindow (aContent,anIcon,aLabel,aShown) {
    console.log ("addWindow ("+aShown+")");

    let showWindow=true;
    let generatedId=uuidv4();
    if(typeof aShown !== 'undefined')  {
      showWindow=aShown;
    }

    let windowObject={
      type: "window",
      id: generatedId,
      index: this.state.windowIndex,
      x: getRandomInt (10,500),
      y: getRandomInt (10,500),
      content: aContent,
      icon: anIcon,
      title: aLabel,
      shown: showWindow,
      maximized: false
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

    let generatedId=uuidv4();

    let windowObject={
      type: "dialog",
      id: generatedId,      
      index: this.state.windowIndex,
      x: getRandomInt (10,500),
      y: getRandomInt (10,500),
      content: aContent,
      shown: true      
    };

    this.setState(state => {
      let tempIndex=this.state.windowIndex;

      let list = this.state.windowTemplates.concat(windowObject);

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

    let generatedId=uuidv4();

    let windowObject={
      type: "modal",
      id: generatedId,      
      index: this.state.windowIndex,
      x: getRandomInt (10,500),
      y: getRandomInt (10,500),
      content: aContent,
      shown: true,
      selected: false
    };

    this.setState(state => {
      let tempIndex=this.state.windowIndex;

      let list = this.state.windowTemplates.concat(windowObject);

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

    let generatedId=uuidv4();

    let windowObject={
      type: "desktop",
      id: generatedId,      
      index: this.state.windowIndex,
      x: getRandomInt (10,500),
      y: getRandomInt (10,500),
      content: aContent,
      shown: true
    };

    this.setState(state => {
      let tempIndex=this.state.windowIndex;

      let list = this.state.windowTemplates.concat(windowObject);

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
  onLogout () {
    console.log ("onLogout ()");
  	if (this.props.onLogout) {
  	  this.props.onLogout ();
  	}
  }  

  /**
   *
   */
  showGrid () {
    console.log ("showGrid ()");
    if (this.state.globalSettings.showGrid==false) {
      this.setState ({globalSettings : {showGrid: true}});
    } else {
      this.setState ({globalSettings : {showGrid: false}});
    }
  }  

  /**
   *
   */
  addAnonymousWindow () {
    console.log ("addAnonymousWindow ()");
    this.refs.desktop.addWindow (<WindowContent label={"Window: [" + this.getWindowIndex () +"]"} />,null,"Anon Window");
  }

  /**
   *
   */
  addAnonymousDialog () {
    console.log ("addAnonymousDialog ()");
    this.refs.desktop.addDialog (<WindowContent label={"Window: [" + this.getWindowIndex () +"]"} />);
  }  

  /**
   *
   */
  addModalDialog () {
    console.log ("addModalDialog ()");
    this.refs.desktop.addModal (<WindowContent label={"Window: [" + this.getWindowIndex () +"]"} />);
  }  

  /**
   *
   */
  addMapWindow () {
    console.log ("addMapWindow ()");
    this.refs.desktop.addWindow (<ComposableMap
      projectionConfig={{
        scale: 205,
        rotation: [-11,0,0],
      }}
      width={980}
      height={551}
      style={{
        width: "100%",
        height: "auto",
        background: "#353535"
      }}
      >
      <ZoomableGroup center={[0,20]} disablePanning>
        <Geographies geography="../static/world-50m.json">
          {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
            <Geography
              key={i}
              geography={geography}
              projection={projection}
              style={{
                default: {
                  fill: "#585a5a",
                  stroke: "#8b8c8c",
                  strokeWidth: 0.75,
                  outline: "none",
                },
                hover: {
                  fill: "#818686",
                  stroke: "#ffffff",
                  strokeWidth: 0.75,
                  outline: "none",
                },
                pressed: {
                  fill: "#FF5722",
                  stroke: "#607D8B",
                  strokeWidth: 0.75,
                  outline: "none",
                },
              }}
            />
          ))}
        </Geographies>
      </ZoomableGroup>
   </ComposableMap>);
  }  

  /**
   *
   */
  toggleWindow (id) {
    console.log ("toggleWindow ("+id+")");

    for (let i=0;i<this.state.windowTemplates.length;i++) {
      let testWindow=this.state.windowTemplates [i];

      if (testWindow.id==id) {
        let newList=this.state.windowTemplates.filter (aWindow => {
          if (aWindow.id==testWindow.id) {
            return (false);
          }

          return (true);
        });

        if (testWindow.shown==true) {
          testWindow.shown=false;
        } else {
          testWindow.shown=true;
        }

        let updatedList=newList.concat (testWindow);

        this.setState ({windowTemplates: updatedList});

        return;
      }
    }
  }

  /**
   *
   */
  updateWindows (newWindowData) {
    //console.log ("updateWindows ()");
    this.setState ({windowTemplates: newWindowData});    
  }

  /**
   *
   */
  hasMaximized () {
    //console.log ("hasMaximized ("+this.state.windowTemplates.length+")");

    for (let j=0;j<this.state.windowTemplates.length;j++) {
      let win=this.state.windowTemplates [j];
      if (win.maximized==true) {
        return (true);
      }
    }

    return (false);
  }

  /**
   *
   */
  maximizeWindow () {
    console.log ("maximizeWindow ()");

    let updatedWindows=this.dataTools.deepCopy (this.state.windowTemplates);

    for (let j=0;j<updatedWindows.length;j++) {
      updatedWindows [j].maximized=false;
    }

    this.updateWindows (updatedWindows);
  }

  /**
   *
   */
  render() {
    let modalDialog=this.state.popupDialog;
    let taskbar=this.state.taskbar;
    let apps=this.props.appmanager.getAppReference ();

    var desktopPanels=[];

    for (var i=0;i<apps.length;i++) {
      var appTester=apps [i];
      if (appTester.type=="panel") {
        if (appTester.shown==true) {
          desktopPanels.push (<DesktopPanel key={"desktoppanel-"+i} title={appTester.name} label={appTester.label} xPos={appTester.x} yPos={appTester.y}>{appTester.window}</DesktopPanel>);
        }
      }
    }

    var desktopWidgets=[];

    for (var i=0;i<apps.length;i++) {
      var appTester=apps [i];
      if (appTester.type=="widget") {
        if (appTester.shown==true) {
          desktopWidgets.push (<DesktopWidget key={"desktopwidget-"+i} title={appTester.name} label={appTester.label} xPos={appTester.x} yPos={appTester.y}>{appTester.window}</DesktopWidget>);
        }
      }
    }    

    if (this.hasMaximized ()==true) {
      return (
        <div id="desktop" className="desktopContainer">      
          <MenuBar onLogout={this.props.onLogout} showGrid={this.showGrid.bind(this)} maximizeWindow={this.maximizeWindow.bind(this)} />
          <WindowManager 
             ref="desktop" 
             settings={this.state.globalSettings}
             windows={this.state.windowTemplates}
             updateWindows={this.updateWindows.bind(this)}
             deleteWindow={this.deleteWindow.bind(this)}
             addWindow={this.addWindow.bind(this)}
             addDialog={this.addDialog.bind(this)}
             addModal={this.addModal.bind(this)}>          
          </WindowManager>          
        </div>);
    }
 
    return (
      <div id="desktop" className="desktopContainer">
        
        <MenuBar appmanager={this.props.appmanager} onLogout={this.props.onLogout} showGrid={this.showGrid.bind(this)} />

        <WindowManager 
           ref="desktop" 
           settings={this.state.globalSettings}
           windows={this.state.windowTemplates}
           updateWindows={this.updateWindows.bind(this)}
           deleteWindow={this.deleteWindow.bind(this)}
           addWindow={this.addWindow.bind(this)}
           addDialog={this.addDialog.bind(this)}
           addModal={this.addModal.bind(this)}>

          {desktopWidgets}

          {desktopPanels}
        
        </WindowManager>

        <TaskBar ref="taskbar" appmanager={this.props.appmanager} onIconClicked={this.toggleWindow.bind(this)} windows={this.state.windowTemplates} />

        {modalDialog}

      </div>);
  }
}

export default MainWindow;
