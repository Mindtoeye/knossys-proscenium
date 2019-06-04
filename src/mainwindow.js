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

import knossys from '../styles/images/knossys.png';
import settings from '../styles/images/icons/settings-icon.png';
import fullscreen from '../styles/images/icons/fullscreen.png';

import iconTaskmanager from '../styles/images/taskmanager.png';
import iconCassandra from '../styles/images/cassandra.png';
import iconSpark from '../styles/images/spark.png';
import iconJob from '../styles/images/jobmanager.png';
import iconAnalyze from '../styles/images/analyze.png';
import iconCloudUpload from '../styles/images/cloudupload.png';
import iconLogging from '../styles/images/logging.png';
import iconWorkflow from '../styles/images/workflow.png';
import iconFinite from '../styles/images/finite.png';

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
import DigitalClock from "./widgets/digitalclock";
import Clock from './widgets/clock';
import Dial from './widgets/dial';

//https://whoisandy.github.io/react-rangeslider/
import Slider from 'react-rangeslider'
import "../styles/wmgr/widgets/rangeslider.scss";

// https://www.npmjs.com/package/react-google-charts
import Chart from 'react-google-charts';

// https://casesandberg.github.io/react-color/
import { SketchPicker } from 'react-color';

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

    this.state={
      windowTemplates: [],
      popupDialog: null,
      windowIndex: 0,  
      globalSettings: {
        showGrid: false
      }
    };
  }

  /**
  *
  */
  componentDidMount () {
    console.log ("componentDidMount");

    setTimeout (() => {
      /*
      this.refs.taskbar.addIcon (iconJob,"Submit Job","1","1");
      this.refs.taskbar.addIcon (iconTaskmanager,"TaskManager","2","1");
      this.refs.taskbar.addIcon (iconAnalyze,"View Results","3","1");
      this.refs.taskbar.addSeparator ();
      this.refs.taskbar.addIcon (iconWorkflow,"Pipeline","4","1");
      this.refs.taskbar.addIcon (iconCloudUpload,"Data Upload","5","1");
      this.refs.taskbar.addSeparator ();
      this.refs.taskbar.addIcon (iconCassandra,"Data Store","6","1");
      this.refs.taskbar.addIcon (iconSpark,"Spark Status","7","1");
      this.refs.taskbar.addIcon (iconLogging,"Inspect Logs","8","1"); 
      this.refs.taskbar.addIcon (iconFinite,"FSM Editor","9","1");  
      */
      this.addWindow (<WindowContent label={"Window: [" + this.getWindowIndex () +"]"} />,iconFinite,"FSM Editor",false);
    },1000);
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

    /*
    let tempIndex=this.state.windowIndex;
    let newList=this.state.windowTemplates.filter (aWindow => {
      if (aWindow.id==targetWindow) {
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
    */
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
      shown: showWindow
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
  render() {
    const options = {
      title: "Age vs. Weight comparison",
      titleTextStyle: {
        color: '#cccccc'
      },
      hAxis: { title: "Age", viewWindow: { min: 0, max: 15 } },
      vAxis: { title: "Weight", viewWindow: { min: 0, max: 15 } },
      legend: "none",
      hAxis: {
        titleTextStyle: {color: '#607d8b'}, 
        textStyle: { 
          color: '#b0bec5', 
          fontSize: '8', 
          bold: true}
      },
      vAxis: {
        titleTextStyle: {color: '#607d8b'}, 
        textStyle: { 
          color: '#b0bec5', 
          fontSize: '8', 
          bold: true}
      },      
      backgroundColor: 'transparent',
      chartArea: {
        width: '80%', 
        height: '80%',
        'backgroundColor': {
          'fill': '#444444',
          'opacity': 100
        }
      },
      series: {
        0: { color: '#dada76' }
      }

    };

    const data = [
      ["Age", "Weight"],
      [8, 12],
      [4, 5.5],
      [11, 14],
      [4, 5],
      [3, 3.5],
      [6.5, 7]
    ];

    let modalDialog=this.state.popupDialog;
    let taskbar=this.state.taskbar;
 
    return (
      <div id="desktop" className="desktopContainer">

        
        <MenuBar onLogout={this.props.onLogout} showGrid={this.showGrid.bind(this)} />


        <WindowManager 
           ref="desktop" 
           settings={this.state.globalSettings}
           windows={this.state.windowTemplates}
           deleteWindow={this.deleteWindow.bind(this)}
           addWindow={this.addWindow.bind(this)}
           addDialog={this.addDialog.bind(this)}
           addModal={this.addModal.bind(this)}>


          <DesktopPanel title="UI Elements" xPos={700} yPos={50} width={400} height={300}>
            <button className="defaultButton" onClick={this.addAnonymousWindow.bind(this)}>Add Content Window</button><br/>
            <button className="defaultButton" onClick={this.addAnonymousDialog.bind(this)}>Add Dialog Window</button><br/>
            <button className="defaultButton" onClick={this.addModalDialog.bind(this)}>Add Modal Dialog</button><br/>
            <button className="defaultButton" onClick={this.addMapWindow.bind(this)}>Add Map Window</button><br/>
            <br/>
            <button className="defaultButton">Button Default</button><br/>
            <button className="largeButton">Button Large</button><br/>
            <Switch />
            <ToggleButton /><br />
            <RadioButton /><br />
            <Slider
              min={0}
              max={100}
              value={50}
            />
          </DesktopPanel>        



          <DesktopWidget title="Analog Clock" label="Local Time" xPos={300} yPos={50}>
            <Clock />
          </DesktopWidget>
        


          <DigitalClock title="Digital Clock" xPos={450} yPos={50} zones="Los Angeles:US/Pacific,New York:US/Eastern,Tokyo:Asia/Tokyo,Amsterdam:Europe/Amsterdam" />



          <Dial title="Dial" label="Net Speed" xPos={50} yPos={420} />



          <DesktopPanel title="Chart (Line)" xPos={300} yPos={400}>
            <Chart
             width={300}
             height={300}
             chartType="LineChart"
             loader={<div>Loading Chart</div>}
             data={[
               [
                 { type: 'number', label: 'x' },
                 { type: 'number', label: 'values' },
                 { id: 'i0', type: 'number', role: 'interval' },
                 { id: 'i1', type: 'number', role: 'interval' },
                 { id: 'i2', type: 'number', role: 'interval' },
                 { id: 'i2', type: 'number', role: 'interval' },
                 { id: 'i2', type: 'number', role: 'interval' },
                 { id: 'i2', type: 'number', role: 'interval' },
               ],
               [1, 100, 90, 110, 85, 96, 104, 120],
               [2, 120, 95, 130, 90, 113, 124, 140],
               [3, 130, 105, 140, 100, 117, 133, 139],
               [4, 90, 85, 95, 85, 88, 92, 95],
               [5, 70, 74, 63, 67, 69, 70, 72],
               [6, 30, 39, 22, 21, 28, 34, 40],
               [7, 80, 77, 83, 70, 77, 85, 90],
               [8, 100, 90, 110, 85, 95, 102, 110],
             ]}
             options={options}
            />
          </DesktopPanel>



          <DesktopPanel title="Chart (error)" xPos={700} yPos={400}>
            <Chart
              width={300}
              height={300}
              chartType="ScatterChart"
              data={data}
              options={options}
              legendToggle
            />
          </DesktopPanel>



          <DesktopPanel title="Color Chooser" xPos={50} yPos={50}>
            <SketchPicker />
          </DesktopPanel>

        
        </WindowManager>


        <TaskBar ref="taskbar" onIconClicked={this.toggleWindow.bind(this)} windows={this.state.windowTemplates} />


        {modalDialog}


      </div>);
  }
}

export default MainWindow;
