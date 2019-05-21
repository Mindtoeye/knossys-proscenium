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

import Label from "./widgets/label";
import DigitalClock from "./widgets/digitalclock";
import Clock from './widgets/clock';

// https://www.npmjs.com/package/react-google-charts
import Chart from 'react-google-charts';

// https://github.com/zcreativelabs/react-simple-maps
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"

const versionInfo=new Version ().toString();

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
class WindowedApp extends React.Component {
  
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
  addMapWindow () {
    console.log ("addMapWindow ()");
    this.addWindow (<ComposableMap
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
  render() {
    let windows=[];
    const options = {
      title: "Age vs. Weight comparison",
      hAxis: { title: "Age", viewWindow: { min: 0, max: 15 } },
      vAxis: { title: "Weight", viewWindow: { min: 0, max: 15 } },
      legend: "none",
      hAxis: {
        titleTextStyle: {color: '#607d8b'}, 
        textStyle: { color: '#b0bec5', fontSize: '8', bold: true}
      },
      vAxis: {
        titleTextStyle: {color: '#607d8b'}, 
        textStyle: { color: '#b0bec5', fontSize: '8', bold: true}
      },      
      backgroundColor: 'transparent',
      chartArea: {
        'backgroundColor': {
          'fill': '#444444',
          'opacity': 100
        }
      },
      series: {
        0: { color: '#6f9654' },        
        1: { color: '#e2431e' },
        2: { color: '#e7711b' },
        3: { color: '#f1ca3a' },
        4: { color: '#1c91c0' },
        5: { color: '#43459d' },
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

    for (var i=0;i<this.state.windowTemplates.length;i++) {
      let aTemplate=this.state.windowTemplates [i];

      if (aTemplate.type=="window") {
        windows.push (<Window ref={"win"+aTemplate.index} id={aTemplate.index} key={aTemplate.index} zIndex={i*10} xPos={aTemplate.x} yPos={aTemplate.y} width={"320px"} height={"320px"} popWindow={this.popWindow.bind(this)} deleteWindow={this.deleteWindow.bind(this)}>{aTemplate.content}</Window>);      
      }

      if (aTemplate.type=="dialog") {
        windows.push (<Dialog ref={"win"+aTemplate.index} id={aTemplate.index} key={aTemplate.index} zIndex={i*10} xPos={aTemplate.x} yPos={aTemplate.y} width={"320px"} height={"320px"} popWindow={this.popWindow.bind(this)} deleteWindow={this.deleteWindow.bind(this)}>{aTemplate.content}</Dialog>);
      }
    }

    return (<div className="desktop">
      <Label>Knossys Proscenium version: {versionInfo}</Label>

      <button className="defaultButton" onClick={this.addAnonymousWindow.bind(this)}>Add Content Window</button><br/>
      <button className="defaultButton" onClick={this.addAnonymousDialog.bind(this)}>Add Dialog Window</button><br/>
      <button className="defaultButton" onClick={this.addAnonymousWindow.bind(this)}>Add Modal Dialog</button><br/>
      <button className="defaultButton" onClick={this.addMapWindow.bind(this)}>Add Map Window</button><br/>
      <br/>
      <button className="defaultButton">Button Default</button><br/>
      <button className="largeButton">Button Large</button><br/>
      <Switch />
      <ToggleButton /><br />
      <RadioButton /><br />

      <DesktopWidget title="Clock" label="Analog" xPos={300} yPos={50}>
        <Clock/>
      </DesktopWidget>
      
      <DigitalClock title="Clock" xPos={450} yPos={50} zones="Los Angeles:US/Pacific,New York:US/Eastern,Tokyo:Asia/Tokyo,Amsterdam:Europe/Amsterdam" />

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
          
      {windows}
    </div>);
  }
}

export default WindowedApp;
