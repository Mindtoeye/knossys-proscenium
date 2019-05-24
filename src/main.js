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

import Version from "./version";
import Window from "./window";
import WindowContent from "./windowcontent";
import Dialog from "./dialog";
import DesktopWidget from "./desktopwidget";
import Switch from "./widgets/switch";
import ToggleButton from "./widgets/togglebutton";
import RadioButton from "./widgets/radiobutton";
import WindowManager from "./windowmanager";
import MenuBar from "./menubar";
import TaskBar from "./taskbar";

import Label from "./widgets/label";
import DigitalClock from "./widgets/digitalclock";
import Clock from './widgets/clock';

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
  addAnonymousDialog () {
    console.log ("addAnonymousDialog ()");
    this.refs.desktop.addDialog (<WindowContent label={"Window: [" + this.refs.desktop.getWindowIndex () +"]"} />);
  }  

  /**
   *
   */
  addAnonymousWindow () {
    console.log ("addAnonymousWindow ()");
    this.refs.desktop.addWindow (<WindowContent label={"Window: [" + this.refs.desktop.getWindowIndex () +"]"} />);
  }

  /**
   *
   */
  addModalDialog () {
    console.log ("addModalDialog ()");
    this.refs.desktop.addModal (<WindowContent label={"Window: [" + this.refs.desktop.getWindowIndex () +"]"} />);
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

    return (
      <div className="desktopContainer">
        
        <MenuBar onLogout={this.props.onLogout}/>
        <WindowManager ref="desktop">


          <DesktopWidget title="UI Elements" xPos={700} yPos={50} width={400} height={250}>
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
          </DesktopWidget>        



          <DesktopWidget title="Analog Clock" label="Local Time" xPos={300} yPos={50}>
            <Clock/>
          </DesktopWidget>


          
          <DigitalClock title="Digital Clock" xPos={450} yPos={50} zones="Los Angeles:US/Pacific,New York:US/Eastern,Tokyo:Asia/Tokyo,Amsterdam:Europe/Amsterdam" />



          <DesktopWidget title="Chart (Line)" xPos={300} yPos={350}>
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
          </DesktopWidget>



          <DesktopWidget title="Chart (error)" xPos={700} yPos={350}>
            <Chart
              width={300}
              height={300}
              chartType="ScatterChart"
              data={data}
              options={options}
              legendToggle
            />
          </DesktopWidget>



          <DesktopWidget title="Color Chooser" xPos={50} yPos={50}>
            <SketchPicker />
          </DesktopWidget>

        
        </WindowManager>
        <TaskBar />      

      </div>);
  }
}

export default MainWindow;
